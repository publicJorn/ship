export class Entity {
  #properties = []

  constructor({ ctx, x, y, scale }) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.scale = scale
  }

  compose(property) {
    this.#properties.push(property)
    return property
  }

  update(props) {
    this.#properties.forEach((p) => {
      if (p.update instanceof Function) {
        p.update(props)
      }
    })
  }

  draw(props) {
    this.#properties.forEach((p) => {
      if (p.draw instanceof Function) {
        p.draw(props)
      }
    })
  }
}
