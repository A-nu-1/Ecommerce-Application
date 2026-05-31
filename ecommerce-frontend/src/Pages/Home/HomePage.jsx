import './HomePage.css';
import { Header } from '../../components/Header';
//import { products } from '../../startingCode/data/products';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { ProductsGrid } from './ProductsGrid';

export default function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);

  const [ searchParams ] = useSearchParams();
  const search = searchParams.get('search');


  useEffect(() => {
    const getHomeData = async () => {

     // const response = await axios.get('/api/products');   //async await is preferred over promises with .then

    const urlPath = search ? `/api/products?search=${search}` : '/api/products';
    const response = await axios.get(urlPath);
      setProducts(response.data);
    };
    getHomeData();
  }, [search]);



  return (
    <div>
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </div>
  );
}