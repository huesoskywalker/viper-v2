import AuthSignInForm from './auth-sign-in-form'

export const ViperAuthForm = ({ className }: { className: string }) => {
   return (
      <div className={className}>
         <AuthSignInForm provider="google" label="Google" />
         <AuthSignInForm provider="github" label="Github" />
      </div>
   )
}
