export abstract class BaseService<D> {
  abstract create(input: any): D
}
