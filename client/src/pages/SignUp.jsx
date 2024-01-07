import {Link} from 'react-router-dom';

const SignUp = () => {
   return (
      <div className='p-3 max-w-lg mx-auto'>
         <h1 className='text-3xl font-semibold text-center my-7'>
            Sign Up
         </h1>
         <form className='flex flex-col gap-3'>
            <input
               type="text"
               placeholder='username'
               className='p-3 border rounded-lg'
               id='username'
            />
            <input
               type="email"
               placeholder='email'
               className='p-3 border rounded-lg'
               id='email'
            />
            <input
               type="password"
               placeholder='password'
               className='p-3 border rounded-lg'
               id='password'
            />
            <button className='p-3 bg-orange-500 text-white rounded-lg uppercase hover:bg-orange-600 disabled:opacity-80'>
               Sign Up
            </button>
         </form>
         <div className='flex gap-2 mt-5'>
            <p>Have an account?</p>
            <Link to={'/sign-in'}>
               <span className='text-blue-800'>
                  Sign In
               </span>
            </Link>            
         </div>
      </div>
   )
};

export default SignUp;