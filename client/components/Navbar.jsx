import Image from 'next/image'
import React from 'react'
import Button from './Button'

const Navbar = () => {
    return (
        <div className='w-screen nav px-24 fixed bg-white border-b-4 border-[#F8F8FA]
                        flex items-center justify-between
        '>
            <div className='flex items-center gap-4'>
                <Image src='/DeepdockLogo.png' alt='Deepdock' width={30} height={30} />
                <h1 className='text-xl font-semibold'>Deepdock</h1>
            </div>
            <ul className='flex gap-10 font-semibold text-[16px]'>
                <li className='cursor-pointer'>Home</li>
                <li className='cursor-pointer'>Projects</li>
                <li className='cursor-pointer'>Community</li>
            </ul>
            <div className='flex gap-4'>
                <Button className='text-xs' text="Login" />
                <Button outline className='text-xs' text="Sign up" />
            </div>
        </div>
    )
}

export default Navbar