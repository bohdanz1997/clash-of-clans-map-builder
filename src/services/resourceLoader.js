import { loader } from '../core/pixi'

import * as atlas from '../assets/atlas/treasureHunter'
import ground from '../assets/image/ground.png'
import clanCastle from '../assets/image/clan-castle.png'

export const resourceLoader = (done) => {
  loader
    .add(atlas.file)
    .add('ground', ground)
    .add('clan-castle', clanCastle)
    .load(done)
}
