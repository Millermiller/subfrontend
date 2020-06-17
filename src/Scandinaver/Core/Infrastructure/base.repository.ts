export abstract class BaseRepository<D> {
  public async abstract all(): Promise<D[]>
  public async abstract one(id: number): Promise<D>
  public async abstract save(entity: D): Promise<D>
  public async abstract delete(entity: D): Promise<any>
}
