import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../assets/activity-tracker.png"
import Button from '@mui/material/Button';
import Dropdown from './Dropdown';

type Props = {}

function Header({}: Props) {
  const user = true;

  return (
   <nav className="py-4 flex justify-between items-center">
     <Link to="/">
      <img src={Logo} alt='brand_logo' className='h-10'/>
     </Link>
     <div className="flex gap-4">
      {!user?<Button variant="outlined" color="secondary" className='border-2'>Login</Button>
      :<Dropdown/>
      }
     </div>
   </nav>
  )
}

export default Header