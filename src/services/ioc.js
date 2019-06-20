import { asFunction } from 'awilix'

export const createContainerBuilder = container => (factory, data, dataForInject) => {
  const injector = () => ({
    data,
    ...dataForInject,
  })
  const resolver = asFunction(factory).inject(injector)
  return container.build(resolver)
}

export class ContainerBuilder {
  constructor(container) {
    /** @type {AwilixContainer} */
    this.container = container
  }

  create(Factory, data, dataForInject) {
    const injector = () => ({
      data,
      ...dataForInject,
    })
    const resolver = asFunction(Factory).inject(injector)

    this.container.build(resolver)
  }
}
