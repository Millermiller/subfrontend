import { Inject, Service } from 'typedi'
import { API } from '@/Scandinaver/Puzzle/Infrastructure/api/puzzleAPI'
import { plainToClass } from 'class-transformer'
import { Puzzle } from '@/Scandinaver/Puzzle/Domain/Puzzle'
import { BaseRepository } from '@/Scandinaver/Core/Infrastructure/base.repository'
import PuzzleAPI = API.PuzzleAPI

@Service()
export default class PuzzleRepository extends BaseRepository<Puzzle> {
  @Inject()
  private api: PuzzleAPI

  async all(): Promise<Puzzle[]> {
    return this.api.getPuzzles().then(response => plainToClass(Puzzle, response.data))
  }

  async one(id: number): Promise<Puzzle> {
    throw new Error('method not implemented')
  }

  async save(entity: Puzzle): Promise<Puzzle> {
    throw new Error('method not implemented')
  }
  async delete(entity: Puzzle): Promise<any> {
    throw new Error('method not implemented')
  }

  update(puzzle: Puzzle, data: any): Promise<Puzzle> {
    return this.api.processPuzzle(puzzle).then(response => plainToClass(Puzzle, response.data))
  }
}
