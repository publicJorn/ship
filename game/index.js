import { Input } from './Input'
import { Player } from './Player'
import { Ship } from './Ship'
import { Bullet } from './Bullet'
import { ObjectX } from './ObjectX'

// TODO: before prod
// - remove all debug stuff from build
//
export const game = (canvas) => {
  const debug = true // TODO: make global
  const ctx = canvas.getContext('2d')
  const scale = 4

  const players = new Map()
  const bullets = new Set()
  const staticObjects = new Set()

  const player1 = new Player()

  player1.setInput(new Input({ player: player1 }))
  player1.input.forward.set({ key: 'ArrowUp' })
  player1.input.reverse.set({ key: 'ArrowDown' })
  player1.input.left.set({ key: 'ArrowLeft' })
  player1.input.right.set({ key: 'ArrowRight' })
  player1.input.fire.set({
    key: ' ',
    callback: ({ player }) => {
      bullets.add(
        new Bullet({
          x: player.ship.x,
          y: player.ship.y,
          scale,
          color: player.color.stroke,
          direction: player.ship.direction,
          owner: player,
        })
      )
    },
  })

  player1.setShip(
    new Ship({
      x: 400,
      y: 300,
      stroke: player1.color.stroke,
      fill: player1.color.fill,
      scale,
    })
  )

  players.set('player1', player1)

  staticObjects.add(new ObjectX({ x: 400, y: 150, scale }))

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
    })
    bullets.forEach((bullet) => {
      if (bullet.remove) {
        bullets.delete(bullet)
      }
      bullet.update({ maxWidth: canvas.width, maxHeight: canvas.height })
    })
    staticObjects.forEach((obj) => {
      obj.update()
    })

    players.forEach((player) => {
      for (let obj of staticObjects) {
        if (player.ship.basicCollidesWith(obj)) {
          player.ship.isColliding = true
          obj.isColliding = true
        }
      }
    })

    players.forEach((player) => {
      player.ship.draw({ ctx, debug })
    })
    bullets.forEach((bullet) => {
      bullet.draw({ ctx, debug })
    })
    staticObjects.forEach((obj) => {
      obj.draw({ ctx, debug })
    })

    window.requestAnimationFrame(loop)
  }

  window.requestAnimationFrame(loop)
}
