import { he } from 'date-fns/locale'

export const resizeImage = async (
   originalImage: File,
   resize: { width: number; height: number },
   cropAsAvatar: boolean,
): Promise<File> => {
   const resizedImage = await resizeToWidth(originalImage, 800)

   return new Promise((resolve) => {
      const img = new Image()
      const objectUrl = URL.createObjectURL(resizedImage)

      const quality = 1

      img.onload = () => {
         const aspectRatio = img.width / img.height

         let drawWidth, drawHeight, offsetX, offsetY

         if (aspectRatio > resize.width / resize.height) {
            drawWidth = img.width * (resize.height / img.height)
            drawHeight = resize.height
            offsetX = drawWidth > 300 ? -75 : -50
            offsetY = 0
         } else {
            const height = cropAsAvatar ? img.height * (resize.width / img.width) : img.height / 2
            drawWidth = resize.width
            drawHeight = height
            offsetX = 0
            offsetY = cropAsAvatar ? 0 : resize.height / -8
         }

         const canvas = document.createElement('canvas')
         canvas.width = resize.width
         canvas.height = resize.height

         const ctx = canvas.getContext('2d')

         if (ctx) {
            if (cropAsAvatar) {
               ctx.beginPath()
               ctx.arc(
                  resize.width / 2,
                  resize.height / 2,
                  Math.min(resize.width, resize.height) / 2,
                  0,
                  2 * Math.PI,
               )
               ctx.closePath()
               ctx.clip()
            }

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
            canvas.toBlob(
               (blob) => {
                  if (blob) {
                     const resizedFile = new File([blob], originalImage.name, {
                        type: blob.type,
                        lastModified: Date.now(),
                     })
                     resolve(resizedFile)
                  }
               },
               originalImage.type,
               quality,
            )
         }
      }

      img.src = objectUrl
   })
}

const resizeToWidth = (file: File, targetWidth: number): Promise<File> => {
   return new Promise((resolve) => {
      const img = new Image()
      const objectUrl = URL.createObjectURL(file)

      const quality = 1

      img.onload = () => {
         if (img.width <= targetWidth) {
            resolve(file)
         } else {
         }
         const aspectRatio = img.width / img.height
         const targetHeight = targetWidth / aspectRatio

         const canvas = document.createElement('canvas')
         canvas.width = targetWidth
         canvas.height = targetHeight

         const ctx = canvas.getContext('2d')

         if (ctx) {
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

            canvas.toBlob(
               (blob) => {
                  if (blob) {
                     const resizedFile = new File([blob], file.name, {
                        type: blob.type,
                        lastModified: Date.now(),
                     })
                     resolve(resizedFile)
                  }
               },
               file.type,
               quality,
            )
         }
      }

      img.src = objectUrl
   })
}
