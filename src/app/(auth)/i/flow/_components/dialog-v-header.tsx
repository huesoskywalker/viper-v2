import { DialogHeader } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const DialogVHeader = ({ className }: { className?: string }) => {
   return (
      <DialogHeader className={cn('self-center pt-3', className)}>
         <Image
            src={'/viper.png'}
            alt="Viper logo"
            width={40}
            height={50}
            loading="lazy"
            quality={100}
            className="invert-image"
         />
      </DialogHeader>
   )
}

export default DialogVHeader
