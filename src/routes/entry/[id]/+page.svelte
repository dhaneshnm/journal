<script lang="ts">
  import { page } from '$app/stores';
  import { journal, deleteEntry } from '$lib/store';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  const id = $page.params.id;
  let entry = $journal.entries.find(e => e.id === id);
  
  onMount(() => {
    // Refresh entry from store
    entry = $journal.entries.find(e => e.id === id);
  });
  
  function handleDelete() {
    if (confirm('Are you sure you want to delete this entry?')) {
      deleteEntry(id);
      goto('/');
    }
  }
</script>

<svelte:head>
  <title>{entry?.title || 'Journal Entry'}</title>
</svelte:head>

{#if entry}
  <article>
    <header>
      <h2>{entry.title}</h2>
      <div class="meta">
        <time datetime={entry.date}>{new Date(entry.date).toLocaleString()}</time>
        {#if entry.mood}
          <span class="mood">Mood: {entry.mood}</span>
        {/if}
      </div>
      
      {#if entry.tags && entry.tags.length > 0}
        <div class="tags">
          {#each entry.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
      {/if}
    </header>
    
    <div class="content">
      <p>{entry.content}</p>
    </div>
    
    <div class="button-group">
      <a href="/entry/{id}/edit"><button>Edit</button></a>
      <button class="danger" on:click={handleDelete}>Delete</button>
      <a href="/"><button class="secondary">Back</button></a>
    </div>
  </article>
{:else}
  <div class="empty-state">
    <h2>Entry Not Found</h2>
    <p>The journal entry you're looking for doesn't exist.</p>
    <a href="/"><button>Back to Home</button></a>
  </div>
{/if}

<style>
  article {
    background-color: var(--card-bg);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 2rem;
  }
  
  header {
    margin-bottom: 2rem;
  }
  
  .meta {
    margin: 1rem;
  }

  .tag {
    margin: 1rem;
  }
  
  .content {
    margin: 2rem;
    white-space: pre-line;
  }
  
  time {
    margin-right: 1rem;
  }
</style>
