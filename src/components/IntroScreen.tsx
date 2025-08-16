import { useState, useEffect } from 'react';
import { Check, Scan, Shield, Zap } from 'lucide-react';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [stage, setStage] = useState<'scanning' | 'processing' | 'granted' | 'complete'>('scanning');
  const [scanProgress, setScanProgress] = useState(0);
  const [showMatrix, setShowMatrix] = useState(true);

  useEffect(() => {
    // Matrix effect timeout
    const matrixTimer = setTimeout(() => {
      setShowMatrix(false);
    }, 1000);

    // Scanning progress
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setStage('processing');
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    // Stage progression
    const stageTimer1 = setTimeout(() => setStage('processing'), 5000);
    const stageTimer2 = setTimeout(() => setStage('granted'), 6000);
    const stageTimer3 = setTimeout(() => setStage('complete'), 7500);
    const completeTimer = setTimeout(() => onComplete(), 8000);

    return () => {
      clearTimeout(matrixTimer);
      clearInterval(progressInterval);
      clearTimeout(stageTimer1);
      clearTimeout(stageTimer2);
      clearTimeout(stageTimer3);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const MatrixRain = () => (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-green-400 text-xs font-mono animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        >
          {Array.from({ length: 20 }).map((_, j) => (
            <div key={j} className="opacity-70">
              {String.fromCharCode(0x30A0 + Math.random() * 96)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center z-50 overflow-hidden">
      {showMatrix && <MatrixRain />}
      
      {/* Cyber grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        {/* Main scanning interface */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-64 h-64 rounded-full border-2 border-cyan-400/30 animate-spin-slow relative">
            {/* Inner rings */}
            <div className="absolute inset-4 rounded-full border border-green-400/40 animate-pulse">
              <div className="absolute inset-4 rounded-full border border-blue-400/30 animate-ping">
                
                {/* Face scanning area */}
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-green-500/20 border-2 border-cyan-400 flex items-center justify-center backdrop-blur-sm">
                  
                  {stage === 'scanning' && (
                    <div className="relative">
                      <Scan className="w-16 h-16 text-cyan-400 animate-pulse" />
                      
                      {/* Scanning lines */}
                      <div className="absolute inset-0 overflow-hidden rounded-full">
                        <div 
                          className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-all duration-200"
                          style={{ 
                            top: `${scanProgress}%`,
                            opacity: scanProgress > 90 ? 0 : 1 
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {stage === 'processing' && (
                    <div className="relative">
                      <Shield className="w-16 h-16 text-yellow-400 animate-spin" />
                      <div className="absolute inset-0 animate-pulse">
                        <Zap className="w-16 h-16 text-yellow-400" />
                      </div>
                    </div>
                  )}

                  {(stage === 'granted' || stage === 'complete') && (
                    <div className="relative animate-scale-in">
                      <Check className="w-16 h-16 text-green-400" />
                      <div className="absolute inset-0 animate-ping">
                        <Check className="w-16 h-16 text-green-400 opacity-50" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Progress indicators */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 rounded-full transition-all duration-300 ${
                  scanProgress > (i * 12.5) ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' : 'bg-gray-600'
                }`}
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-120px)`
                }}
              />
            ))}
          </div>

          {/* Scanning laser effect */}
          {stage === 'scanning' && (
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div 
                className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-400/50 transition-all duration-100"
                style={{ 
                  top: `${10 + (scanProgress * 0.8)}%`,
                  opacity: 0.8 
                }}
              />
            </div>
          )}
        </div>

        {/* Status text */}
        <div className="mt-8 space-y-2">
          <div className="text-2xl font-mono text-cyan-400 tracking-wider">
            {stage === 'scanning' && 'BIOMETRIC SCAN'}
            {stage === 'processing' && 'PROCESSING...'}
            {stage === 'granted' && 'ACCESS GRANTED'}
            {stage === 'complete' && 'WELCOME'}
          </div>
          
          <div className="text-sm text-gray-400 font-mono">
            {stage === 'scanning' && `Scanning... ${scanProgress}%`}
            {stage === 'processing' && 'Authenticating credentials...'}
            {stage === 'granted' && 'Identity verified successfully'}
            {stage === 'complete' && 'Initializing system...'}
          </div>
        </div>

        {/* Terminal-style output */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="bg-black/80 rounded-lg p-4 font-mono text-xs text-left border border-cyan-400/30 backdrop-blur-sm">
            <div className="text-green-400 mb-2">developer@dennis-portfolio:~$ initialize</div>
            <div className="text-gray-400 space-y-1">
              <div className={stage !== 'scanning' ? 'text-green-400' : ''}>
                ✓ Loading neural networks...
              </div>
              <div className={stage === 'processing' || stage === 'granted' || stage === 'complete' ? 'text-green-400' : ''}>
                ✓ Analyzing biometric data...
              </div>
              <div className={stage === 'granted' || stage === 'complete' ? 'text-green-400' : ''}>
                ✓ Verifying access permissions...
              </div>
              <div className={stage === 'complete' ? 'text-green-400' : ''}>
                ✓ Welcome to Dennis Darius Portfolio
              </div>
            </div>
          </div>
        </div>

        {/* Cyber HUD elements */}
        <div className="absolute top-4 left-4 text-cyan-400 font-mono text-xs">
          SYSTEM_ID: DDC_001
        </div>
        <div className="absolute top-4 right-4 text-cyan-400 font-mono text-xs">
          STATUS: {stage.toUpperCase()}
        </div>
        <div className="absolute bottom-4 left-4 text-cyan-400 font-mono text-xs">
          SECURITY_LVL: MAXIMUM
        </div>
        <div className="absolute bottom-4 right-4 text-cyan-400 font-mono text-xs">
          VERSION: 2.1.4
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default IntroScreen;