<script>
  import { DateTime } from 'luxon';
  import { onMount } from 'svelte';
  import userIcon from "@assets/icons/user.svg";
  import dateIcon from "@assets/icons/date.svg";
  import trashIcon from "@assets/icons/trash.svg";

  import { createEventDispatcher } from 'svelte';

  export let roomId;
  export let roomName;
  const dispatch = createEventDispatcher();

  let waterings = [];
  let wateringUser = '';
  let wateringDate = '';
  let showModal = false;
  let daysSinceLastWatering = 0;

  async function fetchWaterings(roomId) {
    const response = await fetch(`http://localhost:5000/rooms/${roomId}/waterings`);
    waterings = await response.json();
    sortWaterings(); 
    calculateDaysSinceLastWatering();
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

  async function deleteWatering(id) {
    console.log(id)
    const response = await fetch(`http://localhost:5000/waterings/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchWaterings(roomId);
    }
  }

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  function formatDateTime(dateTimeStr) {
    return DateTime.fromISO(dateTimeStr).setLocale('fr').toFormat('d MMMM');
  }

  function sortWaterings() {
    waterings = waterings.sort((a, b) => Date.parse(a.wateringDate) - Date.parse(b.wateringDate)).slice(-3);
  }

  function calculateDaysSinceLastWatering() {
    if (waterings.length > 0) {
      const lastWateringDate = DateTime.fromISO(waterings[waterings.length - 1].wateringDate);
      const now = DateTime.now();
      daysSinceLastWatering = Math.floor(now.diff(lastWateringDate, 'days').days);
    } else {
      daysSinceLastWatering = 0;
    }
  }

  function getDayText(days) {
    return days === 1 ? 'jour' : 'jours';
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

          <button on:click={() => deleteWatering(watering.wateringId)} class="ml-2">
            <img class="w-3" src={trashIcon} alt="delete icon">
          </button>
        </li>
      {/each}
    </ul>
    {#if daysSinceLastWatering === 0}
    <p class="text-center mb-4">Les plantes ont déjà été arrosées aujourd'hui</p>
  {:else}
    <p class="text-center mb-4">Dernier arrosage il y a {daysSinceLastWatering} {getDayText(daysSinceLastWatering)}</p>
  {/if}
  {:else}
    <p class="text-center mb-4">Les plantes de cette salle n'ont pas encore été arrosées</p>
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
          <div class="flex justify-around mt-4">
            <button type="submit" class="bg-green-500 rounded-lg px-3 py-1 w-fit text-white">Ajouter</button>
            <button type="button" on:click={closeModal} class="bg-orange-300 rounded-lg px-3 py-1 w-fit text-white">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  {/if}
</div>
