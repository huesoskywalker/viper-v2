import { WithId } from 'mongodb'
import { ViperBasicProps } from '../viper'

export type ApiResponse<Data> = {
   data: Data
   error: string
}

export type BasicViperResponse = ApiResponse<WithId<ViperBasicProps>>
