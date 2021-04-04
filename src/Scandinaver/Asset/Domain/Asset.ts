import { Card } from '@/Scandinaver/Asset/Domain/Card'
import { Transform, Type } from 'class-transformer'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'
import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'
import AssetDTO from '@/Scandinaver/Asset/Domain/AssetDTO'
import { Collection } from '@/Scandinaver/Core/Domain/Collection'

export class Asset extends Entity {
  private _id: number | null
  private _cards: Collection<Card>
  private _title: string
  private _type: AssetType
  private _level: number
  private _selected?: boolean
  private _count: number
  private _basic: boolean
  private _language: string
  public active: boolean

  constructor() {
    super();
    this._cards = new Collection<Card>([])
  }

  get id(): number {
    return this._id
  }

  set id(value: number) {
    this._id = value
  }

  getId(): number {
    return this._id;
  }

  get level(): number {
    return this._level
  }

  set level(value: number) {
    this._level = value
  }
  get type(): AssetType {
    return this._type
  }

  set type(value: AssetType) {
    this._type = value
  }
  get title(): string {
    return this._title
  }

  set title(value: string) {
    this._title = value
  }

  get cards(): Collection<Card> {
    return this._cards
  }

  @Type(() => Card)
  @Transform(value => new Collection(value), { toClassOnly: true })
  set cards(value: Collection<Card>) {
    this._cards = value
  }

  get basic(): boolean {
    return this._basic
  }

  set basic(value: boolean) {
    this._basic = value
  }

  get count(): number {
    return this._count
  }

  set count(value: number) {
    this._count = value
  }

  toDTO(): AssetDTO {
    return {
      language: this._language,
      id: this._id,
      title: this._title,
      level: this._level,
      basic: this._basic,
      type: this._type,
    }
  }
}
