import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import HandleGoogle from '../Login/HandleGoogle'
import PasswordHideShow from '../Shared/PasswordHideShow'
import UseAuth from '../../Hooks/UseAuth'
import { TbFidgetSpinner } from 'react-icons/tb'
import { toast } from 'react-hot-toast'
import { savedUser } from '../../CommonApi/Auth'


const SignUp = () => {
  const { createUser, updateUserProfile, loading, setLoading } = UseAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname||'/'
  {/* ====handle signup new user===== */ }
  const imageHostingToken = import.meta.env.VITE_IMAGE_UPLOAD_APIKEY
  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`
  const handleSignup = (event) => {
    event.preventDefault()
    const form = event.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    //image upload
    const image = form.image.files[0]
    const formData = new FormData()
    formData.append('image', image)
    fetch(imageHostingUrl, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(imageResponse => {
        if (imageResponse.success) {
          const imgURL = imageResponse.data.display_url
          createUser(email, password)
            .then((result) => {
              updateUserProfile(name, imgURL)
                .then(() => {
                  toast.success('Register Account Successfully !!!')
                  //current user save to the db
                  savedUser(result.user)
                  setTimeout(() => {
                    navigate(from,{replace:true})
                  }, 2000);
                }).catch(error => {
                  toast.error(error.message)
                })

            }).catch(error => {
              toast.error(error.message)
            })
        }
        console.log(imageResponse);
      }).catch(error => {
        toast.error(error.message)
      })
    event.target.reset()
  }

  const [passwordshow, setPasswordshow] = useState(true)
  const handleShowPassowrd = () => {
    setPasswordshow(!passwordshow)
  }
  return (
    <div className='flex justify-center items-center min-h-screen mt-5'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
          <p className='text-sm text-gray-400'>Welcome to AirCNC</p>
        </div>
        <form
          onSubmit={handleSignup}
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div className='relative'>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type={passwordshow ? 'text' : 'password'}
                name='password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
              <PasswordHideShow handleShowPassowrd={handleShowPassowrd} passwordshow={passwordshow} />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-rose-500 w-full text-center rounded-md py-3 text-white'
            >
              {loading ? <TbFidgetSpinner size={24} className='m-auto animate-spin' /> : 'Continue'}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        {/* <div className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div> */}
        <HandleGoogle />
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-rose-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default SignUp