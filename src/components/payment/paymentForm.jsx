import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';

export default function PaymentForm( {amount , description , img ,onclose}) {

  const [linkData , setLinkData] = useState(null)
  console.log('linkData:', linkData);
  const [loading, setLoading] = useState(false);
  const [showQr, setShowQr]  = useState(false)
  const [amouts , setAmounts] = useState(1) // quantity starts at 1
  const [price , setPrice] = useState(amount) // total price starts at base amount
  const [openComplete, setOpenComplete] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const KEY =  "";

  const orderNo = `ORDER-${Date.now()}`;
  
  const handlePayment = async () => {
    try {
      const response = await  axios.post('https://payment-gateway.phajay.co:8000/v1/api/link/payment-link', {
        amount: price,
        description: description,
        orderNo: orderNo
      } , {
        headers: {
          'Content-Type': 'application/json',
          Authorization:`Basic ${Buffer.from(`${KEY}`).toString("base64")}`
        },
      })
      if(response.status === 200) {
        const paymentUrl = response.data.redirectURL;
        
        // Redirect to payment page on same page
        window.location.href = paymentUrl;
        
        setLoading(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
    }
  }

  const amountProduct = (key) => {
    if(key === "pull"){
      setPrice(prev => prev + amount)
      setAmounts(prev => prev + 1)
    } else if(key === "minus") {
      setPrice(prev => Math.max(amount, prev - amount)) // Don't go below original amount
      setAmounts(prev => Math.max(1, prev - 1)) // Don't go below 1 item
    }
  }
  

  
  const handleCancel = () => {
    // Reset PaymentForm internal state
    setShowQr(false);
    setOpenComplete(false);
    setTransactionData(null);
    setLoading(false);
    
    // Close the component by calling parent's function
    onclose();
  };


  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-auto overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Product Details</h2>
        <button
          onClick={handleCancel}
          className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white hover:bg-opacity-20 rounded-full"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Product Image Section */}
        <div className="lg:w-1/2 p-8 bg-gray-50">
          <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
            <img 
              src={img} 
              alt="Product" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="lg:w-1/2 p-8 flex flex-col justify-between">
          {/* Product Info */}
          <div className="space-y-6">
            {/* Price Display */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-700">Price per unit:</span>
                <span className="text-2xl font-bold text-blue-600">
                  {amount.toLocaleString()} <span className="text-lg">KIP</span>
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-lg font-semibold text-gray-700">Quantity</label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => amountProduct("minus")}
                  disabled={price <= amount}
                  className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-red-500 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center text-xl font-bold text-gray-600 hover:text-red-600"
                >
                  −
                </button>
                <div className="bg-gray-50 px-6 py-3 rounded-xl border">
                  <span className="text-xl font-bold text-gray-900">
                    {Math.max(1, Math.round(price / amount))}
                  </span>
                </div>
                <button
                  onClick={() => amountProduct("pull")}
                  className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center text-xl font-bold text-gray-600 hover:text-blue-600"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-700">Total Amount:</span>
                <span className="text-3xl font-bold text-green-600">
                  {price.toLocaleString()} <span className="text-xl">KIP</span>
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-lg font-semibold text-gray-700">Description</label>
              <div className="bg-gray-50 rounded-xl p-4 border">
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => handlePayment()}
              disabled={loading}
              className="flex-1 bg-gradient-to-r text-sm from-blue-600 to-blue-700 text-white py-4 px-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  paying...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 3H3m4 10v6a1 1 0 001 1h8a1 1 0 001-1v-6m-9 0h10" />
                  </svg>
                  <span>Pay</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Payment processing completed - user will be redirected */}
    </div>
  );
}