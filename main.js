let segments = [
  // Default segment, can be edited by user
  { tStart: 0, tEnd: 6, a: 0 }
];

// Render segment inputs
function renderSegmentsList() {
  const list = document.getElementById('segments-list');
  list.innerHTML = '';
  segments.forEach((seg, idx) => {
    list.innerHTML += `
      <div>
        <label>tStart:<input type="number" value="${seg.tStart}" min="0" max="99" onchange="updateSegment(${idx},'tStart',this.value)"></label>
        <label>tEnd:<input type="number" value="${seg.tEnd}" min="0" max="99" onchange="updateSegment(${idx},'tEnd',this.value)"></label>
        <label>a:<input type="number" value="${seg.a}" step="any" onchange="updateSegment(${idx},'a',this.value)"></label>
        <button type="button" onclick="removeSegment(${idx})">Remove</button>
      </div>
    `;
  });
}
window.updateSegment = function(idx, key, value) {
  segments[idx][key] = parseFloat(value);
  renderSegmentsList();
};
window.removeSegment = function(idx) {
  segments.splice(idx,1);
  renderSegmentsList();
};

document.getElementById('add-segment-btn').addEventListener('click', function() {
  let last = segments.length ? segments[segments.length - 1] : { tEnd: 0 };
  segments.push({ tStart: last.tEnd, tEnd: last.tEnd+2, a: 0 });
  renderSegmentsList();
});
renderSegmentsList();

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
  // Set a temporary white background (if for some reason not CSS-defined)
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
