export const VIPER_BASIC_PROPS = {
   _id: 1,
   location: 1,
   bio: 1,
   email: 1,
   role: 1,
   username: 1,
   verified: 1,
   website: 1,
   name: 1,
   image: 1,
   backgroundImage: 1,
   followersCount: 1,
   followingsCount: 1,
   createdAt: 1,
}

export const VIPER_SIMPLE = {
   _id: 1,
   username: 1,
   verified: 1,
   name: 1,
   image: 1,
}

export const VIPER_WITHOUT_PASSWORD = {
   location: 1,
   contactInfo: {
      phone: 1,
      address: 1,
      website: 1,
   },
   bio: 1,
   birthDate: {
      day: 1,
      month: 1,
      year: 1,
   },
   blogs: {
      personal: 1,
      likes: 1,
      withReplies: 1,
   },
   emailVerified: 1,
   email: 1,
   role: 1,
   username: 1,
   name: 1,
   image: 1,
   backgroundImage: 1,
   shopify: {
      customerAccessToken: 1,
      customerId: 1,
   },
   events: {
      created: 1,
      collection: 1,
      likes: 1,
   },
   followers: 1,
   followings: 1,
   contentDiscovery: 1,
   createdAt: 1,
}
