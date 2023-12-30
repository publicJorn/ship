import { MovingPhysical } from './MovingPhysical'

// Ship constants
// Internalize when we get multiple ship types
const maxForwardSpeed = 2.2
const maxBackwardSpeed = -1.6
const acceleratePower = 0.35
const brakePower = 0.2
const drag = 0.018
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
export class Ship extends MovingPhysical {
  constructor({ direction = -90, stroke, fill, scale, ...props }) {
    super({ direction, scale, ...props })

    this.lineWidth = 1 * scale
    this.stroke = stroke
    this.fill = fill

    this.calcHitBoxBasicRadius({
      outerWidth: 8 * scale + this.lineWidth,
      outerHeight: 10 * scale + 2, // + stroke miter
    })
  }

  /**
   * Update ship props based on player input
   * @param {{ left: Key, right: Key, forward: Key, reverse: Key }} input
   * @param {number} maxWidth
   * @param {number} maxHeight
   */
  update({ input, maxWidth, maxHeight }) {
    // Set rotation in directionrees
    if (input.left.isActive) {
      this.direction = (this.direction - 1 * rotationSpeed) % 360
    }
    if (input.right.isActive) {
      this.direction = (this.direction + 1 * rotationSpeed) % 360
    }

    // Set velocity
    if (input.forward.isActive) {
      this.velocity = Math.min(maxForwardSpeed, this.velocity + acceleratePower)
    } else if (input.reverse.isActive) {
      this.velocity = Math.max(maxBackwardSpeed, this.velocity - brakePower)
    } else if (this.velocity > 0) {
      this.velocity = Math.max(0, this.velocity - drag)
    } else if (this.velocity < 0) {
      this.velocity = Math.min(0, this.velocity + drag)
    }

    super.update({ maxWidth, maxHeight })
  }

  /**
   * Draw to cnavas
   * @param {2dContext} ctx
   * @param {boolean} debug
   */
  draw({ ctx, debug = false }) {
    const rad = ((this.direction + 90) * Math.PI) / 180

    ctx.save()

    ctx.translate(this.x, this.y)
    ctx.rotate(rad)

    ctx.beginPath()
    ctx.moveTo(0, -5.5 * this.scale)
    ctx.lineTo(-4 * this.scale, 4.5 * this.scale)
    ctx.lineTo(4 * this.scale, 4.5 * this.scale)
    ctx.closePath()

    ctx.lineWidth = this.lineWidth
    ctx.strokeStyle = this.stroke
    ctx.fillStyle = this.fill

    ctx.fill()
    ctx.stroke()

    if (debug) {
      ctx.fillStyle = 'rgb(220, 20, 20)'
      ctx.beginPath()
      ctx.arc(0, 0, 3, 0, 2 * Math.PI)
      ctx.fill()
    }

    ctx.restore()

    super.draw({ ctx, debug })
  }
}
