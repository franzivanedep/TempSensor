<template>
  <div>
    <h2>Temperature and Humidity Chart</h2>
    <canvas ref="myChartRef" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.js';

Chart.register(...registerables);

export default {
  name: 'ChartComponent',
  setup() {
    const myChartRef = ref(null);
    const temperatureData = ref([]);
    const humidityData = ref([]);
    const labels = ref([]);
    let updateCount = 0;
    let chartInstance = null;

    const fetchSensorData = async () => {
      const sensorDocRef = doc(db, 'sensors', 'NodeMCU1');

      try {
        const docSnapshot = await getDoc(sensorDocRef);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          console.log('Fetched data:', data);

          // Push the data into arrays
          temperatureData.value.push(data.temp);
          humidityData.value.push(data.humidity);
          labels.value.push(++updateCount);

          // Keep only the last 10 data points
          if (temperatureData.value.length > 10) {
            temperatureData.value.shift();
            humidityData.value.shift();
            labels.value.shift();
          }

          console.log('Temperature Data:', temperatureData.value);
          console.log('Humidity Data:', humidityData.value);
          console.log('Labels:', labels.value);

          // Update the chart data
          if (chartInstance) {
            chartInstance.data.labels = [...labels.value]; // Use spread operator
            chartInstance.data.datasets[0].data = [...temperatureData.value]; // Use spread operator
            chartInstance.data.datasets[1].data = [...humidityData.value]; // Use spread operator
            chartInstance.update();
          }
        } else {
          console.warn('Document does not exist');
        }
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    const createChart = () => {
      const ctx = myChartRef.value.getContext('2d');
      chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [...labels.value],
          datasets: [
            {
              label: 'Temperature (°C)',
              data: [...temperatureData.value],
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: true,
            },
            {
              label: 'Humidity (%)',
              data: [...humidityData.value],
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    onMounted(() => {
      createChart();
      fetchSensorData();

      // Update chart every 1 second
      const intervalId = setInterval(() => {
        fetchSensorData();
      }, 1000);

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    });

    return {
      myChartRef,
    };
  },
};
</script>

<style scoped>
canvas {
  max-width: 600px;
  margin: 0 auto;
}
</style>
