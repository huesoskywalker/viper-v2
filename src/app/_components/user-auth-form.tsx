import AuthSignInForm from './auth-sign-in-form'

export function UserAuthForm() {
   return (
      <div className="grid gap-3">
         <AuthSignInForm provider="google" label="Google" />
         <AuthSignInForm provider="github" label="Github" />
      </div>
   )
}
