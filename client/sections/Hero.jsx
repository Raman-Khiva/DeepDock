import Button from '@/components/Button';
import Tag from '@/components/Tag';
import React from 'react'
import { HiLightningBolt } from "react-icons/hi";

const Hero = () => {
    return (
        <div className='w-full min-h-[calc(100vh-var(--navbar-height))]
                        flex items-center justify-center
        '>
            <div className=' flex flex-col gap-10 font-sans'>
                <div className='flex flex-col gap-4'>
                    <Tag text1="Deepdock" text2="Smarter & Faster" />
                    <h1 className='text-[64px] font-semibold leading-tight'>Learn <div className='bg-blue-600 w-fit p-1 rounded-xl border-4 shadow-lg shadow-blue-400 border-white rotate-12 inline-block translate-y-3'><HiLightningBolt className='text-white text-5xl' /></div> effectively,<br />never lose knowledge.</h1>
                    <h3 className='text-[20px] tracking-wide font-medium  text-[#0a09088c] font-sans'>Turn chaotic studying into a clear system — plan, organize,<br /> and retain knowledge with structured learning workflows.</h3>
                </div>
                <div className='flex gap-6'>
                    <Button text="Start learning" />
                    <Button text="Community" outline />
                </div>

            </div>


        </div>
    )
}

export default Hero