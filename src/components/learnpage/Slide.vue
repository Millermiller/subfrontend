<template lang="pug">
  .slide
    p.word {{item.word.word}}
    template(v-if="!item.nocontrols")
      .translate-area.pointer(@click="showTranslate")

        template(v-if="show && item.translate")
          p.slide-value {{item.translate.value}}

          .example-area
            template(v-for="(example, index) in item.examples")
              p.example-text(:html="example.text", :key="index")
              p.example-value(v-html="example.value", :key="index")
          el-row.danger.text-right.small.creator(v-if="item.word.creator")

            el-popover(placement="top-start", width="250", trigger="hover")
              el-row
                el-col(:span="6")
                  .avatar-wrapper-small.pull-left
                    .avatar
                      img.avatar-small(:src="item.word.user.avatar")
                el-col(:span="18")
                  p.text-danger {{item.word.user.login}}
                  p Создано карточек: {{item.word.user.cardsCreated}}
              span.no-margin.danger.pull-right.small(slot="reference") Добавлено: {{item.word.user.login}}

        i.ion-help(v-else)
      audio(:src="item.word.audio", preload="none", ref="player")

      i(:class="['ion favourite-button pointer', favouriteButtonClass()]", @click="favourite")
      i.ion-ios-volume-high.ion.pointer(@click="play")
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import cardAPI from '@/api/cardAPI'
import { ICard } from '@/models/Card'

  @Component({
    name: 'Slide',
  })
export default class Slide extends Vue {
    @Prop({ required: true })
    private item!: ICard

    activeClass: string = 'ion-ios-star'

    defaultClass: string = 'ion-ios-star-outline'

    show: boolean = false

    get favouriteButtonClass(): string {
      return this.item.favourite ? this.activeClass : this.defaultClass
    }

    @Watch('$route', { immediate: true, deep: true })
    onUrlChange(newVal: any) {
      this.show = false
    }

    showTranslate() {
      this.show = (!this.show)
    }

    play() {
      // @ts-ignore
      this.$refs.player.play()
    }

    favourite() {
      const self = this
      if (!this.item.favourite) {
        cardAPI.addFavourite(this.item).then((response) => {
          if (response.status === 201) {
            self.item.favourite = true
            self.$notify.success({
              title: self.item.word!.word,
              message: 'Добавлено в Избранное',
              duration: 2000,
            })
            this.$store.commit('addCardToFavorite')
          } else {
            console.log(response.data)
          }
        },
        (error) => {
          console.log(error)
        })
      } else {
        cardAPI.destroyFavourite(this.item).then((response) => {
          if (response.status === 204) {
            self.item.favourite = false
            self.$notify.success({
              title: self.item.word!.word,
              message: 'Удалено из Избранного',
              duration: 2000,
            })
            this.$store.commit('removeCardFromFavorite')
          } else {
            console.log(response.data)
          }
        },
        (error) => {
          console.log(error)
        })
      }
    }
}
</script>
<style>
  .slide-value {
    border-bottom: 1px solid #dadada;
    width: 80%;
    text-align: center;
    padding-bottom: 40px;
  }
  .swiper-slide.swiper-slide-active {
    transform: translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) !important;
  }
  .slide {
    padding: 10px;
    height: 100%;
    width: 100%;
    position: relative;
  }

  .slide .word {
    border-bottom: 1px solid rgb(209, 219, 229);
    font-size: 1.3em;
  }

  .slide .ion-ios-volume-high {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  .slide > .item {
    height: 250px;
    padding-top: 20px;
    background-color: #f5f5f5;
    transition: left 0.1s ease-out 0s;
  }
  .word {
    text-align: center;
    font-size: 2em;
    padding-bottom: 10px;
  }

  .value {
    padding-top: 10px;
    line-height: 1;
  }
  .example-value {
    font-style: italic;
  }

  .example-area {
    margin-top: 40px;
  }
  .translate-area {
    position: relative;
    min-height: 80%;
    border: 1px dashed #dadada;
    display: flex;
    align-items: center;
    align-content: center;
    flex-direction: column;
    padding-top: 40px;
  }
  .translate-area .ion-help {
    font-size: 6em;
    color: #dadada;
  }
</style>
