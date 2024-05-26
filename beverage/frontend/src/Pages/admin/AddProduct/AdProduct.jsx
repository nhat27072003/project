import React, { useRef, useState } from 'react';
import axios from 'axios';
import './AdProduct.css'
import hasErrors from './CheckAdd';
import { addProduct } from '../../../services/manageProduct';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
  const [category, setcategory] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({
    productname: '',
    price: '',
    quantity: '',
    image: '',
    category: ''
  });
  const imageInputRef = useRef(null);
  const handleAddProduct = async (event) => {
    event.preventDefault();
    const newErrors = { ...errors };

    if (category === '') {
      newErrors.category = 'Chọn loại sản phẩm';
    } else {
      newErrors.category = '';
    }

    if (productName === '') {
      newErrors.productname = 'Tên sản phẩm không được để trống';
    } else {
      newErrors.productname = '';
    }

    if (price === '') {
      newErrors.price = 'Giá không được để trống';
    } else if (/[^0-9]/.test(price) || price <= 0) {
      newErrors.price = 'Giá không phải một số nguyên dương';
    } else {
      newErrors.price = '';
    }

    if (quantity === '') {
      newErrors.quantity = 'Số lượng không được để trống';
    } else if (/[^0-9]/.test(quantity) || quantity <= 0) {
      newErrors.quantity = 'Số lượng không phải một số nguyên dương';
    } else {
      newErrors.quantity = '';
    }

    if (!image) {
      newErrors.image = 'Chưa chọn một file ảnh';
    } else {
      newErrors.image = '';
    }

    setErrors(newErrors);
    if (hasErrors(newErrors)) {
      console.log('Có lỗi tồn tại. Không thể thêm sản phẩm.');
    } else {
      console.log('Không có lỗi. Thêm sản phẩm thành công!');
      // Thêm logic xử lý khi không có lỗi, ví dụ, gửi dữ liệu lên server.

      try {
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('category', category);
        formData.append('image', image);
        console.log(formData);
        const response = await addProduct(formData);
        if (response.EC == 0)
          alert("Thêm sản phẩm thành công");
        else
          alert("Lỗi: ", response.EM);
      } catch (error) {
        console.error('Error adding product:', error);
      }

      setProductName('');
      setPrice('');
      setQuantity('');
      setImage(null);
      setImagePreview(null);
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Hiển thị hình ảnh nhỏ trước khi tải lên
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
    setImage(file);
  };

  return (
    <div className='add-product'>
      <div className='add-product-container'>
        <h1>Thêm sản phẩm mới</h1>
        <form action="" onSubmit={handleAddProduct}>
          <div className="add-fields">
            <div className='bt'>
              <p>Tên sản phẩm:</p>
              <input type="text" onChange={(e) => setProductName(e.target.value)} name='productname' value={productName} />
              {errors.productname === '' ? null : <span>{errors.productname}</span>}
            </div>
            <div className='bt'>
              <p>Giá sản phẩm: (nghìn đồng)</p>
              <input type="text" onChange={(e) => setPrice(e.target.value)} name='price' value={price} />
              {errors.price === '' ? null : <span>{errors.price}</span>}
            </div>
            <div className='bt'>
              <p>Số lượng:</p>
              <input type="text" onChange={(e) => setQuantity(e.target.value)} name='quantity' value={quantity} />
              {errors.quantity === '' ? null : <span>{errors.quantity}</span>}
            </div>
            <div className='bt-select'>
              <p>Loại sản phẩm:</p>
              <select value={category} onChange={(e) => setcategory(e.target.value)}>
                <option value="">Chọn loại</option>
                <option value="tra-sua">Trà Sữa</option>
                <option value="cafe">Cafe</option>
                <option value="nuoc-giai-khat">Nước Giải Khát</option>
              </select>
              {errors.category === '' ? null : <span>{errors.category}</span>}
            </div>
            <div className="bt-img">
              <p>Image:</p>
              <input type="file" onChange={handleImageChange} name='image' ref={imageInputRef} />
              {errors.image === '' ? null : <span>{errors.image}</span>}
              {imagePreview && <img src={imagePreview} alt="Preview" style={{ marginTop: '10px', maxWidth: '100%' }} />}
            </div>
          </div>
          <button type="submit">Thêm</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

