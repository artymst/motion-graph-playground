function plotLineGraph(canvasId, labels, data, label) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  if (window[canvasId + "Chart"]) window[canvasId + "Chart"].destroy();
  window[canvasId + "Chart"] = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        fill: false,
        borderColor: "#111", // black line
        backgroundColor: "#111", // black dots
        pointRadius: 3,
        pointHoverRadius: 4,
        tension: 0.1
      }]
    },
    options: {
      responsive: false,
      plugins: {
        legend: { display: false } // hide legend
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Time (s)",
            font: { family: "Verdana, Geneva, Tahoma, sans-serif", weight: "bold" },
            color: "#222"
          },
          ticks: {
            font: { family: "Verdana, Geneva, Tahoma, sans-serif" },
            color: "#222"
          }
        },
        y: {
          title: {
            display: true,
            text: label,
            font: { family: "Verdana, Geneva, Tahoma, sans-serif", weight: "bold" },
            color: "#222"
          },
          ticks: {
            font: { family: "Verdana, Geneva, Tahoma, sans-serif" },
            color: "#222"
          }
        }
      }
    }
  });
}
