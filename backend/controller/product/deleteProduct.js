const Product = require('../../models/productModel');

const deleteProductController = async (req, res) => {
  const { productId } = req.body;

  try {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Không thể tìm thấy sản phẩm.' });
    }

    return res.json({ success: true, message: 'Xóa sản phẩm thành công.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Có lỗi xảy ra khi xóa sản phẩm.' });
  }
};

module.exports = deleteProductController;
