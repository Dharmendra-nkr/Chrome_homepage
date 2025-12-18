import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface AITool {
  name: string;
  color: string;
  icon: string;
}

const aiTools: AITool[] = [
  { name: 'ChatGPT', color: '#10a37f', icon: '🤖' },
  { name: 'Gemini', color: '#4285f4', icon: '✨' },
  { name: 'Groq', color: '#ff6b35', icon: '⚡' },
  { name: 'Claude', color: '#d97757', icon: '🧠' },
  { name: 'Perplexity', color: '#20808d', icon: '🔍' },
  { name: 'Mistral', color: '#f2a71b', icon: '🌪️' },
];

export function AIRevolver() {
  const [isHovered, setIsHovered] = useState(false);
  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, { 
    stiffness: 100, 
    damping: 30,
    mass: 1 
  });
  
  // Counter rotation for text to keep it straight
  const counterRotation = useTransform(smoothRotation, (value) => -value);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isHovered) {
        e.preventDefault();
        const delta = e.deltaY;
        rotation.set(rotation.get() + delta * 0.5);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isHovered, rotation]);

  const cylinderRadius = 140;

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center mb-4">
        <h1 className="text-4xl text-white mb-2">AI Tools Revolver</h1>
        <p className="text-gray-400">Hover and scroll to rotate</p>
      </div>

      <div
        ref={containerRef}
        className="relative w-[400px] h-[400px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Rotating cylinder with AI tools */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ rotate: smoothRotation }}
        >
          {aiTools.map((tool, index) => {
            const angle = (index * 360) / aiTools.length;
            const radian = (angle * Math.PI) / 180;
            const x = Math.cos(radian) * cylinderRadius;
            const y = Math.sin(radian) * cylinderRadius;

            return (
              <motion.div
                key={tool.name}
                className="absolute w-20 h-20 rounded-full shadow-2xl border-4 border-white/20 flex items-center justify-center cursor-pointer overflow-hidden group"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  backgroundColor: tool.color,
                }}
                initial={{ x: '-50%', y: '-50%' }}
                whileHover={{ scale: 1.2, x: '-50%', y: '-50%' }}
                whileTap={{ scale: 0.95, x: '-50%', y: '-50%' }}
              >
                {/* Tool name on hover - counter-rotated to stay straight */}
                <motion.div 
                  className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ rotate: counterRotation }}
                >
                  <span className="text-white text-xs font-semibold text-center px-2">
                    {tool.name}
                  </span>
                </motion.div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-50" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Center pivot point */}
        <div className="absolute w-12 h-12 bg-gray-800 rounded-full shadow-inner z-20 border-4 border-gray-600 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Instructions */}
      <div className="text-center text-gray-300 max-w-md">
        <p className="text-sm">
          Hover over the revolver and use your mouse wheel to rotate the cylinder. 
          Hover over individual circles to make them bigger!
        </p>
      </div>
    </div>
  );
}
