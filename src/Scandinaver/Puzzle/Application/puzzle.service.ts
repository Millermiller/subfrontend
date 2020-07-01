import { Inject, Service } from 'typedi'
import { Puzzle } from '@/Scandinaver/Puzzle/Domain/Puzzle'
import PuzzleRepository from '@/Scandinaver/Puzzle/Infrastructure/puzzle.repository'
import { BaseService } from '@/Scandinaver/Core/Application/base.service'

@Service()
export default class PuzzleService extends BaseService<Puzzle> {
  @Inject()
  private repository: PuzzleRepository

  create(puzzle: Puzzle): Puzzle {
    puzzle.generate().pieces.shuffle()
    return puzzle
  }

  async getPuzzles() {
    const puzzles = await this.repository.all()
    return puzzles.map(puzzle => puzzle.setActive(false))
  }

  public async processPuzzle(puzzle: Puzzle): Promise<Puzzle> {
    puzzle.success = true
    return this.repository.update(puzzle, { success: true })
  }
}
