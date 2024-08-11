import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../utils/axios-instance'
import { useForm } from 'react-hook-form'

export function Dashboard () {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formErrors }
  } = useForm({
    defaultValues: {
      experience: 3,
      targetMet: 'yes'
    }
  })

  useEffect(() => {
    async function fetchUser () {
      try {
        setLoading(true)

        const response = await axios.get('dashboard')
        const userData = response.data.user

        if (!userData) {
          setUser(null)
          localStorage.removeItem('token')
          setMsg('Your session is over!')
        } else {
          setUser(userData)
        }

        setError('')
      } catch (error) {
        console.error(error)
        setUser(null)
        localStorage.removeItem('token')
        setError('An error occurred.')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  async function onSubmit (data) {
    try {
      await axios.post('auth/check-out', data)
      setUser(null)
      localStorage.removeItem('token')
      navigate('/')
    } catch (error) {
      console.error(error)
      setError('Failed to log out. Please try again.')
    }
  }

  return (
    <div>
      {error && (
        <div
          className='alert alert-danger mx-auto text-center'
          style={{ maxWidth: '360px' }}
        >
          <p className='mb-1'>{error}</p>
          <Link to='/'>Go to Homepage.</Link>
        </div>
      )}

      {loading && (
        <div className='text-center'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      )}

      {msg && (
        <div
          className='alert alert-warning mx-auto text-center'
          style={{ maxWidth: '300px' }}
        >
          <p className='mb-1'>{msg}</p>
          <Link to='/check-in'>Check in</Link>
        </div>
      )}

      {user && (
        <div className='text-center'>
          <h3>
            Welcome back, {user.firstName}. Happy {user.activity || 'learning'}!
          </h3>
          <button
            type='button'
            className='btn btn-danger'
            data-bs-toggle='modal'
            data-bs-target='#checkOutModal'
          >
            Check out
          </button>
        </div>
      )}

      <div
        className='modal fade'
        id='checkOutModal'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='checkOutModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='checkOutModalLabel'>
                Check Out
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              />
            </div>
            <div className='modal-body'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-3'>
                  <label htmlFor='experience' className='form-label'>
                    Rate your experience:{' '}
                    <strong>{watch('experience', 3)}</strong> / 5
                  </label>
                  <input
                    type='range'
                    className='form-range'
                    min='1'
                    max='5'
                    step='1'
                    id='experience'
                    {...register('experience', { required: true })}
                  />
                  {formErrors.experience && (
                    <p className='text-danger'>Please rate your experience.</p>
                  )}
                </div>
                <div className='mb-3'>
                  <label className='form-label'>
                    Did you meet your target?
                  </label>
                  <div>
                    <div className='form-check form-check-inline'>
                      <input
                        className='form-check-input'
                        type='radio'
                        id='targetMetYes'
                        value='yes'
                        {...register('targetMet', { required: true })}
                      />
                      <label
                        className='form-check-label'
                        htmlFor='targetMetYes'
                      >
                        Yes
                      </label>
                    </div>
                    <div className='form-check form-check-inline'>
                      <input
                        className='form-check-input'
                        type='radio'
                        id='targetMetNo'
                        value='no'
                        {...register('targetMet', { required: true })}
                      />
                      <label className='form-check-label' htmlFor='targetMetNo'>
                        No
                      </label>
                    </div>
                    {formErrors.targetMet && (
                      <p className='text-danger'>Please select an option.</p>
                    )}
                  </div>
                </div>
                <div className='text-center'>
                  <button
                    type='submit'
                    className='btn btn-danger'
                    data-bs-dismiss='modal'
                  >
                    Check out
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
