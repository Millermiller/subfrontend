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
    protected type: ClassType<Puzzle> = Puzzle

    all(): Promise<AxiosResponse<Puzzle[]>> {
      throw new Error('method not implemented')
    }

    create(data: any): Promise<AxiosResponse<Puzzle>> {
      throw new Error('method not implemented')
    }

    delete(id: number | string): Promise<any> {
      throw new Error('method not implemented')
    }

    one(id: number): Promise<AxiosResponse<Puzzle>> {
      throw new Error('method not implemented')
    }

    update(id: number | string, data: any): Promise<AxiosResponse<Puzzle>> {
      throw new Error('method not implemented')
    }

    getPuzzles(): Promise<AxiosResponse<Puzzle[]>> {
      return request.get('/puzzle/user', {
        params: {
          lang: store.getters.language
        }
      })
    }

    processPuzzle(puzzle: Puzzle): Promise<AxiosResponse> {
      return request.put(`/puzzle/${puzzle.id}/complete`)
    }
  }
}
