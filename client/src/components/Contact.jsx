import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
   const [message, setMessage] = useState('');
   const [landLord, setLandLord] = useState(null);

   const onChange = (e) => {
      setMessage(e.target.value);
   };

   useEffect(() => {
      try {
         const fetchLandLord = async () => {
            const res = await fetch(`/api/user/${listing.userRef}`);
            const data = await res.json();
            setLandLord(data);
         }
         fetchLandLord();         
      } catch (error) {
         console.log(error);
      }
   }, [listing.userRef]);
   

   return (
      <>
         {landLord && (
            <div className='flex flex-col gap-2'>
               <p>Contact{' '}
                  <span className='font-semibold'>{landLord.username}</span>
                  {' '}for{' '}
                  <span className='font-semibold'>{listing.name.toLowerCase()}</span>
               </p>
               <textarea
                  name="textarea"
                  id="textarea"
                  rows="2"
                  placeholder='Enter your message here...'
                  className='w-full border p-3 rounded-lg'
                  onChange={onChange}
                  value={message}
               >                  
               </textarea>
               <Link
                  to={`mailto:${landLord.email}?Subject=Regarding ${listing.name}&body=${message}`}
                  className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
               >
                  Send Message
               </Link>
            </div>
         )}
      </>
   );
}
