export type UserRole = 'Software Engineer' | 'Product Manager' | 'Founder / Exec';

export type NewsCategory = 'For you' | 'Following (Saved)' | 'Agentic AI' | 'Cloud & Infra' | 'Product & Strategy';

export interface StoryImpact {
  role: UserRole;
  header: string;
  advice: string;
}

export interface NewsStory {
  id: string;
  title: string;
  publisher: string;
  timeAgo: string;
  category: NewsCategory;
  grounded: boolean;
  citationsCount: number;
  tldrBullets: string[];
  impactByRole: Record<UserRole, string>;
  isBreaking?: boolean;
  url: string;
  saved?: boolean;
}

export interface RadarAlert {
  id: string;
  tag: string;
  tagType: 'critical' | 'hardware' | 'framework' | 'research';
  timeAgo: string;
  headline: string;
  impactScore: string;
}

export interface SavedArticle {
  id: string;
  title: string;
  source: string;
  readTime: string;
  savedAt: string;
  url: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  avatarLetter: string;
  ssoActive: boolean;
}
