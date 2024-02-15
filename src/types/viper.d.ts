import { DeleteResult, ObjectId, WithId } from 'mongodb'
import { Event } from './event'
import { Session } from 'next-auth'

export type Viper = {
   readonly _id: _ID
   name: Name
   email: Email
   emailVerified: Date | null
   username: Username
   verified: boolean
   website: string
   role: Role
   bio: Biography
   location: Location
   birthDate: BirthDate
   password: string | undefined
   passwordResetMotive: string[]
   image: Image
   backgroundImage: Image
   events: MyEvents
   followers: Follow[]
   followersCount: number
   following: Follow[]
   followingsCount: number
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

// TODO: fix this types
export type MyEvents = {
   listings: CreatedEvent[]
   going: EventCollection[]
   interested: Like[]
}
export type CreatedEvent = {
   readonly _id: _ID
}

export type EventCollection = {
   readonly _id: _ID
   // readonly checkoutId: string
}

export type Like = {
   readonly _id: _ID
}

export type Follow = {
   readonly _id: _ID
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

export type ViperBasic = Pick<
   Viper,
   | '_id'
   | 'name'
   | 'email'
   | 'username'
   | 'verified'
   | 'website'
   | 'role'
   | 'bio'
   | 'location'
   | 'image'
   | 'backgroundImage'
   | 'followersCount'
   | 'followingsCount'
   | 'createdAt'
>

export type ViperSimple = Pick<Viper, '_id' | 'name' | 'username' | 'image' | 'verified'>

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
