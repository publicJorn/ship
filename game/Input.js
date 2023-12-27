/**
 * Maps keys to inport properties
 * Input interface is implemented in Player and Ship
 * @param {boolean} debug
 */
export class Input {
  constructor({ debug = false }) {
    this.accelerating = false
    this.acceleratingKey = 'ArrowUp'
    this.braking = false
    this.brakingKey = 'ArrowDown'
    this.left = false
    this.leftKey = 'ArrowLeft'
    this.right = false
    this.rightKey = 'ArrowRight'
    this.fire = false
    this.fireKey = ' '
    this.fireCallback = null
    this.callbackArgs = {}
    this.debug = debug
  }

  setKey({ input, key, callback = null }) {
    if (this[input] === undefined) {
      console.error(`Input does not exist: ${input}`)
      return
    }
    this[`${input}Key`] = key

    if (callback !== null) {
      this[`${input}Callback`] = callback
    }
  }

  attachCallbacksArgs(args) {
    this.callbackArgs = args
  }

  onKeydown(evt) {
    if (evt.key === this.acceleratingKey && !this.accelerating) {
      this.accelerating = true
      if (this.debug) console.log('+accelerate')
    }
    if (evt.key === this.brakingKey && !this.braking) {
      this.braking = true
      if (this.debug) console.log('+brake')
    }
    if (evt.key === this.leftKey && !this.left) {
      this.left = true
      if (this.debug) console.log('+left')
    }
    if (evt.key === this.rightKey && !this.right) {
      this.right = true
      if (this.debug) console.log('+right')
    }
  }

  onKeyup(evt) {
    if (evt.key === this.acceleratingKey && this.accelerating) {
      this.accelerating = false
      if (this.debug) console.log('-accelerate')
    }
    if (evt.key === this.brakingKey && this.braking) {
      this.braking = false
      if (this.debug) console.log('-brake')
    }
    if (evt.key === this.leftKey && this.left) {
      this.left = false
      if (this.debug) console.log('-left')
    }
    if (evt.key === this.rightKey && this.right) {
      this.right = false
      if (this.debug) console.log('-right')
    }
  }

  onKeypress(evt) {
    if (evt.key === this.fireKey) {
      this.fireCallback(this.callbackArgs)
    }
  }
}
