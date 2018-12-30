import { AnimatedSprite } from 'core/pixi'
import { spriteFactory, textFactory } from 'core/display'
import { Display as DisplayComponent } from '../components'

const withDisplayComponent = ({ createSprite, parentId }) => entity => (
  entity.add(DisplayComponent({
    sprite: createSprite(),
    parentId,
  }))
)

export const withDisplay = ({
  animatedSprite({ atlas, speed = 1 }) {
    const textures = Object.values(atlas.textures)
    const sprite = new AnimatedSprite(textures, false)
    sprite.animationSpeed = speed
    sprite.play()

    return { sprite }
  },

  sprite({ asset, width, height, parentId }) {
    return withDisplayComponent({
      createSprite: () => spriteFactory.create(asset, null, null, width, height),
      parentId,
    })
  },

  rect({ width, height, color, parentId }) {
    return withDisplayComponent({
      createSprite: () => spriteFactory.fromRect(width, height, color),
      parentId,
    })
  },

  isoRect({ width, height, color, parentId }) {
    return withDisplayComponent({
      createSprite: () => spriteFactory.isoFromRect(width, height, color),
      parentId,
    })
  },

  text({ x, y, fontSize, fill, content, parentId }) {
    return withDisplayComponent({
      createSprite: () => textFactory.create({
        x, y, fontSize, fill, content,
      }),
      parentId,
    })
  },

  textSprite({ fontSize, fill, content } = {}) {
    return textFactory.create({ fontSize, fill, content })
  },
})
