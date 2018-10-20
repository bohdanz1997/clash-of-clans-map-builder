import program from 'commander'

program
  .usage('quickly generate usefull stuff')
  .command('component <name>', 'add new component').alias('c')
  .command('rm-component <name>', 'remove old component').alias('rmc')
  .parse(process.argv)
