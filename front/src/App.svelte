<script>
  import svelteLogo from "@assets/svelte.svg";
  import { Counter } from "@components";
</script>

<main>
  <div>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="m-auto logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1 class="mb-10 text-4xl">Svelte Hackathon</h1>

  <Counter />
</main>

<style lang="scss">
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }

  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
</style>
