import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class Queries {
  public static readonly ABOUT_US = gql`
    query about {
      about {
        aboutId
        description
        aboutImage
        whyWeDoWhatWeDo
        whyWeDoWhatWeDoImage
      }
    }
  `;

  public static readonly WHY_SHOP_WITH_US = gql`
    query whyShopWithUs {
      whyShopWithUs {
        whyShopWithUsId
        title
        description
        image
      }
    }
  `;

  public static readonly SUB_CATEGORIES = gql`
    query subCategories {
      subCategories {
        subCategoryId
        categoryId
        name
      }
    }
  `;

  public static readonly CATEGORY_BY_ID = gql`
    query category($categoryId: String!) {
      category(categoryId: $categoryId) {
        categoryId
        name
      }
    }
  `;
  // "3db94e56-1f6d-4f4b-860d-45438b9c62ae"

  public static readonly GET_SUB_CATEGORY_BY_SUB_CATEGORY_ID = gql`
    query subCategory($subCategoryId: String!) {
      subCategory(subCategoryId: $subCategoryId) {
        subCategoryId
        categoryId
        name
      }
    }
  `;

  public static readonly GET_SUB_CATEGORY_BY_CATEGORY_ID = gql`
    query subCategoryByCategoryId($categoryId: String!) {
      subCategoryByCategoryId(categoryId: $categoryId) {
        subCategoryId
        name
      }
    }
  `;

  public static readonly GET_CATEGORIES = gql`
    query categories($paginationOptions: PaginationOptions!) {
      categories(paginationOptions: $paginationOptions) {
        categoryId
        name
        image
        subCategories {
          subCategoryId
          name
        }
      }
    }
  `;

//   public static readonly GET_CATEGORIES = gql`
//   query categories($paginationOptions: PaginationOptions!) {
//     categories(paginationOptions: $paginationOptions) {
//       categoryId
//       name
//       image
//       subCategories {
//         subCategoryId
//         name
//       }
//     }
//   }
// `;

// test(input) {
//   return gql`
//   query ${input.func} ${input.func ? () : } {
//     ${input.func}
//      ${input.return}
//   }
// `;
// }


  public static readonly GET_FEATURED_CATEGORIES = gql`
    query categories($paginationOptions: PaginationOptions!) {
      categories(paginationOptions: $paginationOptions) {
        categoryId
        name
        subCategories {
          subCategoryId
          name
        }
      }
    }
  `;

  public static readonly GET_PRODUCTS_BY_SUB_CATEGORY_ID = gql`
    query productsBySubCategoryId(
      $subCategoryId: String!
      $page: Float
      $limit: Float
    ) {
      productsBySubCategoryId(
        subCategoryId: $subCategoryId
        paginationOptions: { page: $page, limit: $limit }
      ) {
        productId
        name
        images
        qty
        subCategoryId
        categoryId
        ageId
        genderId
        brandId
        price
        salePrice
        sale
      }
    }
  `;

  public static readonly GET_PRODUCTS_BY_CATEGORY_ID = gql`
    query productsByCategoryId(
      $categoryId: String!
      $page: Float
      $limit: Float
    ) {
      productsByCategoryId(
        categoryId: $categoryId
        paginationOptions: { page: $page, limit: $limit }
      ) {
        productId
        name
        images
        description
        qty
        subCategoryId
        categoryId
        ageId
        genderId
        brandId
        price
        salePrice
        sale
      }
    }
  `;

  public static readonly GET_PRODUCT_BY_BRODUCT_ID = gql`
    query product($productId: String!) {
      product(productId: $productId) {
        name
        productId
        description
        images
        categoryId
        subCategoryId
        qty
        price
        salePrice
        sale
        specs {
          specId
          specName
          valueName
        }
        crossSelling {
          productId
          price
          name
          qty
          images
        }
        brand {
          image
          name
        }
      }
    }
  `;

  public static readonly GET_FAVORITES = gql`
    query favourites($productId: String!) {
      favourites {
        favouriteId
        productId
        product {
          productId
          name
          images
          price
          salePrice
        }
      }
    }
  `;

  public static readonly GET_FAVORITE_BY_ID = gql`
    query favourite($productId: String!) {
      favourite(productId: $productId) {
        favouriteId
        productId
        product {
          productId
          name
          images
          price
        }
      }
    }
  `;

  public static readonly CART = gql`
    query cart($cartId: String!) {
      cart(cartId: $cartId) {
        cartId
        productId
        cartProducts {
          productId
          product {
            productId
            price
            name
          }
        }
      }
    }
  `;

  public static readonly GET_CART = gql`
    query cart($cartId: String!) {
      cart(cartId: $cartId) {
        cartId
        cartDetails {
          cartDetailId
          productId
          product {
            productId
            price
            name
            qty
            images
          }
          price
          qty
        }
      }
    }
  `;

  public static readonly BLOGS = gql`
    query blogs($paginationOptions: PaginationOptions!) {
      blogs(paginationOptions: $paginationOptions) {
        blogId
        name
        image
      }
    }
  `;

  public static readonly BLOG = gql`
    query blog($blogId: String!) {
      blog(blogId: $blogId) {
        name
        image
        description
      }
    }
  `;

  getSettings(setting) {
    return gql`
    query setting  {
      setting
       ${setting}
    }
  `;
  }

  public static readonly VALIDATE_TOKEN = gql`
    query validateActivationToken($token: String!) {
      validateActivationToken(token: $token) {
        message
      }
    }
  `;

  public static readonly GET_CART_ID_ITEMS = gql`
    query buyerCart {
      buyerCart {
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

  generalQuery(input) {
    return gql`
    query ${input.func}  {
      ${input.func}
       ${input.return}
    }
  `;
  }

  public static readonly RELATED_PRODUCTS = gql`
    query related(
      $subCategoryId: String!
      $paginationOptions: PaginationOptions!
    ) {
      related(
        subCategoryId: $subCategoryId
        paginationOptions: $paginationOptions
      ) {
        productId
        price
        name
        qty
        images
      }
    }
  `;

  public static readonly BRANDS = gql`
    query brands($paginationOptions: PaginationOptions!) {
      brands(paginationOptions: $paginationOptions) {
        brandId
        name
        image
      }
    }
  `;

  public static readonly ONSALE_PRODUCTS = gql`
    query onSaleProducts($paginationOptions: PaginationOptions!) {
      onSaleProducts(paginationOptions: $paginationOptions) {
        productId
        price
        salePrice
        sale
        name
        qty
        images
      }
    }
  `;

  public static readonly SEARCH_KEY = gql`
    query searchByKeyword($searchProduct: SearchProductInput!) {
      searchByKeyword(searchProduct: $searchProduct) {
        productId
        name
        nameAr
      }
    }
  `;

  public static readonly SIMILAR = gql`
    query similarProducts(
      $paginationOptions: PaginationOptions!
      $similarProductInput: SimilarProductsInput!
    ) {
      similarProducts(
        paginationOptions: $paginationOptions
        similarProductInput: $similarProductInput
      ) {
        productId
        price
        name
        qty
        images
      }
    }
  `;

  public static readonly POPULAR_SUP_CATEGORY = gql`
    query popularSubCategories($paginationOptions: PaginationOptions!) {
      popularSubCategories(paginationOptions: $paginationOptions) {
        subCategoryId
        name
        image
      }
    }
  `;

  public static readonly NEW_ARRIVALS = gql`
    query newArrivals($paginationOptions: PaginationOptions!) {
      newArrivals(paginationOptions: $paginationOptions) {
        productId
        name
        price
        images
      }
    }
  `;

  public static readonly BACK_GROUND_FUN = gql`
    query backGroundFun($paginationOptions: PaginationOptions!) {
      backGroundFun(paginationOptions: $paginationOptions) {
        categoryId
        name
        icon
        image
      }
    }
  `;

  public static readonly SHOP_BY_GENDER = gql`
    query shopByGender($paginationOptions: PaginationOptions!) {
      shopByGender(paginationOptions: $paginationOptions) {
        shopByGenderId
        genderId
        name
        image
      }
    }
  `;

  // public static readonly PRODUCTS_BY_GENDER_ID = gql`
  // query productsByGenderId(
  //   $genderId: String!
  //   $paginationOptions: PaginationOptions!
  // ) {
  //   productsByGenderId(
  //     genderId: $genderId
  //     paginationOptions: $paginationOptions
  //   ) {
  //     productId
  //     price
  //     name
  //     qty
  //     images
  //   }
  // }
  // `;

  public static readonly PRODUCTS_BY_GENDER_ID = gql`
    query productsByGenderId(
      $paginationOptions: PaginationOptions!
      $genderId: String!
    ) {
      productsByGenderId(
        paginationOptions: $paginationOptions
        genderId: $genderId
      ) {
        productId
        name
        qty
        images
        price
        salePrice
        sale
      }
    }
  `;

  public static readonly PRODUCTS_BY_BRAND_ID = gql`
    query productsByBrandId(
      $paginationOptions: PaginationOptions!
      $brandId: String!
    ) {
      productsByBrandId(
        paginationOptions: $paginationOptions
        brandId: $brandId
      ) {
        productId
        name
        qty
        images
        price
        salePrice
        sale
      }
    }
  `;

  public static readonly REVIEWS_BY_PRODUCT_ID = gql`
    query reviewsByProductId($productId: String!) {
      reviewsByProductId(productId: $productId) {
        rate
        description
        buyer {
          buyerFirstName
          avatar
        }
      }
    }
  `;

  public static readonly PRODUCTS_BY_AGE_ID = gql`
    query productsByAgeId(
      $paginationOptions: PaginationOptions!
      $ageId: String!
    ) {
      productsByAgeId(paginationOptions: $paginationOptions, ageId: $ageId) {
        productId
        price
        name
        qty
        images
      }
    }
  `;

  public static readonly PRODUCTS_WE_LOVE = gql`
    query productsWeLove($paginationOptions: PaginationOptions!) {
      productsWeLove(paginationOptions: $paginationOptions) {
        productId
        price
        name
        qty
        images
      }
    }
  `;

  public static readonly PRODUCTS_TRENDING = gql`
    query trendingProducts($paginationOptions: PaginationOptions!) {
      trendingProducts(paginationOptions: $paginationOptions) {
        productId
        price
        name
        qty
        images
      }
    }
  `;

  public static readonly TERMS_CONDITIONS = gql`
    query termsConditions($paginationOptions: PaginationOptions!) {
      termsConditions(paginationOptions: $paginationOptions) {
        termsConditionsId
        title
        description
      }
    }
  `;

  public static readonly REVIEWS_BY_BUYER_ID = gql`
    query reviewsByBuyerId {
      reviewsByBuyerId {
        description
        reviewId
        rate
        product {
          name
          images
          productId
        }
      }
    }
  `;

  public static readonly GET_ORDERS = gql`
    query orders($paginationOptions: PaginationOptions!) {
      orders(paginationOptions: $paginationOptions) {
        orderId
        orderCode
        totalPrice
        dateCreated
        transactionStatus
        orderDetails {
          product {
            name
          }
        }
      }
    }
  `;

  public static readonly TRACK_ORDER = gql`
    query trackOrder($orderCode: String!) {
      trackOrder(orderCode: $orderCode) {
        orderCode
        totalPrice
        dateCreated
        transactionStatus
        subTotalPrice
        tax
        shippingFees
        orderDetails {
          product {
            images
          }
        }
      }
    }
  `;

  public static readonly GET_ORDER_BY_ID = gql`
  query order($orderId: String!) {
    order(orderId: $orderId) {
      orderId
      orderCode
      totalPrice
      dateCreated
      shippingFees
      subTotalPrice
      tax
      email
      mobile
      address {
        city
        area
        address
        type
      }
      orderDetails {
        qty
        price
        subTotal
        totalPrice
        product {
          productId
          price
          name
          qty
          images
          salePrice
          sale
        }
      }
    }
  }
`;

  public static readonly FILTER_PRODUCTS = gql`
    query filterProducts(
      $filterProductInput: FilterProductInput!
      $paginationOptions: PaginationOptions!
    ) {
      filterProducts(
        filterProductInput: $filterProductInput
        paginationOptions: $paginationOptions
      ) {
        productId
        price
        name
        qty
        images
        salePrice
        sale
      }
    }
  `;

  public static readonly DELETE_ADDRESS = gql`
  query  deleteAddress(
    $addressId: String!
  ) {
    deleteAddress(
      addressId: $addressId
    ) {
      message
    }
  }
`;
}
