<script>
  import { Footer, Rooms } from "./components";
  import kinobotaniKLogo from "@assets/images/kinobotanik.svg";
  import destockImage from "@assets/images/fond.jpg";

</script>

<main>
  <div class="flex justify-center pt-4 pb-2">
    <img class="w-64 md:w-1/2 h-auto" src={kinobotaniKLogo} alt="Kinobotanique">
  </div>
  <img class="w-full max-h-40 md:max-h-96 object-cover" src={destockImage} alt="plants">

  <Rooms /> 
  <Footer />
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
