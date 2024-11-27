import React from 'react'
import Link from 'next/link'


const Logo = () => {
    return (
        <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" href="/">
            <img src="/chain.png"  className="h-[40px]" />
            <p className="font-extrabold text-[#680cdb] text-3xl" >Bondex</p>
        </Link>
       
        </div>
    )
}

export default Logo;
