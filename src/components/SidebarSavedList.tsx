import React from 'react';
import { SavedArticle } from '../types';

interface SidebarSavedListProps {
  savedArticles: SavedArticle[];
  onRemoveBookmark: (id: string) => void;
  onViewAll: () => void;
}

export const SidebarSavedList: React.FC<SidebarSavedListProps> = ({
  savedArticles,
  onRemoveBookmark,
  onViewAll
}) => {
  const handleExportMarkdown = () => {
    const mdContent = `# PulseDaily AI - Saved Research & Reading List
Generated on: ${new Date().toLocaleDateString()}

${savedArticles
  .map(
    (item, index) =>
      `## ${index + 1}. ${item.title}
- **Source:** ${item.source}
- **Read Time:** ${item.readTime}
- **Saved At:** ${item.savedAt}
- **URL:** ${item.url}
`
  )
  .join('\n---\n\n')}
`;

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PulseDaily-Saved-Briefs-${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white border border-[#DADCE0] rounded-2xl p-5 shadow-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-filled text-[#1A73E8] text-[20px]"
          >
            bookmarks
          </span>
          <h3 className="text-base font-bold text-[#202124] tracking-tight">
            Saved Reading List
          </h3>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs font-medium text-[#1A73E8] hover:underline cursor-pointer"
        >
          View all ({savedArticles.length})
        </button>
      </div>

      {/* Items list */}
      <div className="space-y-3 mb-4">
        {savedArticles.length === 0 ? (
          <div className="p-4 text-center text-xs text-[#5F6368] border border-dashed border-[#DADCE0] rounded-xl">
            No bookmarks saved yet. Click the bookmark icon on any story to save it for later.
          </div>
        ) : (
          savedArticles.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="p-2.5 rounded-xl border border-[#DADCE0] hover:bg-[#F8F9FA] transition-colors group relative"
            >
              <div className="flex items-start justify-between gap-2">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#202124] group-hover:text-[#1A73E8] leading-snug line-clamp-2 transition-colors"
                >
                  {item.title}
                </a>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveBookmark(item.id);
                  }}
                  className="text-[#5F6368] hover:text-[#D93025] opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
                  title="Remove bookmark"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
              <div className="flex items-center gap-2 mt-1.5 text-[11px] text-[#5F6368]">
                <span>{item.source}</span>
                <span>•</span>
                <span>{item.readTime}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Action: Export to Obsidian */}
      <button
        onClick={handleExportMarkdown}
        disabled={savedArticles.length === 0}
        className="w-full border border-[#DADCE0] bg-white hover:bg-[#F1F3F4] text-[#3C4043] rounded-xl py-2 px-3 text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-95 disabled:opacity-50 select-none"
        title="Download saved articles as Markdown for Obsidian or Notion"
      >
        <span className="material-symbols-outlined text-[16px]">
          file_download
        </span>
        <span>Export to Obsidian / Markdown</span>
      </button>
    </div>
  );
};
