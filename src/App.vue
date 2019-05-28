<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
  background: #f4f5f6;
  min-height: 100vh;
  /* max-width: 100vw;
  min-width: 100vw; */
  line-height: 24px;
}
html, body, ul, li {
  margin: 0;
  padding: 0;
}
ul, li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #000000;
}
a:hover {
  color: #3879D9;
}
</style>
