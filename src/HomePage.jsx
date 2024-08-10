import { Link } from 'react-router-dom'

export function HomePage () {
  return (
    <div className='d-flex flex-column align-items-center'>
      <h1>Welcome to the Eastern Region Library (ERL)</h1>
      <h3>Youth Engagement Center (YEC)</h3>
      <h5>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/check-in'>Check in</Link>
          </li>
          <li className='breadcrumb-item'>
            <Link to='/register'>Register</Link>
          </li>
        </ol>
      </h5>
    </div>
  )
}
