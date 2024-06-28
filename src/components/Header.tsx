import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import Logo from "../assets/activity-tracker.png"
import Button from '@mui/material/Button';
import Dropdown from './Dropdown';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import useNavigation from '../Hooks/useNavigation';


type Props = {}

function Header({}: Props) {
  const user = true;
  const { userId } = useSelector((state: RootState) => state.authentication);
  const {goTo}=useNavigation();


  const LetterForIcon = useCallback(()=>{
          return userId.charAt(0).toUpperCase()
  },[])



  return (
   <nav className="py-4 flex justify-between items-center">
     <Link to="/">
      <img src={Logo} alt='brand_logo' className='h-10'/>
     </Link>
     <div className="flex gap-4">
      {!userId?<Button variant="outlined" color="secondary" onClick={()=>goTo("/auth")} className='border-2'>Login</Button>
      :<Dropdown userId={LetterForIcon}/>
      }
     </div>
   </nav>
  )
}

export default Header