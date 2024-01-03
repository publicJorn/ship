export class Entity {
  #properties = []

  // TODO: Think about a register function for properties like `Collider`
  // When registered the "interface" functions would run automatically from here
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
        p.update({ ...this, ...props })
      }
    })
  }

  draw(props) {
    this.#properties.forEach((p) => {
      if (p.draw instanceof Function) {
        p.draw({ ...this, ...props })
      }
    })
  }
}
