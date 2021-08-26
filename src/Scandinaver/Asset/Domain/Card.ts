import { Term } from '@/Scandinaver/Asset/Domain/Term'
import Translate from '@/Scandinaver/Asset/Domain/Translate'
import { User } from '@/Scandinaver/Core/Domain/User'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { Transform, Type } from 'class-transformer'
import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'
import Example from '@/Scandinaver/Asset/Domain/Example'
import { Collection } from '@/Scandinaver/Core/Domain/Collection'

export class Card extends Entity {
  private _id!: number
  private _nocontrols?: boolean
  private _favourite?: boolean
  private _asset: Asset
  private _exist: boolean
  private _term: Term
  private _translate: Translate
  private _user: User
  private _examples: Collection<Example>

  @Type(() => Translate)
  set translate(value: Translate) {
    this._translate = value
  }

  @Type(() => Term)
  set term(value: Term) {
    this._term = value
  }

  @Type(() => User)
  set user(value: User) {
    this._user = value
  }

  @Type(() => Example)
  @Transform(value => new Collection(value), { toClassOnly: true })
  set examples(value: Collection<Example>) {
    this._examples = value
  }

  getId(): number {
    return this._id
  }

  get id(): number {
    return this._id
  }

  set id(value: number) {
    this._id = value
  }

  get nocontrols(): boolean {
    return this._nocontrols
  }

  set nocontrols(value: boolean) {
    this._nocontrols = value
  }

  get favourite(): boolean {
    return this._favourite
  }

  set favourite(value: boolean) {
    this._favourite = value
  }

  get asset(): Asset {
    return this._asset
  }

  set asset(value: Asset) {
    this._asset = value
  }

  get exist(): boolean {
    return this._exist
  }

  set exist(value: boolean) {
    this._exist = value
  }

  get term(): Term {
    return this._term
  }

  get translate(): Translate {
    return this._translate
  }

  get user(): User {
    return this._user
  }

  get examples(): Collection<Example> {
    return this._examples
  }

  get subject(): string {
    return this._term.getValue()
  }

  get value(): string {
    return this._translate.getValue()
  }
}
