import { createDecorator } from 'vue-class-component'
import { store } from '@/Scandinaver/Core/Infrastructure/store'

export function Getter(getterType: string) {
  return createDecorator((options, key) => {
    if (!options.computed) options.computed = {}
    options.computed[key] = () => store.getters[getterType]
  })
}
