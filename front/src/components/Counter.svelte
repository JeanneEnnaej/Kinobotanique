<script>
  let count = 0;
  const increment = () => {
    count += 1;
  };
</script>

<button
  class="p-3 border border-orange-600 rounded-lg hover:border-orange-200"
  on:click={increment}
>
  count is {count}
</button>
