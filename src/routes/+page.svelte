<script lang="ts">

  import { onMount } from 'svelte';
  import type { PageData } from './$types'


  export let data: PageData;
  

  
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
  
  {#if mounted && data.feed.length === 0}
    <div class="empty-state">
      <h2>No Journal Entries Yet</h2>
      <p>Start documenting your thoughts and experiences today.</p>
      <a href="/new"><button>Create Your First Entry</button></a>
    </div>
  {:else}
    <div class="entry-list">
      {#each data.feed as entry}
        <div class="card entry-card">
          <div class="content">
            <h3><a href="/entry/{entry.id}">{entry.title}</a></h3>
            <p>{entry.content && entry.content.length > 150 ? entry.content.substring(0, 150) + '...' : entry.content}</p>
            
            {#if entry.tags && entry.tags.length > 0}
              <div class="tags">
                {#each entry.tags as tag}
                  <span class="tag">{tag.tag.name}</span>
                {/each}
              </div>
            {/if}
          </div>
          
          <div class="meta">
            <span>{new Date(entry.updatedAt).toLocaleDateString()}</span>
            {#if entry.moodId}
              <span class="mood">{entry.mood.name}</span>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</section>
