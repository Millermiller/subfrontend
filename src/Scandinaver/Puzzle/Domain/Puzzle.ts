import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'
import Piece from '@/Scandinaver/Puzzle/Domain/Piece'
import { Collection } from '@/Scandinaver/Core/Domain/Collection'

export class Puzzle extends Entity {
  id!: number
  active: boolean
  success!: boolean
  text!: string
  translate: any
  pieces: Collection<Piece>

  getId(): number | string {
    return this.id
  }

  generate(): Puzzle {
    const slices = this.translate.split(' ')
    const pieces: Piece[] = []
    slices.forEach((item: string) => {
      pieces.push(new Piece(item))
    })
    this.pieces = new Collection<Piece>(pieces)
    return this
  }

  get count(): number {
    return this.pieces.count()
  }

  setActive(active: boolean) {
    this.active = active
    return this
  }
}
