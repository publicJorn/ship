export const fpsTimer = {
  fps: 0,
  fpsTimes: [],

  update() {
    const now = performance.now()
    while (this.fpsTimes.length > 0 && this.fpsTimes[0] <= now - 1000) {
      this.fpsTimes.shift()
    }
    this.fpsTimes.push(now)
    this.fps = this.fpsTimes.length
  },

  draw(ctx) {
    ctx.font = '16px sans-serif'
    ctx.textAlign = 'right'
    ctx.fillStyle = 'white'
    ctx.fillText(`FPS: ${this.fps}`, 800, 16)
  },
}
