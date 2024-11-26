import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="text-2xl font-bold"
        >
          Techz Store
        </button>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center w-full justify-between max-w-md border rounded-full shadow-md focus-within:ring-2 ring-amber-600 pl-2">
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            className="w-full outline-none px-3 py-2 rounded-l-full"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-10 bg-amber-600 flex items-center justify-center rounded-r-full text-white cursor-pointer">
            <GrSearch />
          </div>
        </div>

        {/* Menu and Cart */}
        <div className="flex items-center gap-7">
          {/* User Profile */}
          <div className="relative">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {/* Dropdown Menu */}
            {menuDisplay && (
              <div className="absolute bg-white top-12 right-0 w-48 shadow-lg rounded">
                <nav className="py-2 px-3">
                  {/* Hiển thị tên người dùng */}
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    {user?.name || "Người dùng"}
                  </div>

                  {/* Hiển thị email người dùng (nếu có) */}
                  <div className="text-xs text-gray-500 mb-3">
                    {user?.email || "Chưa có email"}
                  </div>

                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="block p-2 text-sm hover:bg-slate-100"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      Quản lý
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {/* Cart */}
          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <FaShoppingCart />
              <div className="bg-amber-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          {/* Login/Logout Button */}
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full text-white bg-amber-600 hover:bg-amber-700 transition"
              >
                Đăng xuất
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-4 py-2 rounded-full text-white bg-amber-600 hover:bg-amber-700 transition"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
