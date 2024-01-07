"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import Data from "../utils/data";
import { useDispatch } from "react-redux";
import { filterCategory } from "@/redux/categorySlice";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";




const MenuMobile = ({
    showCatMenu,
    setShowCatMenu,
    setMobileMenu,
}) => {
    const [category, setCategory]  = useState([]);
    const dispatch = useDispatch()

    const uniqueCategory = ()=>{
        const filterValue= [...new  Set(Data.map((food)=>food.category))]
         setCategory(filterValue)
       }
     
       useEffect(()=>{
     uniqueCategory()
       },[])
// login logout functionality
const [userName, setUserName] = useState('')
useEffect(()=>{
auth.onAuthStateChanged(user=>{
  if (user) {
    setUserName(user.displayName)
  }else{
    setUserName("")
  }
})

},[])

const router = useRouter();
const handleLogout =  () => {
  try {
    signOut(auth).then((value)=>{
      router.push('/')
    })
    
  } catch (error) {
    console.error('Error logging out:', error.message);
  }
};

    return (
        <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black px-5">
           <li className="cursor-pointer">
                                <Link href={'/'}>Home</Link>
                            </li>
                
                    <React.Fragment >
                      
                            <li
                                className="cursor-pointer py-4  border-b flex flex-col relative"
                                onClick={() => setShowCatMenu(!showCatMenu)}
                            >
                                <div className="flex justify-between items-center">
                                   Categories
                                    <BsChevronDown size={14} />
                                </div>

                                {showCatMenu && (
                                    <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
                                        {category?.map(
                                            (category,i) => {
                                                return (
                                                    <Link
                                                        key={i}
                                                        href={`/${category}`}
                                                        onClick={() => {
                                                            setShowCatMenu(
                                                                false
                                                            );
                                                            setMobileMenu(
                                                                false
                                                            );
                                                            dispatch(filterCategory(category))
                                                        }}
                                                    >
                                                        <li className="py-4 px-8 border-t flex justify-between">
                                                            {category}
                                                           
                                                        </li>
                                                    </Link>
                                                );
                                            }
                                        )}
                                    </ul>
                                )}
                            </li>
                       
                           <li className="cursor-pointer">
                            <h2>{userName ? `Welcome - ${userName}` : <Link href={'/signIn/'}>Login</Link>}</h2>
                
                             </li>
 
                             <li className="cursor-pointer">
                            
                              {userName &&  <button onClick={handleLogout}>Log Out</button>}
                             </li>
                       
                    </React.Fragment>
              
      
        </ul>
    );
};

export default MenuMobile;
