import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { Puzzle } from '@/Scandinaver/Puzzle/Domain/Puzzle'
import { Service } from 'typedi'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import { BaseAPI } from '@/Scandinaver/Core/Infrastructure/base.api'
import { ClassType } from 'class-transformer/ClassTransformer'

export namespace API {
  @Service()
  export class PuzzleAPI extends BaseAPI<Puzzle> {
    protected readonly type: ClassType<Puzzle> = Puzzle
    protected readonly baseUrl = 'puzzle'

    public async all(): Promise<AxiosResponse<Puzzle[]>> {
      throw new Error('method not implemented')
    }

    public async create(data: any): Promise<AxiosResponse<Puzzle>> {
      throw new Error('method not implemented')
    }

    public async delete(id: number | string): Promise<any> {
      throw new Error('method not implemented')
    }

    public async one(id: number): Promise<AxiosResponse<Puzzle>> {
      throw new Error('method not implemented')
    }

    public async update(id: number | string, data: any): Promise<AxiosResponse<Puzzle>> {
      throw new Error('method not implemented')
    }

    public async getPuzzles(): Promise<AxiosResponse<Puzzle[]>> {
      return request.get(`/${this.baseUrl}/user`, {
        params: {
          lang: store.getters.language
        }
      })
    }

    public async processPuzzle(puzzle: Puzzle): Promise<AxiosResponse> {
      return request.put(`/${this.baseUrl}/${puzzle.id}/complete`)
    }
  }
}
