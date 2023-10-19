<script lang='ts'>
    import type { Person } from '$lib/person';

    export let people: Person[] = []; 

</script>

{#if people.length > 0}
    <ul>
    {#each people as person}
        <li>{person.name} {person.age}</li>
    {/each}
    </ul>
{:else}
    <p>No people found</p>
{/if}