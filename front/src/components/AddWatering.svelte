<script>
  import userIcon from "@assets/icons/user.svg";
  import dateIcon from "@assets/icons/date.svg";

  export let roomId;
  let wateringUser = '';
  let wateringDate = '';
  let showModal = false;

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
      // fetchWaterings(roomId);
      closeModal();
    }
  }

  function closeModal() {
    showModal = false;
  }

  function openModal() {
    showModal = true;
  }
</script>

<div>
  <button on:click={openModal} class="bg-purple-500 rounded-lg px-2 py-1 w-fit self-center text-white mt-2">+ Ajouter un arrosage</button>
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