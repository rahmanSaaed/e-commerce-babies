import { Injectable } from '@angular/core';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class Mutation {
  public static readonly SIGN_UP = gql`
    mutation signUp(
      $email: String!
      $buyerFirstName: String!
      $buyerLastName: String!
      $password: String!
      $phoneNumber: String = "xxx-xxxxxxxx"
    ) {
      signUp(
        userSignUpDetailsInput: {
          email: $email
          buyerFirstName: $buyerFirstName
          buyerLastName: $buyerLastName
          password: $password
          phoneNumber: $phoneNumber
        }
      ) {
        buyerId
        email
      }
    }
  `;

  public static readonly ACTIVATE_BUYER = gql`
    mutation($email: String!, $token: String!) {
      activateBuyer(activateUserInput: { email: $email, token: $token }) {
        message
      }
    }
  `;

  public static readonly SIGN_IN = gql`
    mutation($email: String!, $password: String!) {
      signIn(authCredentialInput: { email: $email, password: $password }) {
        accessToken
      }
    }
  `;

  public static readonly CREATE_ADDRESS = gql`
    mutation(
      $address: String!
      $addressType: String
      $city: String
      $province: String
    ) {
      createAddress(
        createAddressInput: {
          address: $address
          addressType: $addressType
          city: $city
          province: $province
        }
      ) {
        _id
        userId
        address
        addressType
        city
        province
      }
    }
  `;

  public static readonly FORGET_PASSWORD = gql`
    mutation($email: String!) {
      forgetPassword(email: $email) {
        message
      }
    }
  `;

  public static readonly RESET_PASSWORD = gql`
    mutation($email: String!, $token: String!, $password: String!) {
      resetPassword(
        resetUserPasswordInput: {
          email: $email
          token: $token
          password: $password
        }
      ) {
        message
      }
    }
  `;

  public static readonly RESEND_ACTIVATION = gql`
    mutation($email: String!) {
      resendActivation(resendActivationInput: { email: $email }) {
        message
      }
    }
  `;

  public static readonly ADD_TO_FAVOURITE = gql`
    mutation($productId: String!) {
      addToFavourite(productId: $productId) {
        favouriteId
      }
    }
  `;

  public static readonly CREATE_CART = gql`
    mutation {
      createCart {
        cartId
      }
    }
  `;

  public static readonly ADD_TO_CART = gql`
    mutation($addToCartInput: AddToCartInput!) {
      addToCart(addToCartInput: $addToCartInput) {
        cartId
        cartDetails {
          cartDetailId
          productId
          price
          qty
          product {
            productId
            price
            name
            qty
            images
            freeShipping
            shippingFees
            tax
            crossSelling {
              productId
              price
              name
              qty
              images
            }
          }
        }
      }
    }
  `;

  public static readonly DELETE_PRODUCT_FROM_CART = gql`
    mutation($cartDetailId: String!) {
      deleteCartItem(cartDetailId: $cartDetailId) {
        message
      }
    }
  `;

  public static readonly UPDATE_CART_DETAIL = gql`
    mutation($updateCartDetailsInput: UpdateCartDetailsInput!) {
      updateCartDetail(updateCartDetailsInput: $updateCartDetailsInput) {
        cartDetailId
        qty
        productId
        price
        product {
          productId
          price
          name
          qty
          images
        }
      }
    }
  `;

  public static readonly CREATE_CONTACT = gql`
    mutation($contactInput: ContactInput!) {
      createContact(contactInput: $contactInput) {
        message
      }
    }
  `;

  // generalMutation(input) {
  //   return gql`
  //   mutation ($${input.variable}: ${input.type})  {
  //     ${input.func} (${input.variable}: $${input.variable})
  //      ${input.return}
  //   }
  // `;
  // }

  // public static readonly UPDATE_BUYER_DETAILS = gql`
  //   mutation($updateBuyerDetails: UpdateBuyerDetailsInput!) {
  //     updateBuyerDetails(updateBuyerDetails: $updateBuyerDetails) {
  //       message
  //     }
  //   }
  // `;

  generalMutation(input) {
    return gql`
  mutation (${'$' + input.variable}: ${input.type})  {
    ${input.func} (${input.variable}: ${'$' + input.variable})
     ${input.return}
  }
`;
  }

  public static readonly RESET_EMAIL = gql`
    mutation($newEmail: String!) {
      resetEmailRequest(newEmail: $newEmail) {
        message
      }
    }
  `;

  public static readonly CHANGE_EMAIL = gql`
    mutation($token: String!, $newEmail: String!) {
      changeEmail(token: $token, newEmail: $newEmail) {
        message
      }
    }
  `;

  public static readonly DELETE_FAVORITE = gql`
    mutation($favouriteId: String!) {
      deleteFavourite(favouriteId: $favouriteId) {
        message
      }
    }
  `;

  public static readonly DELETE_SUBSCRIPTION = gql`
    mutation($subscriptionId: String!) {
      deleteSubscription(subscriptionId: $subscriptionId) {
        message
      }
    }
  `;

  public static readonly UPDATE_REVIEW = gql`
mutation updateReview($updateReviewInput:UpdateReviewInput!,$reviewId:String!){
  updateReview(updateReviewInput:$updateReviewInput,reviewId:$reviewId) {
    reviewId
  }
}
`;

public static readonly DELETE_REVIEW = gql`
  mutation deleteReview($reviewId:String!){
    deleteReview(reviewId:$reviewId){
      message
    }
  }
`;
}
