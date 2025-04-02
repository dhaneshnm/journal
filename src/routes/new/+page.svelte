<script lang="ts">
  import type { PageData } from './$types';
  
  const { data } = $props<{ data: PageData }>();
  
  let title = $state('');
  let content =   $state('');
  let moodId =   $state('');
  let tagsInput =  $state('');

  let wordCount = $derived( content ? content.split(/\s+/).filter(word => word.length > 0).length : 0)
  

</script>

<svelte:head>
  <title>New Journal Entry</title>
</svelte:head>

<section>
  <h2>Create New Journal Entry</h2>
  
  <form  method="POST">
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
      {wordCount} words.
      <textarea 
        id="content"
        name="content"
        bind:value={content} 
        placeholder="Write your thoughts here..."
        required
      ></textarea>
    </div>
    
    <div>
      <label for="moodId">Mood</label>
      <select id="moodId" name="moodId" bind:value={moodId} required>
        <option value="">Select mood</option>
        {#each data.moods as mood}
          <option value={mood.id}>{mood.name}</option>
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
      <button type="submit">Save Entry</button>
      <a href="/"><button type="button" class="secondary">Cancel</button></a>
    </div>
  </form>
</section>