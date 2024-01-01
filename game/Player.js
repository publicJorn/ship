const minLightness = 50

export class Player {
  name = ''
  color = { stroke: 'hsl(183, 53%, 40%)', fill: 'hsl(183, 53%, 60%)' }
  input = null
  ship = null

  constructor({ name }) {
    this.name = name
    this.setColor(183, 53, 60)
  }

  /**
   *
   * @param {number} hue
   * @param {number} saturation
   * @param {number} lightness
   * @returns {string} error, if there is one
   */
  setColor(h, s, l) {
    if (l < minLightness) {
      const err = `Please choose a lighter colour (lightness minimum: ${minLightness}, given: ${l}).`
      console.error(err)
      return err
    }

    this.color.stroke = `hsl(${h}, ${s}%, ${l - 20}%)`
    this.color.fill = `hsl(${h}, ${s}%, ${l}%)`
    return ''
  }

  setInput(input) {
    this.input = input
  }

  setShip(ship) {
    this.ship = ship
  }
}
