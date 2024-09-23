<template>
  <div class="temperature">
    <h1>Temperature and Humidity Sensor Data</h1>
    <p v-if="loading" class="status">Loading sensor data...</p>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="temperature" class="temperature-data">
      Current Temperature: <span>{{ temperature }}°C</span>
    </p>
    <p v-if="humidity" class="humidity-data">
      Current Humidity: <span>{{ humidity }}%</span>
    </p>
  </div>
</template>

<script>
import { doc, getDoc } from "firebase/firestore"; // Use Firestore functions
import { db } from "../../firebase.js"; 

export default {
  data() {
    return {
      temperature: null,
      humidity: null,
      loading: true,
      error: null,
      intervalId: null, // Store the interval ID
    };
  },
  methods: {
    async fetchSensorDataFromFirestore() {
      const sensorDocRef = doc(db, 'sensors', 'NodeMCU1');  // Reference to the specific document
      
      try {
        const docSnapshot = await getDoc(sensorDocRef);  // Fetch the document
        if (docSnapshot.exists()) {
          this.temperature = docSnapshot.data().temp;  // Adjust according to your data structure
          this.humidity = docSnapshot.data().humidity;  // Retrieve humidity field
        } else {
          this.error = "No sensor data found!";
        }
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    startDataRefresh() {
      this.intervalId = setInterval(() => {
        this.loading = true; // Set loading state before fetching
        this.fetchSensorDataFromFirestore(); // Fetch data every 2 seconds
      }, 2000);
    },
    stopDataRefresh() {
      clearInterval(this.intervalId); // Clear the interval when the component is destroyed
    }
  },
  mounted() {
    this.fetchSensorDataFromFirestore();  // Fetch data when the component mounts
    this.startDataRefresh(); // Start the interval for refreshing data
  },
  beforeDestroy() {
    this.stopDataRefresh(); // Stop refreshing when the component is destroyed
  }
};
</script>
