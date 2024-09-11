<script setup>
import Header from './components/Header.vue';
</script>

<template>
  <Header />
  <router-view /> <!-- This renders the routed component -->
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: #333;
  padding: 10px 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 50px;
  margin-right: 10px;
}

.nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav ul li {
  margin-right: 20px;
}

.nav ul li a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.nav ul li a:hover {
  color: #ddd;
}

main {
  margin-top: 80px;
}
</style>
