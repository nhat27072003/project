import React, { useEffect, useState } from 'react'
import './CRUDProduct.css'
import { Link } from 'react-router-dom';
import { deleteProduct, fetchProducts } from '../../../services/manageProduct';
const CRUDProduct = () => {
  const [products, setProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStock, setFilterStock] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  const fetchData = async () => {
    try {
      // Gọi API để lấy dữ liệu sản phẩm từ backend
      const response = await fetchProducts();

      // Dữ liệu trả về từ API
      const dataFromApi = response.DT;

      // Chuyển đổi dữ liệu để có mảng các đối tượng mới
      const transformedData = dataFromApi.map(item => ({
        productID: item.productID,
        name: item.name, // Thay 'name' bằng tên cột tương ứng trong dữ liệu
        price: item.price, // Thay 'price' bằng tên cột tương ứng trong dữ liệu
        stock: item.stock,
        category: item.category,
        imageUrl: item.imageUrl // Thay 'imageURL' bằng tên cột tương ứng trong dữ liệu
      }));

      // Cập nhật state 'products' với mảng mới
      setProducts(transformedData);

      console.log(transformedData);
      console.log(products); // Lưu ý: Đây sẽ hiển thị giá trị ban đầu của 'products', không phải giá trị mới sau khi set state.
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Gọi hàm fetchData để thực hiện lấy dữ liệu
  }, []);
  const handleDelete = async (productId) => {
    try {
      const response = await deleteProduct(productId);

      if (response.EC === 0) {
        alert(response.EM);
        setProducts(prevProducts => prevProducts.filter(product => product.productID !== productId));
      }
      else alert(response.EM);

    }
    catch (err) {
      alert("Lỗi không thể xóa!");
    }
  }
  const filterProducts = () => {
    let filtered = [...products];

    // Lọc theo loại
    if (filterCategory !== "") {
      filtered = filtered.filter(product => product.category === filterCategory);
    }

    // Sắp xếp theo giá
    if (filterPrice !== "") {
      filtered.sort((a, b) => {
        if (filterPrice === 'highToLow') {
          return b.price - a.price;
        } else if (filterPrice === 'lowToHigh') {
          return a.price - b.price;
        } else {
          return 0;
        }
      });
    }
    if (filterStock !== "") {
      filtered.sort((a, b) => {
        if (filterStock === "highToLow")
          return b.stock - a.stock;
        else if (filterStock === "lowToHigh")
          return a.stock - b.stock;
        else return 0;
      })
    }

    return filtered;
  };
  return (
    <div className='crud-product'>
      <div className="crud-container">
        <Link to='/admin/crudproduct/addproduct'><button className='add-btn'>Add +</button></Link>
        <table className='table'>
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Tên</th>
              <th>
                <div className='option-select'>
                  Giá
                  <select value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)}>
                    <option value="">Mặc định</option>
                    <option value="highToLow">Cao - thấp</option>
                    <option value="lowToHigh">Thấp - cao</option>
                  </select>
                </div>
              </th>
              <th>
                <div className="option-select">
                  Số lượng
                  <select value={filterStock} onChange={(e) => setFilterStock(e.target.value)}>
                    <option value="">Mặc định</option>
                    <option value="highToLow">Cao - thấp</option>
                    <option value="lowToHigh">Thấp - cao</option>
                  </select>
                </div>
              </th>
              <th>
                <div className="option-select">
                  Loại
                  <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                    <option value="">Tất cả</option>
                    <option value="tra-sua">Trà sữa</option>
                    <option value="cafe">Cà phê</option>
                    <option value="nuoc-giai-khat">Nước giải khát</option>
                  </select>
                </div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filterProducts().map((data, i) => (
              <tr key={i}>
                <td><Link to={`/product/${data.productID}`}><img src={data.imageUrl} alt='' /></Link></td>
                <td><Link to={`/product/${data.productID}`} style={{ textDecoration: 'none', color: 'black', textTransform: 'uppercase', fontSize: '16px' }}>{data.name}</Link></td>
                <td>{data.price} 000</td>
                <td>{data.stock}</td>
                <td>{data.category}</td>
                <td>
                  <div className='action-btn'>
                    <Link to={`/admin/crudproduct/updateproduct/${data.productID}`}><button className='update-btn'>Update</button></Link>
                    <Link><button className='delete-btn' onClick={() => handleDelete(data.productID)}>Delete</button></Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default CRUDProduct