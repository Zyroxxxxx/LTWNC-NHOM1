import React from "react";

const ForgotPassword = () => {
  return (
    <section id="forgot-password" className="bg-gray-50 py-10">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto rounded-lg shadow-md">
          <h2 className="text-center text-2xl font-semibold mb-4">
            Quên Mật Khẩu
          </h2>
          <p className="text-center mb-6 text-gray-600">
            Nhập email của bạn để nhận hướng dẫn khôi phục mật khẩu.
          </p>

          <form className="flex flex-col gap-4">
            <div>
              <label>Email:</label>
              <div className="bg-slate-100 p-2 rounded-md">
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Gửi yêu cầu
            </button>
          </form>

          <p className="my-5 text-center">
            Quay lại trang{" "}
            <a
              href="/login"
              className="text-amber-600 hover:text-amber-700 hover:underline"
            >
              Đăng nhập
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
