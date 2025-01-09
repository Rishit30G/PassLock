import React from 'react'

const Footer = () => {
  return (
    <footer>
    <h3 className="text-center text-lg poppins-light text-zinc-600 dark:text-zinc-300">
      © {new Date().getFullYear()} PassLock
    </h3>
  </footer>
  )
}

export default Footer