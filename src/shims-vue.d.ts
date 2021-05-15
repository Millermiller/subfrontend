import { Tour } from 'vue-tour';

declare module '*.vue' {
  import Vue from 'vue'

  export default Vue
}
declare module 'vue/types/vue' {
  interface Vue {
    $tours: Record<string, Tour>;
  }
}
