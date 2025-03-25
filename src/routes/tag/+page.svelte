<script lang="ts">
    import type { PageData } from './$types'
    export let data: PageData;
</script>
<section>
    <h2>Tags</h2>
    <div class="entry-list">
        {#if data.tags.length > 0 }
            {#each data.tags as tag}
                <div class="card entry-card">
                    <h3>{tag.name}</h3>
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