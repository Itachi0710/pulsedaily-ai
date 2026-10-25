import React, { useState, useEffect, useMemo } from 'react';
import { TopAppBar } from './components/TopAppBar';
import { HorizontalTabBar } from './components/HorizontalTabBar';
import { BriefingHeader } from './components/BriefingHeader';
import { TopStoriesFeed } from './components/TopStoriesFeed';
import { SidebarRadar } from './components/SidebarRadar';
import { SidebarAudioBrief } from './components/SidebarAudioBrief';
import { SidebarSavedList } from './components/SidebarSavedList';
import { EditorialFooter } from './components/EditorialFooter';
import { BreakingAlertModal } from './components/BreakingAlertModal';
import { StoryDetailModal } from './components/StoryDetailModal';
import {
  INITIAL_STORIES,
  INITIAL_RADAR_ALERTS,
  INITIAL_SAVED_ARTICLES,
  fetchLiveHackerNewsStories
} from './services/newsService';
import { explainImpactWithGemini } from './services/geminiService';
import { UserRole, NewsCategory, NewsStory, RadarAlert, SavedArticle, UserProfile } from './types';

export const App: React.FC = () => {
  // SSO User State
  const [user, setUser] = useState<UserProfile>(() => {
    const savedRole = localStorage.getItem('pulsedaily_role') as UserRole;
    return {
      name: 'Alex Rivera',
      email: 'alex.rivera@corp.pulse.ai',
      role: savedRole || 'Software Engineer',
      avatarLetter: 'A',
      ssoActive: true
    };
  });

  // Active Category Tab
  const [activeTab, setActiveTab] = useState<NewsCategory>('For you');

  // Stories State
  const [stories, setStories] = useState<NewsStory[]>(() => {
    const cached = localStorage.getItem('pulsedaily_stories');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_STORIES;
  });

  // Radar Alerts
  const [alerts] = useState<RadarAlert[]>(INITIAL_RADAR_ALERTS);

  // Saved Articles
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>(() => {
    const cached = localStorage.getItem('pulsedaily_saved');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_SAVED_ARTICLES;
  });

  // Search Filter
  const [searchQuery, setSearchQuery] = useState('');

  // Audio Playback
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Syncing state
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modals
  const [breakingModalOpen, setBreakingModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<NewsStory | null>(null);

  // In-app Alert Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist role changes
  const handleRoleChange = (role: UserRole) => {
    setUser((prev) => ({ ...prev, role }));
    localStorage.setItem('pulsedaily_role', role);
    setToastMessage(`Perspective switched to ${role}. Recommendations and impact summaries updated.`);
  };

  // Sync saved list with localStorage
  useEffect(() => {
    localStorage.setItem('pulsedaily_saved', JSON.stringify(savedArticles));
  }, [savedArticles]);

  // Sync stories with localStorage
  useEffect(() => {
    localStorage.setItem('pulsedaily_stories', JSON.stringify(stories));
  }, [stories]);

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Request browser notifications if allowed
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  // Live HackerNews sync
  const handleRefreshFeed = async () => {
    setIsRefreshing(true);
    try {
      const liveStories = await fetchLiveHackerNewsStories(user.role);
      // Merge live stories with existing saved state
      const merged = liveStories.map((s) => ({
        ...s,
        saved: savedArticles.some((sa) => sa.id === s.id || sa.title === s.title)
      }));
      setStories(merged);
      setToastMessage('✓ Live HackerNews API synchronized! 5 fresh grounded stories loaded.');
    } catch (err) {
      setToastMessage('Failed to reach live HN API, using cached editorial intelligence.');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Toggle Bookmark
  const handleToggleBookmark = (storyId: string) => {
    setStories((prev) =>
      prev.map((s) => {
        if (s.id === storyId) {
          const nextSaved = !s.saved;
          if (nextSaved) {
            setSavedArticles((current) => [
              {
                id: s.id,
                title: s.title,
                source: s.publisher,
                readTime: '5 min read',
                savedAt: 'Just now',
                url: s.url
              },
              ...current.filter((item) => item.id !== s.id)
            ]);
            setToastMessage('Story saved to your Reading List.');
          } else {
            setSavedArticles((current) => current.filter((item) => item.id !== s.id));
            setToastMessage('Story removed from your Reading List.');
          }
          return { ...s, saved: nextSaved };
        }
        return s;
      })
    );
  };

  // Remove bookmark from sidebar
  const handleRemoveBookmark = (id: string) => {
    setSavedArticles((prev) => prev.filter((item) => item.id !== id));
    setStories((prev) => prev.map((s) => (s.id === id ? { ...s, saved: false } : s)));
    setToastMessage('Removed bookmark from Reading List.');
  };

  // Explain with Gemini trigger
  const handleExplainWithGemini = async (alert: RadarAlert) => {
    setBreakingModalOpen(false);
    setToastMessage(`✨ Synthesizing Gemini intelligence for ${user.role}...`);
    try {
      const result = await explainImpactWithGemini(alert.headline, user.role);
      const tempStory: NewsStory = {
        id: `alert-${alert.id}`,
        title: result.headline,
        publisher: 'Breaking Radar • Gemini Analysis',
        timeAgo: alert.timeAgo,
        category: 'Agentic AI',
        grounded: true,
        citationsCount: 38,
        url: 'https://news.ycombinator.com',
        tldrBullets: result.tldrBullets,
        impactByRole: {
          'Software Engineer': result.roleImpact,
          'Product Manager': result.roleImpact,
          'Founder / Exec': result.roleImpact
        },
        isBreaking: true,
        saved: false
      };
      setSelectedStory(tempStory);
      setToastMessage(`✨ Grounded Gemini briefing ready for ${user.role}`);
    } catch {
      setToastMessage(`✨ Gemini Analysis: "${alert.headline}" — High priority for ${user.role}.`);
    }
  };

  // Filtered stories based on tab and search
  const filteredStories = useMemo(() => {
    let list = stories;

    // Filter by tab
    if (activeTab === 'Following (Saved)') {
      list = list.filter((s) => s.saved || savedArticles.some((sa) => sa.id === s.id));
    } else if (activeTab !== 'For you') {
      list = list.filter((s) => s.category === activeTab);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.publisher.toLowerCase().includes(q) ||
          s.tldrBullets.some((b) => b.toLowerCase().includes(q))
      );
    }

    return list;
  }, [stories, activeTab, searchQuery, savedArticles]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] selection:bg-[#E8F0FE] selection:text-[#1A73E8]">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#202124] text-white text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 border border-[#3C4043] animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <span className="material-symbols-filled text-[#1A73E8] text-[16px]">
            info
          </span>
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-gray-400 hover:text-white ml-2 text-sm"
          >
            ✕
          </button>
        </aside>
      )}

      {/* ROW 1: TOP GOOGLE APP BAR */}
      <TopAppBar
        user={user}
        activeRole={user.role}
        onRoleChange={handleRoleChange}
        breakingCount={alerts.length}
        onOpenBreakingModal={() => setBreakingModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* ROW 2: HORIZONTAL GOOGLE NEWS TAB BAR */}
      <HorizontalTabBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        savedCount={savedArticles.length}
      />

      {/* MAIN CANVAS */}
      <main className="flex-1 w-full">
        {/* ZONE 3: 'YOUR BRIEFING' HEADER SECTION */}
        <BriefingHeader
          onRefresh={handleRefreshFeed}
          isRefreshing={isRefreshing}
          onPlayAudioBrief={() => setIsAudioPlaying(!isAudioPlaying)}
          isAudioPlaying={isAudioPlaying}
        />

        {/* ZONE 4: 12-COLUMN BRIEFING GRID */}
        <div className="max-w-7xl mx-auto px-6 pb-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT 8 COLUMNS: TOP STORIES */}
          <TopStoriesFeed
            stories={filteredStories}
            activeRole={user.role}
            onToggleBookmark={handleToggleBookmark}
            onSelectStory={(story) => setSelectedStory(story)}
          />

          {/* RIGHT 4 COLUMNS: RADAR, AUDIO BRIEF & SAVED READS */}
          <aside className="lg:col-span-4 flex flex-col gap-5">
            {/* CARD 1: BREAKING ALERT RADAR */}
            <SidebarRadar
              alerts={alerts}
              onSelectAlert={(_alert) => {
                setBreakingModalOpen(true);
              }}
            />

            {/* CARD 2: 60-SECOND EXECUTIVE AUDIO BRIEF */}
            <SidebarAudioBrief
              isPlaying={isAudioPlaying}
              onTogglePlay={() => setIsAudioPlaying(!isAudioPlaying)}
              activeStoryTitle="AI Infra, Claude 3.7 & Vector Database Trends"
            />

            {/* CARD 3: SAVED READING LIST */}
            <SidebarSavedList
              savedArticles={savedArticles}
              onRemoveBookmark={handleRemoveBookmark}
              onViewAll={() => setActiveTab('Following (Saved)')}
            />
          </aside>
        </div>
      </main>

      {/* EDITORIAL FOOTER */}
      <EditorialFooter />

      {/* MODALS */}
      <BreakingAlertModal
        isOpen={breakingModalOpen}
        onClose={() => setBreakingModalOpen(false)}
        alerts={alerts}
        onExplainWithGemini={handleExplainWithGemini}
      />

      <StoryDetailModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
        activeRole={user.role}
        onToggleBookmark={handleToggleBookmark}
      />
    </div>
  );
};
export default App;
