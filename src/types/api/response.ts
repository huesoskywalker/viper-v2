import { WithId } from 'mongodb'
import { ViperBasic } from '../viper'

export type ApiResponse<Data> = {
   data: Data
   error: string
}

export type BasicViperResponse = ApiResponse<WithId<ViperBasic>>
