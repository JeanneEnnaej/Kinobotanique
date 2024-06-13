<script>
  import { onMount } from 'svelte';
  import Waterings from './Waterings.svelte';
  import { Link } from 'svelte-routing';

  let rooms = [];
  let roomName = ''

  async function fetchRooms() {
    const response = await fetch('http://localhost:5000/rooms');
    rooms = await response.json();
  }

  async function addRoom() {
    const response = await fetch('http://localhost:5000/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ roomName })
    })

    if (response.ok) {
      await fetchRooms()
      roomName = ''
    } else {
      const error = await response.json()
      console.error('Error adding room:', error.message)
    }
  }


  onMount(fetchRooms);
</script>

<main>
  <div>
    <div class="flex justify-center mt-3">
      <form on:submit|preventDefault={addRoom}>
        <input type="text" bind:value={roomName} placeholder="Nom de la salle" class="border-2 border-green-500 rounded-lg px-2 py-1" />
        <button type="submit" class="bg-green-500 border-2 border-green-500 rounded-lg px-2 py-1 w-fit text-white">+ Ajouter une salle</button>
      </form>
    </div>
    <ul class="flex flex-wrap gap-5 justify-center p-5">
      {#each rooms as room}
        <div class="rounded-lg p-5 bg-gray-800 bg-opacity-40 w-full md:max-w-72">
          <Waterings roomId={room.roomId} roomName={room.roomName} />
          <Link to={`/rooms/${room.roomId}`}>Voir les détails</Link>

        </div>
      {/each}
    </ul>
  </div>

</main>
