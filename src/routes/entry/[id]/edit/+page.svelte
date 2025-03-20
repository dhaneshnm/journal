<script lang="ts">
  import { page } from '$app/stores';
  import { journal, updateEntry } from '$lib/store';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  const id = $page.params.id;
  let entry = $journal.entries.find(e => e.id === id);
  
  let title = '';
  let content = '';
  let mood = '';
  let tagsInput = '';
  
  const moods = ['Happy', 'Sad', 'Anxious', 'Excited', 'Calm', 'Frustrated', 'Grateful'];
  
  onMount(() => {
    // Refresh entry from store
    entry = $journal.entries.find(e => e.id === id);
    
    if (entry) {
      title = entry.title;
      content = entry.content;
      mood = entry.mood || '';
      tagsInput = entry.tags ? entry.tags.join(', ') : '';
    }
  });
  
  function handleSubmit() {
    if (!entry || !title || !content) return;
    
    const tags = tagsInput.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    const updatedEntry = {
      ...entry,
      title,
      content,
      mood: mood || undefined,
      tags: tags.length > 0 ? tags : undefined
    };
    
    updateEntry(updatedEntry);
    goto(`/entry/${id}`);
  }
</script>

<svelte:head>
  <title>Edit Journal Entry</title>
</svelte:head>

{#if entry}
  <section>
    <h2>Edit Journal Entry</h2>
    
    <form on:submit|preventDefault={handleSubmit}>
      <div>
        <label for="title">Title</label>
        <input 
          id="title"
          type="text" 
          bind:value={title} 
          placeholder="Give your entry a title"
          required
        />
      </div>
      
      <div>
        <label for="content">Content</label>
        <textarea 
          id="content"
          bind:value={content} 
          placeholder="Write your thoughts here..."
          required
        ></textarea>
      </div>
      
      <div>
        <label for="mood">Mood (optional)</label>
        <select id="mood" bind:value={mood}>
          <option value="">Select mood</option>
          {#each moods as moodOption}
            <option value={moodOption}>{moodOption}</option>
          {/each}
        </select>
      </div>
      
      <div>
        <label for="tags">Tags (comma separated, optional)</label>
        <input 
          id="tags"
          type="text" 
          bind:value={tagsInput} 
          placeholder="personal, work, ideas"
        />
      </div>
      
      <div class="button-group">
        <button type="submit">Update Entry</button>
        <a href="/entry/{id}"><button type="button" class="secondary">Cancel</button></a>
      </div>
    </form>
  </section>
{:else}
  <div class="empty-state">
    <h2>Entry Not Found</h2>
    <p>The journal entry you're trying to edit doesn't exist.</p>
    <a href="/"><button>Back to Home</button></a>
  </div>
{/if}
