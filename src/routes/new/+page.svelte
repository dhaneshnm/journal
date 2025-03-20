<script lang="ts">
  import { addEntry } from '$lib/store';
  import { goto } from '$app/navigation';
  
  let title = '';
  let content = '';
  let mood = '';
  let tagsInput = '';
  
  const moods = ['Happy', 'Sad', 'Anxious', 'Excited', 'Calm', 'Frustrated', 'Grateful'];
  
  function handleSubmit() {
    if (!title || !content) return;
    
    const tags = tagsInput.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    const newEntry = {
      title,
      content,
      date: new Date().toISOString(),
      mood: mood || undefined,
      tags: tags.length > 0 ? tags : undefined
    };
    
    const id = addEntry(newEntry);
    goto(`/entry/${id}`);
  }
</script>

<svelte:head>
  <title>New Journal Entry</title>
</svelte:head>

<section>
  <h2>Create New Journal Entry</h2>
  
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
      <button type="submit">Save Entry</button>
      <a href="/"><button type="button" class="secondary">Cancel</button></a>
    </div>
  </form>
</section>
