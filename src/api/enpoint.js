
const API = {
  USER: {
    LOGIN: '/authorization/login'
  },
  FOOD: {
    GETALLFOOD: '/food/all',
    GETFOODBYCATEGORY: '/food?categoryId=',
    GETFOODBYSEARCH: '/food/',
    CATEGORY: '/categories',
    ADDCATEGORY: '/categories',
    UPDATEFOOD: '/food/',
    GETIMAGE: '/food/img/',
    ADDPRODUCT: '/food',
    // GETFOODID: '/food'
    GETFOODID: '/food'
  },
  ORDER: {
    GETALLORDER: '/orders/all',
    ACCESSORDERS: '/orders',
  }

}

export default API;
