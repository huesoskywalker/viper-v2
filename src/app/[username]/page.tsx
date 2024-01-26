import ProfileCalendar from './_components/profile-calendar'
// import { preloadViperBlogs } from '../../lib/vipers'

export default function ProfilePage() {
   // preloadViperBlogs(viperId)
   return (
      <div className="flex items-center justify-center">
         <ProfileCalendar />
      </div>
   )
}
