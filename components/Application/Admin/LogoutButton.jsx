'use client'

import React from 'react'
import { RiLogoutCircleRLine } from "react-icons/ri";
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { showToast } from '@/lib/showToast';
import axios from 'axios';
import { useRouter } from "next/navigation"; 
import { WEBSITE_LOGIN } from '@/routes/WebsiteRoute';

const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const { data: logoutResponse } = await axios.post('/api/auth/logout')
      if(!logoutResponse.success){
        throw new Error(logoutResponse.message)
      }

      showToast('success', logoutResponse.message)
      router.push(WEBSITE_LOGIN)
    } catch (error) {
      showToast('error', error.message)
    }
  }

  return (
    <DropdownMenuItem onClick={handleLogout} className='cursor-pointer flex items-center gap-2'>
        <RiLogoutCircleRLine color='red'/>
        Logout
    </DropdownMenuItem>
  )
}

export default LogoutButton
