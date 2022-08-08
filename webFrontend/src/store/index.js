import { createSlice, configureStore } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    isSuccces: false,
    isFailed: false,
    products: [],
    message: null,
  },
  reducers: {
    loading(state) {
      state.isLoading = true;
      state.products = [];
    },
    success(state, action) {
      state.isSuccces = true;
      state.isLoading = false;
      state.products = action.payload.products;
    },
    failed(state, action) {
      state.isFailed = true;
      state.isLoading = false;
      state.isSuccces = false;
      state.message = action.payload.message;
    },
  },
});

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState: {
    isLoading: false,
    isSuccces: false,
    isFailed: false,
    product: [],
    message: null,
  },
  reducers: {
    loading(state) {
      state.isLoading = true;
      state.product = [];
    },
    success(state, action) {
      state.isSuccces = true;
      state.isLoading = false;
      state.product = action.payload.product;
    },
    failed(state, action) {
      state.isFailed = true;
      state.isLoading = false;
      state.isSuccces = false;
      state.message = action.payload.message;
    },
  },
});

const cartDataFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const shippingDataFromLocalStorage = localStorage.getItem("shippingDetails")
  ? JSON.parse(localStorage.getItem("shippingDetails"))
  : [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: cartDataFromLocalStorage,
    message: null,
    isFailed: false,
    isSuccces: false,
    shippingDetails:shippingDataFromLocalStorage,
    paymentMethod:''
  },
  reducers: {
    failed(state, action) {
      state.isFailed = true;
      state.isSuccces = false;
      state.message = action.payload.message;
    },
    shipping(state,action){
      state.shippingDetails=action.payload
    },
    cartReset(state){
      state.isFailed=false
      state.isSuccces=false
      state.message=''
      state.cart=[]

    },
    payment(state,action){
      state.paymentMethod=action.payload
    },

    removeFromCart(state, action) {
      const id = action.payload;
      state.cart = state.cart.filter((item) => item._id !== id);
    },
    addToCart(state, action) {
      const newItem = action.payload;
      state.isSuccces = true;
      const existingItem = state.cart.find((item) => item._id === newItem._id);
      if (existingItem) {
        // console.log(existingItem)
        existingItem.quantity = newItem.quantity;
      } else {
        state.cart.push({
          _id: newItem._id,
          name: newItem.name,
          price: newItem.price,
          image: newItem.image,
          countInStock: newItem.countInStock,
          quantity: newItem.quantity,
        });
      }
    },
  },
});

const userDatafromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const userLoginSlice = createSlice({
  name: "login",
  initialState: {
    userInfo: userDatafromLocalStorage,
    isLoading: false,
    isSucess: false,
    isFailed: false,
    message: null,
    isLogout: false,
  },
  reducers: {
    loading(state) {
      state.isLoading = true;
    },
    Failed(state, action) {
      state.isFailed = true;
      state.message = action.payload.message;
    },
    Success(state) {
      state.isFailed = false;
    },
    login(state, action) {
      state.isSucess = true;
      state.isFailed = false;
      state.isLoading = false;
      state.userInfo = action.payload;
      state.message = null;
    },
    logout(state) {
      state.isLogout = true;
      state.userInfo = null;
    },
  },
});

const registerSlice = createSlice({
  name: "register",
  initialState: {
    userInfo: null,
    isLoading: false,
    isSucess: false,
    isFailed: false,
    message: null,
  },
  reducers: {
    register(state, action) {
      state.isSucess = true;
      state.userInfo = action.payload;
      state.message = null;
    },
    Failed(state, action) {
      state.isFailed = true;
      state.message = action.payload.message;
    },
    loading(state) {
      state.isLoading = true;
    },
    Success(state) {
      state.isFailed = false;
    },
  },
});

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    details: null,
    isLoading: false,
    isSucess: false,
    isFailed: false,
    message: null,
  },
  reducers: {
    details(state, action) {
      state.isSucess = true;
      state.details = action.payload;
      state.message = null;
    },
    Failed(state, action) {
      state.isFailed = true;
      state.message = action.payload.message;
    },
    loading(state) {
      state.isLoading = true;
    },
    Success(state) {
      state.isFailed = false;
    },
  },
});

