document.addEventListener('DOMContentLoaded', function() {
    console.log("[DEBUG] Script loaded successfully!");
    
    const ctx = document.getElementById('myChart');
    if (!ctx) {
      console.error("[ERROR] Canvas element not found!");
      return;
    }
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday'],
        datasets: [{
          label: 'Workout Minutes',
          data: [30, 45, 60],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    });
  });