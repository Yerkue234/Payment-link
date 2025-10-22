import React from 'react';
import { useParams } from 'react-router-dom';

export default function PaymentSlug() {
  const { slug } = useParams();

  return (
    <div className="payment-slug-container">
      <h1>Payment Page</h1>
      <p>Slug: {slug}</p>
      {/* Add your payment form or content here */}
    </div>
  );
}