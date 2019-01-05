export class EasingFormulas {
  // Linear
  static linear = x => x

  // Smoothstep
  static smoothstep = x => x * x * (3 - 2 * x)
  static smoothstepSquared = x => Math.pow((x * x * (3 - 2 * x)), 2)
  static smoothstepCubed = x => Math.pow((x * x * (3 - 2 * x)), 3)

  // Acceleration
  static acceleration = x => x * x
  static accelerationCubed = x => Math.pow(x * x, 3)

  // Deceleration
  static deceleration = x => 1 - Math.pow(1 - x, 2)
  static decelerationCubed = x => 1 - Math.pow(1 - x, 3)

  // Sine
  static sine = x => Math.sin(x * Math.PI / 2)
  static sineSquared = x => Math.pow(Math.sin(x * Math.PI / 2), 2)
  static sineCubed = x => Math.pow(Math.sin(x * Math.PI / 2), 2)
  static inverseSine = x => 1 - Math.sin((1 - x) * Math.PI / 2)
  static inverseSineSquared = x => 1 - Math.pow(Math.sin((1 - x) * Math.PI / 2), 2)
  static inverseSineCubed = x => 1 - Math.pow(Math.sin((1 - x) * Math.PI / 2), 3)

  // Spline
  static spline = (t, p0, p1, p2, p3) => 0.5 * (
    (2 * p1)
    + (-p0 + p2) * t
    + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t
    + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t
  )

  // Bezier curve
  static cubicBezier = (t, a, b, c, d) => {
    const t2 = t * t
    const t3 = t2 * t
    return a + (-a * 3 + t * (3 * a - a * t)) * t + (3 * b + t * (-6 * b + b * 3 * t)) * t + (c * 3 - c * 3 * t) * t2 + d * t3
  }
}
