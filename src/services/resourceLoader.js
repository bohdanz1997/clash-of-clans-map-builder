import { loader } from 'core/pixi'

import * as atlas from '../assets/atlas/treasureHunter'
import ground from '../assets/image/ground.png'
import clanCastle from '../assets/image/clanCastle.png'

export const resourceLoader = (done) => {
  loader
    .add(atlas.file)
    .add('ground', ground)
    .add('clanCastle', clanCastle)
    .load(done)
}
