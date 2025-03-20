export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  mood?: string;
  tags?: string[];
}

export type JournalStore = {
  entries: JournalEntry[];
};
