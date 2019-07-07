import { utils } from 'pixi.js'

export class Cache {
  constructor(loader) {
    /** @type {PIXI.Loader} */
    this.loader = loader
  }

  get(id) {
    return this.getResource(id).data
  }

  getResource(id) {
    const resource = this.loader.resources[id]

    if (!resource) {
      throw new Error(`Cache: Could not find resource '${id}'`)
    }

    return resource
  }

  clear() {
    for (const textureUrl in utils.BaseTextureCache) {
      delete utils.BaseTextureCache[textureUrl];
    }
    for (const textureUrl in utils.TextureCache) {
      delete utils.TextureCache[textureUrl];
    }
  }
}
