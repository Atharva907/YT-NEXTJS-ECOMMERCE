import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Image from 'next/image'
import logoBlack from '@/public/assets/images/logo-white.png'
import logoWhite from '@/public/assets/images/logo-black.png'
import { Button } from '@/components/ui/button'
// App sidebar close and arrow icon.
import { LuChevronRight } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { adminSidebarMenu } from '@/lib/adminSidebarMenu'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import { CollapsibleTrigger } from '@/components/ui/collapsible'
import Link from 'next/link'

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className='border-b h-14 p-0'>
        <div className='flex justify-between items-center px-4'>
            <Image src={logoBlack.src} height={50} width={logoBlack.width} className='block dark:hidden h-[50px] w-auto' alt='logo-dark'/>
            <Image src={logoWhite.src} height={50} width={logoWhite.width} className='hidden dark:block h-[50px] w-auto' alt='logo-white'/>
                <Button type='button' size='icon' className='md:hidden'>
                    <IoMdClose />
                </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
            {adminSidebarMenu.map((menu, index) => (
                <Collapsible key={index} className='group/collapsible'>
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton asChild>
                                <Link href={menu?.url}>
                                    <menu.icon />
                                    {menu.title}

                                    { menu.submenu && menu.submenu.length > 0 &&
                                        <LuChevronRight className='ml-auto transition-transform duration-200 group-data-[state-open]/collapsible:rotate-90'/>
                                    }

                                </Link>
                            </SidebarMenuButton>
                        </CollapsibleTrigger>

                        {menu.submenu && menu.submenu.length > 0 
                            &&
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {menu.submenu.map((subMenuItem, subMenuIndex) => (
                                        <SidebarMenuSubItem key={subMenuIndex}>
                                            <SidebarMenuSubButton asChild>
                                                <Link href={subMenuItem.url}>
                                                    {subMenuItem.title}
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        }

                    </SidebarMenuItem>
                </Collapsible>
            ))}
        </SidebarMenu>
      </SidebarContent>
      
    </Sidebar>
  )
}

export default AppSidebar
