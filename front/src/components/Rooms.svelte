<script>
  import { onMount } from 'svelte';
  import Waterings from './Waterings.svelte';

  let rooms = [];

  async function fetchRooms() {
    const response = await fetch('http://localhost:5000/rooms');
    rooms = await response.json();
  }

  onMount(fetchRooms);
</script>

<main>
  <ul class="flex flex-wrap gap-5 justify-center pt-5 md:pt-10">
    {#each rooms as room}
      <div class="rounded-lg p-5 bg-green-600 bg-opacity-30">
        <Waterings roomId={room.roomId} roomName={room.roomName} />
      </div>
    {/each}
  </ul>
</main>
