function plotLineGraph(canvasId, labels, data, label) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  
  // Destroy previous chart instance (prevent duplicates)
  if (window[canvasId + "Chart"]) {
    window[canvasId + "Chart"].destroy();
  }
  
  window[canvasId + "Chart"] = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        fill: false,
        borderColor: "blue",
        tension: 0.1
      }]
    },
    options: {
      responsive: false,
      plugins: {
        legend: { display: true }
      },
      scales: {
        x: { title: { display: true, text: "Time (s)" } },
        y: { title: { display: true, text: label } }
      }
    }
  });
}
