<script>
  import { Rooms } from "./components";
  import kinobotaniqueLogo from "@assets/images/Kinobotanique.png";

</script>

<main>
  <img class="w-1/2" src={kinobotaniqueLogo} alt="Kinobotanique">
  <Rooms /> 
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
