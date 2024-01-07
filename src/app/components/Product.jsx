
"use client"

import Image from "next/image";
import Link from "next/link";
import { getDiscountedPricePercentage } from "../utils/helper";

const Product = ({data}) => {

    return (
       
        <Link href={`/product/${data.id}`}
        onClick={()=> {
            localStorage.setItem('data', JSON.stringify(data)),

            location.href=`/product/${data.id}`
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
    
    );
};

export default Product;
