import { Ease, EasingFormulas, Tween } from 'core'
import * as c from 'app/components'
import * as n from 'app/nodes'
import { randomInt } from 'core/util'

const easeMap = Object.values(Ease)

export const ManageTweens = () => ({
  nodes: [n.Tween],

  update(node) {
    /** @type {Tween} */
    const tween = node.tween.tween

    // If the elapsed frames are less than the total frames,
    // use the tweening formulas to move the sprite
    if (tween.frameCounter < tween.totalFrames) {

      // Find the normalized value
      const normalizedTime = tween.frameCounter / tween.totalFrames

      const curvedTime = EasingFormulas[tween.type](normalizedTime)

      // Interpolate the sprite's property based on the curve
      tween.obj[tween.prop] = (tween.endVal * curvedTime) + (tween.startVal * (1 - curvedTime))

      tween.frameCounter += 1
    } else {
      tween.obj[tween.prop] = tween.endVal

      node.entity.remove(c.Tween)

      if (tween.yoyo) {
        tween.obj[tween.prop] = tween.startVal

        const newTween = new Tween({
          obj: tween.obj,
          prop: tween.prop,
          endVal: tween.endVal,
          type: tween.type,
          yoyo: tween.yoyo,
        })

        node.entity.add(c.Tween(newTween))
      }
    }
  },
})
