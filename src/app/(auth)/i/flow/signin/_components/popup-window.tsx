'use client'

export const popupWindow = (url: string, provider: string) => {
   const dualScreenLeft = window.screenLeft ?? window.screenX
   const dualScreenTop = window.screenTop ?? window.screenY

   const width = window.innerWidth ?? document.documentElement.clientWidth ?? screen.width

   const height = window.innerHeight ?? document.documentElement.clientHeight ?? screen.height

   const systemZoom = width / window.screen.availWidth

   const customWidth = 600
   const customHeight = 650

   const left = (width - customWidth) / 2 / systemZoom + dualScreenLeft
   const top = (height - customHeight) / 2 / systemZoom + dualScreenTop
   const newWindow = window.open(
      url + '?provider=' + provider,
      `Sign in `,
      `width=${customWidth / systemZoom},height=${
         customHeight / systemZoom
      },top=${top},left=${left}`,
   )

   if (newWindow) {
      newWindow.focus()
   }
   return { success: true }
}
