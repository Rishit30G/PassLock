import ResetPasswordForm from '../_components/ResetPasswordForm'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PassLock - Reset Password",
  description: "Reset your password",
}

const page = () => {
  return (
    <ResetPasswordForm />
  )
}

export default page