import { useContext } from "react"

import Layout from "../../Components/Layout"
import { ShoppingCartContext } from "../../Context"
import OrderCard from "../../Components/OrderCard";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";

function MyOrder(){

  const {
    order
  } = useContext(ShoppingCartContext);
  const currentPath = window.location.pathname;
  let index = currentPath.substring(currentPath.lastIndexOf('/')+1)

  if(index === 'last') index = order?.length - 1;

  return(
    <Layout>
      <div className="flex items-center justify-center relative w-80 mb-6">
        <Link to='/my-orders' className="absolute left-0">
          <ChevronLeftIcon className="h-6 w-6 text-black cursor-pointer" />
        </Link>
        <h1>MyOrder</h1>
      </div>
      <div className='flex flex-col w-96'>
        {
          order?.[index]?.products.map(product =>(
            <OrderCard 
              key={product.id}
              id={product.id}
              title={product.title}
              imageUrl={product.image}
              price={product.price}
            />
          ))
        }
      </div>
      
    </Layout>
  )
}

export default MyOrder