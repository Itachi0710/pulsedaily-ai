import React from 'react';
import { NewsCategory } from '../types';

interface HorizontalTabBarProps {
  activeTab: NewsCategory;
  onTabChange: (tab: NewsCategory) => void;
  savedCount: number;
}

export const HorizontalTabBar: React.FC<HorizontalTabBarProps> = ({
  activeTab,
  onTabChange,
  savedCount
}) => {
  const tabs: { id: NewsCategory; label: string; icon: string; count?: number }[] = [
    { id: 'For you', label: 'For you', icon: 'recommend' },
    { id: 'Following (Saved)', label: 'Following (Saved)', icon: 'bookmark', count: savedCount },
    { id: 'Agentic AI', label: 'Agentic AI', icon: 'smart_toy' },
    { id: 'Cloud & Infra', label: 'Cloud & Infra', icon: 'cloud' },
    { id: 'Product & Strategy', label: 'Product & Strategy', icon: 'query_stats' },
  ];

  return (
    <nav
      aria-label="Google News Beat Navigation"
      className="bg-white border-b border-[#DADCE0] px-6 lg:px-8 flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#5F6368] sticky top-16 z-40 overflow-x-auto no-scrollbar"
    >
      <div role="tablist" className="flex items-center gap-6 lg:gap-8 min-w-max">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.id)}
              className={`py-3.5 flex items-center gap-1.5 transition-colors whitespace-nowrap relative text-sm select-none ${
                isActive
                  ? 'font-semibold text-[#1A73E8] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[#1A73E8] after:rounded-t-full'
                  : 'hover:text-[#202124] text-[#5F6368]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[18px] ${
                  isActive ? 'text-[#1A73E8]' : 'text-[#5F6368]'
                }`}
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {tab.icon}
              </span>
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-semibold ${
                  isActive ? 'bg-[#E8F0FE] text-[#1A73E8]' : 'bg-[#F1F3F4] text-[#5F6368]'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
