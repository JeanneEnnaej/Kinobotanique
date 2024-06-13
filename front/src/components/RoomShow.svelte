<script>
  import { onMount } from "svelte";
  import { Link } from "svelte-routing";

  export let id
  let room = {}

  async function fetchRoom(id) {
    const response = await fetch(`http://localhost:5000/rooms/${id}`);
    room = await response.json();
  }

  onMount(() => {
    fetchRoom(id);
  });

</script>

<div class="flex flex-col">
  <h2 class="font-bold text-center mb-2">{room.roomName}</h2>
  
  <Link to={`/`} class="bg-orange-300 rounded-lg px-2 py-1 w-fit self-center text-white mt-2">Retour à la liste des salles</Link>

</div>