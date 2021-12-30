import { useState } from 'react'
import { HiMenuAlt4 } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'

import logo from './../images/logo.png'

const NavbarItem = ({title, classProps}) => {
    return (
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            {title}
        </li>
    )
}

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false)

    return (
        <nav className='w-full flex md:justify-center justify-between items-center px-12 pt-8'>
            <div className='md:flex[0.5] flex-initial justify-center items-center'>
                <img src={logo} alt="logo" className='w-32 cursor-pointer'/>
            </div>

            <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
                {[ 'Market', 'Exchange', 'Tutorials',  'Wallet' ].map((item, index) => (
                    <NavbarItem title={item} key={item + index} />
                ))}
                <li className='bg-[#2952e3] py-2 px-7 mx-2 rounded-full cursor-pointer hover:bg-[#2546bd]'>
                    Login
                </li>
            </ul>
            
            <div className='flex relative'>
                    {toggleMenu ? <AiOutlineClose fontSize={28} className='text-white empty-hidden cursor-pointer' onClick={() => setToggleMenu(false)} /> : <HiMenuAlt4 fontSize={28} className='text-white empty-hidden cursor-pointer' onClick={() => setToggleMenu(true)}/>}
            </div>
        </nav>
    )
}
export default Navbar