// Motion equations
function getPosition(u, a, t) {
  return u * t + 0.5 * a * t * t;
}

function getVelocity(u, a, t) {
  return u + a * t;
}
