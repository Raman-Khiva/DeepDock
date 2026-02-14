import React from 'react'

const Tag = ({ text1, text2 }) => {
  return (
    <div className='text-[13px] font-sans font-semibold border-3 border-[#F8F8FA] rounded-full
                    pl-1 pr-3 py-1 bg-white size-fit
                    flex gap-2 items-center 
     ' >
      <p className='gd-bg rounded-full px-2.5 py-0.5 text-white'>{text1}</p>
      <p>{text2}</p>
    </div>
  )
}

export default Tag