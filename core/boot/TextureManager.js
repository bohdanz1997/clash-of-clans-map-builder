import { utils, Texture } from 'pixi.js'

export default class TextureManager {
  static cache = utils.TextureCache

  /**
   * Get texture from cache or throw error
   * @param {string} key
   * @return {Texture} texture
   */
  get(key) {
    const texture = this.cache[key]

    if (!texture) {
      throw new Error(`Could not find texture ${key}`)
    }

    return texture
  }
}
