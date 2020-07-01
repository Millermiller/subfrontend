import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'

export class Translate implements Entity {
  id: number
  title: string
  image: string
  active!: boolean
  available: boolean
  text: string
  count: number
  synonyms: any[]
  extra: any[]

  getId(): number {
    return this.id
  }
}
