import React from 'react';
import PaymentForm from '../payment/paymentForm';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
 
 const Slider = () => {
    const [isShowForm , setIsShowForm] = useState(false)
    const [amount , setAmount] = useState(null)
    const [descrip , setDescrip] = useState("")
    const [img ,setImg] = useState("")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true);
        console.log('Slider mounted, products:', products.length);
    }, []);
    const products = [
        {
          id: 1,
          img: "/asset/image/short_2.webp",
          amount: 1,
          description: "Premium cotton shorts with superior comfort and breathable fabric. Perfect for daily wear and sports activities."
        },
        {
          id: 2,
          img: "/asset/image/short_3.webp",
          amount: 1,
          description: "Designer athletic shorts featuring moisture-wicking technology and ergonomic fit for active lifestyle."
        },
        {
          id: 3,
          img: "/asset/image/short.webp",
          amount: 1,
          description: "Classic casual shorts made from eco-friendly materials with modern cut and premium finish."
        },
        {
          id: 4,
          img: "/asset/image/short.webp",
          amount: 1,
          description: "Classic casual shorts made from eco-friendly materials with modern cut and premium finish."
        },
        {
          id: 5,
          img: "/asset/image/short.webp",
          amount: 1,
          description: "Classic casual shorts made from eco-friendly materials with modern cut and premium finish."
        },
    ]

    const handleClosePayment = () => {
      setIsShowForm(false);
      setAmount(null);
      setDescrip("");
      setImg("");
  };
    if (!mounted) {
        return null;
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Premium Collection
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our exclusive range of premium shorts designed for comfort and style
            </p>
          </div>
        </div>

        {/* Products Slider */}
        <div className={`max-w-6xl mx-auto transition-opacity duration-300 ${isShowForm ? "opacity-20 pointer-events-none" : "opacity-100"}`}>
          {products.length > 0 && mounted ? (
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 2.5 },
                1024: { slidesPerView: 3 },
              }}
              navigation={true}
              pagination={{ 
                clickable: false,
                bulletClass: 'swiper-pagination-bullet !bg-blue-500 !w-3 !h-3 !mx-2 !opacity-100',
                bulletActiveClass: 'swiper-pagination-bullet-active !bg-blue-600 !scale-125',
              }}
              loop={false}
              className="pb-16"
            >
              {products.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100 p-10">
                    {/* Product Image */}
                    <div className="relative overflow-hidden bg-gray-100 aspect-square">
                      <img
                        src={item.img}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onClick={() =>{
                          setIsShowForm(true)
                          setDescrip(item.description)
                          setAmount(item.amount)
                          setImg(item.img)
                        }}
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <button 
                          className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:shadow-xl"
                          onClick={() =>{
                            setIsShowForm(true)
                            setDescrip(item.description)
                            setAmount(item.amount)
                            setImg(item.img)
                          }}
                        >
                          Quick Buy
                        </button>
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold text-gray-900">
                          {item.amount.toLocaleString()} <span className="text-lg font-medium text-blue-600">KIP</span>
                        </h3>
                        <div className="flex items-center space-x-1 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.description}</p>
                      
                      {/* Action Button */}
                      <button
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                        onClick={() =>{
                          setIsShowForm(true)
                          setDescrip(item.description)
                          setAmount(item.amount)
                          setImg(item.img)
                        }}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>

        {/* Payment Form Modal */}
        {isShowForm && mounted && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-2xl w-full max-h-[90vh] overflow-auto">
              <PaymentForm 
                amount={amount} 
                description={descrip} 
                img={img}
                onclose={handleClosePayment}
              />
            </div>
          </div>
        )}
      </div>
    );
}

export default Slider;