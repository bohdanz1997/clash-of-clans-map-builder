import { Component } from 'scent'
import { Point } from '../core/util'
import { createComponent } from '../core/factories'

export const cMotion = new Component('motion', 'vel')
export const createMotion = ({ velX = 0, velY = 0 } = {}) => (
  createComponent(cMotion, { vel: new Point(velY, velY) })
)

export const cPosition = new Component('position', 'pos')
export const createPosition = ({ x = 0, y = 0 } = {}) => (
  createComponent(cPosition, { pos: new Point(x, y) })
)

export const cControl = new Component('control', 'direction')
export const createControl = (dir) => (
  createComponent(cControl, { dir })
)
