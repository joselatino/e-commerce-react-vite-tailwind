import {createContext, useEffect, useState} from 'react';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({children}) => {
  //Product detail - open/close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);
  //Checkout side menu - open/close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);
  //Product Detail - Show product
  const [productToShow, setProductToShow] = useState({ 
    images: [],
  });
  //Shopping Cart - add products to cart
  const [cartProducts, setCartProducts] = useState([])

  //Shopping Cart - Order
  const [order, setOrder] = useState([])

  //Ger products
  const [items, setItems] = useState(null);

  const [filteredItems, setFilteredItems] = useState(null);

  //get products by title 
  const [searchByTitle, setSearchByTitle] = useState(null);
  //get products by category
  const [searchByCategory, setSearchByCategory] = useState(null);

  useEffect(()=> {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setItems(data))
    
  }, [])

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
  }
  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter(item => item.category.toLowerCase().includes(searchByCategory.toLowerCase()))
  }

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if(searchType === 'BY_TITLE') {
      return filteredItemsByTitle(items, searchByTitle)
    }
    if(searchType === 'BY_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory)
    }
    if(searchType == 'BY_TITLE_AND_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory).filter( item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()));
    }
    if(!searchType){
      return items;
    }
  }

  useEffect(()=> {
    if(searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY' ,items, searchByTitle, searchByCategory))
    if(searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE',items, searchByTitle, searchByCategory))
    if(!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY',items, searchByTitle, searchByCategory))
    if(!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null,items, searchByTitle, searchByCategory))
  }, [items, searchByTitle, searchByCategory])

  console.log('searchByTitle', searchByTitle);
  console.log('searchByCategory', searchByCategory);
  console.log('filteredItems', filteredItems);

  return (
    <ShoppingCartContext.Provider value={{
      openProductDetail,
      closeProductDetail,
      isProductDetailOpen,
      productToShow,
      setProductToShow,
      cartProducts,
      setCartProducts,
      isCheckoutSideMenuOpen,
      openCheckoutSideMenu,
      closeCheckoutSideMenu,
      order,
      setOrder,
      items,
      setItems,
      searchByTitle,
      setSearchByTitle,
      filteredItems,
      searchByCategory,
      setSearchByCategory,
      }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

