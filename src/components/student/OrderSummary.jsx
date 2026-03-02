import { use } from "react";
import { useStudent } from "../../contexts/studentContext";

function OrderSummary() {
  const { orderSummary } = useStudent();
  return (
    <>
      <div className="bg-green-100 border border-green-300 text-green-800 p-5 rounded-2xl mb-8 shadow-md">
        <h3 className="text-xl font-bold mb-2">✅ Your Order Summary</h3>
        <p>
          <strong>🥘 Sabji:</strong> {orderSummary.selectedSabji}
        </p>
        <p>
          <strong>🍨 Sweet:</strong> {orderSummary.selectedSweet}
        </p>
        <p>
          <strong>🫓 Rotis:</strong> {orderSummary.rotis}
        </p>
        <p className="text-sm mt-2 text-gray-600">
          Ordered on: {new Date(orderSummary.createdAt).toLocaleString()}
        </p>
      </div>
    </>
  );
}

export default OrderSummary;
