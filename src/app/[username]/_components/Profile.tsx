import Image from 'next/image'
// import { getViperBasicProps, preloadViperFollowed } from '@/lib/vipers'
// import ViperInfo from './ViperInfo'
// import { Follow, ViperBasicProps } from '@/types/viper'
// import { EditProfileLink } from './EditProfileLink'
// import { CheckFollow } from './CheckFollow'
// import { ShowFollows } from './ShowFollows'
import Link from 'next/link'
import { Follow, ViperBasic } from '@/types/viper'
import { viperService } from '@/services/servicesInitializer'
import { BadgeCheck } from 'lucide-react'

export const Profile = async ({ viperId, profile }: { viperId: string; profile: boolean }) => {
   // Change name for Viper
   const viper: ViperBasic | null = await viperService.getByIdBasic(viperId)
   //    preloadViperFollowed(viperId)

   const profileWidth = 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'

   return (
      <div className="min-h-screen pb-20">
         <div>
            <Image
               data-test="background-image"
               alt={viper.name}
               src={viper.backgroundImage ?? '/default-user.png'}
               width={560}
               height={280}
               placeholder="blur"
               loading="lazy"
               blurDataURL={viper.image}
               quality={100}
               className="-z-10 h-48 w-full rounded-xl object-cover object-center lg:h-56"
            />
            <div className={`${profileWidth} -mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5`}>
               <div className="relative flex h-28 w-28 justify-center overflow-hidden rounded-full border-4 border-solid border-yellow-600 align-middle">
                  {/* this is nice, clicking the image and opening it to catch a view */}
                  {/* <Link href={'profile-image'}> */}
                  <Image
                     data-test="profile-image"
                     alt={viper.name}
                     src={`${viper.image}`}
                     width={140}
                     height={140}
                     placeholder="blur"
                     loading="lazy"
                     blurDataURL={viper.image}
                     quality={100}
                     className="object-cover object-center"
                  />
                  {/* </Link> */}
               </div>
               <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                  <div className="flex min-w-0 flex-1 items-center space-x-2">
                     <h1 className="truncate text-2xl font-semibold text-white">{viper.name}</h1>

                     {/* account verified */}
                     <BadgeCheck className="text-viper-dodger-blue" />

                     {/*  */}
                  </div>
                  {viper ? (
                     <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                        <a
                           href={`https://github.com/${viper.name}`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="transition-all inline-flex justify-center rounded-md border border-gray-800 bg-black px-4 py-2 font-mono text-sm font-medium text-white shadow-sm hover:border-white focus:outline-none focus:ring-0"
                        >
                           <span>Edit Profile</span>
                        </a>
                     </div>
                  ) : (
                     <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                        <a
                           href="https://github.com/vercel/mongodb-starter"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="transition-all inline-flex justify-center rounded-md border border-gray-800 bg-black px-4 py-2 font-mono text-sm font-medium text-white shadow-sm hover:border-white focus:outline-none focus:ring-0"
                        >
                           <span>Follow</span>
                        </a>
                     </div>
                  )}
               </div>
            </div>
         </div>

         <div className={`${profileWidth} mt-16`}>
            <h2 className="font-mono text-2xl font-semibold text-foreground">Bio</h2>
            <article className="prose prose-headings:text-foreground prose-a:text-white mt-3 max-w-2xl font-mono text-sm leading-6 tracking-wider text-white">
               What's going on here
            </article>
         </div>
      </div>
   )
   //    return (
   //       <div className="grid lg:grid-cols-4">
   //          <div className="overflow-hidden lg:col-span-4">
   //             {/* <div className="bg-black"> */}
   //             <Image
   //                data-test="background-image"
   //                alt={viper.name}
   //                src={viper.backgroundImage ?? '/default-user.png'}
   //                width={700}
   //                height={560}
   //                //   placeholder="blur"
   //                loading="lazy"
   //                //   blurDataURL={viper.image}
   //                quality={100}
   //                style={{
   //                   objectFit: 'cover',
   //                   objectPosition: 'center',
   //                   maxHeight: '12rem',
   //                }}
   //                className="-z-10 -mb-2  rounded-xl group-hover:opacity-80"
   //             />
   //             {/* </div> */}
   //             <div className="relative bottom-9 left-7 z-10">
   //                <Image
   //                   data-test="profile-image"
   //                   alt={viper.name}
   //                   src={`${viper.image}`}
   //                   width={120}
   //                   height={120}
   //                   placeholder="blur"
   //                   loading="lazy"
   //                   blurDataURL={viper.image}
   //                   quality={100}
   //                   style={{
   //                      objectFit: 'contain',
   //                      objectPosition: 'top',
   //                   }}
   //                   className="  rounded-full border-2 border-solid border-yellow-600 group-hover:opacity-80"
   //                />
   //                <div className="grid grid-cols-2">
   //                   <h1 data-test="viper-name" className="mt-4 text-sm text-yellow-700">
   //                      {viper.name}
   //                      <p className="mt-1 text-xs text-gray-300">{viper.email}</p>
   //                      <p className="mt-2 text-xs text-gray-400">
   //                         Settled in{' '}
   //                         <span data-test="viper-location" className="text-gray-200 ">
   //                            In here does goes the location
   //                            {/* {viper.address.country ?? 'Planet Earth'} */}
   //                         </span>
   //                      </p>
   //                   </h1>
   //                   {/* {profile ? (
   //                      <EditProfileLink href={`/profile/edit/${viperId}`} />
   //                   ) : (
   //                      <CheckFollow viperId={viperId} />
   //                   )} */}
   //                </div>
   //                <div className="break-after-column">
   //                   <h1 data-test="viper-biography" className="mt-5 text-sm text-gray-300">
   //                      {viper.bio}
   //                   </h1>
   //                </div>
   //                <div className="mt-5 space-x-8 text-xs text-gray-300">
   //                   {/* <ShowFollows follows={viper.followings.length} followers={false} profile={true}>
   //                      {viper.followings.map((follows: Follow) => {
   //                         return (
   //                            <ViperInfo
   //                               key={JSON.stringify(follows._id)}
   //                               id={JSON.stringify(follows._id)}
   //                            />
   //                         )
   //                      })}
   //                   </ShowFollows> */}

   //                   {/* <ShowFollows
   //                      follows={fullViper.followers.length}
   //                      followers={true}
   //                      profile={true}
   //                   > */}
   //                   {viper.followers.map((followers: Follow) => {
   //                      return (
   //                         /* @ts-expect-error Async Server Component */
   //                         <ViperInfo
   //                            key={JSON.stringify(followers._id)}
   //                            id={JSON.stringify(followers._id)}
   //                         />
   //                      )
   //                   })}
   //                   {/* </ShowFollows> */}
   //                </div>
   //             </div>
   //          </div>
   //       </div>
   //    )
}
