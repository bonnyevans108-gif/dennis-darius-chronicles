import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface MpesaRequest {
  phoneNumber: string;
  amount: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const consumerKey = Deno.env.get("MPESA_CONSUMER_KEY");
    const consumerSecret = Deno.env.get("MPESA_CONSUMER_SECRET");
    const passkey = Deno.env.get("MPESA_PASSKEY");
    const businessShortCode = Deno.env.get("MPESA_BUSINESS_SHORTCODE");
    const recipientPhone = Deno.env.get("MPESA_PHONE_NUMBER");

    if (!consumerKey || !consumerSecret || !passkey || !businessShortCode) {
      throw new Error("M-Pesa credentials not configured");
    }

    const { phoneNumber, amount }: MpesaRequest = await req.json();

    if (!phoneNumber || !amount) {
      throw new Error("Phone number and amount are required");
    }

    // Format phone number (remove leading 0 or +254 and add 254)
    let formattedPhone = phoneNumber.replace(/\s+/g, "");
    if (formattedPhone.startsWith("+")) {
      formattedPhone = formattedPhone.substring(1);
    }
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "254" + formattedPhone.substring(1);
    }
    if (!formattedPhone.startsWith("254")) {
      formattedPhone = "254" + formattedPhone;
    }

    // Get OAuth token
    const auth = btoa(`${consumerKey}:${consumerSecret}`);
    const tokenResponse = await fetch(
      "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Token error:", errorText);
      throw new Error(`Failed to get access token: ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Generate timestamp
    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, 14);

    // Generate password
    const password = btoa(`${businessShortCode}${passkey}${timestamp}`);

    // Initiate STK Push
    const stkPushPayload = {
      BusinessShortCode: businessShortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.round(amount),
      PartyA: formattedPhone,
      PartyB: businessShortCode,
      PhoneNumber: formattedPhone,
      CallBackURL: "https://example.com/callback", // You can update this later
      AccountReference: "BuyMeCoffee",
      TransactionDesc: "Support Darius Mukoya",
    };

    console.log("STK Push payload:", JSON.stringify(stkPushPayload, null, 2));

    const stkResponse = await fetch(
      "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stkPushPayload),
      }
    );

    const stkData = await stkResponse.json();
    console.log("STK Response:", JSON.stringify(stkData, null, 2));

    if (stkData.ResponseCode === "0") {
      return new Response(
        JSON.stringify({
          success: true,
          message: "STK Push sent successfully. Please check your phone.",
          checkoutRequestId: stkData.CheckoutRequestID,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    } else {
      throw new Error(stkData.errorMessage || stkData.ResponseDescription || "STK Push failed");
    }
  } catch (error: any) {
    console.error("Error in mpesa-stk-push function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
