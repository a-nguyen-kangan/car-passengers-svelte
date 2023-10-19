<script lang='ts'>
    import PeopleComp from "./PeopleComp.svelte";
    import { Car } from "$lib/car";

    let rego: string = 'STS-567';
    let colour: string  = 'red';
    let make: string = 'Ford';
    let model: string = 'Falcon';

    let peeps = [ 
        { id: 1, name: 'John', age: 30 },
        { id: 2, name: 'Jane', age: 40 },
        { id: 3, name: 'John', age: 20 },
        { id: 4, name: 'Jane', age: 25 },
    ]

    let addCarPromise: any;

    async function getAllPeople() {
        try {
            const response = await fetch('http://localhost:5024/people');
            const data = await response.json();
            peeps = data;
            console.log(data);
        } catch (err) {
            console.error(err);
            peeps = [];
        }
    }

    // async function getAllPeople2()
    let getAllPeople2 = async () => {
        const response = await fetch('http://localhost:5024/people')
                                .then(res => res.json())
                                .then(data => { peeps = data })
                                .catch(err => { console.error(err); peeps = [] });
    }

    function addCarHandler() {
        addCarPromise = addCar();
    }

    async function addCar() {
        let newCar: Car = new Car(rego, colour, make, model);
        console.log(JSON.stringify(newCar));

        const response = await fetch('http://localhost:5024/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCar)
        })
        .then(res => res.text())
        .then(data => { console.log(data); return data })
        .catch(err => { console.error(err); return err });

        return response;
    }


</script>
<h1>Car Passengers App</h1>

<button on:click={getAllPeople2}>Get All People</button>

<PeopleComp people={peeps}/>

<hr>

<input type="text" bind:value={rego} placeholder="rego" />
<input type="text" bind:value={colour} placeholder="colour" />
<input type="text" bind:value={make} placeholder="make" />
<input type="text" bind:value={model} placeholder="model" />
<button on:click={addCarHandler}>Add Car</button>

{#if addCarPromise}
    {#await addCarPromise}
        <p>Adding car...</p>
    {:then data}
        <p>Car added: {data}</p>
    {:catch error}
        <p style="color: red;">{error.message}</p>
    {/await}
{/if}