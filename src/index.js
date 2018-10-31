import { pipe } from 'core/util'

import { gameConfig } from './config'
import { resourceLoader, gameSetup } from './bootstrap'

pipe(
  gameSetup,
  resourceLoader,
)(gameConfig.targetEl)
