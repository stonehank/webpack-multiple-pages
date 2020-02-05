<template>
    <div class="sample">
       <p>Vue</p>
        <p>Page</p>
    </div>
</template>

<script>
  export default {
    name:'app',
  }
</script>

<style lang="scss" scoped>
    $txtColor:red;
    .sample{
        color:$txtColor;
        display:flex;
        justify-content: flex-start;
    }
</style>
