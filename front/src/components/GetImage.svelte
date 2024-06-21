<script>
  import { onMount } from 'svelte'
  
  export let plantId;
  let imageUrl = ''
  console.log('toto')
  onMount(async () => {
    try {
      const response = await fetch(`http://localhost:5000/plants/${plantId}/image`)
      if (response.ok) {
        const blob = await response.blob()
        imageUrl = URL.createObjectURL(blob)
      } else {
        console.error('Failed to fetch image')
      }
    } catch (error) {
      console.error('Error fetching image', error)
    }
  })
</script>

<div>
  {#if imageUrl}
    <img src={imageUrl} alt="Plant" class="h-32 w-24 rounded-lg object-cover"/>
  {:else}
    <p>Loading image...</p>
  {/if}
</div>
