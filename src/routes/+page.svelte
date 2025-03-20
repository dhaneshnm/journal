<script lang="ts">
  import { journal } from '$lib/store';
  import { onMount } from 'svelte';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<svelte:head>
  <title>Journal App</title>
</svelte:head>

<section>
  <h2>My Journal Entries</h2>
  
  {#if mounted && $journal.entries.length === 0}
    <div class="empty-state">
      <h2>No Journal Entries Yet</h2>
      <p>Start documenting your thoughts and experiences today.</p>
      <a href="/new"><button>Create Your First Entry</button></a>
    </div>
  {:else}
    <div class="entry-list">
      {#each $journal.entries as entry}
        <div class="card entry-card">
          <div class="content">
            <h3><a href="/entry/{entry.id}">{entry.title}</a></h3>
            <p>{entry.content.length > 150 ? entry.content.substring(0, 150) + '...' : entry.content}</p>
            
            {#if entry.tags && entry.tags.length > 0}
              <div class="tags">
                {#each entry.tags as tag}
                  <span class="tag">{tag}</span>
                {/each}
              </div>
            {/if}
          </div>
          
          <div class="meta">
            <span>{new Date(entry.date).toLocaleDateString()}</span>
            {#if entry.mood}
              <span class="mood">{entry.mood}</span>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</section>
