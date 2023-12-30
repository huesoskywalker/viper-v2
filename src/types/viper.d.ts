import { DeleteResult, ObjectId, WithId } from 'mongodb'
import { Event } from './event'
import { Session } from 'next-auth'

export type Viper = {
   readonly _id: _ID
   name: Name
   email: Email
   emailVerified: Date | null
   username: Username
   role: Role
   bio: Biography
   location: Location
   contactInfo: ContactInfo
   birthDate: BirthDate
   blogs: Blog
   password: string | undefined
   image: Image
   backgroundImage: Image
   shopify: Shopify
   events: MyEvents
   followers: Follow[]
   followings: Follow[]
   contentDiscovery: boolean
   createdAt: Date
}

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

export type _ID = ObjectId | Hex24String

export type Location = string

export type ContactInfo = {
   phone: number | null
   address: string
   // city: string
   // zip: string
   website: string
}

type Biography = string

type BirthDate = {
   day: string
   month: string
   year: string
}

type Role = 'admin' | 'viper' | 'newViper' | 'needUpdate'

type Email = string

type Username = string

type Image = string

type Name = string

export type MyEvents = {
   created: CreatedEvent[]
   collection: EventCollection[]
   likes: Like[]
}
export type CreatedEvent = {
   readonly _id: _ID
}

export type EventCollection = {
   readonly _id: _ID
   readonly checkoutId: string
}

export type Like = {
   readonly _id: _ID
}

export type Follow = {
   readonly _id: _ID
}

export type Blog = {
   personal: PersonalBlog[]
   likes: ExternalBlog[]
   withReplies: ExternalBlog[]
}

export type PersonalBlog = {
   readonly _id: _ID
   content: string
   likes: Like[]
   replies: Reply[]
   timestamp: number
}

export type Reply = {
   readonly _id: _ID
   viperId: _ID
   content: string
   likes: Like[]
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

export type ViperBasic = Pick<
   Viper,
   | '_id'
   | 'name'
   | 'email'
   | 'username'
   | 'role'
   | 'bio'
   | 'location'
   | 'image'
   | 'backgroundImage'
   | 'followers'
   | 'followings'
>

// most probably we should do something like this -> (_id needed?)
// Like this will be more clean, pick what we would like to update and then make them optional
export type UpdateViper = Partial<UpdateViperType>
type UpdateViperPick = Pick<
   Viper,
   | 'name'
   | 'username'
   | 'bio'
   | 'location'
   | 'birthDate'
   | 'password'
   | 'image'
   | 'backgroundImage'
   | 'contentDiscovery'
>

export type UploadViperImage = {
   data: { url } | null
   error: string | null
}
