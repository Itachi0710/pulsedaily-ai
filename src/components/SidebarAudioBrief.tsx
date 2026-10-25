import React, { useState, useEffect, useRef } from 'react';

interface SidebarAudioBriefProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  activeStoryTitle?: string;
}

export const SidebarAudioBrief: React.FC<SidebarAudioBriefProps> = ({
  isPlaying,
  onTogglePlay,
  activeStoryTitle = 'AI Infra, Claude 3.7 & Vector Database Trends'
}) => {
  const [seconds, setSeconds] = useState(24);
  const [speed, setSpeed] = useState<number>(1.0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev >= 60) {
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, speed]);

  const handleSkip = (delta: number) => {
    setSeconds((prev) => {
      const next = prev + delta;
      return Math.max(0, Math.min(60, next));
    });
  };

  const handleCycleSpeed = () => {
    if (speed === 1.0) setSpeed(1.5);
    else if (speed === 1.5) setSpeed(2.0);
    else setSpeed(1.0);
  };

  const progressPercent = Math.min(100, Math.max(0, (seconds / 60) * 100));

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-white border border-[#DADCE0] rounded-2xl p-5 shadow-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-filled text-[#1A73E8] text-[20px]"
          >
            graphic_eq
          </span>
          <h3 className="text-base font-bold text-[#202124] tracking-tight">
            Daily Audio Brief
          </h3>
        </div>
        <span className="bg-[#E8F0FE] text-[#1A73E8] text-xs font-semibold px-2 py-0.5 rounded-full select-none">
          Today's Edition
        </span>
      </div>

      <p className="text-xs font-medium text-[#5F6368] mb-3 line-clamp-1">
        {activeStoryTitle}
      </p>

      {/* Audio Waveform Visualization Simulation */}
      <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-3 mb-3">
        <div className="flex items-end justify-between h-9 gap-1 px-1 select-none">
          {[
            { h: 'h-3', active: true },
            { h: 'h-5', active: true },
            { h: 'h-7', active: true },
            { h: 'h-4', active: true },
            { h: 'h-8', active: true },
            { h: 'h-6', active: true },
            { h: 'h-4', active: true },
            { h: 'h-5', active: false },
            { h: 'h-7', active: false },
            { h: 'h-3', active: false },
            { h: 'h-6', active: false },
            { h: 'h-2', active: false },
            { h: 'h-5', active: false },
            { h: 'h-4', active: false },
          ].map((bar, i) => (
            <span
              key={i}
              className={`w-1 rounded-full transition-all duration-300 ${bar.h} ${
                isPlaying && bar.active
                  ? 'bg-[#1A73E8] animate-pulse'
                  : bar.active
                  ? 'bg-[#1A73E8]'
                  : 'bg-[#DADCE0]'
              }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#E8EAED] rounded-full h-1.5 mt-2 overflow-hidden">
          <div
            className="bg-[#1A73E8] h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex justify-between text-[10px] text-[#5F6368] font-medium mt-1 font-mono">
          <span>{formatTime(seconds)}</span>
          <span>1:00</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleSkip(-10)}
            className="p-1.5 text-[#5F6368] hover:text-[#202124] rounded-full hover:bg-[#F1F3F4] transition-colors cursor-pointer active:scale-95"
            title="Replay 10 seconds"
          >
            <span className="material-symbols-outlined text-[20px]">
              replay_10
            </span>
          </button>

          {/* Circular Play/Pause Google Blue Button */}
          <button
            onClick={onTogglePlay}
            className="w-10 h-10 rounded-full bg-[#1A73E8] hover:bg-[#1765CC] text-white flex items-center justify-center shadow-sm active:scale-95 transition-transform cursor-pointer"
            title={isPlaying ? 'Pause' : 'Play Brief'}
          >
            <span
              className="material-symbols-filled text-[24px] text-white"
            >
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <button
            onClick={() => handleSkip(10)}
            className="p-1.5 text-[#5F6368] hover:text-[#202124] rounded-full hover:bg-[#F1F3F4] transition-colors cursor-pointer active:scale-95"
            title="Forward 10 seconds"
          >
            <span className="material-symbols-outlined text-[20px]">
              forward_10
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCycleSpeed}
            className="text-xs font-semibold text-[#5F6368] hover:text-[#1A73E8] bg-[#F1F3F4] hover:bg-[#E8EAED] px-2 py-1 rounded-md transition-colors cursor-pointer"
            title="Toggle playback speed"
          >
            {speed.toFixed(1)}x
          </button>

          <button
            onClick={() => alert('Ready to Cast audio brief to Google Nest or Smart Speaker.')}
            className="p-1.5 text-[#5F6368] hover:text-[#202124] rounded-full hover:bg-[#F1F3F4] transition-colors cursor-pointer"
            title="Audio Cast"
          >
            <span className="material-symbols-outlined text-[18px]">
              cast
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
