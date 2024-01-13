import React from 'react'

export default function CreateListing() {
   return (
      <main className='p-3 max-w-4xl mx-auto'>
         <h1 className='text-3xl text-center my-7 font-bold'>
            Create Listing
         </h1>
         <form className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
               <input type="text" placeholder='Name' className='p-3 border rounded-lg' id='name' maxLength='62' minLength='10' required />
               <textarea type="text" placeholder='Description' className='p-3 border rounded-lg' id='textarea' required />
               <input type="address" placeholder='Address' className='p-3 border rounded-lg' id='address' required />
               <div className='flex gap-6 flex-wrap'>
                  <div className='flex gap-2'>
                     <input type="checkbox" id='sale' className='w-5' />
                     <span>Sell</span>
                  </div>
                  <div className='flex gap-2'>
                     <input type="checkbox" id='rent' className='w-5' />
                     <span>Rent</span>
                  </div>
                  <div className='flex gap-2'>
                     <input type="checkbox" id='parking' className='w-5' />
                     <span>Parking spot</span>
                  </div>
                  <div className='flex gap-2'>
                     <input type="checkbox" id='furnished' className='w-5' />
                     <span>Furnished</span>
                  </div>
                  <div className='flex gap-2'>
                     <input type="checkbox" id='offer' className='w-5' />
                     <span>Offer</span>
                  </div>
               </div>
               <div className='flex flex-wrap gap-6'>
                  <div className='flex gap-2 items-center'>
                     <input type="number" id='bedrooms' min='1' max='10' required className='p-3 border rounded-lg border-gray-300' />
                     <p>Beds</p>
                  </div>
                  <div className='flex gap-2 items-center'>
                     <input type="number" id='bathrooms' min='1' max='10' required className='p-3 border rounded-lg border-gray-300' />
                     <p>Baths</p>
                  </div>
                  <div className='flex gap-2 items-center'>
                     <input type="number" id='regularPrice' min='1' max='10' required className='p-3 border rounded-lg border-gray-300' />
                     <div className='flex flex-col items-center'>
                        <p>Regular Price</p>
                        <span className='text-sm'>($ / month)</span>
                     </div>                     
                  </div>
                  <div className='flex gap-2 items-center'>
                     <input type="number" id='discountedPrice' min='1' max='10' required className='p-3 border rounded-lg border-gray-300' />
                     <div className='flex flex-col items-center'>
                        <p>Discounted Price</p>
                        <span className='text-sm'>($ / month)</span>
                     </div>
                  </div>
               </div>
            </div>
            <div className='flex flex-col flex-1 gap-2'>
               <p className='font-senibold'>Images:
                  <span className='font-normal text-gray-600 mk-2'>The first image will be the cover (max 6)</span>
               </p>
               <div className='flex gap-4'>
                  <input type="file" id='images' accept='image/*' multiple className='p-3 border rounded-lg border-gray-300 w-full' required />
                  <button className='p-3 bg-emerald-500 border-emerald-700 text-white rounded-lg uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
               </div>
               <button className='p-3 bg-orange-500 border-orange-700 text-white rounded-lg uppercase hover:shadow-lg disabled:opacity-80 mt-3'>Create Listing</button>
            </div>            
         </form>
      </main>
   )   
}
