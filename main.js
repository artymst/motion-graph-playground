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
  const uInit = parseFloat(document.getElementById("initial-velocity").value);
  const tMax = parseFloat(document.getElementById("time").value);
  const graphType = document.getElementById("graph-type").value;

  let labels = [];
  let data = [];
  let currentU = uInit;
  let currentPos = 0;
  let segIdx = 0;

  for (let t = 0; t <= tMax; t++) {
    // Find current segment
    while (segIdx < segments.length && t > segments[segIdx].tEnd) segIdx++;
    let seg = segments[segIdx];
    let tStart = seg.tStart;
    let a = seg.a;

    if (t === 0) {
      currentPos = 0;
      currentU = uInit;
    } else if (t > tStart) {
      let prevT = t-1;
      // Update velocity/pos for each segment transition
      let deltaA = a - (segments[segIdx-1] ? segments[segIdx-1].a : a);
      if (deltaA !== 0 && prevT >= seg.tStart) {
        currentU = getVelocity(currentU, deltaA, 1, 0);
        currentPos = getPosition(currentU, deltaA, 1, 0, currentPos);
      }
    }

    labels.push(t.toString());
    if (graphType === "position") {
      data.push(getPosition(uInit, a, t, tStart, currentPos));
    } else if (graphType === "velocity") {
      data.push(getVelocity(uInit, a, t, tStart));
    } else if (graphType === "acceleration") {
      data.push(a);
    }
  }

  plotLineGraph("main-graph", labels, data, 
    graphType === "position" ? "Position (m)" :
    graphType === "velocity" ? "Velocity (m/s)" :
    "Acceleration (m/s²)");
});

// Download function
function downloadCanvas(canvasId) {
  const link = document.createElement("a");
  link.download = canvasId + ".png";
  link.href = document.getElementById(canvasId).toDataURL("image/png");
  link.click();
}
