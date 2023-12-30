export class Player {
  constructor() {
    // TODO: new color function to automatically determine stroke based on fill input
    this.color = { stroke: 'rgb(11, 162, 170)', fill: 'rgb(100, 202, 207)' }
    this.input = null
    this.ship = null
  }

  setColor({ stroke, fill }) {
    this.color.stroke = stroke
    this.color.fill = fill
  }

  setInput(input) {
    this.input = input
  }

  setShip(ship) {
    this.ship = ship
  }
}
