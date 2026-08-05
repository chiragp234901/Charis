import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency ,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size,setSize] = useState('')

  const fetchProductData = async () => {

    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })

  }

  useEffect(() => {
    fetchProductData();
  }, [productId,products])

  return productData ? (
    <div className="border-t pt-6 sm:pt-10 transition-opacity duration-500">
      {/*----------- Product Data-------------- */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

        {/*---------- Product Images------------- */}
        <div className="flex-1 flex flex-col-reverse md:flex-row gap-4">
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
              {
                productData.image.map((item,index)=>(
                  <img onClick={()=>setImage(item)} src={item} key={index} className={`w-20 md:w-full aspect-square object-cover rounded-lg cursor-pointer border transition ${
                        image === item
                            ? "border-[#4B072B]"
                            : "border-gray-200 hover:border-gray-400"
                    }`} alt="" />
                ))
              }
          </div>
          <div className='w-full sm:w-[80%]'>
              <img
                  src={image}
                  alt={productData.name}
                  className="w-full rounded-xl object-cover aspect-square"
              />
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className="flex-1 w-full">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800">{productData.name}</h1>
          <div className=' flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className="w-4 h-4" />
              <img src={assets.star_icon} alt="" className="w-4 h-4" />
              <img src={assets.star_icon} alt="" className="w-4 h-4" />
              <img src={assets.star_icon} alt="" className="w-4 h-4" />
              <img src={assets.star_dull_icon} alt="" className="w-4 h-4" />
              <p className='pl-2'>(122)</p>
          </div>
          <p className="mt-6 text-3xl lg:text-4xl font-bold text-[#4B072B]">{currency}{productData.price}</p>
          <p className="mt-6 text-gray-600 leading-7 lg:w-4/5">{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
              {/* Show Size Selection Only for Apparel */}
              {productData.category === "Apparel" && (
                <div className="flex flex-col gap-4 my-8">
                  <p>Select Size</p>
                  <div className="flex gap-2">
                    {productData.sizes.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setSize(item)}
                       className={`px-5 py-2 rounded-lg border transition ${
                          item === size
                              ? "bg-[#4B072B] text-white border-[#4B072B]"
                              : "bg-gray-100 hover:bg-gray-200"
                      }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
          </div>
          <button onClick={()=>addToCart(productData._id, size)} className="mt-2 w-full sm:w-auto bg-[#4B072B] text-[#ffddd2] px-10 py-4 rounded-lg font-medium transition hover:bg-[#64103c]">ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className="mt-6 flex flex-col gap-3 text-sm text-gray-600">
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ---------- Description & Review Section ------------- */}
      <div className='mt-20'>
        <div className="flex flex-wrap">
          <b className="border px-6 py-4 text-sm font-medium">Description</b>
          <p className="border px-6 py-4 text-sm font-medium">Reviews (122)</p>
        </div>
        <div className="border rounded-b-lg p-6 text-gray-600 leading-7">
          <p>{productData.description}</p>
        </div>
      </div>

      {/* --------- display related products ---------- */}

      <RelatedProducts recipient={productData.recipient} category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className=' opacity-0'></div>
}

export default Product
