// client/src/types/changelog.ts

export type LogBlock = 
  | { type: 'title'; content: string }
  | { type: 'text'; content: string }
  | { type: 'list'; content: string[] }
  | { type: 'feature'; title: string; desc: string; icon?: string; tag?: string }
  | { type: 'warning'; title: string; content: string }
  | { type: 'action'; label: string; module: string };

export interface Changelog {
  version: string;
  date: string;
  isMajor: boolean;
  blocks: LogBlock[];
}