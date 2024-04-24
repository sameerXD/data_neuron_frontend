"use client";
import React, { forwardRef, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { IUser, postProduct, updateProduct } from "../utils/userApi";
import { MdEdit } from "react-icons/md";
import Spinner from "./Spinner";

const Table = forwardRef<
  HTMLDivElement,
  {
    setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
    user: IUser | undefined;
  }
>((props, ref) => {
  const [newRow, setNewRow] = useState({
    productName: "",
    color: "",
    category: "",
    price: "",
  });

  const [showNewRow, setShowNewRow] = useState(false);

  const [loading, setLoading] = useState(false);

  const [openEdit, setOpenEdit] = useState({
    productId: "",
    open: false,
    product: {
      _id: "",
      productName: "",
      color: "",
      category: "",
      price: "",
    },
  });
  const handlePostProduct = async () => {
    try {
      setLoading(true);
      if (!props.user) return;
      const postData = await postProduct({
        email: props.user.email,
        productName: newRow.productName,
        color: newRow.color,
        category: newRow.category,
        price: newRow.price,
      });
      props.setUser(postData);
      setShowNewRow(!showNewRow);
      setLoading(false);
    } catch (err) {
      setLoading(false);

      console.log(err);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      setLoading(true);

      if (!props.user) return;
      const postData = await updateProduct({
        email: props.user.email,
        productName: openEdit.product.productName,
        color: openEdit.product.color,
        category: openEdit.product.category,
        price: openEdit.product.price,
        productId: openEdit.productId,
      });
      props.setUser(postData);
      setOpenEdit((prev) => ({
        open: false,
        productId: "",
        product: prev.product,
      }));
      setLoading(false);
    } catch (err) {
      setLoading(false);

      console.log(err);
    }
  };

  return (
    <div className="relative overflow-x-auto" ref={ref}>
      <div className="flex justify-center items-center">
        <p className="text-[#00df9a]">
          create product Api Hit {props.user?.addProductCount}... ❤️ And update
          product Api count {props.user?.updateProductCount}
        </p>
      </div>

      <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Color
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {props.user?.products?.map((product, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {!(openEdit.open && openEdit.productId === product._id) ? (
                  product.productName
                ) : (
                  <input
                    placeholder="name"
                    value={openEdit.product.productName}
                    onChange={(e) =>
                      setOpenEdit((prev) => {
                        let temp = { ...prev };
                        temp.product.productName = e.target.value;
                        return temp;
                      })
                    }
                    className="text-black"
                  />
                )}
              </th>
              <td className="px-6 py-4">
                {!(openEdit.open && openEdit.productId === product._id) ? (
                  product.color
                ) : (
                  <input
                    placeholder="name"
                    value={openEdit.product.color}
                    className="text-black"
                    onChange={(e) =>
                      setOpenEdit((prev) => {
                        let temp = { ...prev };
                        temp.product.color = e.target.value;
                        return temp;
                      })
                    }
                  />
                )}
              </td>
              <td className="px-6 py-4">
                {!(openEdit.open && openEdit.productId === product._id) ? (
                  product.category
                ) : (
                  <input
                    placeholder="name"
                    value={openEdit.product.category}
                    className="text-black"
                    onChange={(e) =>
                      setOpenEdit((prev) => {
                        let temp = { ...prev };
                        temp.product.category = e.target.value;
                        return temp;
                      })
                    }
                  />
                )}
              </td>
              <td className="px-6 py-4">
                {!(openEdit.open && openEdit.productId === product._id) ? (
                  product.price
                ) : (
                  <input
                    placeholder="name"
                    value={openEdit.product.price}
                    className="text-black"
                    onChange={(e) =>
                      setOpenEdit((prev) => {
                        let temp = { ...prev };
                        temp.product.price = e.target.value;
                        return temp;
                      })
                    }
                  />
                )}
              </td>
              <td className="px-6 py-4 cursor-pointer">
                {!(openEdit.open && openEdit.productId === product._id) ? (
                  <MdEdit
                    onClick={() => {
                      setOpenEdit((prev) => ({
                        open: true,
                        productId: product._id,
                        product: product,
                      }));
                    }}
                  />
                ) : (
                  <button onClick={handleUpdateProduct} disabled={loading}>
                    {loading ? "Loading..." : "submit"}
                  </button>
                )}
              </td>
            </tr>
          ))}

          {showNewRow && (
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <input
                  type="text"
                  className="text-black w-16 md:w-auto"
                  value={newRow.productName}
                  placeholder="name"
                  onChange={(e) => {
                    setNewRow((prev) => ({
                      ...prev,
                      productName: e.target.value,
                    }));
                  }}
                />
              </th>
              <td className="px-6 py-4">
                <input
                  type="text"
                  className="text-black w-12  md:w-auto"
                  value={newRow.color}
                  placeholder="color"
                  onChange={(e) => {
                    setNewRow((prev) => ({
                      ...prev,
                      color: e.target.value,
                    }));
                  }}
                />
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  className="text-black w-20 md:w-auto"
                  value={newRow.category}
                  placeholder="category"
                  onChange={(e) => {
                    setNewRow((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }));
                  }}
                />
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  className="text-black w-8 md:w-auto"
                  value={newRow.price}
                  placeholder="price"
                  onChange={(e) => {
                    setNewRow((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }));
                  }}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showNewRow ? (
        <button
          className="text-2xl text-white w-full flex justify-center cursor-pointer text-center "
          onClick={handlePostProduct}
          disabled={loading}
        >
          <p className="rounded-md bg-[#00df9a] px-2 py-2">
            {loading ? "Loading.." : "submit"}
          </p>
        </button>
      ) : (
        <div
          className="text-2xl text-white w-full flex justify-center cursor-pointer text-center"
          onClick={() => {
            setShowNewRow(!showNewRow);
          }}
        >
          <IoAddCircleOutline size={35} />
          <p>Add a product</p>
        </div>
      )}
    </div>
  );
});

Table.displayName = "Table";
export default Table;
