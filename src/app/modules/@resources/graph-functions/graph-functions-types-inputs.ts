import { Injectable } from '@angular/core';
import { QueryFull } from '@core/models/graph-models';
import { ReturnsEn } from '@resources/returns/returns-en';

@Injectable({
  providedIn: 'root',
})

/// Functions Names
export class GraphFunctionsTypesInputs extends ReturnsEn {


  input = {} as QueryFull


  public  FUNC_CATEGORIES = 'categories';
  public  FUNC_SIGNIN = 'signIn';
  public  FUNC_SIGNIN_UP = 'signUp';
  public  FUNC_FORGET_PASS = 'forgetPassword';
  public  FUNC_RESET_PASS = 'resetPassword';
  public  FUNC_RESEND_ACTIVATION = 'resendActivation';
  public  FUNC_ACTIVATE_BUYER = 'activateBuyer';
  public  FUNC_BLOGS = 'blogs';
  public  FUNC_BLOG = 'blog';
  public  FUNC_ABOUT = 'about';
  public  FUNC_WHY_SHOP_WITH_US = 'whyShopWithUs';
  public  FUNC_CREATE_CONTACT = 'createContact';
  public  FUNC_SETTING = 'setting';
  public  FUNC_TERMS_CONDITIONS = 'termsConditions';
  public  FUNC_BUYER = 'buyer';
  public  FUNC_RELATED = 'related';
  public  FUNC_PRODUCT_DETAIL = 'product';
  public  FUNC_PRODUCT_REVIEW = 'review';
  public  FUNC_AGES = 'ages';
  public  FUNC_BRANDS = 'brands';
  public  FUNC_FILTER = 'filterProducts';
  public  FUNC_PRODUCT_BY_SUB_CATEGORY = 'productsBySubCategoryId';
  public  FUNC_PRODUCT_BY_CATEGORY = 'productsByCategoryId';
  public  FUNC_PRODUCT_ON_SALE = 'onSaleProducts';
  public  FUNC_PRODUCT_SEARCH = 'searchByKeyword';
  public  FUNC_SIMILAR = 'similarProducts';
  public  FUNC_PRODUCT_BY_BRAND = 'productsByBrandId';
  public  FUNC_PRODUCT_BY_GENDER = 'productsByGenderId';
  public  FUNC_PRODUCT_BY_AGE = 'productsByAgeId';
  public  FUNC_GENDERS = 'genders';
  public  FUNC_CATEGORY_BY_ID = 'category';
  public  FUNC_SUB_CATEGORY_BY_ID = 'subCategory';
  public  FUNC_SUB_CATEGORY_BY_CATEGORY_ID = 'subCategoryByCategoryId';
  public  FUNC_CREATE_CART = 'createCart';
  public  FUNC_ADD_TO_CART = 'addToCart';
  public  FUNC_ADD_TO_FAVORITES = 'addToFavourite';
  public  FUNC_SLIDER = 'slider';
  public  FUNC_POPULAR_CATEGORIES = 'popularCategories';
  public  FUNC_POPULAR_SUB_CATEGORIES = 'popularSubCategories';
  public  FUNC_NEW_ARRIVALS = 'newArrivals';
  public  FUNC_BACK_GROUND_FUN = 'backGroundFun';
  // public  FUNC_SHOP_GENDER = 'shopByGender';
  public  FUNC_PRODUCTS_WE_LOVE = 'productsWeLove';
  public  FUNC_PRODUCTS_TRENDING = 'trendingProducts';
  public  FUNC_RESET_EMAIL = 'resetEmailRequest';
  public  FUNC_USER_ADDRESS = 'getUserAddresses';
  public  FUNC_CREATE_ORDER = 'createOrder';
  public  FUNC_GET_CART = 'cart';
  public  FUNC_BUYER_CART = 'buyerCart';
  public  FUNC_DELETE_PRODUCT_CART = 'deleteCartItem';
  public  FUNC_UPDATE_CART = 'updateCartDetail';
  public  FUNC_ADD_ADDRESS = 'createAddress';
  public  FUNC_UPDATE_ADDRESS = 'updateAddress';
  public  FUNC_DELETE_ADDRESS = 'deleteAddress';
  public  FUNC_GET_ORDERS = 'orders';
  public  FUNC_GET_ORDER = 'order';
  public  FUNC_TRACK_ORDER = 'trackOrder';
  public  FUNC_ORDER_STATUS = 'orderStatuses';
  public  FUNC_UPDATE_BUYER = 'updateBuyerDetails';
  public  FUNC_CHANGE_EMAIL = 'changeEmail';
  public  FUNC_CHANGE_PASS = 'changePassword';
  public  FUNC_DELETE_FAVE = 'deleteFavourite';
  public  GET_FAVORITES = 'favourites';
  public  FUNC_SUBSCRIPTION = 'createSubscription';
  public  FUNC_BUYER_SUBSCRIPTION = 'buyerSubscription';
  public  FUNC_DELETE_SUBSCRIPTION = 'deleteSubscription';
  public  FUNC_BUYER_REVIEWS = 'reviewsByBuyerId';
  public  FUNC_BUYER_UPDATE_REVIEWS = 'updateReview';
  public  FUNC_BUYER_DELETE_REVIEWS = 'deleteReview';
  public  FUNC_CITIES = 'cities';
  public  FUNC_CURENCIES = 'currencies';
  public  FUNC_UYER_SUBSCRIPTION = 'createSubscription';
  public  FUNC_DELETE_UYER_SUBSCRIPTION = 'deleteSubscription';
  public  FUNC_GUEST_SUBSCRIPTION = 'createGuestSubscription';
  public  FUNC_CREATE_REVIEW = 'createReview';
  public  FUNC_CART_FEES  = 'shippingPriceLookUp';
  public  FUNC_GET_PRODUCTS_IDS  = 'productsByIds';
  public  FUNC_GET_PRODUCTS_SEARCH  = 'productSearch';
  public  FUNC_GET_ADDRESS_TYPES  = 'addressTypes';
  public  FUNC_VALIDATE_PROMO_CODE  = 'promoCodeByCode';
  public  FUNC_VALIDATE_TOKEN  = 'tokenValidate';


