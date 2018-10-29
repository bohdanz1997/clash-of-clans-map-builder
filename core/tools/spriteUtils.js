import { Container } from 'core/pixi'

export default {
  group(name, sprites = []) {
    const container = new Container()
    const spritesList = Array.isArray(sprites)
      ? sprites : [sprites]

    if (spritesList.length > 0) {
      container.addChild(...spritesList)
    }

    container.name = name
    return container
  },
}
