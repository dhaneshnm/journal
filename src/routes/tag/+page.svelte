<script lang="ts">
    import type { PageData } from './$types';
    import { invalidateAll } from '$app/navigation';
    export let data: PageData;
    function handleDelete(id: number) {
        if (confirm('Are you sure you want to delete this tag?')) {
        fetch(`/tag/?id=${id}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
            _method: 'delete'
            })
        }).then(response => {
            if (response.ok) {
                invalidateAll();
            } else {
            console.error('Failed to delete entry');
            }
        }).catch(error => {
            console.error('Error:', error);
        });
        }
  }
</script>
<section>
    <h2>Tags</h2>
    <div class="entry-list">
        {#if data.tags.length > 0 }
            {#each data.tags as tag}
                <div class="card entry-card">
                    <h3>{tag.name}| <button class="danger" on:click={ () => handleDelete(tag.id) }>Delete</button></h3>
                    
                    {#each tag.journalEntries as entry}
                        <span>
                            <a href="/entry/{entry.journalEntry.id}" target="_blank">{entry.journalEntry.title}</a>
                        </span>
                    {/each}
                </div>
            {/each}
        {/if}
    </div>
</section>