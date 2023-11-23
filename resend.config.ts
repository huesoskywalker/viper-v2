const resendConfig = {
   host: process.env.RESEND_HOST,
   secure: true,
   port: Number(process.env.RESEND_PORT),
   auth: {
      user: process.env.RESEND_USER,
      pass: process.env.RESEND_API_KEY,
   },
}

export default resendConfig
