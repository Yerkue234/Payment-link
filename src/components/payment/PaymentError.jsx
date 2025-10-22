// src/pages/PaymentError.tsx
export default function PaymentError() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold text-red-600">Payment Failed ❌</h1>
      <p>Something went wrong or you canceled the payment.</p>
    </div>
  );
}
