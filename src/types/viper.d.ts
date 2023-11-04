import { DeleteResult, ObjectId, WithId } from 'mongodb'
import { Event } from './event'
import { Session } from 'next-auth'

export type Viper = {
   readonly _id: _ID
   username: Username
   address: Address
   backgroundImage: Image
   biography: Biography
   blogs: Blog
   email: Email
   emailVerified: null
   name: Name
   image: Image
   shopify: Shopify
   myEvents: MyEvents
   followers: Follow[]
   follows: Follow[]
}
type Username = string
type Image = string

type Biography = string

type Email = string

type Name = string

export type MyEvents = {
   readonly _id: _ID
   created: CreatedEvent[]
   collection: EventCollection[]
   liked: Likes[]
}
export type CreatedEvent = {
   readonly _id: _ID
}
export type EventCollection = {
   readonly _id: _ID
   readonly checkoutId: string
}
export type Likes = {
   readonly _id: _ID
}
export type Follow = {
   readonly _id: _ID
}
export type Address = {
   // phone in here? non sense. make an additional contact {} email and phone ...props
   // phone: number | null | string
   address: string
   province: string
   country: string
   zip: number | null | string
   city: string
}

export type Blog = {
   personal: PersonalBlog[]
   liked: ExternalBlog[]
   commented: ExternalBlog[]
}

export type PersonalBlog = {
   readonly _id: _ID
   content: string
   likes: Likes[]
   comments: BlogComment[]
   timestamp: number
}

export type BlogComment = {
   readonly _id: _ID
   viperId: _ID
   content: string
   likes: Likes[]
   // if we want to keep nesting we should uncomment the following
   // comments: BlogComment[]
   timestamp: number
}
// Should be great if we add another DB or Collection for Blogs, and mostly everything
// So we can store only the _id and then map through the blogs and retrieve the comments
// That will make the docs lighter
export type ExternalBlog = {
   readonly _id: _ID
   readonly viperId: _ID
}

export type Chats = {
   readonly _id: _ID
   members: _ID[]
   messages: Message[]
}
export type Message = {
   readonly _id: _ID
   sender: _ID
   message: string
   timestamp: number
}

export type Sender = {
   readonly _id: _ID
   name: string
}
export type Shopify = {
   customerAccessToken: string
   customerId: string
}

export type ViperBasicProps = Pick<
   Viper,
   | '_id'
   | 'name'
   | 'image'
   | 'backgroundImage'
   | 'email'
   | 'address'
   | 'biography'
   | 'followers'
   | 'follows'
>

// most probably we should do something like this -> (_id needed?)
// Like this will be more clean, pick what we would like to update and then make them optional
export type UpdateViper = Partial<UpdateViperType>
type UpdateViperPick = Pick<
   Viper,
   '_id' | 'name' | 'biography' | 'image' | 'backgroundImage' | 'location'
>

export type Hex24String = `${
   | '0'
   | '1'
   | '2'
   | '3'
   | '4'
   | '5'
   | '6'
   | '7'
   | '8'
   | '9'
   | 'a'
   | 'b'
   | 'c'
   | 'd'
   | 'e'
   | 'f'}{24}`
// export type Hex24String = string & { length: 24 }

export type _ID = ObjectId | Hex24String
export type UploadViperImage = {
   data: { url } | null
   error: string | null
}
