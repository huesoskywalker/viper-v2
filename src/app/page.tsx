export default function HomePage() {
   return (
      <div className="max-w-screen-md mx-auto  space-y-8 m-7 lg:px-8 sm:px-6">
         <h2
            data-test-id="authenticated"
            className="text-xl font-medium text-gray-100 text-center"
         >
            Your Epic Journey Starts Here
         </h2>
         <p className="text-gray-300 text-left">
            Discover, Connect, and Celebrate with our all-in-one app. Meet new people, schedule
            exciting events, buy tickets, and organize social gatherings effortlessly. Your gateway
            to unforgettable experiences
         </p>
      </div>
   )
}
