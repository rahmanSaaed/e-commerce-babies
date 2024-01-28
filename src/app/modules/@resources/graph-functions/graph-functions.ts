import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

/// Functions Names
export class GraphFunctions {
  public static readonly PAGINATION = 'paginationOptions';
  public static readonly BUYER = 'buyer';
  public static readonly UPDATE_BUYER_FUNC = 'updateBuyerDetails';
  public static readonly UPDATE_BUYER_PASS = 'changePassword';
  public static readonly SIGN_IN = 'signIn';
  public static readonly CHANGE_EMAIL = 'changeEmail';
  public static readonly USER_ADDRESS = 'getUserAddresses';
  public static readonly UPDATE_ADDRESS = 'updateAddress';
  public static readonly CREATE_ADDRESS = 'createAddress';
  public static readonly GET_FAVORITES = 'favourites';
  public static readonly CREATE_FAVORITE = 'addToFavourite';
  public static readonly CREATE_SUBSCRIPTION = 'createSubscription';
  public static readonly BUYER_SUBSCRIPTION = 'buyerSubscription';
  public static readonly AGES = 'ages';
  public static readonly GENDERS = 'genders';
  public static readonly SLIDER = 'slider';
  public static readonly POPULAR_CATEGORY = 'popularCategories';
  public static readonly NEW_ARRIVALS = 'newArrivals';
  public static readonly CREATE_ORDER = 'createOrder';
  public static readonly ORDER_STATUS= 'orderStatuses';
  public static readonly CATEGORIES= 'categories';


}

// Functions Inputs
export class VariablesInput {
  public static readonly UPDATE_BUYER_INPUT = 'updateBuyerDetails';
  public static readonly UPDATE_BUYER_PASS_INPUT = 'changePasswordInput';
  public static readonly SIGN_IN_INPUT = 'authCredentialInput';
  public static readonly UPDATE_ADDRESS_INPUT = 'updateAddressInput';
  public static readonly CREATE_ADDRESS_INPUT = 'createAddressInput';
  public static readonly CREATE_FAVORITE_INPUT = 'addToFavouriteInput';
  public static readonly CREATE_SUBSCRIPTION_INPUT = 'subscriptionInput';
  public static readonly CREATE_ORDER_INPUT = 'createOrderInput';

}

// Functions && Types
export class Types {
  public static readonly PAGINATION_type = 'PaginationOptions!';
  public static readonly UPDATE_BUYER_TYPE = 'UpdateBuyerDetailsInput!';
  public static readonly UPDATE_BUYER_PASS_TYPE = 'ChangePasswordInput!';
  public static readonly SIGN_IN_TYPE = 'AuthCredentialInput!';
  public static readonly UPDATE_ADDRESS_TYPE = 'UpdateAddressInput!';
  public static readonly CREATE_ADDRESS_TYPE = 'CreateAddressInput!';
  public static readonly CREATE_FAVORITE_TYPE = 'AddToFavouriteInput!';
  public static readonly CREATE_SUBSCRIPTION_TYPE = 'SubscriptionInput!';
  public static readonly CREATE_ORDER_TYPE = 'CreateOrderInput!';
}
