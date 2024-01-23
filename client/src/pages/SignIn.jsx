import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

export default function SignIn() {
   const [formData, setFormData] = useState({});
   const {loading, error} = useSelector((state) => state.user);
   const navigate = useNavigate();
   const dispatch = useDispatch();

  
   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.id]: e.target.value
      })
   }

   const handleSubmit = async (e) => { 
      e.preventDefault(); 
      try {
         dispatch(signInStart());
         const res = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
         });
         if (!res.ok) {
            throw new Error('Failed to sign in');
         }
         const data = await res.json();
         if (data.success === false) {
            dispatch(signInFailure(data.message));           
            return;
         }
         dispatch(signInSuccess(data));
         navigate('/');

      } catch (error) {
         dispatch(signInFailure(error.message));
      };           
   };
   return (
      <div className='p-3 max-w-lg mx-auto'>
         <h1 className='text-3xl font-semibold text-center my-7'>
            Sign In
         </h1>
         <form onSubmit={handleSubmit} className='flex flex-col gap-3'>            
            <input
               type="email"
               placeholder='email'
               className='p-3 border rounded-lg'
               id='email'
               onChange={handleChange}
            />
            <input
               type="password"
               placeholder='password'
               className='p-3 border rounded-lg'
               id='password'
               onChange={handleChange}
            />
            <button disabled={loading} className='p-3 bg-orange-500 text-white rounded-lg uppercase hover:bg-orange-600 disabled:opacity-80'>
               {loading? 'Loading...': 'Sign In'}
            </button>
            <OAuth />
         </form>
         <div className='flex gap-2 mt-5'>
            <p>Dont have an account?</p>
            <Link to={'/sign-up'}>
               <span className='text-blue-800'>
                  Sign Up
               </span>
            </Link>            
         </div>
         {error && <p className='text-red-500'>{error}</p>}
      </div>
   )
};
