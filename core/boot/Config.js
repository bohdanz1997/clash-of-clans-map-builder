import { prop, noop } from 'core/util'

export default class Config {
  constructor(config) {
    const get = prop(config)

    this.width = get('width', 1024)
    this.height = get('height', 768)
    this.hWidth = this.width / 2
    this.hHeight = this.height / 2

    this.zoom = get('zoom', 1)
    this.parent = get('parent', document.body)

    this.antialias = get('antialias', true)
    this.transparent = get('transparent', false)
    this.resolution = get('resolution', 1)

    this.gameTitle = get('title', '')
    this.gameVersion = get('version', '')

    this.inputKeyboardEventTarget = get('input.keyboard.target', window)
    this.inputMouseEventTarget = get('input.mouse.target', null) // canvas
    this.inputTouchEventTarget = get('input.touch.target', null) // canvas

    this.preBoot = get('callbacks.preBoot', noop)
    this.postBoot = get('callbacks.postBoot', noop)
    this.preload = get('callbacks.preload', noop)

    this.sceneConfig = get('scene')

    this.display = {
      groups: get('display.groups', {}),
      containers: get('display.containers', []),
    }
  }
}
