<script lang="ts">
  import type { PageData } from './$types';
  
  import { page } from '$app/stores';



  

  export let data: PageData;
  const id = $page.params.id;
  let entry = data.entry;
  
  let title = entry?.title;
  let content = entry?.content;
  let mood = entry?.mood.id;
  let tagsInput = '';

 
  
  const moods = data.moods;
  
  

</script>

<svelte:head>
  <title>Edit Journal Entry</title>
</svelte:head>

{#if entry}
  <section>
    <h2>Edit Journal Entry</h2>
    
    <form method="POST">
      <div>
        <label for="title">Title</label>
        <input 
          id="title"
          name="title"
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
          name="content"
          bind:value={content} 
          placeholder="Write your thoughts here..."
          required
        ></textarea>
      </div>
      
      <div>
        <label for="moodId">Mood (optional)</label>
        <select id="moodId" name="moodId" value={mood} >
          <option value="">Select mood</option>
          {#each moods as moodOption}
            <option value={moodOption.id} >{moodOption.name}</option>
          {/each}
        </select>
      </div>
      
      <div>
        <label for="tags">Tags (comma separated, optional)</label>
        <input 
          id="tags"
          name="tags"
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
