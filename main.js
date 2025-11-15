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
          .filter((v) => v.length > 0)
          .map(Number)
      : [];

  let labels = [];
  let positions = [0];      // s_0 = 0
  let velocities = [u];     // v_0 = u
  let accelerations = [];   // variable

  for (let t = 0; t <= tMax; t++) {
    // Determine current acceleration
    let currentA =
      accelArray.length > 0
        ? accelArray[Math.min(t, accelArray.length - 1)]
        : a;
    accelerations[t] = currentA;

    if (t === 0) {
      labels.push("0");
      continue; // positions[0] and velocities[0] already set
    }

    velocities[t] = velocities[t - 1] + currentA;
    // s_n = s_(n-1) + v_(n-1) + 0.5*a_n
    positions[t] = positions[t - 1] + velocities[t - 1] + 0.5 * currentA;
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
  // White background for PNG
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
