import AuthForm from "../_components/Form"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PassLock - Sign Up",
  description: "Sign up for a new account",
}

const SignUpForm = () => {
  return (
    <AuthForm formType="sign-up" />
  )
}

export default SignUpForm