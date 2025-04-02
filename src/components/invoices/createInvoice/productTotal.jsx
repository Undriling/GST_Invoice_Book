import React from "react";

const ProductTotal = ({ products = [], total = 0 }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-100 shadow-lg rounded-lg mt-6">
      <table className="w-full border-collapse border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border border-gray-300 p-2">S. No</th>
            <th className="border border-gray-300 p-2">Product Name</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="text-gray-700">
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">
                {product.productName.toUpperCase()}
              </td>
              <td className="border border-gray-300 p-2">
                ₹{product.price.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-2">{product.quantity}</td>
              <td className="border border-gray-300 p-2">
                ₹{(product.price * product.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Amount */}
      <div className="text-right mt-4 text-lg font-bold text-blue-600">
        Total: ₹{total.toFixed(2)}
      </div>
    </div>
  );
};

export default ProductTotal;
