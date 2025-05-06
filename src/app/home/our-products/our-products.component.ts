import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-products',
  templateUrl: './our-products.component.html',
  styleUrls: ['./our-products.component.css']
})
export class OurProductsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  banners = [
    {
      image: 'assets/img/banner.png',
      title: 'Community-centred Savings Club',
      subtitle: '(Succeeding Together)',
      description: 'Join an Interfriends savings circle and<br>stay in control of your finances.'
    },
    {
      image: 'assets/img/collage_banner.png',
      title: 'Community-centred Savings Club',
      subtitle: '(Succeeding Together)',
      description: 'Join an Interfriends savings circle and<br>stay in control of your finances.'
    },
    // {
    //   image: 'assets/img/banner2.JPG',
    //   title: 'Community-centred Savings Club',
    //   subtitle: '(Succeeding Together)',
    //   description: 'Join an Interfriends savings circle and<br>stay in control of your finances.'
    // },
    // {
    //   image: 'assets/img/banner3.JPG',
    //   title: 'Community-centred Savings Club',
    //   subtitle: '(Succeeding Together)',
    //   description: 'Join an Interfriends savings circle and<br>stay in control of your finances.'
    // },
    // Add more slides as needed
  ];

  bannerOptions = {
    loop: true,
    items: 1,
    dots: true,
    navText: [
      '<span class="custom-prev"><i class="fa fa-arrow-left" aria-hidden="true"></i></span>',
      '<span class="custom-next"><i class="fa fa-arrow-right" aria-hidden="true"></i></span>'
    ],
    nav: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  };

}
