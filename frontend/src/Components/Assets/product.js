import axios from "axios";
import { useEffect, useState } from "react";
var all_product = []
const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API để lấy dữ liệu sản phẩm từ backend
        const response = await axios.get('http://localhost:8081/product');
        setProducts(response.data);
        // Bạn không cần gán giá trị cho all_product ở đây
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    fetchData(); // Gọi hàm fetchData để thực hiện lấy dữ liệu
    }
  }, []);
}
export default all_product;


