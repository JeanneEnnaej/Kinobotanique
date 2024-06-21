<script>
  import { onMount } from "svelte";
  import { Link } from "svelte-routing";
  import GetImage from "./GetImage.svelte";
  import shelf from "@assets/images/shelf.svg";

  export let id
  let room = {}
  let plants = []
  let name = ''
  let wateringFrequency = ''
  let photo = null
  let showModal = false;

  async function fetchRoom(id) {
    const response = await fetch(`http://localhost:5000/rooms/${id}`);
    room = await response.json();
  }

  async function fetchPlants(roomId) {
    const response = await fetch(`http://localhost:5000/rooms/${roomId}/plants`);
    plants = await response.json();
    
  }

  async function addPlant(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('roomId', id);
    formData.append('name', name);
    formData.append('wateringFrequency', wateringFrequency);
    formData.append('photo', photo);

    try {
      const response = await fetch('http://localhost:5000/plants', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        closeModal();
        fetchPlants(id)
        console.log('Plante ajoutée avec succès');
      } else {
        console.error('Échec de l\'ajout de la plante');
      }
    } catch (error) {
      console.error('Erreur lors de la requête', error);
    }
  }

  function handlePhotoChange(event) {
    const file = event.target.files[0];
    photo = file;
  }

  function closeModal() {
    showModal = false;
  }

  function openModal() {
    showModal = true;
  }

  onMount(() => {
    fetchRoom(id);
    fetchPlants(id)
  });

</script>

<div class="flex flex-col">
  <h2 class="font-bold text-center mb-2">{room.roomName}</h2>
  <div class="flex flex-wrap">
    {#each plants as plant}
      <div class="px-4 flex flex-col items-center">
        <h2>{plant.name}</h2>
        <p class="flex flex-col text-center">
          <span>Fréquence d'arrosage :</span>
          <span>{plant.wateringFrequency}</span>
        </p>
        <GetImage plantId={plant.plantId} />
        <img class="w-full" src={shelf} alt="shelf">
      </div>
    {/each}
  </div>
  <button on:click={openModal} class="bg-purple-500 rounded-lg px-2 py-1 w-fit self-center text-white mt-2">+ Ajouter une plante</button>
  {#if showModal}
    <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div class="bg-white p-6 rounded-lg shadow-xl">
        <h2 class="text-center mb-2">Ajouter un Arrosage</h2>
        <form on:submit|preventDefault={addPlant}>
          <div class="flex items-center mb-2">
            <label for="name">Name</label>
            <input id="name" type="text" bind:value={name} required class="border" />
          </div>
        
          <div class="flex items-center mb-2">
            <label for="wateringFrequency">Fréquence d'arrosage</label>
            <input id="wateringFrequency" type="text" bind:value={wateringFrequency} required class="border w-full" />
          </div>
        
          <div class="flex items-center mb-2">
            <label for="photo">Photo de la plante</label>
            <input id="photo" type="file" accept="image/*" on:change={handlePhotoChange} required class="border w-full" />
          </div>
        
          <div class="flex justify-around mt-4">
            <button type="submit" class="bg-green-500 rounded-lg px-3 py-1 w-fit text-white">Ajouter</button>
            <button type="button" on:click={closeModal} class="bg-orange-300 rounded-lg px-3 py-1 w-fit text-white">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  {/if}
  <Link to={`/`} class="bg-orange-300 rounded-lg px-2 py-1 w-fit self-center text-white mt-2">Retour à la liste des salles</Link>

</div>