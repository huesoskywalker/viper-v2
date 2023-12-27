import { PreloadViperServiceSource } from '@/types/repository/viper-repository'
import { ViperService } from './ViperService'

export class PreloadViperService implements PreloadViperServiceSource {
   private viperService: ViperService
   constructor(viperService: ViperService) {
      this.viperService = viperService
   }
   async preloadGetById(viperId: string): Promise<void> {
      void (await this.viperService.getById(viperId))
   }

   async preloadBasicProps(viperId: string): Promise<void> {
      void (await this.viperService.getByIdBasic(viperId))
   }
}
