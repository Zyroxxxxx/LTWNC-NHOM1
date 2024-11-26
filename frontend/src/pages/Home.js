import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList /> 
      <BannerProduct />
      <VerticalCardProduct category={"airpods"} heading={"Top Airpods"} />
      <VerticalCardProduct category={"watches"} heading={"Đồng hồ phổ biến"} />
      <VerticalCardProduct category={"mobiles"} heading={"Điện thoại di động"} />
      <VerticalCardProduct category={"mouse"} heading={"Chuột máy tính"} />
      <VerticalCardProduct category={"televisions"} heading={"Ti vi"} /> 
      <VerticalCardProduct category={"camera"} heading={"Máy ảnh & Nhiếp ảnh"} />
      <VerticalCardProduct category={"earphones"} heading={"Tai nghe có dây"} />
      <VerticalCardProduct category={"speakers"} heading={"Loa Bluetooth"} />
      <VerticalCardProduct category={"refrigerator"} heading={"Tủ lạnh"} />
      <VerticalCardProduct category={"trimmers"} heading={"Máy cạo râu"} /> 
      <VerticalCardProduct category={"processor"} heading={"Bộ vi xử lý"} /> 
    </div>
  )
}

export default Home
