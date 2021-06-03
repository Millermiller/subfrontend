import { Actions } from 'vuex-smart-module'
import State from '@/Scandinaver/Asset/Infrastructure/store/test/state'
import { Test } from '@/Scandinaver/Asset/Domain/Test'
import TestGetters from '@/Scandinaver/Asset/Infrastructure/store/test/getters'
import TestMutations from '@/Scandinaver/Asset/Infrastructure/store/test/mutations'
import {
  RESET_ERROR, RESET_PERCENT,
  SET_LEVEL,
  SET_QUANTITY,
  SET_TITLE,
} from '@/Scandinaver/Asset/Infrastructure/store/test/mutations.type'

export default class TestActions extends Actions<
  State,
  TestGetters,
  TestMutations,
  TestActions
> {
  public resetTest(test: Test): void {
    this.commit(SET_QUANTITY, test.quantity)
    this.commit(RESET_ERROR)
    this.commit(RESET_PERCENT)
    this.commit(SET_TITLE, test.asset.title)
    // commit(SET_RESULT, test.asset.result)
    this.commit(SET_LEVEL, test.asset.level)
  }
}
