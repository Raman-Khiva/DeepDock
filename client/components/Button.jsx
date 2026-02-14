import React from 'react'

const Button = ({ text, outline, className }) => {

    const outlineStyle = `size-fit text-blue-600  px-5 py-1.5 rounded-2xl font-semibold text-[18px] cursor-pointer border-3 border-blue-600 hover:shadow-none ${className}`;
    return (

        <button className={outline ? outlineStyle : `gd-bg size-fit text-white px-5 py-1.5 rounded-2xl
                        font-medium text-[18px] cursor-pointer 
                        border-2 border-[#f8f8fa1f] shadow-sm shadow-blue-200
                        hover:shadow-none ${className}
        `}>
            {text}
        </button>
    )
}

export default Button