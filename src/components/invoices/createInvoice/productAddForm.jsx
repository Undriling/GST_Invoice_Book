import React, { useState } from "react";
import ProductTotal from "./productTotal";
import { useNavigate } from "react-router";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../../service/firebase";
// import ProductTotal from "./ProductTotal"; // Import the ProductTotal component

const ProductForm = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // Store multiple products
  const [total, setTotal] = useState(0); // Store total price

  const [customer, setCustomer] = useState({
    to: "",
    phone: "",
    email: "",
    address: "",
    gstNo: "",
    otherTaxNo: "",
  });

  const [product, setProduct] = useState({
    productName: "",
    price: "",
    quantity: 1,
  });

  const handleChangeCustomer = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleChangeProduct = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const addProduct = () => {
    const newProduct = {
      ...product,
      price: Number(product.price),
      quantity: Number(product.quantity),
    };

    setProducts([...products, newProduct]); 
    setTotal(total + newProduct.price * newProduct.quantity); 

    setProduct({ productName: "", price: "", quantity: 1 }); 
  };

  const saveData = async () => {
    console.log("Customer Details:", customer);
    console.log("Products:", products);
    const data = await addDoc(collection(db, 'invoices'), {
      date: Timestamp.fromDate(new Date()),
      customerDetails: customer,
      productDetails: products,
      productsTotal: total
    })
    console.log(data)
    navigate('/home/viewinvoices')
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-gray-700 mb-4">New Invoice</h2>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {/* Customer Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="to"
            placeholder="To"
            value={customer.to}
            onChange={handleChangeCustomer}
            className="border rounded-md p-3 w-full focus:outline-blue-500"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={customer.phone}
            onChange={handleChangeCustomer}
            className="border rounded-md p-3 w-full focus:outline-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={customer.email}
            onChange={handleChangeCustomer}
            className="border rounded-md p-3 w-full focus:outline-blue-500"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={customer.address}
            onChange={handleChangeCustomer}
            className="border rounded-md p-3 w-full focus:outline-blue-500"
          />
          <input
            type="text"
            name="gstNo"
            placeholder="GST No."
            value={customer.gstNo}
            onChange={handleChangeCustomer}
            className="border rounded-md p-3 w-full focus:outline-blue-500"
          />
          <input
            type="text"
            name="otherTaxNo"
            placeholder="Other TAX Cate. Reg. No. (If any)"
            value={customer.otherTaxNo}
            onChange={handleChangeCustomer}
            className="border rounded-md p-3 w-full focus:outline-blue-500"
          />
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={product.productName}
            onChange={handleChangeProduct}
            className="border rounded-md p-3 w-full focus:outline-blue-500"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChangeProduct}
            className="border rounded-md p-3 w-full focus:outline-blue-500"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={product.quantity}
            onChange={handleChangeProduct}
            className="border rounded-md p-3 w-full focus:outline-blue-500"
          />
        </div>

        
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <button
            type="button"
            onClick={addProduct}
            className="bg-blue-600 text-white px-4 py-2 rounded-md w-full md:w-auto hover:bg-blue-700">
            Add Product
          </button>

          <button
            type="submit"
            onClick={saveData}
            className="bg-pink-600 text-white px-4 py-2 rounded-md w-full md:w-auto hover:bg-pink-700">
            Save
          </button>
        </div>
      </form>

      {/* Pass products and total as props to ProductTotal */}
      {products && <ProductTotal products={products} total={total} />}
    </div>
  );
};

export default ProductForm;
