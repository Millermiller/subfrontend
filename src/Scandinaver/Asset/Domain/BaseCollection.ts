import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'
import CollectionException from '@/Scandinaver/Core/Domain/CollectionException'

export abstract class BaseCollection<T extends Entity> implements Iterable<T> {
  private readonly data: T[]
  private index: number = 0
  private counter = 0

  constructor(data: T[]) {
    this.data = data
  }

  public get(id: number): T {
    return this.data[id]
  }

  public add(data: T): void {
    this.data.push(data)
  }

  public remove(value: T): any {
    const idx = this.data.findIndex(el => el.getId() === value.getId())
    if (idx !== -1) {
      return this.data.splice(idx, 1)
    }
    return false
  }

  public shuffle(): void {
    let i = this.data.length
    let j
    let tmp
    if (i === 0) {
      // return true;
    }
    while (--i) {
      j = Math.floor(Math.random() * (i + 1))
      tmp = this.data[i]
      this.data[i] = this.data[j]
      this.data[j] = tmp
    }
  }

  public count(): number {
    return this.data.length
  }

  public prev(): T {
    if (this.count() >= this.index - 1) {
      return this.get(this.index - 1)
    }
    throw new CollectionException('item not fount')
  }

  public next(): T {
    if (this.count() >= this.index + 1) {
      return this.get(this.index + 1)
    }
    throw new CollectionException('item not fount')
  }

  public current(key: number): T {
    return this.data[key]
  }

  public valid(key: number): boolean {
    return key < this.data.length
  }

  [Symbol.iterator](): Iterator<T> {
    const { data } = this
    return {
      next: (...args): IteratorResult<T, any> => {
        if (this.counter < data.length) {
          const item = data[this.counter]
          this.counter++
          return {
            done: false,
            value: item,
          }
        }
        return {
          done: true,
          value: undefined,
        }
      },
    }
  }
}
