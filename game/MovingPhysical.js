import { Physical } from './Physical'

export class MovingPhysical extends Physical {
  constructor({ direction = 0, velocity = 0, ...props }) {
    super(props)

    this.direction = direction
    this.velocity = velocity
  }

  update({ maxWidth, maxHeight }) {
    super.update()

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
  }

  draw({ ctx, debug }) {
    super.draw({ ctx, debug })
  }
}