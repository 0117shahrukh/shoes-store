'use client'
import  { useEffect, useState } from 'react'
import Link from 'next/link';
import { BsCart } from 'react-icons/bs';
import { IoMdHeartEmpty } from 'react-icons/io';
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import Wrapper from './Wrapper';
import MenuMobile from './MenuMobile';
import Menu from './Menu';
import { useSelector } from 'react-redux';



const Header = ({categories}) => {
    const {card} = useSelector(state=>state.card)
   
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showCatMenu, setShowCatMenu] = useState(false);
    const [show, setShow] = useState("translate-y-0");
    const [lastScrollY, setLastScrollY] = useState(0);
    const {wishList} = useSelector(state => state.wishList)

  
    
   

    const controlNavbar = () => {
      if (window.scrollY > 200) {
          if (window.scrollY > lastScrollY && !mobileMenu) {
              setShow("-translate-y-[80px]");
          } else {
              setShow("shadow-sm");
          }
      } else {
          setShow("translate-y-0");
      }
      setLastScrollY(window.scrollY);
  };

   
    useEffect(() => {
      window.addEventListener("scroll", controlNavbar);
      return () => {
          window.removeEventListener("scroll", controlNavbar);
      };
  }, [lastScrollY]);

 

  return (
    <div className={` w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300
    ${show}
    `}>
    <Wrapper className="h-[60px] flex justify-between items-center">
    <Link href="/">
                    <img src="/logo.svg" className="w-[40px] md:w-[60px]" />
                </Link>
                <Menu showCatMenu={showCatMenu} 
                setShowCatMenu={setShowCatMenu}
             
               
                 />
                
                {mobileMenu && ( <MenuMobile showCatMenu={showCatMenu} 
                setShowCatMenu={setShowCatMenu}
                setMobileMenu={setMobileMenu}
               
              

                />)}
               

                 <div  className="flex items-center gap-2 text-black">
                 <Link href={'/pages/wishlist'}>
                    {/* Icon start */}
                    <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                        <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
                        {wishList.length > 0 && (
                        <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                            {wishList.length}
                        </div>
                         )}
                    </div>
                    </Link>
                    {/* Icon end */}

                    {/* Icon start */}
                    <Link href={'/pages/cart'}>
                  <div  className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                    <BsCart className="text-[15px] md:text-[20px]" />
                    {card.length > 0 && (
                                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                                    {card.length}
                                </div>
                            )}
                  </div>
                  </Link>
                  {/* Icon end  */}

                    {/* Mobile icon start */}
                    <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
                        {mobileMenu ? (
                            <VscChromeClose
                                className="text-[16px]"
                                onClick={() => setMobileMenu(false)}
                            />
                        ) : (
                            <BiMenuAltRight
                                className="text-[20px]"
                                onClick={() => setMobileMenu(true)}
                            />
                        )}
                    </div>
                    {/* Mobile icon end */}
                 </div>
    </Wrapper>
    </div>
    
  )
}

export default Header;