const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState: {
    update: null,
    isLoading: false,
    isSucess: false,
    isFailed: false,
    updatedMsg: null,
  },
  reducers: {
    update(state, action) {
      state.isSucess = true;
      state.update = action.payload;
      state.updatedMsg = "Profile updated Successfully";
    },
    Failed(state, action) {
      state.isFailed = true;
      state.isSucess = false;
      state.updatedMsg = action.payload.updatedMsg;
    },
    loading(state) {
      state.isLoading = true;
    },
    Success(state) {
      state.isFailed = false;
    },
  },
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderCreateDetails: null,
    isLoading: false,
    isSucess: false,
    isFailed: false,
    message: '',
  },
  reducers: {
    Order(state, action) {
      state.isSucess = true;
      state.orderCreateDetails = action.payload;
      state.message = "Successfully";
    },
    Failed(state, action) {
      state.isFailed = true;
      state.message = action.payload.message;
    },
    loading(state) {
      state.isLoading = true;
    },
    Success(state) {
      state.isFailed = false;
    },
    Reset(state) {
      state.orderCreateDetails =[];
      state.isFailed = false;
      state.isLoading = false;
      state.isSucess = false;
      state.message=''
    },
  },
});

const OrderDetailSlice=createSlice({
  name:'orderDetail',
  initialState:{OneOrderDetail:null,
    isLoading: false,
    isSucess: false,
    isFailed: false,
    message: '',},
  reducers:{
    addOrderDetails(state, action) {
      state.isSucess = true;
      state.OneOrderDetail = action.payload;
      state.message = "Successfully";
    },
    Failed(state, action) {
      state.isFailed = true;
      state.message = action.payload.message;
    },
    loading(state) {
      state.isLoading = true;
    },
    Success(state) {
      state.isFailed = false;
    },
  }  

})

const PaySlice=createSlice({
  name:'pay',
  initialState:{isSuccess:false,isFailed:false},
  reducers:{
    Success(state){
      state.isSuccess=true
    },
    Failed(state){
      state.isFailed=true
    }
  }
})

const myOrdersListSlice=createSlice({
  name:'myOrders',
  initialState:{myAllOrders:[],isSucess1:false,isFailed1:false,isLoading1:false,message1:''},
  reducers:{
    myOrderList(state,action){
      state.myAllOrders=action.payload;
      state.isSucess1=true;
      state.isLoading1=false;
    },
    loading(state){
      state.isLoading1=true
    },
    Failed(state,action){
      state.isFailed1=true
      state.message1=action.payload.message
      state.isLoading1=false
    },
    Empty(state){
      state.isFailed1=false
      state.message1=''
      state.isLoading1=false
      state.myAllOrders=[]
      state.isSucess1=false;
    }
  }

})

const userListSlice=createSlice({
  name:'users',
  initialState:{userList:[],isSucess:false,isFailed:false,isLoading:false,message:''},
  reducers:{
    allusers(state,action){
      state.isLoading=false
      state.isSucess=true
      state.userList=action.payload
    },
    loading(state){
      state.isLoading=true
    },
    Failed(state,action){
      state.isFailed=true
      state.message=action.payload.message
      state.isLoading=false
    },
    Empty(state){
      state.isFailed=false
      state.message=''
      state.isLoading=false
      state.userList=[]
      state.isSucess=false;
    }

  }
})

const deleteUserProfileSlice=createSlice({
  name:'deleteUser',
  initialState:{deleteX:null,isSucess3:false,isFailed3:false},
  reducers:{
    DeleteUser(state,action){
      state.isSucess3=true
      state.deleteX=action.payload
    },
    Failed(state,action){
      state.isFailed3=true
      state.deleteX=action.payload.message
    }
  }
})

