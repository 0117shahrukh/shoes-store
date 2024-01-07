"use client"

import Data from "../utils/data";
import Product from "./Product";
import Wrapper from "./Wrapper";

export default function ProductCard() {


  return (
    <main>

     <Wrapper>
                {/* heading and paragaph start */}
                <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
                    <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                        Cushioning for Your Miles
                    </div>
                    <div className="text-md md:text-xl">
                        A lightweight Nike ZoomX midsole is combined with
                        increased stack heights to help provide cushioning
                        during extended stretches of running.
                    </div>
                </div>
                {/* heading and paragaph end */}

                {/* products grid start */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
            
                       
                   {
                    Data.map((data)=>{
                      return (
                        <div key={data.id}>
                     <Product  data={data} />
                     
                     </div>
                      )
                    })
                   }


                   
                  
                    {/* <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />        
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard /> */}
                
                {/* products grid end */}
                </div>
            </Wrapper>
    </main>
  )
}







