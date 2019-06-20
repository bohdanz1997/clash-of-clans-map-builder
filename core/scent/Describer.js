export class Describer {
  static FRegEx = new RegExp(/(?:this\.)(.+?(?= ))/g)

  static describe(val, parent = false) {
    let result = []
    if (parent) {
      const proto = Object.getPrototypeOf(val.prototype)
      if (proto) {
        result = result.concat(this.describe(proto.constructor, parent))
      }
    }

    const additional = val.toString().match(this.FRegEx) || []
    return result.concat(additional)
  }

  static getProps(val, parent = false) {
    return this.mapPropsNames(this.describe(val, parent))
  }

  static mapPropsNames(properties) {
    return properties.map(prop => prop.split('.')[1])
  }
}
