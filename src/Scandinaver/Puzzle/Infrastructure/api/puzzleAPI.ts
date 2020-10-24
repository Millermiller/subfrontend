import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { Puzzle } from '@/Scandinaver/Puzzle/Domain/Puzzle'
import { Service } from 'typedi'

export namespace API {
  @Service()
  export class PuzzleAPI {
    getPuzzles(): Promise<AxiosResponse<Puzzle[]>> {
      return request.get('/puzzle/user')
    }

    processPuzzle(puzzle: Puzzle): Promise<AxiosResponse> {
      return request.put(`/puzzle/${puzzle.id}/complete`)
    }

    /*
    axios.get('fetch-data')
      .then((response) => {
        let res: Players[] = response.data;
        for(let i = 0; i < res.length; i++){
          self.players.push(res[i]);
        }
      })
      .catch((error: string) => {
        console.log(error);
      });

     */
  }
}