  //  Inputs filterProducts productsBySubCategoryId productsByCategoryId onSaleProducts
  // public  INPUT_CREATE_ORDER = 'createOrderInput';
  public  INPUT_PAGINATION = 'paginationOptions';
  public  INPUT_SIGNIN = 'authCredentialInput';
  public  INPUT_SIGNIN_UP = 'userSignUpDetailsInput';
  public  INPUT_FORGET_PASS = 'forgetPasswordInput';
  public  INPUT_RESET_PASS = 'resetUserPasswordInput';
  public  INPUT_RESEND_ACTIVATION = 'resendActivationInput';
  public  INPUT_ACTIVATE_BUYER = 'activateUserInput';
  public  INPUT_BLOG = 'findBlogInput';
  public  INPUT_CREATE_CONTACT = 'contactInput';
  public  INPUT_PRODUCT_DETAIL = 'getProductInput';
  public  INPUT_PRODUCT_REVIEW = 'getReviewInput';
  public  INPUT_FILTER = 'filterProductInput';
  public  INPUT_PRODUCT_BY_SUB_CATEGORY = 'getProductBySubcategoryInput';
  public  INPUT_PRODUCT_BY_CATEGORY = 'getProductByCategoryInput';
  public  INPUT_PRODUCT_SEARCH = 'searchProduct';
  public  INPUT_SIMILAR = 'similarProductInput';
  public  INPUT_PRODUCT_BY_BRAND = 'getProductByBrandInput';
  public  INPUT_PRODUCT_BY_GENDER = 'getProductByGenderInput';
  public  INPUT_PRODUCT_BY_AGE = 'getProductByAgeInput';
  public  INPUT_CATEGORY_BY_ID = 'getCategoryInput';
  public  INPUT_SUB_CATEGORY_BY_ID = 'getSubcategoryInput';
  public  INPUT_SUB_CATEGORY_BY_CATEGORY_ID = 'getSubcategoryByCategoryInput';
  public  INPUT_ADD_TO_CART = 'addToCartInput';
  public  INPUT_ADD_TO_FAVORITES = 'addToFavouriteInput';
  public  INPUT_RESET_EMAIL = 'resetEmailRequestInput';
  public  INPUT_ORDER = "createOrderInput";
  public  INPUT_GET_CART = "getCartInput";
  public  INPUT_DELETE_PRODUCT_CART = "deleteCartDetailInput";
  public  INPUT_UPDATE_CART = "updateCartDetailsInput";
  public  INPUT_ADD_ADDRESS = "createAddressInput";
  public  INPUT_UPDATE_ADDRESS = "updateAddressInput";
  public  INPUT_DELETE_ADDRESS = "deleteAddressInput";
  public  INPUT_GET_ORDER = 'getOrderInput';
  public  INPUT_TRACK_ORDER = 'TrackOrderInput';
  public  INPUT_UPDATE_BUYER = 'updateBuyerDetails';
  public  INPUT_CHANGE_EMAIL = 'changeEmailInput';
  public  INPUT_CHANGE_PASS = 'changePasswordInput';
  public  INPUT_DELETE_FAVE = 'deleteFavouriteInput';
  public  INPUT_SUBSCRIPTION = 'subscriptionInput';
  public  INPUT_DELETE_SUBSCRIPTION = 'deleteSubscriptionInput';
  public  INPUT_BUYER_UPDATE_REVIEWS = 'updateReviewInput';
  public  INPUT_BUYER_DELETE_REVIEWS = 'deleteReviewInput';
  public  INPUT_CREATE_REVIEW = 'createReviewInput';
  public  INPUT_CART_FEES = 'shippingFeesLookupInput';
  public  INPUT_GET_PRODUCTS_IDS = 'getProductsInput';
  public  INPUT_GET_PRODUCTS_SEARCH = 'searchProduct';
  public  INPUT_VALIDATE_PROMO_CODE = 'promoCodeInput';


