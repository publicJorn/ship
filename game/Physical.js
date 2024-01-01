export class Physical {
  hitBoxBasicRadius = 0
  isColliding = false

  /**
   * @param {2dContext} ctx
   * @param {number} x
   * @param {number} y
   */
  constructor({ ctx, x, y, scale }) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.scale = scale
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
   * Check if it comes in range of another physical
   * @param {Physical} physical
   * @returns bool
   */
  basicCollidesWith(physical) {
    const centerDistance =
      Math.pow(this.x - physical.x, 2) + Math.pow(this.y - physical.y, 2)

    return (
      centerDistance <=
      Math.pow(this.hitBoxBasicRadius + physical.hitBoxBasicRadius, 2)
    )
  }

  calcHitBoxPrecise() {
    this.calcHitBoxRect()
  }

  update() {
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
