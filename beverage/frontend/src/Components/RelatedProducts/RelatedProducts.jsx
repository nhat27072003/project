import React, { useContext, useEffect, useState } from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import axios from 'axios'
import { ShopContext } from '../../Context/ShopContext'
import { useParams } from 'react-router-dom'
const RelatedProducts = (props) => {
  const {product} = props;
  const {products, getProducts} = useContext(ShopContext);
  const productID = useParams();
  useEffect(() => {
    // // Gọi API để lấy dữ liệu sản phẩm từ backend
    // axios.get('http://localhost:8081/product')
    //   .then(response => {
    //     // Dữ liệu trả về từ API
    //     const dataFromApi = response.data.recordset;
  
    //     // Chuyển đổi dữ liệu để có mảng các đối tượng mới
    //     const transformedData = dataFromApi.map(item => ({
    //       productID: item.productID,
    //       name: item.name, // Thay 'name' bằng tên cột tương ứng trong dữ liệu
    //       price: item.price, // Thay 'price' bằng tên cột tương ứng trong dữ liệu
    //       stock: item.stock,
    //       category: item.category,
    //       imageUrl: item.imageUrl // Thay 'imageURL' bằng tên cột tương ứng trong dữ liệu
    //     }));
  
    //     // Cập nhật state 'products' với mảng mới
    //     setProducts(transformedData);
  
    //     console.log(transformedData);
    //     console.log(products); // Lưu ý: Đây sẽ hiển thị giá trị ban đầu của 'products', không phải giá trị mới sau khi set state.
    //   })
    //   .catch(error => console.error('Error fetching products:', error));

  }, [products]);

  const relatedProducts = products.filter(item => item.category === product.category && item.productID !== Number(productID.productId)).slice(0, 5);
  console.log(products);
  console.log(productID);
  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
            {relatedProducts.map((item,i)=> {
              return <Item key={i} id={item.productID} name={item.name} image={item.imageUrl} price={item.price} stock={item.stock}/>
            })}
        </div>
    </div>
  )
}

export default RelatedProducts