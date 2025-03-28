export default function HomePage() {
   return (
      <div className="mx-auto max-w-screen-md space-y-8 p-7 sm:px-6 lg:px-8">
         <h2
            data-test-id="authenticated"
            className="text-center text-xl font-medium text-foreground"
         >
            Your Epic Journey Starts Here
         </h2>
         <p className="text-left text-secondary-foreground">
            Discover, Connect, and Celebrate with our all-in-one app. Meet new people, schedule
            exciting events, buy tickets, and organize social gatherings effortlessly. Your gateway
            to unforgettable experiences
         </p>
      </div>
   )
}
