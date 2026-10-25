import React, { useState } from 'react';
import { NewsStory, UserRole } from '../types';

interface TopStoriesFeedProps {
  stories: NewsStory[];
  activeRole: UserRole;
  onToggleBookmark: (storyId: string) => void;
  onSelectStory: (story: NewsStory) => void;
}

export const TopStoriesFeed: React.FC<TopStoriesFeedProps> = ({
  stories,
  activeRole,
  onToggleBookmark,
  onSelectStory
}) => {
  const [rankingMode, setRankingMode] = useState<'Most Grounded' | 'Latest' | 'Top Velocity'>('Most Grounded');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <section className="lg:col-span-8 flex flex-col gap-6">
      <div className="bg-white border border-[#DADCE0] rounded-2xl overflow-hidden shadow-none">
        {/* Container Header */}
        <div className="px-6 py-4 border-b border-[#DADCE0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <span
              className="material-symbols-filled text-[#1A73E8] text-[22px]"
            >
              newspaper
            </span>
            <h2 className="text-xl font-bold text-[#202124] tracking-tight">
              Top stories
            </h2>
          </div>

          {/* Ranking Mode Selector */}
          <div className="relative">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#5F6368] font-medium">Ranked by:</span>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-[#F8F9FA] hover:bg-[#E8EAED] border border-[#DADCE0] rounded-lg px-2.5 py-1 text-xs font-semibold text-[#202124] flex items-center gap-1.5 transition-colors cursor-pointer"
                aria-expanded={dropdownOpen}
              >
                <span>{rankingMode}</span>
                <span className="material-symbols-outlined text-[14px]">
                  expand_more
                </span>
              </button>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white border border-[#DADCE0] rounded-xl shadow-md py-1 z-30">
                {(['Most Grounded', 'Latest', 'Top Velocity'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setRankingMode(mode);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium transition-colors ${
                      rankingMode === mode
                        ? 'text-[#1A73E8] bg-[#E8F0FE] font-semibold'
                        : 'text-[#202124] hover:bg-[#F8F9FA]'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stories List (Strict Hairline Separation) */}
        <div className="divide-y divide-[#DADCE0]">
          {stories.length === 0 ? (
            <div className="p-12 text-center text-[#5F6368]">
              <span className="material-symbols-outlined text-[40px] text-[#DADCE0] mb-2">
                article
              </span>
              <p className="text-sm font-medium">No stories found in this section.</p>
              <p className="text-xs text-[#70757A] mt-1">Try switching categories or clearing search query.</p>
            </div>
          ) : (
            stories.map((story) => {
              const impactText = story.impactByRole[activeRole] || story.impactByRole['Software Engineer'];

              return (
                <article
                  key={story.id}
                  className="p-6 hover:bg-[#FAFAFA] transition-colors"
                >
                  {/* Publisher Metadata & Grounding Chip */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs flex-wrap">
                      <span className="font-bold text-[#202124] tracking-tight">
                        {story.publisher}
                      </span>
                      <span className="text-[#5F6368]">•</span>
                      <span className="text-[#5F6368]">{story.timeAgo}</span>
                      {story.grounded && (
                        <span className="bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6] text-[11px] px-2 py-0.5 rounded font-medium inline-flex items-center gap-1 select-none">
                          ✓ Grounded
                        </span>
                      )}
                      {story.isBreaking && (
                        <span className="bg-[#FCE8E6] text-[#D93025] border border-[#FAD2CF] text-[11px] px-2 py-0.5 rounded font-semibold inline-flex items-center gap-1 select-none">
                          ⚡ Breaking
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onSelectStory(story)}
                      className="text-[#5F6368] hover:text-[#202124] p-1 rounded-full hover:bg-[#F1F3F4] transition-colors"
                      title="Story details & citation graph"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        more_vert
                      </span>
                    </button>
                  </div>

                  {/* Headline */}
                  <h3
                    onClick={() => onSelectStory(story)}
                    className="text-lg font-bold text-[#202124] hover:text-[#1A73E8] cursor-pointer leading-snug mb-3 transition-colors"
                  >
                    {story.title}
                  </h3>

                  {/* 3-Bullet Gemini TL;DR */}
                  <ul className="space-y-1.5 text-sm text-[#3C4043] pl-1 mb-3.5">
                    {story.tldrBullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#1A73E8] font-bold mt-0.5 shrink-0 select-none">
                          •
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Soft Blue Material Design 3 Tonal Callout Box */}
                  <div className="bg-[#E8F0FE] border border-[#D2E3FC] rounded-xl p-3.5 my-3">
                    <div className="text-xs font-bold text-[#1A73E8] tracking-wide uppercase flex items-center gap-1.5 mb-1 select-none">
                      <span
                        className="material-symbols-filled text-[16px] text-[#1A73E8]"
                      >
                        auto_awesome
                      </span>
                      <span>Why this matters for you ({activeRole})</span>
                    </div>
                    <p className="text-xs text-[#174EA6] leading-relaxed">
                      {impactText}
                    </p>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onToggleBookmark(story.id)}
                        className={`text-xs flex items-center gap-1 transition-colors px-2 py-1 rounded-lg ${
                          story.saved
                            ? 'text-[#1A73E8] font-semibold bg-[#E8F0FE]'
                            : 'text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4]'
                        }`}
                        title={story.saved ? 'Remove bookmark' : 'Save for later'}
                      >
                        <span
                          className={`material-symbols-outlined text-[16px] ${
                            story.saved ? 'text-[#1A73E8]' : ''
                          }`}
                          style={{ fontVariationSettings: story.saved ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          bookmark
                        </span>
                        <span>{story.saved ? 'Saved' : 'Save for later'}</span>
                      </button>

                      <span className="text-[#DADCE0]">|</span>

                      <span className="text-xs text-[#5F6368] flex items-center gap-1 select-none">
                        <span className="material-symbols-outlined text-[15px] text-[#188038]">
                          task_alt
                        </span>
                        <span>{story.citationsCount} citations verified</span>
                      </span>
                    </div>

                    <a
                      href={story.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#1A73E8] font-medium hover:bg-[#E8F0FE] px-2.5 py-1 rounded-full transition-colors flex items-center gap-1"
                    >
                      <span>Full coverage</span>
                      <span className="material-symbols-outlined text-[14px]">
                        north_east
                      </span>
                    </a>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
