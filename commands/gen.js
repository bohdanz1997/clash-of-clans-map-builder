import program from 'commander'

program
  .usage('quickly generate useful stuff')
  .command('component <name>', 'add new component').alias('c')
  .command('rm-component <name>', 'remove old component').alias('rmc')
  .command('entity <name>', 'add new entity').alias('e')
  .command('rm-entity <name>', 'remove old entity').alias('rme')
  .parse(process.argv)
