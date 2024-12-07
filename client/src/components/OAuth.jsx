import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';  // For handling loading state

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);  // New state for loading
  
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    
    try {
      setLoading(true);  // Start loading state
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');  // Navigate to the home page or wherever appropriate
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('Google Authentication error:', error);
      alert('An error occurred during the authentication process. Please try again later.');
    } finally {
      setLoading(false);  // Stop loading state
    }
  };

  return (
    <Button
      type="button"
      className="border-[#d99534] text-[#121b54]"
      outline
      onClick={handleGoogleClick}
      disabled={loading}  // Disable the button when loading
      
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      {loading ? 'Loading...' : 'Continue with Google'}
    </Button>
  );
}



// import { Button } from 'flowbite-react';
// import { AiFillGoogleCircle } from 'react-icons/ai';
// import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
// import { app } from '../firebase';
// import { useDispatch } from 'react-redux';
// import { signInSuccess } from '../redux/user/userSlice';
// import { useNavigate } from 'react-router-dom';

// export default function OAuth() {
//     const auth = getAuth(app)
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const handleGoogleClick = async () =>{
//         const provider = new GoogleAuthProvider()
//         provider.setCustomParameters({ prompt: 'select_account' })
//         try {
//             const resultsFromGoogle = await signInWithPopup(auth, provider)
//             const res = await fetch('/api/auth/google', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     name: resultsFromGoogle.user.displayName,
//                     email: resultsFromGoogle.user.email,
//                     googlePhotoUrl: resultsFromGoogle.user.photoURL,
//                 }),
//                 })
//             const data = await res.json()
//             if (res.ok){
//                 dispatch(signInSuccess(data))
//                 navigate('/')
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     } 
//   return (
//     <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
//         <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
//         Continue with Google
//     </Button>
//   )
// }