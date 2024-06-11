<script>
  import { DateTime } from 'luxon';
  import { onMount } from 'svelte';
  import userIcon from "@assets/icons/user.svg";
  import dateIcon from "@assets/icons/date.svg";
  
  import { createEventDispatcher } from 'svelte';

  export let roomId;
  export let roomName;
  const dispatch = createEventDispatcher();

  let waterings = [];
  let wateringUser = '';
  let wateringDate = '';
  let showModal = false;

  async function fetchWaterings(roomId) {
    const response = await fetch(`http://localhost:5000/rooms/${roomId}/waterings`);
    waterings = await response.json();
  }

  onMount(() => {
    fetchWaterings(roomId);
  });

  async function addWatering() {
    const response = await fetch('http://localhost:5000/waterings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomId,
        wateringUser,
        wateringDate,
      }),
    });

    if (response.ok) {
      fetchWaterings(roomId);
      closeModal();
    }
  }

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  function formatDateTime(dateTimeStr) {
    return DateTime.fromISO(dateTimeStr).toFormat('yyyy-MM-dd');
  }
</script>

<div class="flex flex-col h-full justify-between">
  <h2 class="font-bold text-center mb-2">{roomName}</h2>
  {#if waterings.length > 0}
    <ul>
      {#each waterings as watering}
        <li class="flex items-center mb-2 justify-center">
          <img class="w-3 mr-2" src={userIcon} alt="user icon">
          {watering.wateringUser} - 
          <img class="w-3 mx-2" src={dateIcon} alt="date icon">
          {formatDateTime(watering.wateringDate)}
        </li>
      {/each}
    </ul>
  {:else}
    <p class="text-center my-2">Les plantes de cette salle n'ont jamais été arrosées</p>
  {/if}
  <button on:click={openModal} class="bg-orange-300 rounded-lg px-2 py-1 w-fit self-center text-white mt-2">+ Ajouter un arrosage</button>
  {#if showModal}
    <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div class="bg-white p-6 rounded-lg shadow-xl">
        <h2 class="text-center mb-2">Ajouter un Arrosage</h2>
        <form on:submit|preventDefault={addWatering}>
          <div class="flex items-center mb-2">
            <label for="user"><img class="w-3 mr-2" src={userIcon} alt="user icon"></label>
            <input id="user" type="text" bind:value={wateringUser} required class="border" />
          </div>

          <div class="flex items-center">
            <label for="date"><img class="w-3 mr-2" src={dateIcon} alt="date icon"></label>
            <input id="date" type="date" bind:value={wateringDate} required  class="border w-full"/>
          </div>
          <div class="flex justify-around mt-2">
            <button type="submit">Ajouter</button>
            <button type="button" on:click={closeModal}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  {/if}
</div>
