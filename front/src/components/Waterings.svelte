<script>
  import { DateTime } from 'luxon';
  import { onMount } from 'svelte';

  export let roomId;
  export let roomName;

  let waterings = [];

  async function fetchWaterings(roomId) {
    const response = await fetch(`http://localhost:5000/rooms/${roomId}/waterings`);
    waterings = await response.json();
    console.log(waterings)
  }

  onMount(() => {
    fetchWaterings(roomId);
});

  function formatDateTime(dateTimeStr) {
    return DateTime.fromISO(dateTimeStr).toFormat('yyyy-MM-dd');
  }
</script>

<div>
  <h2>{roomName}</h2>
  <ul>
    {#each waterings as watering}
      <li>
        Utilisateur: {watering.wateringUser} - Date: {formatDateTime(watering.wateringDate)}
      </li>
    {/each}
  </ul>
</div>
