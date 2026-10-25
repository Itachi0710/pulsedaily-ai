import React from 'react';
import { NewsStory, UserRole } from '../types';

interface StoryDetailModalProps {
  story: NewsStory | null;
  onClose: () => void;
  activeRole: UserRole;
  onToggleBookmark: (id: string) => void;
}

export const StoryDetailModal: React.FC<StoryDetailModalProps> = ({
  story,
  onClose,
  activeRole,
  onToggleBookmark
}) => {
  if (!story) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="story-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#DADCE0] rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#DADCE0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-[#202124]">{story.publisher}</span>
            <span className="text-[#5F6368]">•</span>
            <span className="text-[#5F6368]">{story.timeAgo}</span>
            <span className="bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6] text-[11px] px-2 py-0.5 rounded font-medium">
              ✓ Grounded Engine Verified
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#5F6368] hover:text-[#202124] p-1 rounded-full hover:bg-[#F1F3F4] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <h2 id="story-detail-title" className="text-xl font-bold text-[#202124] leading-snug">
            {story.title}
          </h2>

          <div className="space-y-2">
            <div className="text-xs font-bold text-[#5F6368] uppercase tracking-wider">
              Gemini Synthesized Takeaways (Anti-Hallucination Verified)
            </div>
            <ul className="space-y-2 text-sm text-[#3C4043] bg-[#F8F9FA] p-4 rounded-xl border border-[#DADCE0]">
              {story.tldrBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#1A73E8] font-bold mt-0.5">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Role specific callouts */}
          <div className="bg-[#E8F0FE] border border-[#D2E3FC] rounded-xl p-4">
            <div className="text-xs font-bold text-[#1A73E8] tracking-wide uppercase flex items-center gap-1.5 mb-1.5">
              <span className="material-symbols-filled text-[18px]">auto_awesome</span>
              Target Role Impact ({activeRole})
            </div>
            <p className="text-xs text-[#174EA6] leading-relaxed">
              {story.impactByRole[activeRole]}
            </p>
          </div>

          {/* Verification Telemetry */}
          <div className="border border-[#DADCE0] rounded-xl p-4 space-y-2">
            <div className="text-xs font-bold text-[#202124] flex items-center justify-between">
              <span>Grounding & Citation Breakdown</span>
              <span className="text-[#188038] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">task_alt</span>
                {story.citationsCount} Citations Cross-Checked
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#5F6368] pt-1">
              <div className="bg-[#F8F9FA] p-2.5 rounded-lg border border-[#DADCE0]">
                <div className="font-semibold text-[#202124]">Primary Source</div>
                <div>{story.publisher}</div>
              </div>
              <div className="bg-[#F8F9FA] p-2.5 rounded-lg border border-[#DADCE0]">
                <div className="font-semibold text-[#202124]">Topic Beat</div>
                <div>{story.category}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#F8F9FA] border-t border-[#DADCE0] flex items-center justify-between">
          <button
            onClick={() => onToggleBookmark(story.id)}
            className={`text-xs font-medium px-3.5 py-2 rounded-full border border-[#DADCE0] flex items-center gap-1.5 transition-colors ${
              story.saved
                ? 'bg-[#E8F0FE] text-[#1A73E8] border-[#D2E3FC]'
                : 'bg-white text-[#3C4043] hover:bg-[#F1F3F4]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: story.saved ? "'FILL' 1" : "'FILL' 0" }}
            >
              bookmark
            </span>
            <span>{story.saved ? 'Saved in Reading List' : 'Save for later'}</span>
          </button>

          <a
            href={story.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-[#1A73E8] hover:bg-[#1765CC] text-white text-xs font-medium rounded-full flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <span>Read Original Source</span>
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </a>
        </div>
      </div>
    </div>
  );
};
