import { useForm } from 'react-hook-form'

export function CheckIn () {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  async function onSubmit (data) {
    console.log(data)
  }

  return (
    <div
      className='mx-auto mt-3 p-3 rounded shadow-sm'
      style={{ maxWidth: '720px' }}
    >
      <h2 className='text-center'>Check In</h2>

      <form className='my-3' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3 row row-cols-1 row-cols-md-2'>
          <div className='col'>
            <label htmlFor='username' className='form-label'>
              Username
            </label>
            <input
              type='text'
              className='form-control'
              id='username'
              autoComplete='username'
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be between 3 and 20 characters long'
                },
                maxLength: {
                  value: 20,
                  message: 'Username must be between 3 and 20 characters long'
                },
                pattern: {
                  value: /^[a-zA-Z0-9_.]+$/,
                  message:
                    'Username can only contain letters, numbers, underscores, or periods'
                },
                validate: {
                  notEmpty: (value) =>
                    value.trim() !== '' || 'Username is required'
                }
              })}
            />
            {errors.username && (
              <span className='text-danger'>{errors.username.message}</span>
            )}
          </div>
          <div className='col'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              autoComplete='current-password'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be between 8 and 64 characters long'
                },
                maxLength: {
                  value: 64,
                  message: 'Password must be between 8 and 64 characters long'
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/,
                  message:
                    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                }
              })}
            />
            {errors.password && (
              <span className='text-danger'>{errors.password.message}</span>
            )}
          </div>
        </div>
        <div className='mb-3'>
          <label htmlFor='purpose' className='form-label'>
            Purpose
          </label>
          <select
            className='form-select'
            id='purpose'
            {...register('purpose', { required: 'Purpose is required' })}
          >
            <option value='learn'>Learn</option>
            <option value='research'>Research</option>
            <option value='explore'>Explore</option>
          </select>
          {errors.purpose && (
            <span className='text-danger'>{errors.purpose.message}</span>
          )}
        </div>
        <button type='submit' className='btn btn-primary'>
          Check in
        </button>
      </form>
    </div>
  )
}
