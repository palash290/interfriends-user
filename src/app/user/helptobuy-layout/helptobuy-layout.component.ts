import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { ToastrService }  from 'ngx-toastr';
import { LoanService } from 'src/app/service/loan.service';

@Component({
  selector: 'app-helptobuy-layout',
  templateUrl: './helptobuy-layout.component.html',
  styleUrls: ['./helptobuy-layout.component.css']
})
export class HelptobuyLayoutComponent implements OnInit {
   groupId : string;
   userId : string;
   helpToBuycar : string;
   helpToBuyCarInsurance : string;
   helpToBuyOther : string;
   helpToBuyProperty : string;
   helpToBuyCreditCard : string;
   loading : boolean = true;
  constructor(    private toastr: ToastrService,
    public route: ActivatedRoute,
    public loan :LoanService ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.groupId = paramMap.get('groupId');
      this.userId = paramMap.get('userId');
    });

    this.loan.help2BuyList(
      this.userId,
      this.groupId
    ).subscribe((response: any) => {
      if(response.success = '1')
      {
         this.helpToBuycar = response.help_to_buycar;
         this.helpToBuyCarInsurance = response.help_to_buy_carinsurance;
         this.helpToBuyOther = response.help_to_buy_other;
         this.helpToBuyProperty = response.help_to_buy_property;
         this.helpToBuyCreditCard = response.help_to_buy_credit_card;
         this.loading = false;
      }
      else
      {
          this.loading = false;
          this.toastr.error("Unable to fetch help to buy totals")
      }
    });
  }

}
