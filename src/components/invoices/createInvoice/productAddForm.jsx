import React, { useState } from "react";
import ProductTotal from "./productTotal";
import { useNavigate } from "react-router";
import { addDoc, collection, doc, Timestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../service/firebase";

const ProductForm = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); 
  const [total, setTotal] = useState(0); 

  const [customer, setCustomer] = useState({
    to: "",
    phone: "",
    email: "",
    address: "",
    gstNo: "",
    otherTaxNo: "",
    memoNo: "",
    customerId: "",
    paidBy: "",
  });

  const [product, setProduct] = useState({
    productName: "",
    price: "",
    quantity: 1,
    gstPercentage: ""
  });

  const handleChangeCustomer = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleChangeProduct = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const updatedCustomer = {
    ...customer,
    paidBy: customer.paidBy.toUpperCase(),
  };

  const addProduct = () => {
    const newProduct = {
      ...product,
      price: Number(product.price),
      quantity: Number(product.quantity),
      gstPercentage: Number(product.gstPercentage)
    };

    setProducts([...products, newProduct]);
    setTotal(total + ((newProduct.price * newProduct.quantity) + ((product.price * product.quantity) * (product.gstPercentage / 100))));

    setProduct({ productName: "", price: "", quantity: 1,  gstPercentage: ""});
  };

  const saveData = async () => {
    console.log("Customer Details:", customer);
    console.log("Products:", products);
    const data = await addDoc(collection(db, "invoices"), {
      date: Timestamp.fromDate(new Date()),
      customerDetails: updatedCustomer,
      productDetails: products,
      productsTotal: total,
      userId: auth.currentUser.uid,
    });

    await updateDoc(doc(db, "invoices", data.id), {
      id: data.id, 
    });
    console.log(data);
    navigate("/home/viewinvoices");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <div className="sm:block md:hidden flex justify-end">
        <img src="/vite.svg" />
      </div>

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
          <input
            type="text"
            name="memoNo"
            placeholder="Memo No."
            value={customer.memoNo}
            onChange={handleChangeCustomer}
            className="border rounded-md p-3 w-full focus:outline-blue-500"
          />
          <input
            type="text"
            name="customerId"
            placeholder="Customer Id. (If any)"
            value={customer.customerId}
            onChange={handleChangeCustomer}
            className="border rounded-md p-3 w-full focus:outline-blue-500"
          />

          <input
            type="text"
            name="paidBy"
            placeholder="Pay By (Cash/Cheque/UPI)"
            value={customer.paidBy}
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
          <input
            type="number"
            name="gstPercentage"
            placeholder="Item GST Percentage %"
            value={product.gstPercentage}
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
