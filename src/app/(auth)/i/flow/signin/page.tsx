import AuthSignIn from './_components/auth-signin'

const SignInPage = async () => {
   return (
      <div
         style={{
            width: '100vw',
            height: '100vh',
            position: 'absolute',
            left: 0,
            top: 0,
            background: 'white',
         }}
      >
         <AuthSignIn />
      </div>
   )
}

export default SignInPage
