import { Input } from './Input'
import { Player } from './Player'
import { Debris } from './Debris'
import { Ship } from './Ship'
import { Bullet } from './Bullet'
import { ObjectX } from './ObjectX'

// TODO: before prod
// - destroy all debug stuff from build
//
export const game = (canvas) => {
  window.debug = true
  // TODO: investigate multiple contexts, ie for non-moving objects. So they don't redraw each frame
  const ctx = canvas.getContext('2d')
  const scale = 4

  const players = new Set()
  const bullets = new Set()
  const explosions = new Set()
  const staticObjects = new Set()

  // TODO: temp so it can be folded - input should be setup outside of index
  ;(function () {
    const player1 = new Player({ name: 'Player 1' })
    // player1.setColor(183, 53, 60)
    player1.setInput(new Input({ player: player1 }))
    player1.input.forward.set({ key: 'ArrowUp' })
    player1.input.reverse.set({ key: 'ArrowDown' })
    player1.input.left.set({ key: 'ArrowLeft' })
    player1.input.right.set({ key: 'ArrowRight' })
    player1.input.fire.set({
      key: '/',
      callback: ({ player }) => {
        bullets.add(
          new Bullet({
            ctx,
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
        ctx,
        x: 500,
        y: 300,
        stroke: player1.color.stroke,
        fill: player1.color.fill,
        scale,
      })
    )
    players.add(player1)

    const player2 = new Player({ name: 'Player 2' })
    player2.setColor(102, 88, 50)
    player2.setInput(new Input({ player: player2 }))
    player2.input.forward.set({ key: 'w' })
    player2.input.reverse.set({ key: 's' })
    player2.input.left.set({ key: 'a' })
    player2.input.right.set({ key: 'd' })
    player2.input.fire.set({
      key: 'q',
      callback: ({ player }) => {
        bullets.add(
          new Bullet({
            ctx,
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
    player2.setShip(
      new Ship({
        ctx,
        x: 300,
        y: 300,
        stroke: player2.color.stroke,
        fill: player2.color.fill,
        scale,
      })
    )
    players.add(player2)
  })()

  staticObjects.add(new ObjectX({ ctx, x: 400, y: 150, scale }))

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

    // Updates ---
    players.forEach((player) => {
      if (player.ship.destroy) {
        // TODO: add score, subtract lives, respawn after timer. All depends on game mode.
        explosions.add(new Debris({ ctx, ...player.ship.getDebris() }))
        // player.setShip(null)
        // player.input.inert = true
        players.delete(player)
      }
      player.ship.update({
        input: player.input,
        maxWidth: canvas.width,
        maxHeight: canvas.height,
      })
    })
    bullets.forEach((bullet) => {
      if (bullet.destroy) {
        bullets.delete(bullet)
      }
      bullet.update({ maxWidth: canvas.width, maxHeight: canvas.height })
    })
    staticObjects.forEach((obj) => {
      obj.update()
    })

    // Hit detection ---
    players.forEach((player) => {
      for (let obj of staticObjects) {
        if (player.ship.basicCollidesWith(obj)) {
          player.ship.isColliding = true
          obj.isColliding = true
        }

        // TODO: ship-ship damage?
        // for (let p of players) {
        //   if (p !== player && player.ship.basicCollidesWith(p.ship)) {
        //     player.ship.isColliding = true
        //   }
        // }

        for (let b of bullets) {
          if (b.owner !== player && player.ship.basicCollidesWith(b)) {
            player.ship.damage(b.damage)
            b.destroy = true
          }
        }
      }
    })

    // Drawing ---
    explosions.forEach((debris) => {
      debris.draw()
    })
    players.forEach((player) => {
      player.ship.draw()
    })
    bullets.forEach((bullet) => {
      bullet.draw()
    })
    staticObjects.forEach((obj) => {
      obj.draw()
    })

    // TODO: limit fps
    window.requestAnimationFrame(loop)
  }

  window.requestAnimationFrame(loop)
}
