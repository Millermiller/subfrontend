import { Inject, Service } from 'typedi'
import { Puzzle } from '@/Scandinaver/Puzzle/models/Puzzle'
import PuzzleRepository from '@/Scandinaver/Puzzle/Infrastructure/puzzle.repository'

@Service()
export default class PuzzleService {
  @Inject()
  private repository: PuzzleRepository

  async getPuzzles(): Promise<Puzzle[]> {
    return this.repository.all()
  }

  public async processPuzzle(puzzle: Puzzle): Promise<Puzzle> {
    puzzle.success = true
    return this.repository.update(puzzle, { success: true })
  }
}
