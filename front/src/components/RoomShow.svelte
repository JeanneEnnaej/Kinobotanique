<script>
  import { onMount } from "svelte";

  export let id
  let room = {}

  async function fetchRoom(id) {
    const response = await fetch(`http://localhost:5000/rooms/${id}`);
    room = await response.json();
  }

  onMount(() => {
    fetchRoom(id);
  });

  console.log(room)
</script>

<div>
  <h2 class="font-bold text-center mb-2">{room.roomName}</h2>
</div>