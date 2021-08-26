import { Inject, Service } from 'typedi'
import { API } from '@/Scandinaver/Puzzle/Infrastructure/api/puzzle.api'
import { plainToClass } from 'class-transformer'
import { Puzzle } from '@/Scandinaver/Puzzle/Domain/Puzzle'
import { CommonRepository } from '@/Scandinaver/Core/Infrastructure/common.repository'
import PuzzleAPI = API.PuzzleAPI

@Service()
export default class PuzzleRepository extends CommonRepository<Puzzle> {
  @Inject()
  protected readonly api: PuzzleAPI

  public async all(): Promise<Puzzle[]> {
    return this.api
      .getPuzzles()
      .then(response => plainToClass(Puzzle, response.data))
  }

  public async update(puzzle: Puzzle, data: any): Promise<Puzzle> {
    return this.api
      .processPuzzle(puzzle)
      .then(response => plainToClass(Puzzle, response.data))
  }
}
