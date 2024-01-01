class Key {
  name = ''
  isActive = false
  key = ''
  callback = null
  requiresCallback = false

  constructor({ name, requiresCallback = false }) {
    this.name = name
    this.requiresCallback = requiresCallback
  }

  isReady() {
    if (!this.key) return false
    if (this.requiresCallback && !this.callback) {
      if (window.debug) {
        console.error(
          `Key [${this.name}] is set without callback, but requires one.`
        )
      }
      return false
    }
    return true
  }

  set({ key, callback = null }) {
    this.key = key

    if (callback !== null) {
      this.callback = callback
    }
  }
}

/**
 * Maps keys to inport properties
 * Input interface is implemented in Player and Ship
 */
export class Input {
  inert = false

  constructor({ player }) {
    this.forward = new Key({ name: 'Forward' })
    this.reverse = new Key({ name: 'Reverse' })
    this.left = new Key({ name: 'Left' })
    this.right = new Key({ name: 'Right' })
    this.fire = new Key({ name: 'Fire', requiresCallback: true })

    this.player = player
  }

  isReady() {
    Object.values(this)
      .filter((input) => input instanceof Key)
      .every((input) => input.isReady)
  }

  onKeydown(evt) {
    if (this.inert) return

    if (evt.key === this.forward.key && !this.forward.isActive) {
      evt.preventDefault()
      this.forward.isActive = true
      if (window.debug) console.log('+forward')
    }
    if (evt.key === this.reverse.key && !this.reverse.isActive) {
      evt.preventDefault()
      this.reverse.isActive = true
      if (window.debug) console.log('+reverse')
    }
    if (evt.key === this.left.key && !this.left.isActive) {
      evt.preventDefault()
      this.left.isActive = true
      if (window.debug) console.log('+left')
    }
    if (evt.key === this.right.key && !this.right.isActive) {
      evt.preventDefault()
      this.right.isActive = true
      if (window.debug) console.log('+right')
    }
  }

  onKeyup(evt) {
    if (this.inert) return

    if (evt.key === this.forward.key && this.forward.isActive) {
      evt.preventDefault()
      this.forward.isActive = false
      if (window.debug) console.log('-forward')
    }
    if (evt.key === this.reverse.key && this.reverse.isActive) {
      evt.preventDefault()
      this.reverse.isActive = false
      if (window.debug) console.log('-reverse')
    }
    if (evt.key === this.left.key && this.left.isActive) {
      evt.preventDefault()
      this.left.isActive = false
      if (window.debug) console.log('-left')
    }
    if (evt.key === this.right.key && this.right.isActive) {
      evt.preventDefault()
      this.right.isActive = false
      if (window.debug) console.log('-right')
    }
  }

  onKeypress(evt) {
    if (this.inert) return

    if (evt.key === this.fire.key) {
      evt.preventDefault()
      this.fire.callback({ player: this.player })
    }
  }
}
