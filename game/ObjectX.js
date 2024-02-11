import { Entity } from './framework/Entity'
import { Collider } from './framework/entityEnhancers/Collider'

export class ObjectX extends Entity {
  constructor(props) {
    super(props)

    this.collider = this.compose(
      new Collider({
        ctx: props.ctx,
        entityRef: this,
        outerWidth: 10.5 * props.scale,
        outerHeight: 10.5 * props.scale,
      })
    )
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
