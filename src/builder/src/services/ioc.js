import { asFunction } from 'awilix'

export class ContainerBuilder {
  constructor(container) {
    /** @type {AwilixContainer} */
    this.container = container
  }

  build(Factory, data, dataForInject) {
    const injector = () => ({
      data,
      ...dataForInject,
    })
    const resolver = asFunction(Factory).inject(injector)

    return this.container.build(resolver)
  }
}
