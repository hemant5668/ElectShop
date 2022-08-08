import axios from "axios";
import {
  productAction,
  singleProductAction,
  cartAction,
  loginAction,
  registerAction,
  profileAction,
  updateProfileAction,
  orderAction,
  orderDetailsAction,
  payAction,
  myOrderAction,
  userAction,
  deleteUserAction,
  editcreateAction,
  deleteProductAction,
  orderlistAction,
  reviewAction
} from "./index";

export const fetchProductsData = (keyword='') => {
  return async (dispatch) => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/products${keyword}`);
      // console.log(data)
      return data;
    };

    try {
      dispatch(productAction.loading());
      const productData = await fetchData();
      // console.log(productData)
      dispatch(
        productAction.success({
          products: productData,
        })
      );
      dispatch(editcreateAction.Reset())
      dispatch(deleteProductAction.Reset())
      dispatch(reviewAction.Empty())
    } catch (error) {
      dispatch(
        productAction.failed({
          message: error.message,
        })
      );
    }
  };
};

export const fetchSingleProductdata = (id) => {
  return async (dispatch) => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      return data;
    };
    try {
      dispatch(singleProductAction.loading);
      const uniProductData = await fetchProduct();
      dispatch(
        singleProductAction.success({
          product: uniProductData,
        })
      );
    } catch (error) {
      dispatch(
        singleProductAction.failed({
          message: error.message,
        })
      );
    }
  };
};

export const addToCartCreate = (id, qty) => {
  return async (dispatch, getState) => {
    const fechcart = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      return data;
    };
    try {
      const cartData = await fechcart();
      dispatch(
        cartAction.addToCart({
          _id: cartData._id,
          name: cartData.name,
          price: cartData.price,
          image: cartData.image,
          countInStock: cartData.countInStock,
          quantity: qty,
        })
      );
      localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    } catch (error) {
      dispatch(
        cartAction.failed({
          message: error.message,
        })
      );
    }
  };
};

export const removeCartItem = (id) => {
  return (dispatch, getState) => {
    dispatch(cartAction.removeFromCart(id));
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  };
};

export const resetCart = () => {
  return async (dispatch) => {
    dispatch(cartAction.cartReset());
  };
};

export const addShippingData = (data) => {
  return (dispatch) => {
    dispatch(cartAction.shipping(data));
    localStorage.setItem("shippingDetails", JSON.stringify(data));
  };
};
export const savePaymentMethod = (data) => {
  return (dispatch) => {
    dispatch(cartAction.payment(data));
    localStorage.setItem("payment method", JSON.stringify(data));
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const sendUserData = async () => {
      const { data } = await axios.post(
        "api/users/login/",
        { username: email, password: password },
        config
      );
      return data;
    };

    try {
      dispatch(loginAction.loading);
      const userdata = await sendUserData();
      dispatch(loginAction.login({ userdata }));

      localStorage.setItem("userInfo", JSON.stringify(userdata));
    } catch (error) {
      dispatch(
        loginAction.Failed({
          message: "NO Active accounts found by this email",
        })
      );
    } finally {
      dispatch(loginAction.Success);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(loginAction.logout({}));
    dispatch(myOrderAction.Empty());
    dispatch(userAction.Empty());
    localStorage.removeItem("userInfo");
  };
};

export const registerUser = (name, email, password) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const registerUserData = async () => {
      const { data } = await axios.post(
        "api/users/register/",
        { name: name, email: email, password: password },
        config
      );

      return data;
    };

    try {
      dispatch(registerAction.loading);
      const registerData = await registerUserData();
      console.log(registerData);
      dispatch(registerAction.register({ registerData }));
      dispatch(loginAction.login({ registerData }));
      localStorage.setItem("userInfo", JSON.stringify(registerData));
    } catch (error) {
      dispatch(
        registerAction.Failed({
          message: "Username or Email alredy exirts, try another email",
        })
      );
    }
  };
};

export const getUserDetails = (id) => {
  return async (dispatch, getState) => {
    const {
      login: { userInfo },
    } = getState();
    // console.log({'token':token,'id':_id,'name':name})

    // const config={
    //     headers:{
    //         'content-type':'application/json',
    //         Authorization:`Bearer ${token}`
    //     }}
    //     const details= async()=>{
    //         const {data}=await axios.get(`api/users/${id}/`,
    //         config
    //         )
    //         return data
    //     }
    try {
      const { data } = await axios
        .create({
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        })
        .get(`/api/users/${id}/`);

      dispatch(profileAction.loading);
      // const userDetails= await details()
      dispatch(profileAction.details(data));
    } catch (error) {
      dispatch(
        productAction.failed({
          message: error.message,
        })
      );
    }
  };
};

export const updateUserProfile = (user) => {
  return async (dispatch, getState) => {
    const {
      login: { userInfo },
    } = getState();

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const details = async () => {
      const { data } = await axios.put(
        "api/users/profile/update/",
        user,
        config
      );
      return data;
    };
    try {
      const update = await details();
      dispatch(updateProfileAction.update(update));
      dispatch(loginAction.login(update));
      dispatch(profileAction.details(update));

      localStorage.setItem("userInfo", JSON.stringify(update));
    } catch (error) {
      dispatch(
        updateProfileAction.Failed({
          message: "Profile upload failed",
        })
      );
    }
  };
};

export const orderCreate = (order) => {
  return async (dispatch, getState) => {
    const {
      login: { userInfo },
    } = getState();

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const sendOrder = async () => {
      const { data } = await axios.post(`api/orders/add/`, order, config);
      return data;
    };
    try {
      dispatch(orderAction.loading);
      const xdata = await sendOrder();
      dispatch(orderAction.Order(xdata));
    } catch (error) {
      dispatch(orderAction.Failed({ message: error.message }));
    }
  };
};

export const orderCreateReset = () => {
  return async (dispatch) => {
    dispatch(orderAction.Reset());
    localStorage.removeItem("cartItems");
  };
};

export const getOrderDetails = (id) => {
  return async (dispatch, getState) => {
    const {
      login: { userInfo },
    } = getState();

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const sendOrder = async () => {
      const { data } = await axios.get(`/api/orders/${id}/`, config);
      return data;
    };
    try {
      dispatch(orderDetailsAction.loading);
      const xdata = await sendOrder();
      
      dispatch(orderDetailsAction.addOrderDetails(xdata));
    } catch (error) {
      dispatch(orderDetailsAction.Failed({ message: error.message }));
    }
  };
};

export const payment=(id)=>{
  return async(dispatch,getState)=>{
    const {
      login: { userInfo },
    } = getState();

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const pay=async()=>{
      const {data}=await axios.put(`/api/orders/${id}/pay/`,config)
      return data;
    }
    try {
      const xdata = await pay();
      
      dispatch(payAction.Success);
    } catch (error) {
      dispatch(payAction.Failed);
    }

  }
}

export const myOrders=()=>{
      return async(dispatch,getState)=>{

        const {login:{userInfo},}=getState()

        const config={
          headers:{
            "content-type":"application/json",
            Authorization:`Bearer ${userInfo.token}`,
          }
        };
        const orders=async()=>{
          const {data}= await axios.get('/api/orders/myorders/',config)
          return data
        }
        try{
          dispatch(myOrderAction.loading)
          const xdata=await orders()
          dispatch(myOrderAction.myOrderList(xdata))
        }
        catch(error){
          dispatch(myOrderAction.Failed({
            message:error.message
          }))
        }
      }
}

export const getAllUsers=()=>{
  return async(dispatch,getState)=>{
          const {login:{userInfo},}=getState()

          const config={
            headers:{
              "content-type":"applicatiion/json",
              Authorization:`Bearer ${userInfo.token}`,
            }
          }
          const users= async()=>{
            const {data}=await axios.get(`/api/users/`,config)
            return data
          } 
          try{
            dispatch(userAction.loading)
            const xdata= await users()
            dispatch(userAction.allusers(xdata))
          }
          catch(error){
            dispatch(userAction.Failed({
              message:{'details':error.message}
            }))
          }
  }
}

export const deleteUser=(id)=>{
  return async(dispatch,getState)=>{
    const {login:{userInfo},}=getState()

    const config ={
          headers:{
            'content-type':"application/json",
            Authorization:`Bearer ${userInfo.token}`,
          }
    }
    const deleteUser=async()=>{
      const {data}=await axios.delete(`/api/users/delete/${id}`,config)
      return data
    }
    try{
      const xdata=await deleteUser()
      dispatch(deleteUserAction.DeleteUser(xdata))
    }
    catch(error){
      dispatch(deleteUserAction.Failed({
        message:'Delete user action failed'
      }))
    }
  }
}


export const getUser=(id)=>{
  return async(dispatch,getState)=>{
    const {
      login: { userInfo },
    } = getState();

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const details = async () => {
      const { data } = await axios.get(`/api/users/${id}/edit`,config);
      return data;
    };
    try {
      const edit = await details();
      dispatch(profileAction.details(edit));
    } catch (error) {
      dispatch(
        profileAction.Failed({
          message: "admin get Profilefailed",
        })
      );
    }
  };
  }

  export const updateUserAdmin=(data,id)=>{
    return async(dispatch,getState)=>{
      const {login:{userInfo}}=getState()

      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const send= async ()=>{
        const { data1 } = await axios.put(`/api/users/update/${id}`,data,config);
        return data1;
      }
      try {
        const up = await send();
        dispatch(updateProfileAction.update(up));
      } catch (error) {
        dispatch(
          updateProfileAction.Failed({
            message: "Profile updating failed",
          })
        );}      
        
      }
    }
    

  export const createProduct=(data)=>{
    return async(dispatch,getState)=>{
      const {login:{userInfo}}=getState()

      const config = {
        headers: {
          'content-type':'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const send= async ()=>{
        const { data1 } = await axios.post(`/api/products/create/`,data,config);
        return data1;
      }
      try {
        const up = await send();

        dispatch( editcreateAction.Success(up))
        
      } catch (error) {
        dispatch(
          editcreateAction.Failed({
            msgbox: error.message,}));
      }    
    }
  }

  export const deleteProduct=(id)=>{
    return async(dispatch,getState)=>{
      const {login:{userInfo}}=getState()

      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const send= async ()=>{
        const { data1 } = await axios.delete(`/api/products/${id}/delete/`,config);
        return data1;
      }
      try {
        const up = await send();

        dispatch( deleteProductAction.Success(up))
        
      } catch (error) {
        dispatch(
          deleteProductAction.Failed({
            msgbox: error.message,}));
      }    
    }
  }



  export const updateProduct=(data,id)=>{
    return async(dispatch,getState)=>{
      const {login:{userInfo}}=getState()

      const config = {
        headers: {
          'content-type':'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const send= async ()=>{
        const { data1 } = await axios.put(`/api/products/edit/${id}/`,data,config);
        return data1;
      }
      try {
        dispatch(singleProductAction.loading);
        const uniProductData = await send()
      } catch (error) {
        dispatch(
          singleProductAction.failed({
            message: error.message,
          }))} 
    }
  }
  
  export const getAllOrders=()=>{
    return async(dispatch,getState)=>{
            const {login:{userInfo},}=getState()
  
            const config={
              headers:{
                "content-type":"application/json",
                Authorization:`Bearer ${userInfo.token}`,
              }
            }
            const users= async()=>{
              const {data}=await axios.get(`/api/orders/getorders`,config)
              return data
            } 
            try{
              dispatch(orderlistAction.loading)
              const xdata= await users()
              dispatch(orderlistAction.allorders(xdata))
            }
            catch(error){
              dispatch(orderlistAction.Failed({
                message:{'details':error.message}
              }))
            }
    }
  }
  export const sendcomment=(res,product_id)=>{
    return async(dispatch,getState)=>{
            const {login:{userInfo},}=getState()
  
            const config={
              headers:{
                "content-type":"application/json",
                Authorization:`Bearer ${userInfo.token}`,
              }
            }
            const users= async()=>{
              const {data}=await axios.post(`/api/products/${product_id}/review/`,res,config)
              return data
            } 
            try{
              dispatch(reviewAction.loading)
              const xdata= await users()
              dispatch(reviewAction.sendcomment(xdata))
            }
            catch(error){
              dispatch(reviewAction.Failed({
                message:{'details':error.message}
              }))
            }
    }
  }

 