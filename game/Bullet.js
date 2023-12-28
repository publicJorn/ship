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
export class Bullet {
  constructor({
    x,
    y,
    size = 1.25,
    scale = 1,
    color,
    direction,
    owner,
    velocity = 5.5,
    range = 350,
  }) {
    this.x = x
    this.y = y
    this.size = size
    this.scale = scale
    this.color = color
    this.direction = direction
    this.owner = owner
    this.velocity = velocity
    this.range = range
    this.moved = 0
    this.delete = false
  }

  /**
   * Update bullet props as it moves
   */
  update({ maxWidth, maxHeight }) {
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
    const radius = this.size * this.scale

    ctx.beginPath()
    ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI)
    ctx.fillStyle = this.color
    ctx.fill()

    if (debug) {
      ctx.strokeStyle = 'rgb(220, 20, 20)'
      ctx.lineWidth = 1
      ctx.strokeRect(this.x - radius, this.y - radius, radius * 2, radius * 2)
    }
  }
}
