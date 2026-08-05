import React, { useContext, useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name,setName] = useState('')
  const [password,setPasword] = useState('')
  const [email,setEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
      setLoading(true);
      event.preventDefault();
      try {
        if (currentState === 'Sign Up') {
          
          const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        } else {

          const response = await axios.post(backendUrl + '/api/user/login', {email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        }


      }  catch (error) {
          console.log(error);
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
  }

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className="w-full max-w-md mx-auto mt-10 sm:mt-16 px-6 py-8 bg-white rounded-2xl shadow-lg border flex flex-col gap-4">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-[#4B072B]">
          Welcome to Charis
        </h2>

        <p className="text-gray-500 mt-2">
          Sign in to continue shopping or create a new account.
        </p>
      </div>
        <div className="text-center mb-8">
            <p className="prata-regular text-3xl sm:text-4xl text-[#4B072B]">{currentState}</p>
            <hr className="mx-auto mt-3 w-16 border-[#4B072B]" />
        </div>
        {currentState === 'Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#4B072B] focus:ring-2 focus:ring-[#4B072B]/20" placeholder='Name' required/>}
        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#4B072B] focus:ring-2 focus:ring-[#4B072B]/20" placeholder='Email' required/>
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPasword(e.target.value)}
            value={password}
            placeholder="Password"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-[#4B072B] focus:ring-2 focus:ring-[#4B072B]/20"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="flex justify-between w-full text-sm text-gray-500">
            <p className="cursor-pointer hover:text-[#4B072B] transition">Forgot your password?</p>
            {
              currentState === 'Login' 
              ? <p onClick={()=>setCurrentState('Sign Up')} className="cursor-pointer hover:text-[#4B072B] transition">Create account</p>
              : <p onClick={()=>setCurrentState('Login')} className="cursor-pointer hover:text-[#4B072B] transition">Login Here</p>
            }
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#4B072B] text-[#ffddd2] py-3 rounded-lg font-semibold transition hover:bg-[#64103c] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading
            ? "Please wait..."
            : currentState === "Login"
            ? "Sign In"
            : "Sign Up"}
        </button>
    </form>
  )
}

export default Login
