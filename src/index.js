import { pipe } from 'core/util'

import setup from './bootstrap/game'
import { gameConfig } from './config'
import { resourceLoader } from './services'

pipe(
  setup,
  resourceLoader,
)(gameConfig.targetEl)
