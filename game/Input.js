class Key {
  name = ''
  isActive = false
  key = ''
  callback = null
  requiresCallback = false
  debug = false

  constructor({ name, requiresCallback = false, debug = false }) {
    this.name = name
    this.requiresCallback = requiresCallback
    this.debug = debug
  }

  isReady() {
    if (!this.key) return false
    if (this.requiresCallback && !this.callback) {
      if (debug) {
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
 * @param {boolean} debug
 */
export class Input {
  constructor({ player, debug = false }) {
    this.forward = new Key({ name: 'Forward', debug })
    this.reverse = new Key({ name: 'Reverse', debug })
    this.left = new Key({ name: 'Left', debug })
    this.right = new Key({ name: 'Right', debug })
    this.fire = new Key({ name: 'Fire', requiresCallback: true, debug })

    this.player = player
    this.debug = debug
  }

  isReady() {
    Object.values(this)
      .filter((input) => input instanceof Key)
      .every((input) => input.isReady)
  }

  onKeydown(evt) {
    if (evt.key === this.forward.key && !this.forward.isActive) {
      evt.preventDefault()
      this.forward.isActive = true
      if (this.debug) console.log('+forward')
    }
    if (evt.key === this.reverse.key && !this.reverse.isActive) {
      evt.preventDefault()
      this.reverse.isActive = true
      if (this.debug) console.log('+reverse')
    }
    if (evt.key === this.left.key && !this.left.isActive) {
      evt.preventDefault()
      this.left.isActive = true
      if (this.debug) console.log('+left')
    }
    if (evt.key === this.right.key && !this.right.isActive) {
      evt.preventDefault()
      this.right.isActive = true
      if (this.debug) console.log('+right')
    }
  }

  onKeyup(evt) {
    if (evt.key === this.forward.key && this.forward.isActive) {
      evt.preventDefault()
      this.forward.isActive = false
      if (this.debug) console.log('-forward')
    }
    if (evt.key === this.reverse.key && this.reverse.isActive) {
      evt.preventDefault()
      this.reverse.isActive = false
      if (this.debug) console.log('-reverse')
    }
    if (evt.key === this.left.key && this.left.isActive) {
      evt.preventDefault()
      this.left.isActive = false
      if (this.debug) console.log('-left')
    }
    if (evt.key === this.right.key && this.right.isActive) {
      evt.preventDefault()
      this.right.isActive = false
      if (this.debug) console.log('-right')
    }
  }

  onKeypress(evt) {
    if (evt.key === this.fire.key) {
      evt.preventDefault()
      this.fire.callback({ player: this.player })
    }
  }
}
