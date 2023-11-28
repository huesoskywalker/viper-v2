export default function HomePage() {
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
