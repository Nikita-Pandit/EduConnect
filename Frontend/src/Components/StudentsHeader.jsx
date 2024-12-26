import React from 'react'
 import { Link } from 'react-router-dom';
const StudentHeader = () => {
  return (
    <>
      <div className='mb-3'>
        <div className='nav'>
            <div>ABC</div>
            <div >
              <ul className=' flex gap-4 items-end'>
                 <li><Link to="/">Home</Link></li>
                 <li><Link to="/Profile">Profile</Link></li>
                 <li><Link to="/Projects">Projects</Link></li>
                 <li><Link to="/SignUp">Sign Up</Link></li>
                 <li><Link to="/ResearchDoubts">Research Doubts</Link></li>
              </ul>
            </div>
        </div>
      </div>
    </>
  )
}

export default StudentHeader