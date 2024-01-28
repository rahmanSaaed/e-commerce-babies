import { Component, OnInit } from '@angular/core';
import { GraphFunctions } from '@resources/graph-functions/graph-functions';
import { Returns } from '@resources/returns/returns';
import { WishListService } from '@resources/services/accounts/wish-list/wish-list.service';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.scss'],
})
export class WhishlistComponent implements OnInit {
  constructor(private wishListService: WishListService,
) {}


  wishList: any[] = [];

  ngOnInit(): void {
    this.getFavorites();
    localStorage.removeItem('FAV_NOTIFICATION')
  }

  getFavorites() {


    this.wishListService.getWishList().subscribe((res: any) => {
      if (res?.data?.favourites) {
        console.log('getFavorites', res);
        this.wishList  = [...res?.data?.favourites];
      }
    });
  }

  deletedItem(item: any) {
    console.log(item)
    if (item) {
      this.getFavorites();
    }
  }




}
