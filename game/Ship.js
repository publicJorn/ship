import { MovingEntity } from './MovingEntity'
import { Collider } from './Collider'

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
 * @param {number} direction in degrees
 * @param {string} stroke
 * @param {string} fill
 */
export class Ship extends MovingEntity {
  #health = 100
  destroy = false

  constructor({ direction = -90, stroke, fill, scale, player, ...props }) {
    super({ direction, scale, ...props })

    this.lineWidth = 1 * scale
    this.stroke = stroke
    this.fill = fill
    // this.player = player // TODO: remove circular reference

    this.collider = this.compose(
      new Collider({
        ctx: props.ctx,
        entityRef: this,
        outerWidth: 8 * scale + this.lineWidth,
        outerHeight: 10 * scale + 2, // + stroke miter
      })
    )

    // this.createDestructPieces()
  }

  damage(points) {
    // TODO: health bar
    // TODO: invulnerability after respawning
    this.#health -= points

    if (this.#health <= 0) {
      this.destroy = true
    }
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
   * Draw to canvas
   */
  draw() {
    // TODO: do or do not draw 1 frame when destroyed?
    const rad = ((this.direction + 90) * Math.PI) / 180

    this.ctx.save()

    this.ctx.translate(this.x, this.y)
    this.ctx.rotate(rad)

    this.ctx.beginPath()
    this.ctx.moveTo(0, -5.5 * this.scale)
    this.ctx.lineTo(-4 * this.scale, 4.5 * this.scale)
    this.ctx.lineTo(4 * this.scale, 4.5 * this.scale)
    this.ctx.closePath()

    this.ctx.lineWidth = this.lineWidth
    this.ctx.strokeStyle = this.stroke
    this.ctx.fillStyle = this.fill

    this.ctx.fill()
    this.ctx.stroke()

    if (window.debug) {
      this.ctx.fillStyle = 'rgb(220, 20, 20)'
      this.ctx.beginPath()
      this.ctx.arc(0, 0, 3, 0, 2 * Math.PI)
      this.ctx.fill()
    }

    this.ctx.restore()

    super.draw()
  }

  createDestructPieces() {
    const s = (n) => n * this.scale

    this.ctx.beginPath()
    this.ctx.moveTo(0, s(-5))
    this.ctx.lineTo(s(-2), 0)
    this.ctx.lineTo(s(1), s(2))
    this.ctx.lineTo(s(2), 0)
    this.ctx.closePath()

    this.ctx.beginPath()
    this.ctx.moveTo(s(2), 0)
    this.ctx.lineTo(s(1), s(2))
    this.ctx.lineTo(s(-1), s(5))
    this.ctx.lineTo(s(4), s(5))
    this.ctx.closePath()

    this.ctx.beginPath()
    this.ctx.moveTo(s(-2), 0)
    this.ctx.lineTo(s(-4), s(5))
    this.ctx.lineTo(s(-1), s(5))
    this.ctx.lineTo(s(1), s(2))
    this.ctx.closePath()
  }

  getDebris() {
    return {
      x: this.x,
      y: this.y,
      pieces: [],
    }
  }
}
