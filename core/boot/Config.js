import { prop, noop } from 'core/util'

export class Config {
  constructor(config) {
    const get = prop(config)

    this.debug = get('debug', false)

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

    this.baseAssetsUrl = get('baseAssetsUrl', 'assets')

    /** @type {HTMLBaseElement} */
    this.inputKeyboardEventTarget = get('input.keyboard.target', window)

    /** @type {HTMLBaseElement} */
    this.inputMouseEventTarget = get('input.mouse.target', null) // canvas

    /** @type {HTMLBaseElement} */
    this.inputTouchEventTarget = get('input.touch.target', document.body) // canvas

    this.preBoot = get('callbacks.preBoot', noop)
    this.postBoot = get('callbacks.postBoot', noop)

    this.sceneConfig = get('scene')

    this.display = {
      containers: get('display.containers', []),
    }

    /** @type {DisplayGroups} */
    this.displayGroups = get('display.groups', {})

    this.systems = {
      defaultPriority: get('systems.defaultPriority', 0),
    }
  }
}
