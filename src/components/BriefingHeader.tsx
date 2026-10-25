import React from 'react';

interface BriefingHeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
  onPlayAudioBrief: () => void;
  isAudioPlaying: boolean;
}

export const BriefingHeader: React.FC<BriefingHeaderProps> = ({
  onRefresh,
  isRefreshing,
  onPlayAudioBrief,
  isAudioPlaying
}) => {
  // Format current date nicely like Google News
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  return (
    <section className="max-w-7xl mx-auto px-6 pt-7 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Title & Live Status */}
      <div>
        <div className="flex items-center flex-wrap gap-2">
          <h1 className="text-[28px] font-bold text-[#202124] tracking-tight leading-none">
            Your briefing
          </h1>
          <span className="bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6] px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1.5 inline-flex ml-2 select-none">
            <span className="w-2 h-2 rounded-full bg-[#188038] animate-pulse" />
            Live HackerNews API Active
          </span>
        </div>
        <p className="text-xs text-[#5F6368] mt-1.5 flex items-center flex-wrap gap-2">
          <span>{dateStr}</span>
          <span>•</span>
          <span>Updated 12m ago</span>
          <span>•</span>
          <span className="text-[#1A73E8] font-medium flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[14px]">
              verified_user
            </span>
            Editorial Grounding Engine v4.2
          </span>
        </p>
      </div>

      {/* Action CTA Buttons */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="border border-[#DADCE0] bg-white hover:bg-[#F1F3F4] text-[#3C4043] rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 transition-colors active:scale-95 disabled:opacity-60 select-none cursor-pointer"
          title="Sync live stories from HackerNews API"
        >
          <span className={`material-symbols-outlined text-[18px] ${isRefreshing ? 'animate-spin' : ''}`}>
            refresh
          </span>
          <span>{isRefreshing ? 'Syncing...' : 'Refresh Feed'}</span>
        </button>

        <button
          onClick={onPlayAudioBrief}
          className="bg-[#1A73E8] hover:bg-[#1765CC] text-white rounded-full px-5 py-2 text-sm font-medium flex items-center gap-2 shadow-sm transition-all active:scale-95 select-none cursor-pointer"
          title="Play 60-second synthesized audio summary"
        >
          <span
            className="material-symbols-filled text-[18px] text-white"
          >
            {isAudioPlaying ? 'pause_circle' : 'play_circle'}
          </span>
          <span>{isAudioPlaying ? 'Pause Audio Brief' : 'Listen to Daily Brief (60s)'}</span>
        </button>
      </div>
    </section>
  );
};
