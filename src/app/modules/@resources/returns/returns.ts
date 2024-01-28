import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class Returns {
	public static readonly MESSAGE = `{
    message
  }`;

	public static readonly ACCESS_TOKEN = `{
    accessToken
  }`;

	public static readonly SITTINGS_CONTACT_US = `{
    email,
    phone,
    facebook,
    instagram,
    twitter,
    address
    }`;

	public static readonly SITTINGS_POLICY = `{
    returnPolicy
   }`;

	public static readonly SITTINGS_TERMS_CONDITIONS = `{
    termsAndConditions {
      title
      description
    }
   }`;

	public static readonly BUYER = `{
    buyerId,
    email,
    buyerFirstName,
    buyerLastName,
    phoneNumber
    avatar
    }`;

	public static readonly ADRESS = `{
      _id,
      addressId,
      userId,
      address,
      city,
      province,
      type
      }`;

	public static readonly FAVORITES = `{
        favouriteId,
        productId,
        buyerId,
        product  {
          _id,
          productId,
          name,
          images,
          price
        }
        }`;

	public static readonly SUBSCRIPTION = `{
      subscriptionId
      email
        }`;

	public static readonly AGES = `{
          ageId,
          name,
          age
          image
            }`;

	public static readonly GENDER = `{
    genderId,
        name
          }`;

	public static readonly ProductSearchResultType = `{
    productId,
    name
  }`;


	public static readonly SLIDER = `{
    sliderId
    image
    productId
    categoryId
    subCategoryId
    sale
    slogan
  }`;



	public static readonly POPULAR_CATEGORY = `{
    categoryId
    name
    image
  }`;

	public static readonly NEW_ARRIVALS_PRODUCTS = `{
    productId
    name
    price
    images
  }`;

	public static readonly REVIEW_TYPE = `{
    reviewId
    buyerId
    productId
    rate
    description
    product
  }
  `

  public static readonly ORDER = `{
    orderId
    orderCode
    subTotalPrice
  }
  `

  public static readonly ORDER_STATUS = `{
    orderStatusId
    name
    code
    description
  }
  `



public static readonly CATEGORIES = `{
  orderStatusId
  name
  code
  description
}
`

}






export class MutationsReturns {
	// public static readonly UPDATE_BUYER_DETAILS = `{
	//   buyerFirstName,
	//   buyerLastName,
	//   phoneNumber
	//   }`;
}

// }


// categoryId: String!
// name: String!
// nameAr: String!
// image: String!
// icon: String
// subCategories: [subCategory!]!
// popular: Boolean!


