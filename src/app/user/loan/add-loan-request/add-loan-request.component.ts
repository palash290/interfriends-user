import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChange,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserList } from 'src/app/model/userList.model';
import { AuthService } from 'src/app/service/auth.service';
import { LoanService } from 'src/app/service/loan.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-loan-request',
  templateUrl: './add-loan-request.component.html',
  styleUrls: ['./add-loan-request.component.css'],
})
export class AddLoanRequestComponent implements OnInit {
  userList: UserList[] = [];
  form: FormGroup;
  @Input() eachChange: string;
  @Input() loanType: string;
  @Input() add: string;
  @Output() valueChange = new EventEmitter();
  isLoading = false;
  mainId: string;
  userId: string;
  groupId: string;
  currentIndex: number;

  user: UserList;
  emi: number;
  unique_ID: string;
  payOutList: any = [
    {
      1: '6840.00',
      2: '5760.00',
      3: '5040.00',
      4: '4320.00',
      5: '3600.00',
      6: '2880.00',
      7: '2160.00',
      8: '1440.00',
      9: '1080.00',
    },
    {
      // 1: '2475.00',
      // 2: '1980.00',
      // 3: '1485.00',
      // 4: '990.00',
      // 5: '742.00',
      // 6: '594.00',
      // 7: '495.00',
      // 8: '396.00',
      // 9: '742.50',
      1: '2700.00',
      2: '2160.00',
      3: '1620.00',
      4: '1080.00',
      5: '810.00',
      6: '648.00',
      7: '540.00',
      8: '432.00'
    },
    { 1: '12000.00', 2: '10400.00', 3: '8800.00', 4: '7200.00', 5: '5600.00' },
    { 1: '7680.00', 2: '5760.00', 3: '3840.00', 4: '1920.00' },
    { 1: '1440.00', 2: '2880.00', 3: '4320.00', 4: '5760.00', 5: '7200.00' },
    { 1: '20000.00', 2: '18400.00', 3: '16000.00', 4: '13600.00' },
  ];
  commonDataList: any = [
    {
      1: '855.00',
      2: '720.00',
      3: '630.00',
      4: '540.00',
      5: '450.00',
      6: '360.00',
      7: '270.00',
      8: '180.00',
      9: '135.00',
    },
    {
      // 1: '137.50',
      // 2: '110.00',
      // 3: '82.50',
      // 4: '55.00',
      // 5: '41.00',
      // 6: '33.00',
      // 7: '27.50',
      // 8: '22.00',
      // 9: '41.25',
      1: '150.00',
      2: '120.00',
      3: '90.50',
      4: '60.00',
      5: '45.00',
      6: '36.00',
      7: '30.00',
      8: '24.00'
    },
    { 1: '1500.00', 2: '1300.00', 3: '1100.00', 4: '900.00', 5: '700.00' },
    { 1: '960.00', 2: '720.00', 3: '480.00', 4: '240.00' },
    { 1: '180.00', 2: '360.00', 3: '540.00', 4: '720.00', 5: '900.00' },
    { 1: '2500', 2: '2300', 3: '2000', 4: '1700' },
  ];

  totalPayList: any = [
    {
      1: '8550.00',
      2: '7200.00',
      3: '6300.00',
      4: '5400.00',
      5: '4500.00',
      6: '3600.00',
      7: '2700.00',
      8: '1800.00',
      9: '1350.00',
    },
    {
      1: '3000.00',
      2: '2400.00',
      3: '1800.00',
      4: '1200.00',
      5: '900.00',
      6: '720.00',
      7: '600.00',
      8: '480.00'
    },
    { 1: '15000.00', 2: '13000.00', 3: '11000.00', 4: '9000.00', 5: '7000.00' },
    { 1: '9600.00', 2: '7200.00', 3: '4080.00', 4: '2400.00' },
    { 1: '1800.00', 2: '3600.00', 3: '5400.00', 4: '7200.00', 5: '9000.00' },
    { 1: '25000', 2: '23000', 3: '20000', 4: '17000' },
  ];

  monthlyPayList: any = [
    {
      1: '475.00',
      2: '400.00',
      3: '350.00',
      4: '300.00',
      5: '250.00',
      6: '200.00',
      7: '150.00',
      8: '100.00',
      9: '75.00',
    },
    {
      1: '250.00',
      2: '200.00',
      3: '150.00',
      4: '100.00',
      5: '75.00',
      6: '60.00',
      7: '50.00',
      8: '40.00'

    },
    { 1: '375', 2: '325', 3: '275', 4: '225', 5: '175' },
    { 1: '400.00', 2: '300.00', 3: '200.00', 4: '100.00' },
    { 1: '50.00', 2: '100.00', 3: '150.00', 4: '200.00', 5: '250.00' },
    { 1: '625', 2: '575', 3: '500', 4: '425' },
  ];
  payOutElem: any = {};
  commonDataElem: any = {};
  totalPayElem: any = {};
  monthlyPayElem: any = {};
  tenure: string;
  payout: string;
  provident: string;
  monthlypayment: string;
  total40month: string;
  totaloverMonths: string;

