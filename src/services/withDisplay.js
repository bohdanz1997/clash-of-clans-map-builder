import { spriteFactory, textFactory } from 'core/display'
import { Display as DisplayComponent } from '../components'

const withDisplayComponent = ({ createSprite, parentId }) => entity => (
  entity.add(DisplayComponent.of({
    sprite: createSprite(),
    parentId,
  }))
)

export const withDisplay = ({
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
})
