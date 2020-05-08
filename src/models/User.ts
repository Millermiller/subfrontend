import IPlan from '@/models/Plan'
import { store } from '@/store'
import { Asset } from '@/models/Asset'

export interface IUser {
  avatar: string
  email: string
  id: number
  login: string
  active_to: any
  active: boolean
  plan: IPlan
  getFavouriteAsset(): Asset
}

export class User implements IUser {
  avatar!: string
  email!: string
  id!: number
  login!: string
  active_to: any
  active!: boolean
  plan!: IPlan
  cardsCreated: number

  constructor(id: number, email: string, login: string, avatar: string) {
    this.id = id
    this.email = email
    this.login = login
    this.avatar = avatar
  }

  getFavouriteAsset(): Asset {
    return store.getters.favouriteAsset
  }
}
