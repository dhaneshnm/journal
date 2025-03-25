<script lang="ts">
  import { page } from '$app/stores';
  import { deleteEntry } from '$lib/store';
  import { goto } from '$app/navigation';
 
  import type { PageData } from './$types'

  export let data: PageData;

  const id = $page.params.id;
  let entry = data.entry;
  
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
        <time datetime={entry.updatedAt.toDateString()}>{entry.updatedAt.toDateString()}</time>
        {#if entry.mood}
          <span class="mood">Mood: {entry.mood.name}</span>
        {/if}
      </div>
      
      {#if entry.tags && entry.tags.length > 0}
        <div class="tags">
          {#each entry.tags as tag}
            <span class="tag">{tag.tag.name}</span>
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


