import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="border-2 bg-zinc-700 rounded-md p-5 border-blue-300">
        <form action="" className="form flex  items-center justify-center flex-col space-y-4">
        <h1 className="text-3xl">Sign Up</h1>
        <input
            className="input-field bg-zinc-500 p-3 "
            required
            type="email"
            name="email"
            placeholder="Enter your kiit email..."
          ></input>
          <input
            className="input-field bg-zinc-500 p-3 "
            required
            type="password"
            name="password"
            placeholder="Enter your password....."
          ></input>
        <input className="px-5 py-2 bg-blue-500 rounded-lg  " type="submit" value="Login"/>
        </form>
        <p className='text-center mt-5'>Don't have an account?<span className='text-blue-500'>
            <Link to="/SignUp">&nbsp;SignUp</Link>
            </span></p>
      </div>
    </div>
  )
}

export default Login
