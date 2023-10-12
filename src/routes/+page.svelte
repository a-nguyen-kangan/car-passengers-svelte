<script lang='ts'>
    import PeopleComp from "./PeopleComp.svelte";

    let peeps = [ 
        { id: 1, name: 'John', age: 30 },
        { id: 2, name: 'Jane', age: 40 },
        { id: 3, name: 'John', age: 20 },
        { id: 4, name: 'Jane', age: 25 },
    ]

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

</script>
<h1>Car Passengers App</h1>

<button on:click={getAllPeople2}>Get All People</button>

<PeopleComp people={peeps}/>
