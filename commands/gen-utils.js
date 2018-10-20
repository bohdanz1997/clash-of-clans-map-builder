import fs from 'fs'

export default {
  generate({ filePath, source }) {
    try {
      fs.writeFileSync(filePath, source)
    } catch (err) {
      console.error('Got error:'.red, err)
    }

    console.log('Generated:'.green, filePath.green, '\n')
    console.log(source)
  },

  update({ filePath, source }) {
    try {
      fs.writeFileSync(filePath, source)
    } catch (err) {
      console.error('Got error:'.red, err)
    }

    console.log('Updated:'.green, filePath.green, '\n')
    console.log(source)
  },

  remove({ filePath }) {
    try {
      fs.unlinkSync(filePath)
    } catch (err) {
      console.error('Got error:'.red, err)
    }

    console.log('Removed:'.green, filePath.green, '\n')
  }
}
