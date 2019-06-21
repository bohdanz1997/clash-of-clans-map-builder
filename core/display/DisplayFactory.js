/* eslint-disable class-methods-use-this */
import { AnimatedSprite } from 'core/pixi'
import { spriteFactory } from './sprite'
import { textFactory } from './text'

export class DisplayFactory {
  animatedSprite({ atlas, speed = 1 }) {
    const textures = Object.values(atlas.textures)
    const sprite = new AnimatedSprite(textures, false)
    sprite.animationSpeed = speed
    sprite.play()

    return sprite
  }

  sprite({ asset, width, height }) {
    return spriteFactory.create({ asset, width, height })
  }

  rect({ width, height, color }) {
    return spriteFactory.fromRect({ width, height, color })
  }

  isoRect({ width, height, color }) {
    return spriteFactory.isoFromRect({ width, height, color })
  }

  text({ x, y, fontSize, fill, content }) {
    return textFactory.create({
      x, y, fontSize, fill, content,
    })
  }

  textSprite({ fontSize, fill, content } = {}) {
    return textFactory.create({ fontSize, fill, content })
  }
}

export const displayFactory = new DisplayFactory()
