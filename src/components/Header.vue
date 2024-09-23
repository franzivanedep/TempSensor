import Temp
<template>
  <header class="header">
    <div class="logo">
      <img src="" alt="Logo" />
      <h1>Website Title</h1>
    </div>
    <nav class="nav">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="/temperature">temperataure</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: white;
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
</style>
