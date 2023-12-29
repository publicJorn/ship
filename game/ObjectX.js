import { Physical } from './Physical'

export class ObjectX extends Physical {
  constructor(props) {
    super(props)

    this.calcHitBoxBasicRadius({
      outerWidth: 10.5 * props.scale,
      outerHeight: 10.5 * props.scale,
    })
  }

  update() {
    super.update()
  }

  draw({ ctx, debug }) {
    const s = (n) => n * this.scale

    ctx.save()
    ctx.translate(this.x, this.y)

    ctx.beginPath()
    ctx.moveTo(s(-6), s(-4))
    ctx.lineTo(s(-4), s(-6))
    ctx.lineTo(s(0), s(-2))
    ctx.lineTo(s(4), s(-6))
    ctx.lineTo(s(6), s(-4))
    ctx.lineTo(s(2), s(0))
    ctx.lineTo(s(6), s(4))
    ctx.lineTo(s(4), s(6))
    ctx.lineTo(s(0), s(2))
    ctx.lineTo(s(-4), s(6))
    ctx.lineTo(s(-6), s(4))
    ctx.lineTo(s(-2), s(0))
    ctx.closePath()

    ctx.lineWidth = 2
    ctx.strokeStyle = 'hotpink'
    ctx.stroke()

    ctx.restore()

    super.draw({ ctx, debug })
  }
}
