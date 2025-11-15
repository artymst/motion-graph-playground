// Example using Chart.js
function plotGraph(labels, data, chartType, canvasId) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  new Chart(ctx, {
    type: chartType,
    data: {
      labels: labels,
      datasets: [{ label: 'Value', data: data }]
    },
    options: {}
  });
}
