import AuthForm from "../_components/Form"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PassLock - Sign In",
  description: "Sign in to your account",
}
const SignInForm = () => {
  return (
    <AuthForm formType="sign-in"/>
  )
}

export default SignInForm