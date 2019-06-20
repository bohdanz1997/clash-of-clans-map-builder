import { AnimatedSprite } from 'core/pixi'
import { spriteFactory, textFactory } from 'core/display'
import { Display as DisplayComponent } from '../components'

const withDisplayComponent = ({ createSprite }) => entity => (
  entity.add(DisplayComponent({
    sprite: createSprite(),
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

  sprite({ asset, width, height }) {
    return withDisplayComponent({
      createSprite: () => spriteFactory.create(asset, null, null, width, height),
    })
  },

  rect({ width, height, color }) {
    return withDisplayComponent({
      createSprite: () => spriteFactory.fromRect(width, height, color),
    })
  },

  isoRect({ width, height, color }) {
    return withDisplayComponent({
      createSprite: () => spriteFactory.isoFromRect(width, height, color),
    })
  },

  text({ x, y, fontSize, fill, content }) {
    return withDisplayComponent({
      createSprite: () => textFactory.create({
        x, y, fontSize, fill, content,
      }),
    })
  },

  textSprite({ fontSize, fill, content } = {}) {
    return textFactory.create({ fontSize, fill, content })
  },
})
