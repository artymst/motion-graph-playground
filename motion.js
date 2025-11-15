function getPosition(u, a, t, tSegmentStart, uSegmentStart) {
  // s = u*Δt + 0.5*a*Δt^2 starting from tSegmentStart
  let dt = t - tSegmentStart;
  return uSegmentStart + u * dt + 0.5 * a * dt * dt;
}

function getVelocity(u, a, t, tSegmentStart) {
  // v = u + a*Δt
  let dt = t - tSegmentStart;
  return u + a * dt;
}
