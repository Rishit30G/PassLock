import ForgotPasswordForm from '../_components/ForgotPasswordForm'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PassLock - Forgot Password",
  description: "Forgot your password page",
}

const page = () => {
  return (
    <ForgotPasswordForm />
  )
}

export default page