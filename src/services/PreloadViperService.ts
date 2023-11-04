import { ViperService } from './ViperService'
import { PreloadViperServiceSource } from '@/types/viper-repository'

export class PreloadViperService implements PreloadViperServiceSource {
   private viperService: ViperService
   constructor(viperService: ViperService) {
      this.viperService = viperService
   }
   async preloadGetById(viperId: string): Promise<void> {
      void (await this.viperService.getById(viperId))
   }

   async preloadBasicProps(viperId: string): Promise<void> {
      void (await this.viperService.getBasicProps(viperId))
   }
}
