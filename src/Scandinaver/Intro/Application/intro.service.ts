import Intro from '@/Scandinaver/Intro/Domain/Intro'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import { Service } from 'typedi'
import { BehaviorSubject } from 'rxjs'

@Service()
export default class IntroService {
  public stream: BehaviorSubject<any> = new BehaviorSubject<any>(false)

  public getForPage(page: any): Intro[] {
    return store.getters.intro.filter((el: Intro) => el.page === page)
  }
}
