

"use client"


import { IoMdHeartEmpty } from "react-icons/io";
import ReactMarkdown from "react-markdown";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import {  useState } from "react";
import { getDiscountedPricePercentage } from "../utils/helper";
import Wrapper from "./Wrapper";
import { addToCard } from "@/redux/productSlice";
import RelatedProducts from "./RelatedProducts";
import { addToWishList } from "@/redux/wishlistSlice";






const ProductDetails = () => {
    const [selectedSize, setSelectedSize] = useState();
    const [showError, setShowError] = useState(false);
    const data = localStorage.getItem('data');
    const datas = JSON.parse(data)

        const dispatch = useDispatch()
        
             
    const notify = () => {
        toast.success("Success. Check your cart!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    return (
      
        <div className="w-full md:py-20">
            <ToastContainer />
            <Wrapper>
           
                <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
                    {/* left column start */}
                    <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
                    

            <Carousel
                infiniteLoop={true}
                showIndicators={false}
                showStatus={false}
                thumbWidth={60}
                className="productCarousel"
            >
              
                    {

                    datas.images.map((img,i)=>(
                     <img
                        key={i}
                        src={img.image}
                        alt={i}
                    />
                   ))
                        
                    }
              
              
            </Carousel>
          
{/* {image.map((img) => (
                    <img
                        key={img.id}
                        src={img.img}
                        alt={img.name}
                    />
                ))} */}
        </div>
                    </div>
                    {/* left column end */}

                    {/* right column start */}
                    <div className="flex-[1] py-3">
                        {/* PRODUCT TITLE */}
                        <div className="text-[34px] font-semibold mb-2 leading-tight">
                        {datas.name}
                        </div>
    
                        {/* PRODUCT SUBTITLE */}
                        <div className="text-lg font-semibold mb-5">
                        {datas.category}
                        </div>

                        {/* PRODUCT PRICE */}
                        <div className="flex items-center">
                            <p className="mr-2 text-lg font-semibold">
                                MRP : &#8377;{datas.price}
                            </p>
                            {datas.original_price && (
                                <>
                                    <p className="text-base  font-medium line-through">
                                        &#8377; {datas.original_price}
                                    </p>
                                    <p className="ml-auto text-base font-medium text-green-500">
                                        {getDiscountedPricePercentage(
                                            datas.original_price,
                                            datas.price
                                        )}
                                        % off
                                    </p>
                                </>
                            )}
                        </div>

                        <div className="text-md font-medium text-black/[0.5]">
                            incl. of taxes
                        </div>
                        <div className="text-md font-medium text-black/[0.5] mb-20">
                            {`(Also includes all applicable duties)`}
                        </div>

                        {/* PRODUCT SIZE RANGE START */}
                        <div className="mb-10">
                            {/* HEADING START */}
                            <div className="flex justify-between mb-2">
                                <div className="text-md font-semibold">
                                    Select Size
                                </div>
                                
                            </div>
                            {/* HEADING END */}

                            {/* SIZE START */}

                            {/* {
                                datas.sizeData.map((items)=>
                               <h1>{items.size}</h1>
                                )
                            } */}
                           
                            <div
                                id="sizesGrid"
                                className="grid grid-cols-3 gap-2"
                            >
                                {datas.sizeData.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`border rounded-md text-center py-3 font-medium ${
                                            item.enabled
                                                ? "hover:border-black cursor-pointer"
                                                : "cursor-not-allowed bg-black/[0.1] opacity-50"
                                        } ${
                                            selectedSize === item.size
                                                ? "border-black"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            setSelectedSize(item.size);
                                            setShowError(false);
                                        }}
                                    >
                                        {item.size}
                                    </div>
                                ))}
                            </div>
                            {/* SIZE END */}

                            {/* SHOW ERROR START */}
                            {showError && (
                                <div className="text-red-600 mt-1">
                                    Size selection is required
                                </div>
                            )}
                            {/* SHOW ERROR END */}
                        </div>
                        {/* PRODUCT SIZE RANGE END */}

                        {/* ADD TO CART BUTTON START */}
                        <button
                            className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                          onClick={()=>
                        {
                            if (!selectedSize) {
                                setShowError(true);
                                document
                                    .getElementById("sizesGrid")
                                    .scrollIntoView({
                                        block: "center",
                                        behavior: "smooth",
                                    });
                            } else {
                                dispatch(
                                    addToCard({
                                        ...datas, selectedSize, oneQuantityPrice: datas.price, quantity: 1
                                    })
                                );
                                notify();
                            }
                           
                        }
                        
                          }
                        >
                            Add to Cart 
                        </button>
                        {/* ADD TO CART BUTTON END */}

                        {/* WHISHLIST BUTTON START */}
                        <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10"
                        onClick={()=>dispatch(addToWishList({...datas}))}
                        >
                            Whishlist
                            <IoMdHeartEmpty size={20} />
                        </button>
                        {/* WHISHLIST BUTTON END */}

                        <div>
                            <div className="text-lg font-bold mb-5">
                                Product Details
                            </div>
                            <div className="markdown text-md mb-5">
                                <ReactMarkdown>{datas.desc}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                    {/* right column end */}
                </div>

           
            </Wrapper>
        </div>
    );
};

export default ProductDetails;




