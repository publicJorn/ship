import { MovingEntity } from './MovingEntity'
import { Collider } from './Collider'

export class ObjectX extends MovingEntity {
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

  draw() {
    const s = (n) => n * this.scale

    this.ctx.save()
    this.ctx.translate(this.x, this.y)

    this.ctx.beginPath()
    this.ctx.moveTo(s(-6), s(-4))
    this.ctx.lineTo(s(-4), s(-6))
    this.ctx.lineTo(0, s(-2))
    this.ctx.lineTo(s(4), s(-6))
    this.ctx.lineTo(s(6), s(-4))
    this.ctx.lineTo(s(2), 0)
    this.ctx.lineTo(s(6), s(4))
    this.ctx.lineTo(s(4), s(6))
    this.ctx.lineTo(0, s(2))
    this.ctx.lineTo(s(-4), s(6))
    this.ctx.lineTo(s(-6), s(4))
    this.ctx.lineTo(s(-2), 0)
    this.ctx.closePath()

    this.ctx.lineWidth = 2
    this.ctx.strokeStyle = 'hotpink'
    this.ctx.stroke()

    this.ctx.restore()

    super.draw()
  }
}
