import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import Data from "../utils/data";
import { useDispatch } from "react-redux";
import { filterCategory } from "@/redux/categorySlice";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";


const subMenuData = [
    { id: 1, name: "Jordan", doc_count: 11 },
    { id: 2, name: "Sneakers", doc_count: 8 },
    { id: 3, name: "Running shoes", doc_count: 64 },
    { id: 4, name: "Football shoes", doc_count: 107 },
];


const Menu = ({ showCatMenu, setShowCatMenu }) => {
    const [category, setCategory]  = useState([]);
    const dispatch = useDispatch()
    
   

    const uniqueCategory = ()=>{
        const filterValue= [...new  Set(Data.map((food)=>food.category))]
         setCategory(filterValue)
       }
     
       useEffect(()=>{
     uniqueCategory()
       },[])

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
        <ul className="hidden md:flex items-center gap-8 font-medium text-black">
           <li className="cursor-pointer">
                                <Link href={'/'}>Home</Link>
                            </li>

                            
                
                    <React.Fragment>
                       
                            <li
                                className="cursor-pointer flex items-center gap-2 relative"
                                onMouseEnter={() => setShowCatMenu(true)}
                                onMouseLeave={() => setShowCatMenu(false)}
                            >
                               
                               Categories
                                <BsChevronDown size={14} />

                                {showCatMenu && (
                                    <ul className="bg-white absolute top-6 left-0 min-w-[250px] px-1 py-1 text-black shadow-lg">
                                        {category?.map(
                                            (category,i) => {
                                                return (
                                                    <Link
                                                        key={i}
                                                        href={`/${category}`}
                                                        onClick={() =>
                                                            {
                                                                setShowCatMenu(
                                                                    false
                                                                ),
                                                                dispatch(filterCategory(category))
                                                            }
                                                          
                                                        }
                                                    >
                                                        <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md">
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
            
          
            <li className="cursor-pointer">
           
           
    
    
                                {/* <Link href={`${userName ? '/signIn' : '/'}`}>
                                    {userName ? <>
                                    userName
                                    </> : 
                                    <>
                                   <span onClick={handleLogout}>loggOut</span>
                                    </>}
                                    </Link> */}
                            </li>

                            {/* <h2>{userName ? `Welcome - ${userName}` : (<Link href={'/login'}></Link>)}</h2> */}
        </ul>
    );
};

export default Menu;
