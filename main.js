document.getElementById("plot-btn").addEventListener("click", function () {
  const u = parseFloat(document.getElementById("initial-velocity").value);
  const a = parseFloat(document.getElementById("acceleration").value);
  const tMax = parseFloat(document.getElementById("time").value);
  const graphType = document.getElementById("graph-type").value;

  let labels = [];
  let positions = [];
  let velocities = [];
  let accelerations = [];

  for (let t = 0; t <= tMax; t++) {
    labels.push(t.toString());
    positions.push(getPosition(u, a, t));
    velocities.push(getVelocity(u, a, t));
    accelerations.push(a);
  }

  let data, label;
  if (graphType === "position") {
    data = positions;
    label = "Position (m)";
  } else if (graphType === "velocity") {
    data = velocities;
    label = "Velocity (m/s)";
  } else {
    data = accelerations;
    label = "Acceleration (m/s²)";
  }

  plotLineGraph("main-graph", labels, data, label);
});

function downloadCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  // Paint a white background for PNG export
  const ctx = canvas.getContext('2d');
  ctx.save();
  ctx.globalCompositeOperation = 'destination-over';
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  const link = document.createElement("a");
  link.download = canvasId + ".png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
