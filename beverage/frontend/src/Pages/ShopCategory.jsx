import React, { useContext, useEffect, useState } from 'react'
import './CSS/ShopCategory.css'
import Item from '../Components/Item/Item';
import search_icon from '../Components/Assets/search-icon.png'
import { ShopContext } from '../Context/ShopContext';

const ShopCategory = (props) => {
  const { products, getProducts } = useContext(ShopContext);
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {

  }, [products]);
  useEffect(() => {
    setSortBy('');
  }, [props.category]);
  const handleSearch = () => {
    const filtered = products.filter(item => {
      return (
        (props.category === item.category) &&
        (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
    setFilteredProducts(filtered);
  };
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);
  return (
    <div className="shop-product">
      <div className='shop-category'>
        <div className="search-sort">
          <div className="shopcategory-search">
            <label><img src={search_icon} alt="" /></label>
            <input
              type="text"
              placeholder=' search'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="shopcategory-sort">
            <label>Sắp xếp </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Mặc định</option>
              <option value="highToLow">Giá: cao - thấp</option>
              <option value="lowToHigh">Giá: thấp - cao</option>
              <option value="quantityHighToLow">Số lượng: nhiều - ít</option>
              <option value="quantityLowToHigh">Số lượng: ít - nhiều</option>
            </select>
          </div>
        </div>
        <div className="shopcategory-products">
          {filteredProducts
            .filter(item => props.category === item.category)
            .sort((a, b) => {
              if (sortBy === 'highToLow') {
                return b.price - a.price;
              } else if (sortBy === 'lowToHigh') {
                return a.price - b.price;
              } else if (sortBy === 'quantityHighToLow') {
                return b.stock - a.stock;
              } else if (sortBy === 'quantityLowToHigh') {
                return a.stock - b.stock;
              } else {
                return 0;
              }
            })
            .map((item, i) => (
              <Item key={i} id={item.productID} name={item.name} image={item.imageUrl} price={item.price} stock={item.stock} />
            ))}
        </div>
        <div className="shopcategory-loadmore">
          Explore More
        </div>
      </div>
    </div>

  )
}

export default ShopCategory