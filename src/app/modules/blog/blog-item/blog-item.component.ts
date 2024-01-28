import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss']
})
export class BlogItemComponent implements OnInit {

  @Input() dateCreated: string;
  @Input() name: string;
  @Input() image: string;
  @Input() blogId: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToBlogDetail(id) {
    this.router.navigate(['blogs/post', id])
  }


}
