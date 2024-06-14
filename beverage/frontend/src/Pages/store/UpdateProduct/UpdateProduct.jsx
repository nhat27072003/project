import React, { useRef, useState, useEffect, useContext } from 'react';
import hasErrors from '../AddProduct/CheckAdd';
import './UpdateProduct.css'
import { useNavigate, useParams } from 'react-router-dom';
import { getDetailProduct, updateProducct } from '../../../services/manageProduct';
import { UserContext } from '../../../Context/UserContext';
import { ShopContext } from '../../../Context/ShopContext';


const UpdateProduct = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { getProducts } = useContext(ShopContext);
  const { productId } = useParams();
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [userId, setUserId] = useState();
  const [errors, setErrors] = useState({
    productname: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });
  const imageInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy dữ liệu sản phẩm cần sửa từ API hoặc cơ sở dữ liệu và cập nhật state
        const response = await getDetailProduct(productId);
        const productData = response.DT;
        console.log("check detail", productData);
        setProductName(productData.name || ''); // Sử dụng giá trị mặc định nếu giá trị là undefined
        setPrice(productData.price || '');
        setDescription(productData.description || '');
        setCategory(productData.category || '');
        setImagePreview(productData.imageUrl);
        setUserId(productData.userId);

        // Gọi hàm getProducts để cập nhật danh sách sản phẩm
        // await getProducts();
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData(); // Gọi hàm fetchData trong useEffect
  }, []);

  const handleEditProduct = async (event) => {
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

    if (!imagePreview) {
      setImage(imagePreview);
      console.log(imagePreview);
      console.log(image);
    }

    setErrors(newErrors);

    if (hasErrors(newErrors)) {
      console.log('Có lỗi tồn tại. Không thể sửa sản phẩm.');
    } else {
      if (+user.userId === +userId) {
        try {
          const formData = new FormData();
          formData.append('productName', productName);
          formData.append('price', price);
          formData.append('description', description);
          formData.append('category', category);
          formData.append('image', image);

          const response = await updateProducct(productId, formData);

          if (+response.EC === 0) {
            alert("Cập nhật thành công");
            await getProducts();
            navigate('/store/manageproducts');
            setProductName('');
            setPrice('');
            setDescription('');
            setImage(null);
            //setImagePreview(null);
            if (imageInputRef.current) {
              imageInputRef.current.value = '';
            }
          }
          else alert("Cập nhật sản phẩm thất bại");
        } catch (error) {
          console.error('Error updating product:', error);
        }
      }
      else {
        alert("Bạn không thể sửa sản phẩm này!");
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
  console.log(imagePreview);
  return (
    <div className='edit-product'>
      {/* <div className='edit-product-container'>
        <h1>Sửa sản phẩm</h1>
        <form action='' onSubmit={handleEditProduct}>
          <div className='edit-fields'>
            <div className='bt'>
              <p>Tên sản phẩm:</p>
              <input
                type='text'
                onChange={(e) => setProductName(e.target.value)}
                name='productname'
                value={productName}
                placeholder={productName}
              />
              {errors.productname === '' ? null : <span>{errors.productname}</span>}
            </div>
            <div className='bt'>
              <p>Giá sản phẩm: (nghìn đồng)</p>
              <input
                type='text'
                onChange={(e) => setPrice(e.target.value)}
                name='price'
                value={price}
                placeholder={price}
              />
              {errors.price === '' ? null : <span>{errors.price}</span>}
            </div>
            <div className='bt'>
              <p>Số lượng:</p>
              <input
                type='text'
                onChange={(e) => setQuantity(e.target.value)}
                name='quantity'
                value={quantity}
                placeholder={quantity}
              />
              {errors.quantity === '' ? null : <span>{errors.quantity}</span>}
            </div>
            <div className='bt-select'>
              <p>Loại sản phẩm:</p>
              <select value={category} onChange={(e) => setCategory(e.target.value)} placeholder={category}>
                <option value=''>Chọn loại</option>
                <option value='tra-sua'>Trà Sữa</option>
                <option value='cafe'>Cafe</option>
                <option value='nuoc-giai-khat'>Nước Giải Khát</option>
              </select>
              {errors.category === '' ? null : <span>{errors.category}</span>}
            </div>
            <div className='bt-img'>
              <div className="bt-img-left">
                <p>Image:</p>
                <input
                  type='file'
                  onChange={handleImageChange}
                  name='image'
                  ref={imageInputRef}
                />
                {errors.image === '' ? null : <span>{errors.image}</span>}
              </div>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt='Preview'
                />
              )}
            </div>
          </div>
          <button type='submit'>Cập nhật</button>
        </form>
      </div> */}

      <div class="container">
        <h1>Update Product</h1>

        <div class="back-to-products">
          <a href="http://localhost:3000/store/manageproducts">← Back to Products</a>
        </div>

        <form action='' onSubmit={handleEditProduct}>
          <div class="form-group">
            <label for="product-name">Product Name:</label>
            <input type="text" id="product-name" name="productname" placeholder={productName}
              onChange={(e) => setProductName(e.target.value)} value={productName} />
            {errors.productname === '' ? null : <span>{errors.productname}</span>}
          </div>

          <div class="form-group">
            <label for="product-description">Description:</label>
            <textarea id="product-description" name="product-description" placeholder={description}
              onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
          </div>

          <div className="form-row">
            <div class="form-group">
              <label for="product-price">Price ($):</label>
              <input type="number" id="product-price" name="price" placeholder={price}
                onChange={(e) => setPrice(e.target.value)} value={price} />
              {errors.price === '' ? null : <span>{errors.price}</span>}
            </div>

            <div class="form-group">
              <label for="product-category">Category:</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} placeholder={category}>
                <option value="">Chọn loại</option>
                <option value="tra-sua">Trà Sữa</option>
                <option value="cafe">Cafe</option>
                <option value="nuoc-giai-khat">Nước Giải Khát</option>
              </select>
              {errors.category === '' ? null : <span>{errors.category}</span>}
            </div>
          </div>


          <div class="form-group">
            <label for="product-image">Upload Image:</label>
            <input type="file" id="product-image" name="image"
              onChange={handleImageChange} ref={imageInputRef} />
            {errors.image === '' ? null : <span>{errors.image}</span>}
            {imagePreview && <img src={imagePreview} alt="Preview" style={{ marginTop: '10px', width: '100px' }} />}
          </div>

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
