import Image from 'next/image'
import React from 'react'
import Button from './Button'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className='w-screen nav px-24 fixed bg-white border-b-4 border-[#F8F8FA]
                        flex items-center justify-between
        '>
            <div className='flex items-center gap-4'>
                <Image src='/DeepdockLogo.png' alt='Deepdock' width={30} height={30} />
                <h1 className='text-xl font-semibold'>Deepdock</h1>
            </div>
            <ul className='flex gap-10 font-semibold text-[16px] transition-all duration-1000 text-[#0a09088c]'>
                <li className='cursor-pointer transition-all duration-400 hover:text-black'><Link href='/'>Home</Link></li>
                <li className='cursor-pointer transition-all duration-400 hover:text-black'><Link href='/projects'>Projects</Link></li>
                <li className='cursor-pointer transition-all duration-400 hover:text-black'><Link href='/community'>Community</Link></li>
            </ul>
            <div className='flex gap-4'>
                <Button style='text-xs px-1 py-1' text="Login" />
                <Button outline style='text-xs px-1 py-1 font-medium' text="Sign up" />
            </div>
        </div>
    )
}

export default Navbar