// Firebase Configuration (Replace with your own Firebase credentials)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Fetching Liters Per Day
  const litersPerDayElem = document.getElementById('liters-per-day');
  
  firebase.database().ref('waterUsage').on('value', (snapshot) => {
    const data = snapshot.val();
    litersPerDayElem.textContent = data.litersPerDay;
    // You can also update the chart here
  });
  
  // Control Relay Buttons
  document.getElementById('relay1-on').addEventListener('click', () => {
    // Turn Relay 1 ON
    firebase.database().ref('control/relay1').set(true);
  });
  
  document.getElementById('relay1-off').addEventListener('click', () => {
    // Turn Relay 1 OFF
    firebase.database().ref('control/relay1').set(false);
  });
  
  document.getElementById('relay2-on').addEventListener('click', () => {
    // Turn Relay 2 ON
    firebase.database().ref('control/relay2').set(true);
  });
  
  document.getElementById('relay2-off').addEventListener('click', () => {
    // Turn Relay 2 OFF
    firebase.database().ref('control/relay2').set(false);
  });
  
  // Chart.js for Analytics (Display Water Usage Graph)
  const ctx = document.getElementById('water-usage-chart').getContext('2d');
  const waterUsageChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],  // Time or dates
      datasets: [{
        label: 'Liters Per Day',
        data: [],  // Data from Firebase
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        borderColor: '#3498db',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  
  // Example to update chart data
  firebase.database().ref('waterUsage/dailyData').on('value', (snapshot) => {
    const dailyData = snapshot.val();
    // Update chart labels and data
    waterUsageChart.data.labels = dailyData.dates;
    waterUsageChart.data.datasets[0].data = dailyData.values;
    waterUsageChart.update();
  });
  