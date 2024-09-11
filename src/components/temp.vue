<template>
  <div class="temperature">
    <h1>Temperature Sensor Data</h1>
    <p v-if="loading" class="status">Loading temperature data...</p>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="temperature" class="temperature-data">
      Current Temperature: <span>{{ temperature }}°C</span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      temperature: null,
      loading: true,
      error: null,
    };
  },
  methods: {
    fetchDummyTemperature() {
      this.loading = true;
      setTimeout(() => {
        this.temperature = (Math.random() * 10 + 20).toFixed(2);
        this.loading = false;
      }, 1000);
    }
  },
  mounted() {
    this.fetchDummyTemperature();
    setInterval(this.fetchDummyTemperature, 5000);
  }
};
</script>

<style scoped>
.temperature {
  text-align: center;
  margin: 2rem auto; /* Center the component with top and bottom margins */
  padding: 2rem;
  max-width: 600px; /* Limit the maximum width for better readability */
  border-radius: 8px; /* Rounded corners for a softer look */
  background-color: #f9f9f9; /* Light background for contrast */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

h1 {
  font-size: 2.5rem;
  color: #333; /* Darker color for better readability */
  margin-bottom: 1.5rem;
}

.status {
  color: #007bff; /* Blue color for loading status */
  font-size: 1.2rem;
}

.error {
  color: #dc3545; /* Red color for error messages */
  font-size: 1.2rem;
}

.temperature-data {
  font-size: 1.5rem;
  color: #333; /* Dark color for temperature data */
}

.temperature-data span {
  font-weight: bold;
  font-size: 1.75rem; /* Larger font size for temperature value */
  color: #ff5722; /* Accent color for temperature value */
}
</style>
