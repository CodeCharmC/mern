import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';


export default function Profile() {
   const { currentUser, loading, error } = useSelector(state => state.user);
   const fileRef = useRef(null);
   const [file, setFile] = useState(undefined);
   const [filePerc, setFilePerc] = useState(0);
   const [fileUploadError, setFileUploadError] = useState(false);
   const [formData, setFormData] = useState({});
   const dispatch = useDispatch(); 
   const [updateSuccess, setUpdateSuccess] = useState(false); 
   
      
   useEffect(() => {
      if (file) {
         handleFileUpload(file);
      }
   }, [file]);

   const handleFileUpload = (file) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', (snapshot) => {
         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         setFilePerc(Math.round(progress));
      },
         (error) => {
            setFileUploadError(true);
         },
         () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
               setFormData({ ...formData, avatar: downloadURL })
            );
         }
      );
   };

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
   }
   
   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData);
      try {
         dispatch(updateUserStart());
         const res = await fetch(`/api/user/update/${currentUser._id}`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
         });
         const data = await res.json();
         console.log(data);
         if (data.success === false) {
            dispatch(updateUserFailure(data.message));
            return;
         }
         dispatch(updateUserSuccess(data));
         setUpdateSuccess(true);
      } catch (error) {
         console.log(error);
         dispatch(updateUserFailure(error.message));
      }
   };

   const handleDeleteUser = async () => { 
      try {
         dispatch(deleteUserStart());
         const res = await fetch(`/api/user/delete/${currentUser._id}`, {
            method: 'DELETE'
         });
         const data = await res.json();
         if (data.success === false) {
            dispatch(deleteUserFailure(data.message));
            return;  
         }
         dispatch(deleteUserSuccess(data));
      } catch (error) {
         dispatch(deleteUserFailure(error.message));
      }
   }  

   return (
      <div className='p-3 max-w-lg mx-auto'>
         <h1 className='text-3xl font-semibold text-center my-7'>
            Profile
         </h1>
         <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input 
               type="file" 
               onChange={(e) => setFile(e.target.files[0])} 
               ref={fileRef} 
               className='hidden' 
               accept='image/*' />
            <img
               onClick={() => fileRef.current.click()}
               className='rounded-full w-24 h-24 poject-cover self-center mt-2 cursor-pointer'
               src={formData.avatar || currentUser.avatar}
               alt="profile" />            
            <p className='text-sm self-center'>
               {fileUploadError ?
                  ( <span className='text-red-500'>Error Image upload (image must be less than 2 mb)</span>
                  ) : filePerc > 0 && filePerc < 100 ?
                     ( <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
                     ) : filePerc === 100 ?
                        ( <span className='text-green-500'>Successfully Uploaded!</span>
                        ) : ('')}
            </p>
            <input
               type="text" 
               placeholder="username" 
               className='border p-3 rounded-lg' 
               id='username' 
               defaultValue={currentUser.username} 
               onChange={handleChange} />
            <input 
               type="email" 
               placeholder="email" 
               className='border p-3 rounded-lg' 
               id='email' 
               defaultValue={currentUser.email}
               onChange={handleChange} />
            <input 
               type="password" 
               placeholder="password" 
               className='border p-3 rounded-lg' 
               id='password' 
               onChange={handleChange} />
            <button
               disabled={loading}   
               className='p-3 bg-orange-500 text-white rounded-lg uppercase hover:bg-orange-600 disabled:opacity-80'>
               {loading ? 'Loading...' : 'Update'}
            </button>
         </form>
         <div
            onClick={handleDeleteUser}
            className='flex justify-between mt-5'>
               <span className='text-red-500'>Delete your account</span>
               <span className='text-red-500'>Sign out</span>
         </div>
         <p className='text-red-500 mt-5'>
            {error? error: ''}
         </p>
         <p className='text-green-500'>
            {updateSuccess ? 'User is updated successfully!' : ''}
         </p>
      </div>
   );
};