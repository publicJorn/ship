import { MovingEntity } from './framework/MovingEntity'
import { Collider } from './framework/entityEnhancers/Collider'

/**
 * Bullet fired by a ship
 * TODO: bullets are based on ship
 * TODO: bullets can be affected by powerups, which are player owned
 * @param {number} x
 * @param {number} y
 * @param {string} color
 * @param {number} direction in degrees
 * @param {Player} owner TODO: by id?
 * @param {number} velocity
 * @param {number} range
 */
export class Bullet extends MovingEntity {
  moved = 0
  destroy = false

  constructor({
    velocity = 5.5,
    size = 1.25,
    owner,
    color,
    range = 350,
    damage = 100,
    scale,
    ...props
  }) {
    super({ velocity, ...props })

    this.size = size * scale * 2
    this.owner = owner
    this.color = color
    this.range = range
    this.damage = damage

    this.collider = this.compose(
      new Collider({
        ctx: props.ctx,
        entityRef: this,
        outerWidth: this.size,
        outerHeight: this.size,
      })
    )
  }

  /**
   * Update bullet props as it moves
   */
  update({ maxWidth, maxHeight }) {
    super.update({ maxWidth, maxHeight })

    this.moved += this.velocity

    // extra
    if (this.moved >= this.range) {
      this.destroy = true
    }
  }

  /**
   * Draw to cnavas
   */
  draw() {
    const radius = this.size / 2

    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI)
    this.ctx.fillStyle = this.color
    this.ctx.fill()

    if (window.debug) {
      this.ctx.strokeStyle = 'rgb(220, 20, 20)'
      this.ctx.lineWidth = 1
      this.ctx.strokeRect(
        this.x - radius,
        this.y - radius,
        this.width,
        this.height
      )
    }
  }
}
