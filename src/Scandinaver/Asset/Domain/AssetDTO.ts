import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'

export default interface AssetDTO {
  id: number | null
  title: string
  level: number
  basic: boolean
  type: AssetType
  language: string
}
