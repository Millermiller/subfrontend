export abstract class BaseRepository<D> {
  public abstract async all(): Promise<D[]>
  public abstract async one(id: number): Promise<D>
  public abstract async save(entity: D): Promise<D>
  public abstract async delete(entity: D): Promise<any>
}
