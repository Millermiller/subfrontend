<template>
  <div class="loginpage">
    <div class="form-wrapper">
      <el-card v-loading.body="loading">
        <el-form
          ref="loginform"
          :model="form"
          :rules="rules"
          @submit.native.prevent="submit"
        >
          <small v-if="error" style="color: #ff4949">
            {{ error }}
          </small>
          <el-form-item prop="login">
            <el-input v-model="form.username" placeholder="Login"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="Password"
              auto-complete="on"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit">{{ $t('enter') }}</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ILoginForm from '@/Scandinaver/Core/Domain/Contract/ILoginForm'
import { LoginService } from '@/Scandinaver/Core/Application/login.service'
import { Inject } from 'vue-typedi'

@Component
export default class Login extends Vue {
  @Inject()
  private readonly loginService: LoginService

  public form: ILoginForm = {
    username: '',
    password: '',
  }

  public rules: {} = {
    username: [
      { required: true, message: 'Введите логин или email', trigger: 'submit' },
    ],
    password: [
      { required: true, message: 'Введите пароль', trigger: 'submit' },
    ],
  }

  public error: string = ''
  public loading: boolean = false

  public submit(): void {
    const v = this
    // @ts-ignore
    this.$refs.loginform.validate((valid) => {
      if (valid) {
        v.loading = true
        this.loginService
          .login(v.form)
          .then(() => this.$router.push('/'))
          .catch((error: any) => {
            v.error = error
            v.loading = false
          })
      }
    })
  }
}
</script>
<style lang="scss">
.loginpage {
  background-size: cover;
  height: 100vh;
  width: 100%;
  .el-form-item__content {
    text-align: center;
  }
  .form-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}
</style>
