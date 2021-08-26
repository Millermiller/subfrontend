import Component from 'vue-class-component'
import Result from './components/test.page.component/result.component/index.vue'
import TabsComponent from '../../../Core/UI/tabs.component/index.vue'
import { Module } from '@/Scandinaver/Core/UI/Module'

@Component({
  name: 'Tests',
  components: {
    Result,
    TabsComponent,
  },
})
export default class Tests extends Module {

}
