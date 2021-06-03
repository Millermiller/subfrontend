import { Inject, Service } from 'typedi'
import { API } from '@/Scandinaver/Asset/Infrastructure/api/reader.api'
import ReaderAPI = API.ReaderAPI

@Service()
export default class ReaderService {
  @Inject()
  private readonly api: ReaderAPI

  public async read(text: string): Promise<void> {
    const result = await this.api.read(text)
    const { data } = result

    const context = new AudioContext()

    await context.decodeAudioData(data, (decodedData) => {
      const smp = context.createBufferSource()
      smp.buffer = decodedData
      smp.connect(context.destination)
      smp.start(0, 0, decodedData.duration)
    })
  }
}
