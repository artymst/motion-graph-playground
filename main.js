document.getElementById("plot-btn").addEventListener("click", function () {
  const u = parseFloat(document.getElementById("initial-velocity").value);
  const a = parseFloat(document.getElementById("acceleration").value);
  const tMax = parseInt(document.getElementById("time").value);
  const graphType = document.getElementById("graph-type").value;
  const accelInput = document.getElementById("custom-acceleration").value.trim();

  let accelArray =
    accelInput.length > 0
      ? accelInput
          .split(/[,\s;]+/)
          .filter((v) => v.length > 0 && !isNaN(Number(v)))
          .map(Number)
      : [];

  let labels = [], positions = [], velocities = [], accelerations = [];
  positions.push(0);
  velocities.push(u);

  for (let t = 0; t <= tMax; t++) {
    // Pick acceleration for this step
    let thisA = accelArray.length > 0
      ? accelArray[Math.min(t, accelArray.length - 1)]
      : a;
    accelerations.push(thisA);

    if (t === 0) {
      labels.push("0");
      continue;
    }
    // Step integration: use value from previous time step
    velocities[t] = velocities[t - 1] + thisA;
    positions[t] = positions[t - 1] + velocities[t - 1] + 0.5 * thisA;
    labels.push(t.toString());
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
