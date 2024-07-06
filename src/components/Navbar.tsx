import logo from '/icons/logo.svg'


const Navbar = () => {
    return ( 
        <nav className='py-3 px-24 bg-MAIN_BG w-full border-b h-fit shadow-sm'>
            <a href='/' className='w-fit unselectable flex gap-2 items-center text-PRIMARY_CL font-semibold text-md'> 
                <img src={logo} alt="site logo" className='w-5 h-5'/>
                searchit
            </a>
        </nav>
     );
}
 
export default Navbar;