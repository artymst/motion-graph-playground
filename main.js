document.getElementById("plot-btn").addEventListener("click", function () {
  const u = parseFloat(document.getElementById("initial-velocity").value);
  const a = parseFloat(document.getElementById("acceleration").value);
  const tMax = parseFloat(document.getElementById("time").value);

  let labels = [];
  let positions = [];
  let velocities = [];

  for (let t = 0; t <= tMax; t++) {
    labels.push(t.toString());
    positions.push(getPosition(u, a, t));
    velocities.push(getVelocity(u, a, t));
  }

  plotLineGraph("position-graph", labels, positions, "Position (m)");
  plotLineGraph("velocity-graph", labels, velocities, "Velocity (m/s)");
});

function downloadCanvas(canvasId) {
  const link = document.createElement("a");
  link.download = canvasId + ".png";
  link.href = document.getElementById(canvasId).toDataURL("image/png");
  link.click();
}
