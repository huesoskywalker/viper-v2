import { DeleteResult, InsertOneResult, WithId, ObjectId } from 'mongodb'
import { FormattedAddress, FormattedAddressURL, LatLngLiteral } from './google-maps-api'
import { _ID } from './viper'

export type EventProps = {
   readonly _id: _ID
   organizer: Organizer
   title: Title
   content: Content
   date: EventDate
   time: EventTime
   location: Location
   category: Category
   image: Image
   price: Price
   entries: Entries
   product: Product
   participants: Participant[]
   likes: Like[]
   comments: Comment[]
   creationDate: EventDate
   updatedDate: EventDate
}

export type UpdateEvent = Pick<
   EventProps,
   '_id' | 'title' | 'content' | 'date' | 'category' | 'updatedDate' | 'price'
>
export type CreateEvent = Pick<
   EventProps,
   | 'organizer'
   | 'title'
   | 'content'
   | 'date'
   | 'time'
   | 'location'
   | 'category'
   | 'image'
   | 'price'
   | 'entries'
   | 'product'
>
type Title = string

type Content = string

type EventDate = Date | number

type EventTime = string

type Category = string

type Image = string

type Price = number

type Entries = number

export type Location = {
   address: Address
   coordinates: LatLngLiteral
   url: FormattedAddressURL
}

export type Address = {
   street: string
   postalCode: string
   province: string
   country: string
}
// Check here why string, Probably:
// 1- to go through components as strings instead of Object,
// 2 - no need to place and Object Id, probably won't be a search query.
// Recheck even
export type Organizer = {
   _id: string
   name: string
   email: string
}
export type Participant = {
   readonly _id: _ID
}
export type Like = {
   readonly _id: _ID
}
export type Comment = {
   readonly _id: _ID
   viperId: _ID
   text: string
   likes: Like[]
   replies: Reply[]
   timestamp: number
}

export type Reply = {
   readonly _id: Object
   viperId: string
   reply: string
   likes: Like[]
   timestamp: number
}

export type Product = {
   _id: string
   variant_id: string
}

export type UploadEventImage = {
   data: {
      url: string
      filename: string
      type: string
      size: string
   } | null
   error: string | null
}
