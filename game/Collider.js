export class Collider {
  ctx
  entityRef
  hitBoxBasicRadius = 0
  isColliding = false

  /**
   * @param {2dContext} ctx
   * @param {Entity} entityRef
   * @param {number} outerWidth
   * @param {number} outerHeight
   */
  constructor({ ctx, entityRef, outerWidth, outerHeight }) {
    this.ctx = ctx
    this.entityRef = entityRef
    this.hitBoxBasicRadius =
      Math.sqrt(Math.pow(outerWidth, 2) + Math.pow(outerHeight, 2)) / 2
  }

  /**
   * Check if it comes in range of another collider
   * @param {Collider} collider
   * @returns bool
   */
  basicCollidesWith(collider) {
    const centerDistance =
      Math.pow(this.entityRef.x - collider.entityRef.x, 2) +
      Math.pow(this.entityRef.y - collider.entityRef.y, 2)

    return (
      centerDistance <=
      Math.pow(this.hitBoxBasicRadius + collider.hitBoxBasicRadius, 2)
    )
  }

  calcHitBoxPrecise() {
    this.calcHitBoxBasicRadius()
  }

  /**
   */
  update() {
    this.isColliding = false
  }

  /**
   */
  draw() {
    if (window.debug) {
      // Hitbox basic
      this.ctx.strokeStyle = this.isColliding
        ? 'rgb(220, 20, 20)'
        : 'rgb(260, 140, 20)'
      this.ctx.lineWidth = 1

      this.ctx.beginPath()
      this.ctx.arc(
        this.entityRef.x,
        this.entityRef.y,
        this.hitBoxBasicRadius,
        0,
        Math.PI * 2
      )
      this.ctx.closePath()
      this.ctx.stroke()
    }
  }
}
