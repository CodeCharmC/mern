import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';

export default function CreateListing() {
   const [files, setFiles] = useState([]);
   const [formData, setFormData] = useState({
      imageUrls: [],
   });
   const [imageUploadError, setImageUploadError] = useState(false);
   const [uploading, setUploading] = useState(false);
   console.log(formData);

   const handleImageSubmit = async (e) => {
      if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
         const promises = [];

         setUploading(true);
         setImageUploadError(false);

         for (let i = 0; i < files.length; i++) {
            promises.push(storeImage(files[i]));
         }
         Promise.all(promises).then((urls) => {
            setFormData({
               ...formData,
               imageUrls: formData.imageUrls.concat(urls)
            });
            setImageUploadError(false);
            setUploading(false);
         }).catch((err) => {
            setImageUploadError('Image upload failed (2 mb max per image)');
            setUploading(false);
         });
      } else {
         setImageUploadError('You can only upload up to 6 images per listing');
         setUploading(false);
      }
   }

   const storeImage = async (file) => {
      return new Promise((resolve, reject) => {
         const storage = getStorage(app);
         const fileName = new Date().getTime() + file.name;
         const storageRef = ref(storage, fileName);
         const uploadTask = uploadBytesResumable(storageRef, file);
         uploadTask.on(
            'state_changed',
            (snapshot) => {
               const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               console.log(`Upload is ${progress}% done`);
            },
            (error) => {
               reject(error);
            },
            () => {
               getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  resolve(downloadURL);
               });
            }
         );
      })
   } 

   const handleRemoveImage = (index) => {
      setFormData({
         ...formData,
         imageUrls: formData.imageUrls.filter((_, i) => i !== index)
      })
   }

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
                  <input 
                     onChange={(e) => setFiles(e.target.files)} 
                     type="file" 
                     id='images' 
                     accept='image/*' 
                     multiple className='p-3 border rounded-lg border-gray-300 w-full' 
                     required />
                  <button
                     disabled={uploading}
                     onClick={handleImageSubmit}
                     type='button'
                     className='p-3 bg-emerald-500 border-emerald-700 text-white rounded-lg uppercase hover:shadow-lg disabled:opacity-80'>
                        {uploading ? 'Uploading...' : 'Upload'}
                  </button>
                  
               </div>
               <p className='text-red-500 text-sm'>{imageUploadError && imageUploadError}</p>
               {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                  <div key={url} className='flex justify-between p-3 border items-center rounded-lg'>
                     <img src={url} alt="listing image" className='w-20 h-20 object-cover rounded-lg' />
                     <button
                        type='button'
                        onClick={() => handleRemoveImage(index)}
                        className='p-3 text-red-700  rounded-lg uppercase hover:shadow-lg disabled:opacity-95'>Delete</button>
                  </div>
               ))}
               <button className='p-3 bg-orange-500 border-orange-700 text-white rounded-lg uppercase hover:shadow-lg disabled:opacity-80 mt-3'>Create Listing</button>
            </div> 
            
         </form>
      </main>
   )   
}
