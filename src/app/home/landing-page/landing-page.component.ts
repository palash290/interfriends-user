import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  isLoading = false;
  form: FormGroup;

  constructor(public sharedService: SharedService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      mobile_number: new FormControl(null, { validators: [Validators.required] }),
      country: new FormControl(null, { validators: [Validators.required] }),
      message: new FormControl(null, { validators: [Validators.required] })
    });
  }


  onSave(): void {
    this.form.markAllAsTouched();
    const formData = new FormData();

    formData.append('name', this.form.value.name)
    formData.append('email', this.form.value.email)
    formData.append('mobile_number', this.form.value.mobile_number)
    formData.append('country', this.form.value.country)
    formData.append('message', this.form.value.message)

    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    this.sharedService.postAPI('/contact-us', formData).subscribe(
      {
        next: (response: any) => {
          if (response.success == 1) {
            this.form.reset();
            this.isLoading = false;
            this.toastr.success(response.message);
          } else {
            this.isLoading = false;
            this.toastr.error(response.message);
          }
        }, error: (err: any) => {
          console.log(err);
        }
      }
    );

  }

  items = [
    {
      title: 'Exclusive Savings Club',
      description: 'Membership to Interfriends is by invitation from existing members only. Be in a circle with people you know and can trust'
    },
    {
      title: 'Join a Circle',
      description: 'Become part of a trusted circle that empowers your financial journey or request to create a bespoke circle around you.'
    },
    {
      title: 'Build Trust',
      description: 'Build your Trust Score as you keep paying on time and stay loyal as a member'
    },
    {
      title: 'Flexible Payout',
      description: 'Request and receive your payout first or later in the cycle'
    },
    {
      title: 'Safekeeping',
      description: 'Keep your Payout in safekeeping and request it anytime'
    },
    {
      title: 'Emergency Help',
      description: 'SOS help available to you in times of emergency'
    },
    {
      title: 'Co-operative Mindset',
      description: 'Become part of our co-operative business'
    },
  ];

  customOptions = {
    loop: true,
    margin: 10,
    autoHeight: true,

    nav: true,
    dots: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  };

  customOptions1 = {
    loop: true,
    margin: 10,
    autoHeight: true,
    nav: true,
    dots: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  };

  testimonials = [
    {
      name: 'Irene Y',
      message: `Joining the Interfriends has been an incredibly rewarding experience for me. Introduced by a dear friend from my church, this society has truly transformed my life in so many ways. One of the first benefits I experienced was the 'Help to Buy' support, which eased my financial planning and made achieving certain goals much more manageable. The availability of assistance in emergencies has provided a safety net in times of need, offering me peace of mind and stability when faced with unexpected challenges. Additionally, the society's welfare initiatives have been a source of comfort and reassurance, proving that the community genuinely cares for its members. The sense of belonging and support within the Interfriends is unmatched. It’s more than just a group—it's a family that uplifts and empowers one another. I’m deeply grateful to my lovely friend for introducing me to this remarkable community, as it has brought immense value to my life.`,
      image: 'assets/img/dummy_icon.png'
    },
    {
      name: 'Rebecca N',
      message: `Sam approached me somewhere in 2017 and talked to me about Interfriends. I was a bit reluctant to join at first, but I noticed I was spending my savings haphazardly so I decided to give it a try and I’m soo glad I did. Through Interfriends I managed to save enough for my wedding in 2018, and still saving, I receive assistance in emergencies.
One thing about Interfriends that makes it unique to me is that it is like a family, and the support they give is tailored to my needs. I have introduced my husband and a friend to interfriends and they are also enjoying it there. I’m for Interfriends, it’s been a good financial tool for me and my family.`,
      image: 'assets/img/dummy_icon.png'
    },
    {
      name: 'Lynda A',
      message: `I joined Interfriends through an act of faith😊.  I had an urge in my spirit to approach a young man and ask if I could be of help. Unknowingly to me, he would rather be of great help to me. I got introduced to the savings group, which was different from previous ones I have been part of. The group has helped me financially to save, organise my finances, and accomplish more, including buying a house. 
It is not easy to save, but once the money is gone from my account, I manage to survive through the month. The group is transparent, and the leaders are motivated and dedicated, which is what makes it unique.`,
      image: 'assets/img/dummy_icon.png'
    },

    {
      name: 'Jane A',
      message: `My friend  Victoria introduced me to interfriends. It has helped me to save money, and the emergency assistance I get has helped me and my family. One thing I  like about  Interfriends is that l know my money is safe and the leaders are very transparent.`,
      image: 'assets/img/dummy_icon.png'
    },
    {
      name: 'Mercy A',
      message: `My sister told me about Interfriends and how beneficial it has been for people. 

I became interested and joined, and I can confidently say I made the right decision.

I started small, then later introduced my husband, who was skeptical about the idea but gave me the benefit of the doubt and joined anyway.

Through Interfriends, we were able to raise the needed funds to renew visas.

We were also able to clear some credit card debts, buy flight tickets, and to crown it all, we have been able to buy our own house through the Help to Buy scheme. 

Now we live in our own house, and the fulfillment in that is beyond explanation.

Interfriends has been a blessing to me and my family.

One unique thing about Interfriends is the education members get from time to time from professionals about important aspects of life.`,
      image: 'assets/img/dummy_icon.png'
    },


    {
      name: 'Hanna B',
      message: `I couldn’t recommend Interfriends highly enough as a helpful, transparent group. I have been a member since 2018, and joining Interfriends is one of the best decisions I’ve ever made when it comes to savings and managing my finances, thanks to Nana Yaa who introduced me to this group. I am really happy with Interfriends and would recommend it any day.`,
      image: 'assets/img/dummy_icon.png'
    },

    {
      name: 'Patricia O',
      message: `Interfriends was introduced to me by a very good friend of mine. Since joining this group, I have benefited so much, which has included the opportunity of making monthly savings that I can withdraw as a bulk payout for my project.


With Interfriends, I can build my Trust Score, which then allows me to access additional benefits. 


One thing about Interfriends that makes it very unique to me is the opportunity to save and easily withdraw as a bulk payout for many projects, without which I wouldn't have been able to do. Interfriends is here to support our community, to help us save, to help meet our intended projects, and to raise money for some of our financial obligations, which we struggle to meet. INTERFRIENDS has come to stay.`,
      image: 'assets/img/dummy_icon.png'
    },
    {
      name: 'Yaa S',
      message: `I joined Interfriends through a good friend, and I must admit that it has been extremely beneficial since then. I am glad I decided to join even though my business faced significant financial challenges at the time. 

Over the years, as I have remained diligent with my savings, I have built my Trust Score, which has allowed me to benefit from many of the products. I was one of the first beneficiaries of the Help2Buy scheme, which allowed me to buy my first commercial property. Having cultivated the good habit of saving with interfriends, I have introduced my children as well. 

To me, Interfriends is more than a society, it is a family because of the close connection and bond amongst the circle members. 

One unique thing about Interfriends is the honesty and the transparency of the leadership. With Interfriends, I am always assured that my money is in safe hands.`,
      image: 'assets/img/dummy_icon.png'
    },

    {
      name: 'Winstina B',
      message: `My sister from church introduced me to Interfriends. Since I joined, I have found the group to be very unique because they are reliable, honest, and committed. I always know I have my peace of mind, knowing I can log in to the app to know how much I have saved. Whenever I am in doubt, the response is swift. I always get help when I need it. With Interfriends, I have been able to save large sums of money. I trust them 100% and will always recommend them.`,
      image: 'assets/img/dummy_icon.png'
    },

  ];


}
