export class Debris {
  constructor({ ctx, x, y, pieces }) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.pieces = pieces
  }

  draw() {
    // this.ctx.save()
    // this.ctx.translate(this.x, this.y)
    this.ctx.font = '25px sans-serif'

    this.ctx.textAlign = 'center'
    this.ctx.fillStyle = 'yellow'
    this.ctx.fillText('Debris', this.x, this.y)
    // this.ctx.restore()
  }
}
