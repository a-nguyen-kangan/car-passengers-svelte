<script lang='ts'>
    import type { Person } from '$lib/person';

    export let people: Person[] = []; 

    $:  if(people.length > 0) {
            for(let i = 0; i < people.length; i++) {
                people[i].age = people[i].age + 5;
            }
        }

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