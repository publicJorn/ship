export class Player {
  constructor() {
    this.color = { stroke: 'rgb(11, 162, 170)', fill: 'rgb(100, 202, 207)' }
    this.ship = null
    this.input = null
  }

  setColor({ stroke, fill }) {
    this.color.stroke = stroke
    this.color.fill = fill
  }

  setInput(input) {
    this.input = input
  }

  createShip(ship) {
    this.ship = ship
  }
}
