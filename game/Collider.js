export class Collider {
  hitBoxBasicRadius = 0
  isColliding = false

  /**
   * @param {2dContext} ctx
   * @param {number} x
   * @param {number} y
   */
  constructor({ ctx, x, y }) {
    this.ctx = ctx
    this.x = x
    this.y = y
  }

  /**
   * Provide parameters as if it were a rectangle
   * The object drawing (non-debug) should be inside the generated basic hitbox
   * @param {number} outerWidth
   * @param {number} outerHeight
   */
  calcHitBoxBasicRadius({ outerWidth, outerHeight }) {
    this.hitBoxBasicRadius =
      Math.sqrt(outerWidth * outerWidth + outerHeight * outerHeight) / 2
  }

  /**
   * Check if it comes in range of another collider
   * @param {Collider} collider
   * @returns bool
   */
  basicCollidesWith(collider) {
    const centerDistance =
      Math.pow(this.x - collider.x, 2) + Math.pow(this.y - collider.y, 2)

    return (
      centerDistance <=
      Math.pow(this.hitBoxBasicRadius + collider.hitBoxBasicRadius, 2)
    )
  }

  calcHitBoxPrecise() {
    this.calcHitBoxBasicRadius()
  }

  update({ x, y }) {
    this.x = x
    this.y = y
    this.isColliding = false
  }

  draw() {
    if (window.debug) {
      // Hitbox basic
      this.ctx.strokeStyle = this.isColliding
        ? 'rgb(220, 20, 20)'
        : 'rgb(260, 140, 20)'
      this.ctx.lineWidth = 1

      this.ctx.beginPath()
      this.ctx.arc(this.x, this.y, this.hitBoxBasicRadius, 0, Math.PI * 2)
      this.ctx.closePath()
      this.ctx.stroke()
    }
  }
}
