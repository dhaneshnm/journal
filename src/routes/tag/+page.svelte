<script lang="ts">
    import { getAllTags, getTagsMap } from '$lib/store';
    import { onMount } from 'svelte';

    let tagsMap = getTagsMap();
    let tags: string[] = getAllTags();
    
    onMount(() => {
        // Refresh entry from store
        tags = getAllTags();
    
    });

</script>
<section>
    <h2>Tags</h2>
    <div class="entry-list">
        {#if tags}
            {#each tags as tag}
                <div class="card entry-card">
                    <h3>{tag}</h3>
                    {#each tagsMap[tag] as entry}
                        <span>
                            <a href="/entry/{entry.id}" target="_blank">{entry.title}</a>
                        </span>
                    {/each}
                </div>
            {/each}
        {/if}
    </div>
</section>