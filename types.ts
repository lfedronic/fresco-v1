export enum ContentType {
  ARTICLE = 'article',
  VIDEO = 'video',
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  handle: string;
}

export interface FeedItem {
  id: string;
  type: ContentType;
  url: string;
  title: string;
  publicationName: string; // For articles: "The Atlantic", For YT: "Channel Name"
  thumbnailUrl: string;
  description?: string;
  consumedBy: User;
  timestamp: string; // ISO date string
  readTimeOrDuration?: string; // "5 min read" or "12:30"
}

export type GroupedFeed = {
  weekLabel: string;
  items: FeedItem[];
};