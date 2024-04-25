import { useContext } from 'react'
import { Link } from 'react-router-dom' 

import { XMarkIcon } from '@heroicons/react/24/solid'

import './styles.css'
import { ShoppingCartContext } from '../../Context'
import OrderCard from '../OrderCard'
import { totalPrice } from '../../utils'

const CheckoutSideMenu = () => {
  const {
    isCheckoutSideMenuOpen, 
    closeCheckoutSideMenu,
    cartProducts,
    setCartProducts,
    count,
    setCount,
    order,
    setOrder,
    setSearchByTitle
  } = useContext(ShoppingCartContext)

  const handleDelete = (id) => {
    const filteredProducts = cartProducts.filter(product =>product.id !== id);

    setCartProducts(filteredProducts);
    setCount(count - 1)
  }

  function handleCheckout(){
    const orderToAdd = {
      date: '01.02.23',
      products: cartProducts,
      totalProducts: cartProducts.length,
      totalPrice: totalPrice(cartProducts)
    }

    setOrder([...order, orderToAdd])
    setCartProducts([]);
    setSearchByTitle(null)
  }

  return (
    <aside 
      className={`${isCheckoutSideMenuOpen?'flex':'hidden'} checkout-side-menu flex flex-col fixed right-0 border border-black rounded-lg bg-white`} >
      <div className='flex justify-between items-center p-6'>
        <h2 className='font-medium text-xl'>My Order</h2>
        <XMarkIcon  
          className='h6 w-6 text-black cursor-pointer'
          onClick={()=> closeCheckoutSideMenu()}
        />
      </div>
      <div className='px-6 overflow-y-scroll flex-1'>
        {
          cartProducts.map((product)=> 
            <OrderCard 
              key={product.id}
              id={product.id}
              title={product.title}
              imageUrl={product.image}
              price={product.price}
              handleDelete={handleDelete}
            />
          )
        }
      </div>
      <div className='px-6 mb-6'>
        <p className='flex justify-between items-center mb-2'>
          <span className='font-light'>Total</span>
          <span className='font-medium text-2xl'>${totalPrice(cartProducts).toFixed(2)}</span>
        </p>
        <Link to='/my-orders/last'>
          <button className='bg-black py-3 text-white w-full rounded-lg' onClick={()=> handleCheckout()}>Checkout</button>
        </Link>
      </div>
    </aside>
  )
}

export default CheckoutSideMenu;