  constructor(
    public userService: UserService,
    public loanService: LoanService,
    public authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.groupId = this.authService.getgroupId();

    this.userService.allUserList(this.groupId).subscribe((response: any) => {
      this.userList = response.userList;
      console.log('userID  =>', this.userId);
      console.log('groupId  =>', this.groupId);
      console.log('userList  =>', this.userList);
    });

    this.userService.getUserInfo(this.userId).subscribe((response: any) => {
      console.log('response', response);
      this.user = response.userinfo;
      this.unique_ID = this.user.unique_id.toString();
      localStorage.setItem('userUniqueIdE', this.unique_ID.toString());
    });

    this.form = new FormGroup({
      loan_amount: new FormControl(null, { validators: [Validators.required] }),
      tenure: new FormControl('', { validators: [Validators.required] }),
      contact_number: new FormControl(null, {
        validators: [Validators.required],
      }),
      loan_type: new FormControl(null, { validators: [Validators.required] }),
      gurarantor: new FormControl('', {validators: [Validators.required]}),
      emi: new FormControl(null, {}),
      document_image: new FormControl(null, {}),
      pay_date: new FormControl(null, {}),
      creditCardImage: new FormControl(null, {}),
      total40Months: new FormControl(null, {}),
      provident: new FormControl(null, {}),
      admin_risk: new FormControl(null, {}),
    });
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }): void {
    if (
      changes['uniqueId'] !== undefined ||
      changes['eachChange'] !== undefined
    ) {
      if (changes['eachChange'].currentValue !== undefined) {
        if (changes['loanType'] === undefined) {
          this.mainId = this.mainId;
        } else if (changes['loanType'].currentValue !== undefined) {
          this.mainId = changes['loanType'].currentValue;
        } else {
          this.mainId = this.mainId;
        }

        this.form.patchValue({
          loan_type: this.mainId,
        });

        // this.form.patchValue({
        //   group_cycle_name: this.form.group_cycle_name,
        //   group_cycle_descp: this.form.group_cycle_descp
        // });
      }
    }
    switch (this.mainId) {
      case '1':  //Loan
        this.totaloverMonths = 'Total Over 18 Months';
        break;
      case '2': //Car Insurance
        this.totaloverMonths = 'Total Over 12 Months';
        break;
      case '3': //Car
        this.totaloverMonths = 'Total Over 40 Months';
        break;
      case '4': //Credit Card
        this.totaloverMonths = 'Total Over 24 Months';
        break;
      case '5': //Property
        this.totaloverMonths = 'Total Over 36 Months';
        break;
      case '6': //Property
        this.totaloverMonths = 'Total Over 40 Months';
        break;
      default:  //Other
        this.totaloverMonths = 'Total Over 36 Months';
        break;
    }
    this.unique_ID = localStorage.getItem('userUniqueIdE');
    this.form.patchValue({ contact_number: this.unique_ID });
    this.form.patchValue({ tenure: '40' });
    this.currentIndex = parseInt(this.mainId) - 1;
    this.payOutElem = this.payOutList[this.currentIndex];
    this.commonDataElem = this.commonDataList[this.currentIndex];
    this.totalPayElem = this.totalPayList[this.currentIndex];
    this.monthlyPayElem = this.monthlyPayList[this.currentIndex];
  }

  onImagePicked(event: Event): any {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ document_image: file });
    console.log(file, 'file');
  }

  getcreditcardimage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ creditCardImage: file });
    console.log(file, 'file');
  }

  onSave(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.toastr.error('Please fill up all the fields');
      return;
    }

    this.isLoading = true;

    this.loanService
      .requestLoan(
        this.userId,
        this.groupId,
        this.form.value.loan_amount,
        this.form.value.tenure,
        this.form.value.contact_number,
        this.form.value.loan_type,
        this.form.value.gurarantor,
        this.form.value.document_image,
        this.form.value.creditCardImage,
        this.form.value.pay_date,
        this.form.value.total40Months,
        this.form.value.provident,
        this.form.value.admin_risk,
        this.form.value.emi
      )
      .subscribe((response: any) => {
        console.log(response);
        this.form.reset();
        document.getElementById('closePopupLoanRequest').click();
        this.isLoading = false;

        if (response.success === '1') {
          this.valueChange.emit('add');
          this.toastr.success(response.message);
        } else {
          this.toastr.error(response.message);
        }
      });
  }

  onClose() {
    this.form.reset();
    this.isLoading = false;

    this.form.patchValue({
      tenure: '',
      gurarantor: '',
      loan_amount: '',
      total40Months: '',
      provident: '',
      admin_risk: '',
    });
    this.emi = 0;
  }

  /*onInputAmount(event: any): void {
    if(this.form.value.loan_amount && this.form.value.tenure && this.form.value.loan_type) {
      console.log('hellowwwwww');
      if(this.form.value.loan_type === '2') {
        let interest_payable = ((parseFloat(this.form.value.loan_amount)*8)/100);
        let total_payment = parseFloat(this.form.value.loan_amount) + interest_payable;
        this.emi = total_payment/parseFloat(this.form.value.tenure);
        this.emi = parseFloat(this.emi.toFixed(3));
      } else {
        let interest_payable = ((parseFloat(this.form.value.loan_amount)*10)/100);
        let total_payment = parseFloat(this.form.value.loan_amount) + interest_payable;
        this.emi = total_payment/parseFloat(this.form.value.tenure);
        this.emi = parseFloat(this.emi.toFixed(3));
      }

    }
 }*/

  /*onInputAmount1(eventData: string): void {
    if(this.form.value.loan_amount && this.form.value.tenure && this.form.value.loan_type && eventData) {
      console.log('hellowwwwww');
      if(this.form.value.loan_type === '2') {
        let interest_payable = ((parseFloat(eventData)*8)/100);
        let total_payment = parseFloat(eventData) + interest_payable;
        this.emi = total_payment/parseFloat(this.form.value.tenure);
        this.emi = parseFloat(this.emi.toFixed(3));
        this.emi = parseFloat(this.emi.toFixed(3));
      } else {
        let interest_payable = ((parseFloat(eventData)*10)/100);
        let total_payment = parseFloat(eventData) + interest_payable;
        this.emi = total_payment/parseFloat(this.form.value.tenure);
        this.emi = parseFloat(this.emi.toFixed(3));
      }

    }
 }*/

  /*onTermChange1(eventData: string): void {
  if(this.form.value.loan_amount && this.form.value.tenure && this.form.value.loan_type) {
    console.log('hellowwwwww');
    if(this.form.value.loan_type === '2') {
      let interest_payable = ((parseFloat(this.form.value.loan_amount)*8)/100);
      let total_payment = parseFloat(this.form.value.loan_amount) + interest_payable;
      this.emi = total_payment/parseFloat(eventData);
      this.emi = parseFloat(this.emi.toFixed(3));
    } else {
      let interest_payable = ((parseFloat(this.form.value.loan_amount)*10)/100);
      let total_payment = parseFloat(this.form.value.loan_amount) + interest_payable;
      this.emi = total_payment/parseFloat(eventData);
      this.emi = parseFloat(this.emi.toFixed(3));
    }

  }
}*/

  onTermChange(event: string) {
    this.tenure = event;
  }

  findkey(total_payment: string) {
    return Object.keys(this.payOutElem).find(
      (key) => this.payOutElem[key] === total_payment
    );
  }

  onInputAmount(eventData: string): void {
    if (this.form.value.loan_type && eventData) {
      console.log('hellowwwwww');
      let total_payment = eventData;
      let key = this.findkey(total_payment);
      this.payout = total_payment;
      this.provident = this.commonDataElem[key];
      this.monthlypayment = this.monthlyPayElem[key];
      this.total40month = this.totalPayElem[key];
    }
  }

  /*onTermChange(eventData: string): void {
  if(this.form.value.loan_amount && this.form.value.tenure && this.form.value.loan_type) {
    console.log('hellowwwwww');

     let total_payment =parseFloat(this.form.value.loan_amount);
     this.emi = total_payment/parseFloat(eventData);
    if(this.form.value.loan_type === '2') {
      let interest_payable = ((parseFloat(this.form.value.loan_amount)*8)/100);
      let total_payment = parseFloat(this.form.value.loan_amount) + interest_payable;
      this.emi = total_payment/parseFloat(eventData);
      this.emi = parseFloat(this.emi.toFixed(3));
    } else {
      let interest_payable = ((parseFloat(this.form.value.loan_amount)*10)/100);
      let total_payment = parseFloat(this.form.value.loan_amount) + interest_payable;
      this.emi = total_payment/parseFloat(eventData);
      this.emi = parseFloat(this.emi.toFixed(3));
    }

  }
}*/

  onSelectCategory() {
    this.mainId = this.form.value.loan_type;
  }
}