const EditCreateProductSlice=createSlice({
  name:'editcreate',
  initialState:{msgbox:'',isSucess:false,isFailed:false},
  reducers:{
    Success(state,action){
      state.isSucess=true
      state.msgbox=action.payload
    },
    Failed(state,action){
      state.isFailed=true
      state.msgbox=action.payload.msgbox
    },
    Reset(state){
      state.isFailed=false
      state.isSucess=false
      state.msgbox=''
    }
  }
})

const deletedProductSlice=createSlice({
  name:'deleteproduct',
  initialState:{deletedProduct:null,msgbox:'',isSucess:false,isFailed1:false},
  reducers:{
    Success(state,action){
      state.isSucess=true
      state.deletedProduct=action.payload
    },
    Failed(state,action){
      state.isFailed1=true
      state.msgbox=action.payload.msgbox
    },
    Reset(state){
      state.isFailed1=false
      state.isSucess=false
      state.msgbox=''
      state.deletedProduct=null
    }
  }})

  const OrdersListSlice=createSlice({
    name:'allOrders',
    initialState:{orderList:[],isSucess:false,isFailed:false,isLoading:false,message:''},
    reducers:{
      allorders(state,action){
        state.isLoading=false
        state.isSucess=true
        state.orderList=action.payload
      },
      loading(state){
        state.isLoading=true
      },
      Failed(state,action){
        state.isFailed=true
        state.message=action.payload.message
        state.isLoading=false
      },
      Empty(state){
        state.isFailed=false
        state.message=''
        state.isLoading=false
        state.orderList=[]
        state.isSucess=false;
      }
    }})

  const CreateReviewSlice=createSlice({
    name:'createreview',
    initialState:{comments:"",reviewisSucess:false,reviewisFailed:false,reviewisLoading:false,reviewmessage:''},
    reducers:{
      sendcomment(state,action){
        state.reviewisLoading=false
        state.reviewisSucess=true
        state.comments=action.payload
      },
      loading(state){
        state.reviewisLoading=true
      },
      Failed(state,action){
        state.reviewisFailed=true
        state.reviewmessage=action.payload.message
        state.reviewisLoading=false
      },
      Empty(state){
        state.reviewisFailed=false
        state.reviewmessage=''
        state.reviewisLoading=false
        state.comments=""
        state.reviewisSucess=false;
      }
    }})

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    singleProduct: singleProductSlice.reducer,
    cart: cartSlice.reducer,
    login: userLoginSlice.reducer,
    register: registerSlice.reducer,
    profile: profileSlice.reducer,
    updateProfile: updateProfileSlice.reducer,
    order:orderSlice.reducer,
    orderDetail:OrderDetailSlice.reducer,
    pay:PaySlice.reducer,
    myOrders:myOrdersListSlice.reducer,
    users:userListSlice.reducer,
    deleteUser:deleteUserProfileSlice.reducer,
    editcreate:EditCreateProductSlice.reducer,
    deleteproduct:deletedProductSlice.reducer,
    allOrders:OrdersListSlice.reducer,
    createreview:CreateReviewSlice.reducer
  },
});

export const reviewAction=CreateReviewSlice.actions
export const orderlistAction=OrdersListSlice.actions
export const editcreateAction=EditCreateProductSlice.actions
export const deleteProductAction=deletedProductSlice.actions
export const deleteUserAction=deleteUserProfileSlice.actions
export const userAction=userListSlice.actions
export const myOrderAction=myOrdersListSlice.actions
export const payAction=PaySlice.actions
export const orderDetailsAction=OrderDetailSlice.actions
export const orderAction=orderSlice.actions
export const updateProfileAction = updateProfileSlice.actions;
export const profileAction = profileSlice.actions;
export const loginAction = userLoginSlice.actions;
export const registerAction = registerSlice.actions;
export const cartAction = cartSlice.actions;
export const singleProductAction = singleProductSlice.actions;
export const productAction = productSlice.actions;
export default store;
