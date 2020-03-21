<template lang="pug">
  el-col(:lg='{span: 12, offset: 2}', :xs='{span: 24, offset: 0}')
    el-card#slider-intro(v-loading.body='loading')
      swiper(:options='swiperOption', ref='mySwiperA')
        swiper-slide(v-for='(card, index) in cards', :key='index')
          slide(:item='card')
        .swiper-pagination(slot='pagination')
        .swiper-button-prev(slot='button-prev')
        .swiper-button-next(slot='button-next')
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import Slide from '@/components/learnpage/Slide.vue'
import assetAPI from '@/api/assetAPI'
import { Card, ICard } from '@/models/Card'
import { Word } from '@/models/Word'

  @Component({
    name: 'Slider',
    components: { slide: Slide },
  })
export default class Slider extends Vue {
    title: string = ''

    cards: ICard[] = []

    loading: boolean = false

    swiperOption: any = {
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      //  nextButton: '.swiper-button-next',
      //  prevButton: '.swiper-button-prev',
      spaceBetween: 30,
      // loop: true,
      grabCursor: true,

      //   effect: 'coverflow',
      centeredSlides: true,
      slidesPerView: 1.5,
      //    coverflow: {
      //        rotate: 0,
      //        stretch: 90,
      //        depth: 200,
      //        modifier: 1,
      //        slideShadows: false
      //    }
    }

    metaInfo() {
      return {
        title: this.title ? `Обучение | ${this.title}` : 'Обучение',
      }
    }

    @Watch('$route')
    private onRouteChange(route: Route) {
      if (route.params.id) this.getAsset(parseInt(route.params.id, 10))
    }

    getAsset(id: number) {
      this.loading = true
      assetAPI.getAsset(id).then((response: any) => {
        if (response.data.success === false) {
          this.$notify.error({
            title: 'Ошибка',
            message: response.data.message,
            duration: 4000,
          })
        } else {
          this.$store.commit('setSelection', id)
          this.cards = response.data.cards
          this.$store.dispatch('setActiveAssetType', response.data.type)
          this.swiper.slideTo(0)
          this.loading = false
          this.title = response.data.title
        }
      }, (response: any) => {
        console.log(response)
      })
    }

    get swiper() {
      // @ts-ignore
      return this.$refs.mySwiperA.swiper
    }

    created() {
      if (parseInt(this.$route.params.id, 10) > 0) this.getAsset(parseInt(this.$route.params.id, 10))
      else {
        this.cards.push(new Card(new Word('Выберите словарь'), true))
      }
    }
}
</script>
