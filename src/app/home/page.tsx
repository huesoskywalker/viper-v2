// import crypto from 'crypto'

// remove async
export default function HomePage() {
   // const urlToken = '1ccb65e2a1bb6dc35e1da28a3be3f4b745450259f279aaddc156df38012072f8'
   // const dbToken = '20bb30ee5c5888b9a793d2fbbb637c013e11cd4494552b67a4ecad1d6d926e46'
   // const secret = '4d45e66bd8a8cd2f0bd47d2ba92d069b'

   // // Hash the URL token
   // const hashedUrlToken = crypto
   //    .createHash('sha256')
   //    .update(urlToken + secret)
   //    .digest('hex')

   // // Compare hashed tokens
   // const tokensMatch = hashedUrlToken === dbToken

   // console.log(`------tokens match`)
   // console.log(tokensMatch)

   // // Hash the password during user registration and store the hashed password in the database
   // bcrypt.hash(originalPassword, 10, (err, hashedPassword) => {
   //    if (err) {
   //       console.error(err)
   //       return
   //    }

   //    console.log(`Original Password: ${originalPassword}`)
   //    console.log(`Hashed Password: ${hashedPassword}`)

   //    // Simulate user login
   //    const userInputPassword = 'viper'

   //    // Compare the entered password with the hashed password
   //    bcrypt.compare(userInputPassword, hashedPassword, (compareErr, passwordsMatch) => {
   //       if (compareErr) {
   //          console.error(compareErr)
   //          return
   //       }

   //       console.log(`Passwords Match: ${passwordsMatch}`)
   //    })
   // })

   return (
      <div className="m-7 mx-auto  max-w-screen-md space-y-8 sm:px-6 lg:px-8">
         <h2
            data-test-id="authenticated"
            className="text-center text-xl font-medium text-gray-100"
         >
            Your Epic Journey Starts Here
         </h2>
         <p className="text-left text-gray-300">
            Discover, Connect, and Celebrate with our all-in-one app. Meet new people, schedule
            exciting events, buy tickets, and organize social gatherings effortlessly. Your gateway
            to unforgettable experiences
         </p>
      </div>
   )
}
