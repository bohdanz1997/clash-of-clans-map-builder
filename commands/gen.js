import program from 'commander'

program
  .usage('quickly generate usefull stuff')
  .command('component <name>', 'add new component').alias('c')
  .parse(process.argv)
