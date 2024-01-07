"use client"

import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import Image from "next/image";
import Wrapper from "@/app/components/Wrapper";
import { remove } from "@/redux/wishlistSlice";




const FoodPage = () => {

  const {wishList} = useSelector(state => state.wishList)
  const dispatch = useDispatch()


  return (


    <Wrapper>
    <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
        <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
        Favourites
        </div>
    </div>
    <div className="flex flex-wrap justify-center gap-10 items-center m-10">
      {
       wishList.map((data,index) => (
             <div key={data.id}>
            <Link  href={`/product/${data.id}`}
              onClick={() => {
              localStorage.setItem('data', JSON.stringify(data)),
                  location.href = `/product/${data.id}`
              }}
            >

              <Image
                width={400}
                height={400}
                src={data.img}
                alt={data.name}

              />

              </Link>

              <div className="p-4 text-black/[0.9]"  >
                <h2 className="text-lg font-medium">{data.name}</h2>
                <div className="flex items-center text-black/[0.5]">
                  <p className="mr-2 text-lg font-semibold">
                    &#8377;{data.price}
                  </p>

                  {data.original_price && (
                    <>
                      <p className="text-base  font-medium line-through">
                        &#8377;{data.original_price}
                      </p>
                      <p className="ml-auto text-base font-medium text-[#11111]">
                      <button className=" py-3 px-6 bg-[#F0F0F0] rounded-3xl font-[16px] font-sans"
                      onClick={()=>dispatch(remove(data))}
                        >Remove</button>
                      </p>
                    </>
                  )}
                </div>
              </div>
           
            </div>


            ))
      }

    
          </div >
           {/* This is empty screen */}

          {wishList.length < 1 && (

              
<div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
<Image
    src="/empty-cart.jpg"
    width={300}
    height={300}
    className="w-[300px] md:w-[400px]"
    alt="card image"
/>
<span className="text-xl font-bold">
    Your wish List is empty
</span>
<span className="text-center mt-4">
    Looks like you have not added anything in your  wish List.
    <br />
    Go ahead and explore top categories.
</span>
<Link
    href="/"
    className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
>
    Continue Shopping
</Link>
</div>
          )}
    </Wrapper>
    

  )
      }

      export default FoodPage

