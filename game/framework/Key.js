export class Key {
  name = ''
  isActive = false
  key = ''
  callback = null
  requiresCallback = false

  /**
   *
   * @param {Object} args
   * @param {string} args.name
   * @param {boolean} args.requiresCallback
   */
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
