"use client"

import { useSelector } from "react-redux";

import Data from "../utils/data";
import { getDiscountedPricePercentage } from "../utils/helper";
import Link from "next/link";
import Image from "next/image";
import Wrapper from "../components/Wrapper";




const FoodPage = () => {

  const category = useSelector(state => state.category.category)


  return (


    <Wrapper>
    <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
        <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
           {category}
        </div>
    </div>
    <div className="flex flex-wrap justify-center gap-10 items-center m-10">
      {
        Data.filter((data) => {
          if (category === data.category) {
            return data
          }
        }).map((data) => (
      
            <Link key={data.id} href={`/product/${data.id}`}
              onClick={() => {
                localStorage.setItem('data', JSON.stringify(data)),

                  location.href = `/product/${data.id}`
              }}
            >

              <Image
                width={500}
                height={500}
                src={data.img}
                alt={data.name}

              />



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
                      <p className="ml-auto text-base font-medium text-green-500">
                        {getDiscountedPricePercentage(
                          data.original_price,
                          data.price
                        )}
                        % off
                      </p>
                    </>
                  )}
                </div>
              </div>
            </Link>



            ))
      }
          </div >
    </Wrapper>
    

  )
      }

      export default FoodPage

