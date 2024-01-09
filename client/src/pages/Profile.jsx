import { useSelector } from 'react-redux';


export default function Profile() {
   const { currentUser } = useSelector(state => state.user);

   
  return (
     <div className='m-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>
           Profile           
        </h1> 
        <form className='flex flex-col gap-4'>
           <img className='rounded-full w-24 h-24 poject-cover self-center mt-2 cursor-pointer' src={currentUser.avatar} alt="profile" />
           <input type="text" placeholder="username" className='border p-3 rounded-lg' id='username' />
           <input type="email" placeholder="email" className='border p-3 rounded-lg' id='email' />
           <input type="text" placeholder="password" className='border p-3 rounded-lg' id='password' />
           <button  className='p-3 bg-orange-500 text-white rounded-lg uppercase hover:bg-orange-600 disabled:opacity-80'>
               Update
            </button>
        </form>
      <div className='flex justify-between mt-5'>
           <span className='text-red-500'>Delete your account</span>
           <span className='text-red-500'>Sign out</span>
        </div>
     </div>     
   )  
}