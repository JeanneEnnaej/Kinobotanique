<script>
  import { DateTime } from 'luxon';
  import { onMount } from 'svelte';
  import userIcon from "@assets/icons/user.svg";
  import dateIcon from "@assets/icons/date.svg";

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
  <h2 class="font-bold text-center">{roomName}</h2>
  <ul>
    {#each waterings as watering}
      <li class="flex">
        <img class="w-3 mr-2" src={userIcon} alt="user icon">
        {watering.wateringUser} - <img class="w-3 mx-2" src={dateIcon} alt="date icon">: {formatDateTime(watering.wateringDate)}
      </li>
    {/each}
  </ul>
</div>
