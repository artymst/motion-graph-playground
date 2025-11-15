// Motion calculations
function getPosition(u, a, t) {
  return u * t + 0.5 * a * t * t;
}
function getVelocity(u, a, t) {
  return u + a * t;
}
// You can export these if using ES Modules; otherwise, attach to window/global.
