<template lang="pug">
  .loginpage
    .form-wrapper
      el-card(v-loading.body="loading")
        .clearfix(slot="header")
        el-form(ref="loginform", :model="form", :rules="rules", @submit.native.prevent="submit")
          small(v-if="error" style="color:#ff4949") {{error}}
          el-form-item(prop="login")
            el-input(v-model="form.login", placeholder="Login")
          el-form-item(prop="password")
            el-input(v-model="form.password", type="password", placeholder="Password", auto-complete="on")
          el-form-item
            el-button(type="primary", native-type="submit") Вход
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import commonAPI from '@/api/commonAPI'
import ILoginForm from '@/api/ILoginForm'
import { LoginService } from '@/services/LoginService';

  @Component
export default class Login extends Vue {
    form: ILoginForm = {
      login: '',
      password: '',
    }

    rules: {} = {
      login: [
        { required: true, message: 'Введите логин или email', trigger: 'submit' },
      ],
      password: [
        { required: true, message: 'Введите пароль', trigger: 'submit' },
      ],
    }

    error: string = ''

    loading: boolean = false
    /*
    created() {
      this.loading = true
      commonAPI.check()
      commonAPI.check().then((response) => {
        if (response.data.auth === true) {
          this.$router.push({ name: 'main' })
        } else {
          this.loading = false
        }
      }, (response) => {
        console.log(response)
      })
    }
*/
    submit() {
      const v = this
      // @ts-ignore
      this.$refs.loginform.validate((valid) => {
        if (valid) {
          v.loading = true
          LoginService.execute(v.form).then(
            (response) => {
            //  this.$store.commit('setAuth', true)
            //  this.$store.dispatch('setStore', response.data.state)
            //  this.$store.commit('setSelection', 0)
              this.$router.push({ path: 'main' })
            },
          ).catch((error: any) => {
            v.error = error
            v.loading = false;
          })
        }
      })
    }
}
</script>
<style>
  .loginpage{
    background-size: cover;
    height: 100vh;
    width: 100%;
  }
  .loginpage .el-form-item__content{
    text-align: center;
  }
  .loginpage .form-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
