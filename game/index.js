import { Input } from './Input'
import { Player } from './Player'
import { Ship } from './Ship'
import { Bullet } from './Bullet'

// TODO: before prod
// - remove all debug stuff from build
//
export const game = (canvas) => {
  const debug = false
  const ctx = canvas.getContext('2d')
  const size = 4

  const players = new Map()
  const bullets = new Set()

  const input1 = new Input({ debug })
  input1.setKey({
    input: 'fire',
    key: ' ',
    callback: ({ player }) => {
      bullets.add(
        new Bullet({
          x: player.ship.x,
          y: player.ship.y,
          color: player.color.stroke,
          direction: player.ship.direction,
          owner: player,
        })
      )
    },
  })

  const player1 = new Player()
  input1.attachCallbacksArgs({ player: player1 })
  player1.setInput(input1)
  player1.createShip(
    new Ship({
      x: 400,
      y: 300,
      stroke: player1.color.stroke,
      fill: player1.color.fill,
    })
  )

  players.set('player1', player1)

  // Input
  window.addEventListener('keydown', (evt) => {
    players.forEach((p) => p.input.onKeydown(evt))
  })
  window.addEventListener('keyup', (evt) => {
    players.forEach((p) => p.input.onKeyup(evt))
  })
  window.addEventListener('keypress', (evt) => {
    players.forEach((p) => p.input.onKeypress(evt))
  })

  const loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    players.forEach((player) => {
      player.ship.update({
        input: player.input,
        maxWidth: canvas.width,
        maxHeight: canvas.height,
      })
      player.ship.draw({ ctx, size, debug })
    })

    bullets.forEach((bullet) => {
      if (bullet.remove) {
        bullets.delete(bullet)
      }
      bullet.update({ maxWidth: canvas.width, maxHeight: canvas.height })
      bullet.draw({ ctx, size })
    })

    window.requestAnimationFrame(loop)
  }

  window.requestAnimationFrame(loop)
}
