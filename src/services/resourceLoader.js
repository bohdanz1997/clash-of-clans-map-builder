import { loader } from 'core/pixi'

import ground from 'assets/image/ground.png'
import clanCastle from 'assets/image/clanCastle.png'
import goldStorage from 'assets/image/goldStorage.png'

export const resourceLoader = (done) => {
  loader
    .add('ground', ground)
    .add('clanCastle', clanCastle)
    .add('goldStorage', goldStorage)
    .load(done)
}
