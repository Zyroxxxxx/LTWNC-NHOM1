import React, { useState } from "react";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { toast } from "react-toastify";
import SummaryApi from "../common";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(SummaryApi.deleteProduct.url, {
        method: SummaryApi.deleteProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: data._id }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        fetchdata();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra khi xóa sản phẩm.");
    } finally {
      setShowConfirmDelete(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            alt={data.productName}
            className="mx-auto object-fill h-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>
        <p className="font-semibold">{displayINRCurrency(data.sellingPrice)}</p>
        <div className="flex justify-between items-center">
          <div
            className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
            onClick={() => setEditProduct(true)}
          >
            <MdModeEditOutline />
          </div>
          <div
            className="w-fit ml-auto p-2 bg-amber-100 hover:bg-amber-600 rounded-full hover:text-white cursor-pointer"
            onClick={() => setShowConfirmDelete(true)}
          >
            <MdDelete />
          </div>
        </div>
      </div>

      {showConfirmDelete && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-xl font-semibold mb-4">
              Bạn có chắc chắn muốn xóa?
            </h2>
            <div className="flex justify-between">
              <button
                className="bg-amber-500 text-white py-2 px-4 rounded"
                onClick={handleDelete}
              >
                Xóa
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded"
                onClick={() => setShowConfirmDelete(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
