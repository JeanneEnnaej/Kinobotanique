<script>
  import { onMount } from 'svelte';
  import Waterings from './Waterings.svelte';
  import doorIcon from "@assets/icons/door.svg";

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
        <input type="text" bind:value={roomName} placeholder="Nom de la salle" class="border border-green-500" />
        <button type="submit">Ajouter une salle</button>
      </form>
    </div>
    <ul class="flex flex-wrap gap-5 justify-center p-5">
      {#each rooms as room}
        <div class="rounded-lg p-5 bg-green-600 bg-opacity-30">
          <Waterings roomId={room.roomId} roomName={room.roomName} />
        </div>
      {/each}
    </ul>
  </div>

</main>
