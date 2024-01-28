export class  Utils  {


  customerReviews: any = {
		'0':0,
		'1':0,
		'2':0,
		'3':0,
		'4':0,
		'5':0
  }
  overallRatingValue: any;


   createSlug(name: string, id: string) {
    const nameArr = name.split(' ').join('_');

    return nameArr + '_' + id;
   }

    unSlug(id: string) {
    const slugArr = id.split('_');

    return slugArr[slugArr.length - 1]
   }




	getOverallRating(productReviews) {
		this.customerReviews = {
			'0':0,
			'1':0,
			'2':0,
			'3':0,
			'4':0,
			'5':0
		}
		let count = 0;
		if(productReviews?.length > 0){
			productReviews.map( item => {
				count+=item.rate;
				if(item.rate ==0) this.customerReviews['0']+=1;
				if(item.rate >=0&& item.rate <=1) this.customerReviews['1']+=1;
				if(item.rate >=2&& item.rate <=2) this.customerReviews['2']+=1;
				if(item.rate >=3&& item.rate <=3) this.customerReviews['3']+=1;
				if(item.rate >=4&& item.rate <=4) this.customerReviews['4']+=1;
				if(item.rate >=5&& item.rate <=5) this.customerReviews['5']+=1;
			});
      this.overallRatingValue = (count/productReviews.length).toFixed(1);
      console.log('overallRatingValue', this.overallRatingValue);
      return this.overallRatingValue;
		} else {
      this.overallRatingValue = 0;
      return this.overallRatingValue;

		}



	}



  }
