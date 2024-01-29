import { PreloadViperServiceSource } from '@/types/preload/perload-viper'
import { ViperService } from './ViperService'

export class PreloadViperService implements PreloadViperServiceSource {
   private viperService: ViperService
   constructor(viperService: ViperService) {
      this.viperService = viperService
   }
   getByUsername(username: string): void {
      void this.viperService.getByUsername(username)
   }

   getById(viperId: string): void {
      void this.viperService.getById(viperId)
   }

   isFollowing(viperId: string, sessionId: string): void {
      void this.viperService.isFollowing(viperId, sessionId)
   }
}
