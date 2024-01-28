import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReturnsEn {
  constructor() {}

  translateReturn(variable) {
    if (sessionStorage.getItem('lang') == 'ar') {
      // console.log('translateReturn', variable + 'Ar');
      return variable + 'Ar';
    } else {
      // console.log(variable)
      return variable;
    }
  }

  public CATEGORIES = `{
    categoryId
    ${this.translateReturn('name')}
    image
    subCategories {
      subCategoryId
      ${this.translateReturn('name')}
    }
  }
  `;

  public TOKEN = `{
    accessToken
  }
  `;

  public CITIES = `{
  cityId
  zoneId
  ${this.translateReturn('name')}
  areas {
    areaId
    ${this.translateReturn('name')}
  }
  }
  `;

  public BUYER_ID = `{
    buyerId
  }
  `;

  public MESSAGE = `{
    message
  }
  `;

  public BLOGS = `{
    blogId
    ${this.translateReturn('name')}
    image
  }`;

  public BLOG = `{
    ${this.translateReturn('name')}
    image
    ${this.translateReturn('description')}
  }`;

  public IS_SUBSCRIPED = `{
    isSubscribed
  }`

  public ABOUT = `{
    aboutId
    ${this.translateReturn('description')}
    ${this.translateReturn('whyWeDoWhatWeDo')}
    aboutImage
    whyWeDoWhatWeDoImage
  }`;

  public WHY_SHOP_WITH_US = `{
    whyShopWithUsId
    ${this.translateReturn('title')}
    ${this.translateReturn('description')}
    image
  }`;

  public SETTING = `{
    email,
    phone,
    facebook,
    instagram,
    twitter,
    address,
    latitude,
    longitude,
    ${this.translateReturn('contactUsSlogan')}
  }`;

  public SITTINGS_POLICY = `{
    ${this.translateReturn('returnPolicy')}
  }`;

  public TERMS_CONDITIONS = `{
    termsConditionsId
    ${this.translateReturn('title')}
    ${this.translateReturn('description')}
  }`;

  public BUYER = `{
      buyerId
      email
      buyerFirstName
      buyerLastName
      phoneNumber
      avatar
  }`;

  public RELATED = `{
    productId
    price
    ${this.translateReturn('name')}
    qty
    images
  }`;

  public PRODUCT_DETAIL = `{
    ${this.translateReturn('name')}
    productId
    ${this.translateReturn('description')}
    images
    categoryId
    subCategoryId
    qty
    price
    salePrice
    sale
    specs {
      specId
      ${this.translateReturn('specName')}
      ${this.translateReturn('valueName')}
    }
    crossSelling {
      productId
      price
      salePrice
      sale
      ${this.translateReturn('name')}
      qty
      images
    }
    brand {
      image
      ${this.translateReturn('name')}
      brandId
    }
    reviews {
      description
      reviewId
      rate
      buyer {
        avatar
      }
      product {
        description
        productId
      }
    }
  }`;

  public RELATES_PRODUCT = `{
    productId
    price
    ${this.translateReturn('name')}
    qty
    images
  }`;

  public PRODUCT_REVIEWS = `{
    rate
    description
    buyer {
      buyerFirstName
      avatar
    }
  }`;

  public FILTER = `{
    productId
    price
    ${this.translateReturn('name')}
    qty
    images
    salePrice
    sale

  }`;

  public PRODUCT = `{
    productId
    ${this.translateReturn('name')}
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
    reviews {
      rate
    }
  }`;

  public SEARCH = `{
    productId
    ${this.translateReturn('name')}
  }`;

  public CATEGORY_NAME = `{
    categoryId
    ${this.translateReturn('name')}
  }`;

  public SUB_CATEGORY_NAME = `{
    subCategoryId
    categoryId
    ${this.translateReturn('name')}
  }`;

  public CART_ID = `{
    cartId
  }`;

  public ADD_TO_CART = `{
  cartId
  cartDetails {
    cartDetailId
    productId
    price
    qty
    product {
      productId
      price
      ${this.translateReturn('name')}
      qty
      images


      tax
      crossSelling {
        productId
        price
        ${this.translateReturn('name')}
        qty
        images
        salePrice
        sale
      }
    }
  }
}`;

  public FAVORITES = `{
  favouriteId
  productId
  buyerId
  product  {
    productId
    ${this.translateReturn('name')}
    images
    price
    salePrice
    sale
    reviews {
      rate
    }
  }
  }`;

  public SLIDER = `{
    sliderId
    image
    productId
    categoryId
    subCategoryId
    sale
    ${this.translateReturn('slogan')},
  }`;

  public POPULAR_CATEGORY = `{
    categoryId
    ${this.translateReturn('name')}
    image
  }`;

  public POPULAR_SUB_CATEGORY = `{
    subCategoryId
    ${this.translateReturn('name')}
    image
  }`;

  public NEW_ARRIVALS = `{
    productId
    ${this.translateReturn('name')}
    price
    salePrice
    images
    reviews {
      rate
    }
  }`;

  public BACK_GROUND_FUN = `{
    categoryId
    ${this.translateReturn('name')}
    icon
    image
  }`;

  public SHOP_GENDER = `{
    genderId
    ${this.translateReturn('name')}
    image
    ${this.translateReturn('title')}
    ${this.translateReturn('subTitle')}
  }`;

  public BRANDS = `{
    brandId
    ${this.translateReturn('name')}
    image
  }`;

  public PRODUCT_WE_LOVE = `{
    productId
    price
    salePrice
    ${this.translateReturn('name')}
    qty
    images
    salePrice
    reviews {
      rate
    }
  }`;

  public AGES = `{
    ageId
    ${this.translateReturn('name')}
    ${this.translateReturn('age')}
    image
  }`;

  public PRODUCT_TRENDING = `{
    productId
    price
    ${this.translateReturn('name')}
    qty
    images
    reviews {
      rate
    }
  }`;

  public ADRESS = `{
    addressId
    zoneId
    userId
    address
    type
    deliveryNote
    city {
      name
      cityId
    }
    areaId
    area {
      areaId
      name
    }
    }`;

  public CART_PRODUCTS = `{
      cartId
      cartDetails {
        cartDetailId
        productId
        product {
          salePrice
          sale
          pickUpLocationId
          productId
          price
          ${this.translateReturn('name')}
          qty
          images
        }
        price
        qty
      }
      }`;

  public GET_CART = `{
    cartId
    cartDetails {
      cartDetailId
      productId
      price
      qty
      product {
        pickUpLocationId
        productId
        price
        ${this.translateReturn('name')}
        qty
        images
        freeShipping
        tax
        salePrice
        sale
        weightInKilo
        crossSelling {
          productId
          price
          ${this.translateReturn('name')}
          qty
          images
          salePrice
          sale
          reviews {
            rate
          }
        }
      }
    }
    }`;

  public ORDERS = `{
    orderId
    orderCode
    totalPrice
    dateCreated
    transactionStatus
    orderDetails {
      orderDetailId
      product {
        ${this.translateReturn('name')}
      }
    }
  }`;

  public  CURENCIES = `{
    currencyId
    ${this.translateReturn('name')}
    isoAlpha_3
    icon
    EGP_rate
  }`;

  public ORDER_DETAIL = `{
    orderId
    orderCode
    totalPrice
    dateCreated
    shippingFees
    subTotalPrice
    deliveryAt
    dateDelivered
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
      orderDetailId
      product {
        productId
        price
        ${this.translateReturn('name')}
        qty
        images
        salePrice
        sale
      }
    }
  }`;

  public TRACK_ORDER = `{
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
  }`;

  public ORDER_STATUS = `{
    orderStatusId
    ${this.translateReturn('name')}
    code
    ${this.translateReturn('description')}
  }
  `;


  public SHIPPING_FEES = `{
    shippingFees
      }`;



  public BUYER_REVIEWS = `{
      description
      reviewId
      rate
      product {
        description
        images
        productId
      }
    }
    `;

  public REVIEW_ID = `{
  reviewId
}`;

  public SUBSCRIPTION = `{
      subscriptionId
      email
        }`;

  public UPDATE_CART = `{
      cartDetailId
      qty
      productId
      price
      product {
        productId
        price
        ${this.translateReturn('name')}
        qty
        images
      }
      }`;

      public PROMO_CODE = `{
        promoCodeId
        name
        nameAr
        code
        expiresAt:
        limit
        uses
        value
        type
        createdAt
        }`;

  public ORDER = `{
      orderId
      orderCode
      subTotalPrice
    }
    `;

    public ADDRESS_TYPE = `{
      ${this.translateReturn('name')}
    }
    `;

  public GENDER = `{
      genderId,
      ${this.translateReturn('name')}
        }`;



}



