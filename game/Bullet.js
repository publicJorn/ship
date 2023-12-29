import { MovingPhysical } from './MovingPhysical'

/**
 * Bullet fired by a ship
 * @param {number} x
 * @param {number} y
 * @param {string} color
 * @param {number} direction in degrees
 * @param {Player} owner TODO: by id?
 * @param {number} velocity
 * @param {number} range
 */
export class Bullet extends MovingPhysical {
  constructor({
    velocity = 5.5,
    size = 1.25,
    owner,
    color,
    range = 350,
    scale,
    ...props
  }) {
    const square = size * scale * 2

    super({ velocity, width: square, height: square, ...props })

    this.size = square
    this.owner = owner
    this.color = color
    this.range = range
    this.moved = 0
    this.delete = false
  }

  /**
   * Update bullet props as it moves
   */
  update({ maxWidth, maxHeight }) {
    super.update({ maxWidth, maxHeight })

    this.moved += this.velocity

    // extra
    if (this.moved >= this.range) {
      this.remove = true
    }
  }

  /**
   * Draw to cnavas
   * @param {2dContext} ctx
   * @param {boolean} debug
   */
  draw({ ctx, debug = false }) {
    const radius = this.size / 2

    ctx.beginPath()
    ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI)
    ctx.fillStyle = this.color
    ctx.fill()

    if (debug) {
      ctx.strokeStyle = 'rgb(220, 20, 20)'
      ctx.lineWidth = 1
      ctx.strokeRect(this.x - radius, this.y - radius, this.width, this.height)
    }
  }
}
