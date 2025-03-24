import { writable } from 'svelte/store';
import type { JournalEntry, JournalStore } from './types';
// Initialize from localStorage if available
const storedJournal = typeof localStorage !== 'undefined' 
  ? JSON.parse(localStorage.getItem('journal') || '{"entries":[]}') 
  : { entries: [] };

export const journal = writable<JournalStore>(storedJournal);

// Subscribe to changes and update localStorage
if (typeof localStorage !== 'undefined') {
  journal.subscribe(value => {
    localStorage.setItem('journal', JSON.stringify(value));
  });
}


export const addEntry = (entry: Omit<JournalEntry, 'id'>) => {
  const id = crypto.randomUUID();
  journal.update(store => ({
    entries: [{ ...entry, id }, ...store.entries]
  }));
  return id;
};

export const updateEntry = (entry: JournalEntry) => {
  journal.update(store => ({
    entries: store.entries.map(e => e.id === entry.id ? entry : e)
  }));
};

export const deleteEntry = (id: string) => {
  journal.update(store => ({
    entries: store.entries.filter(e => e.id !== id)
  }));
};

export const getTagsMap = () => {
  let tagMap: { [key: string]: JournalEntry[] } = {};
  
  journal.subscribe(store => {
    // Collect all tags from all entries and map them to their entries
    store.entries.forEach(entry => {
      if (entry.tags && Array.isArray(entry.tags)) {
        entry.tags.forEach(tag => {
          if (!tagMap[tag]) {
            tagMap[tag] = [];
          }
          tagMap[tag].push(entry);
        });
      }
    });
  })();
  
  return tagMap;
};

export const getAllTags = () => {
  let allTags: string[] = [];
  
  journal.subscribe(store => {
    // Collect all tags from all entries
    store.entries.forEach(entry => {
      if (entry.tags && Array.isArray(entry.tags)) {
        entry.tags.forEach(tag => {
          if (!allTags.includes(tag)) {
            allTags.push(tag);
          }
        });
      }
    });
  })();
  
  return allTags.sort();
};
