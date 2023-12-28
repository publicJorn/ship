// Ship constants
// Internalize when we get multiple types of ships
const maxForwardSpeed = 3.2
const maxBackwardSpeed = -1.8
const acceleratePower = 0.65
const brakePower = 0.2
const drag = 0.02
const rotationSpeed = 2

/**
 * Player controlled ship
 * @param {number} x
 * @param {number} y
 * @param {string} color
 * @param {number} direction in degrees
 * @param {string} stroke
 * @param {string} fill
 */
export class Ship {
  constructor({ x, y, direction = 0, stroke, fill, scale = 1 }) {
    this.x = x
    this.y = y
    this.scale = scale
    this.direction = direction - 90
    this.stroke = stroke
    this.fill = fill
    this.velocity = 0
  }

  /**
   * Update ship props based on player input
   * @param {{ left: boolean, right: boolean, accelerating: boolean, braking: boolean }} input
   * @param {number} maxWidth
   * @param {number} maxHeight
   */
  update({ input, maxWidth, maxHeight }) {
    // Set rotation in directionrees
    if (input.left) {
      this.direction = (this.direction - 1 * rotationSpeed) % 360
    }
    if (input.right) {
      this.direction = (this.direction + 1 * rotationSpeed) % 360
    }

    // Set velocity
    if (input.accelerating) {
      this.velocity = Math.min(maxForwardSpeed, this.velocity + acceleratePower)
    } else if (input.braking) {
      this.velocity = Math.max(maxBackwardSpeed, this.velocity - brakePower)
    } else if (this.velocity > 0) {
      this.velocity = Math.max(0, this.velocity - drag)
    } else if (this.velocity < 0) {
      this.velocity = Math.min(0, this.velocity + drag)
    }

    const rad = (this.direction * Math.PI) / 180
    let x = this.x + this.velocity * Math.cos(rad)
    let y = this.y + this.velocity * Math.sin(rad)

    if (x < 0) {
      x = x + maxWidth
    } else if (x > maxWidth) {
      x = x - maxWidth
    }

    if (y < 0) {
      y = y + maxHeight
    } else if (y > maxHeight) {
      y = y - maxHeight
    }

    this.x = x
    this.y = y
  }

  /**
   * Draw to cnavas
   * @param {2dContext} ctx
   * @param {boolean} debug
   */
  draw({ ctx, debug = false }) {
    const rad = ((this.direction + 90) * Math.PI) / 180
    const lineWidth = 1 * this.scale

    ctx.save()

    ctx.translate(this.x, this.y)
    ctx.rotate(rad)

    ctx.beginPath()
    ctx.moveTo(0, -5 * this.scale)
    ctx.lineTo(-4 * this.scale, 5 * this.scale)
    ctx.lineTo(4 * this.scale, 5 * this.scale)
    ctx.closePath()

    ctx.lineWidth = lineWidth
    ctx.strokeStyle = this.stroke
    ctx.fillStyle = this.fill

    ctx.fill()
    ctx.stroke()

    if (debug) {
      ctx.fillStyle = 'rgb(220, 20, 20)'
      ctx.strokeStyle = 'rgb(220, 20, 20)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(0, 0, 3, 0, 2 * Math.PI)
      ctx.fill()
      ctx.strokeRect(
        -4 * this.scale - lineWidth / 2,
        -5 * this.scale - lineWidth / 2,
        8 * this.scale + lineWidth,
        10 * this.scale + lineWidth
      )
    }
    ctx.restore()
  }
}