  // Types
  public  TYPE_PAGINATION = 'PaginationOptions!';
  public  TYPE_SIGNIN = 'AuthCredentialInput!';
  public  TYPE_SIGNIN_UP = 'BuyerSignUpDetailsInput!';
  public  TYPE_FORGET_PASS = 'ForgetPasswordInput!';
  public  TYPE_RESET_PASS = 'ResetUserPasswordInput!';
  public  TYPE_RESEND_ACTIVATION = 'ResendActivationInput!';
  public  TYPE_ACTIVATE_BUYER = 'ActivateUserInput!';
  public  TYPE_BLOG = 'FindBlogInput!';
  public  TYPE_CREATE_CONTACT = 'ContactInput!';
  public  TYPE_PRODUCT_DETAIL = 'GetProductInput!';
  public  TYPE_PRODUCT_RELATED = 'GetReviewInput!';
  public  TYPE_FILTER = 'FilterProductInput!';
  public  TYPE_PRODUCT_BY_SUB_CATEGORY = 'GetProductBySubcategoryInput!';
  public  TYPE_PRODUCT_BY_CATEGORY = 'GetProductByCategoryInput!';
  public  TYPE_PRODUCT_SEARCH = 'SearchProductInput!';
  public  TYPE_SIMILAR = 'SimilarProductsInput!';
  public  TYPE_PRODUCT_BY_BRAND = 'GetProductByBrandInput!';
  public  TYPE_PRODUCT_BY_GENDER = 'GetProductByGenderInput!';
  public  TYPE_PRODUCT_BY_AGE = 'GetProductByAgeInput!';
  public  TYPE_CATEGORY_BY_ID = 'GetCategoryInput!';
  public  TYPE_SUB_CATEGORY_BY_ID = 'GetSubcategoryInput!';
  public  TYPE_SUB_CATEGORY_BY_CATEGORY_ID = 'GetSubcategoryByCategoryInput!';
  public  TYPE_ADD_TO_CART = 'AddToCartInput!';
  public  TYPE_ADD_TO_FAVORITES = 'AddToFavouriteInput!';
  public  TYPE_RESET_EMAIL = 'ResetEmailRequestInput!';
  public  TYPE_CREATE_ORDER = "CreateOrderInput!";
  public  TYPE_GET_CART = "GetCartInput!";
  public  TYPE_DELETE_PRODUCT_CART = "DeleteCartDetailInput!";
  public  TYPE_UPDATE_CART = " UpdateCartDetailsInput!";
  public  TYPE_ADD_ADDRESS = " CreateAddressInput!";
  public  TYPE_UPDATE_ADDRESS = " UpdateAddressInput!";
  public  TYPE_DELETE_ADDRESS = " DeleteAddressInput!";
  public  TYPE_GET_ORDER = " GetOrderInput!";
  public  TYPE_TRACK_ORDER = " TrackOrderInput!";
  public  TYPE_UPDATE_BUYER = " UpdateBuyerDetailsInput!";
  public  TYPE_CHANGE_PASS = " ChangePasswordInput!";
  public  TYPE_DELETE_FAVE = " DeleteFavouriteInput!";
  public  TYPE_CHANGE_EMAIL = 'ChangeEmailInput!';
  public  TYPE_SUBSCRIPTION = 'SubscriptionInput!';
  public  TYPE_DELETE_SUBSCRIPTION = 'DeleteSubscriptionInput!';
  public  TYPE_BUYER_UPDATE_SUBSCRIPTION = 'UpdateReviewInput!';
  public  TYPE_BUYER_DELETE_REVIEWS = 'DeleteReviewInput!';
  public  TYPE_CREATE_REVIEW = 'CreateReviewInput!';
  public  TYPE_CART_FEES = 'ShippingFeesLookupInput!';
  public  TYPE_GET_PRODUCTS_IDS = 'GetProductsInput!';
  public  TYPE_GET_PRODUCTS_SEARCH = 'SearchProductInput!';
  public  TYPE_VALIDATE_PROMO_CODE = 'GetPromoCodeByCodeInput!';

}
