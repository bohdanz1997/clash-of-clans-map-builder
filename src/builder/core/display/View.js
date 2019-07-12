import { AnimatedSprite, Sprite, Text, TextStyle, Graphics, Point, utils } from 'pixi.js'
import { BlurFilter, hex } from 'core/pixi'
import { MatrixHelper } from '../math'

const createSprite = (texture, filters = []) => {
  const sprite = new Sprite(texture)
  sprite.filters = filters
  return sprite
}

export class View {
  /**
   * @return {PIXI.AnimatedSprite}
   */
  static animatedSprite({ atlas, speed = 1 }) {
    const textures = Object.values(atlas.textures)
    const sprite = new AnimatedSprite(textures, false)
    sprite.animationSpeed = speed
    sprite.play()

    return sprite
  }

  /**
   * @return {PIXI.Sprite}
   */
  static sprite(asset, { x = 0, y = 0, width = undefined, height = undefined, filters } = {}) {
    const texture = utils.TextureCache[asset]

    const sprite = createSprite(texture, filters)
    sprite.position.set(x, y)
    sprite.width = width || sprite.width
    sprite.height = height || sprite.height

    return sprite
  }

  /**
   * @return {PIXI.Graphics}
   */
  static rect({ width, height, color, filters, alpha = 1 }) {
    const rect = new Graphics()
      .beginFill(color)
      .drawRect(0, 0, width, height)
      .endFill()

    const sprite = new Sprite()
    sprite.addChild(rect)
    sprite.filters = filters
    sprite.alpha = alpha

    return sprite
  }

  /**
   * @return {PIXI.Sprite}
   */
  static button({ width, height, color }) {
    const sprite = new Sprite()
    const blurFilter = new BlurFilter()
    blurFilter.blur = 2

    const outline = new Graphics()
      .lineStyle(2, hex`#1890ff`)
      .beginFill(hex`#1890ff`, 1)
      .drawRoundedRect(0, 0, width, height, 4)

    const shadow = new Graphics()
      .beginFill(hex`#666666`)
      .drawRoundedRect(-1, -1, width + 2, height + 2, 4)
    shadow.filters = [blurFilter]

    const text = View.text({
      fontSize: 18,
    }, {
      content: 'Remove',
    })
    text.anchor.set(0.5)
    text.x = width / 2
    text.y = height / 2

    sprite.addChild(shadow, outline, text)

    sprite.interactive = true
    sprite.on('pointerover', () => {
      outline.tint = hex`#40a9ff`
    })
    sprite.on('pointerout', () => {
      outline.tint = hex`#ffffff`
    })

    return sprite

  }

  /**
   * @return {PIXI.Graphics}
   */
  static isoRect({ width, height, color, filters, alpha = 1 }) {
    const rect = new Graphics()
      .beginFill(color)
      .drawRect(0, 0, width, height)

    rect.pivot.set(-(66.5 / 2), 66.5 / 2)
    rect.transform.setFromMatrix(MatrixHelper.isoMatrix)
    rect.filters = filters
    rect.alpha = alpha

    return rect
  }

  /**
   * @param radius
   * @param parentSize
   * @param cellSize
   * @return {PIXI.Graphics}
   */
  static isoCircle({ radius, parentSize, cellSize }) {
    const size = cellSize * parentSize
    const hSize = size / 2
    const fullRadius = radius * cellSize + hSize

    const circle = new Graphics()
      .lineStyle(2, hex`#ffffff`, 0.5)
      .drawCircle(0, 0, fullRadius)

    // uncomment to add rectange in center
    // const rect = new Graphics()
    //   .lineStyle(2)
    //   .drawRect(-hSize, -hSize, size, size)
    // circle.addChild(rect)

    if (parentSize === 3) {
      circle.pivot.set(-66.5, 0)
    } else if (parentSize === 4) {
      circle.pivot.set(-78, -10)
    }

    circle.transform.setFromMatrix(MatrixHelper.isoMatrix)

    return circle
  }

  /**
   * @param {PIXI.TextStyle} style
   * @param x
   * @param y
   * @param content
   * @return {PIXI.Text}
   */
  static text(style, { x = 0, y = 0, content = '' } = {}) {
    const texttStyle = new TextStyle({
      fill: 'white',
      fontSize: 12,
      fontFamily: 'sans',
      ...style,
    })
    const text = new Text(content, texttStyle)
    text.roundPixels = true
    text.x = x
    text.y = y
    return text
  }
}
