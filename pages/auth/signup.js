// components/Signup.js

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { RotateCircleLoading } from 'react-loadingg';
import { useRouter } from 'next/router';

const Signup = () => {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const validateForm = () => {
    let isValid = true;

    // Validate email
    if (!email || !email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
      setError('Please enter a valid email address.');
      isValid = false;
    }

    // Validate password
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      isValid = false;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      isValid = false;
    }

    // Validate terms acceptance
    if (!termsAccepted) {
      setError('You must accept the Terms and Policy.');
      isValid = false;
    }

    return isValid;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    const input = {
      email: email, password: password, firstName: 'Emma', lastName: 'Udeji'
    }

    if (validateForm()) {
      setIsLoading(true);

      try {
        const result = await fetch('http://localhost:3000/api/auth/signup', {
            method: "POST",
            body: JSON.stringify(input),
            headers: {
              'Content-Type': 'application/json',
            },
          })

        if (result.status === 200) {
          const {user} = await result.json()
          const res = await signIn('credentials', {
            email: user.email, password: user.password, redirect: false, callbackUrl: '/profile'
          })
          if (!res.error) {
            console.log('User signed innnnn:', res);
            router.push('/profile')
          } else {
            // setError(result.error);
            console.log('Error signed innnnn:', res);
          }
        } else {
          const error = await result.json()
          setError(error.message);
          console.log('error', error)
        }
      } catch (error) {
            console.log('catchError', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Create an Account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM11.414 6.707a1 1 0 00-1.414 1.414L9 9.414V14a1 1 0 102 0V9.414l.293.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L8 9.414V14a1 1 0 102 0V9.414l.293.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L8 9.414V14a1 1 0 102 0V9z"
                    />
                </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  error && !email ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && !email && (
                <p className="mt-2 text-sm text-red-500">Please enter a valid email address.</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  error && !password ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 ${
                  error && !password ? 'rounded-t-md' : 'rounded-b-md'
                } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && !password && (
                <p className="mt-2 text-sm text-red-500">Password must be at least 6 characters long.</p>
              )}
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 pyrespone-2 border ${
                  error && !confirmPassword ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && !confirmPassword && (
                <p className="mt-2 text-sm text-red-500">Please confirm your password.</p>
              )}
              {error && password !== confirmPassword && (
                <p className="mt-2 text-sm text-red-500">Passwords do not match.</p>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            <label htmlFor="termsAndPolicy" className="ml-2 block text-sm text-gray-900">
              I accept the Terms and Policy
            </label>
          </div>
          {error && !termsAccepted && (
            <p className="mt-2 text-sm text-red-500">You must accept the Terms and Policy.</p>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? (
                // <RotateCircleLoading color="#ffffff" size="20px" /> 
                <p className="">...</p>
              ) : (
                'Sign Up'
              )}
            </button>
          </div>

          <div className="flex items-center justify-center">
            <a
              href="#"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Already have an account? Sign in
            </a>
          </div>
        </form>
        <button onClick={()=>signIn('google', {callbackUrl: '/profile'})}
         className='bg-red-600 hover:bg-red-700 duration-300 w-full text-center py-2 rounded-lg text-white fornt-medium'>Continue with Google</button>
        <button onClick={()=>signIn('github', {callbackUrl: '/profile'})}
        className='bg-slate-900 hover:bg-slate-800 duration-300 w-full text-center py-2 rounded-lg text-white fornt-medium'>Continue with Github</button>
      </div>
    </div>
  );
};

export default Signup;
