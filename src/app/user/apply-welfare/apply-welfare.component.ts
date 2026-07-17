import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserList } from 'src/app/model/userList.model';
import { AuthService } from 'src/app/service/auth.service';
import { LoanService } from 'src/app/service/loan.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-apply-welfare',
  templateUrl: './apply-welfare.component.html',
  styleUrls: ['./apply-welfare.component.css']
})
export class ApplyWelfareComponent implements OnInit {

  userList: UserList[] = [];
  form: FormGroup;
  @Input() eachChange: string;
  @Input() add: string;
  @Output() valueChange = new EventEmitter();
  isLoading = false;
  mainId: string;
  userId: string;
  groupId: string;
  unique_ID: string;
  user: UserList;


  constructor(
    public loanService: LoanService,
    public userService: UserService,
    public authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.groupId = this.authService.getgroupId();

    this.userService.allUserList(this.groupId).subscribe((response: any) => {
      this.userList = response.userList;
    });


    this.userService.getUserInfo(this.userId)
      .subscribe((response: any) => {
        console.log("response", response);
        this.user = response.userinfo;
        this.unique_ID = this.user.unique_id.toString();
        localStorage.setItem("userUniqueId", this.unique_ID.toString());
        console.log("Aishwarya Unique ID", this.unique_ID);
      });


    this.form = new FormGroup({
      loan_amount: new FormControl('', { validators: [Validators.required] }),
      tenure: new FormControl('', { validators: [Validators.required] }),
      emi: new FormControl(null, {}),
      pay_date: new FormControl(null, { validators: [Validators.required] }),
      adminrisk: new FormControl(null, {}),
      total40Months: new FormControl(null, {}),
      provident: new FormControl(null, {}),
      admin_risk: new FormControl(null, {}),
      gurarantor: new FormControl('', { validators: [Validators.required] })
    });
  }


  ngOnChanges(changes: { [property: string]: SimpleChange }): void {
    if (changes['uniqueId'] !== undefined || changes['eachChange'] !== undefined) {
      if (changes['eachChange'].currentValue !== undefined) {
        if (changes['uniqueId'] === undefined) {
          this.mainId = this.mainId;
        } else if (changes['uniqueId'].currentValue !== undefined) {
          this.mainId = changes['uniqueId'].currentValue;
        } else {
          this.mainId = this.mainId;
        }

        // this.form.patchValue({
        //   group_cycle_name: this.form.group_cycle_name,
        //   group_cycle_descp: this.form.group_cycle_descp
        // });
      }
    }
    this.unique_ID = localStorage.getItem("userUniqueId");
    this.form.patchValue({ contact_number: this.unique_ID });
  }


  onSave(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    this.loanService.addWelfare(
      this.userId,
      this.groupId,
      this.form.value.emi,
      this.form.value.tenure,
      this.form.value.total40Months,
      this.form.value.provident,
      this.form.value.admin_risk,
      this.form.value.emi,
      this.form.value.pay_date,
      this.form.value.gurarantor
    ).subscribe((response: any) => {
      this.form.reset();
      document.getElementById('closePopupLoanEmergencyRequest').click();
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
    // this.form.reset();

    this.form.patchValue({
      gurarantor: ''
    });
  }


  payOutElem: any = { 1: "1000", 2: "2000", 3: "3000" };
  tenureElem: number[] = [24];
  total40month: string;

  totalPayElem: any = { 1: "1025.00", 2: "2050.00", 3: "3075.00" };
  provident: string;

  adminrisk: string;
  monthlypayment: string;
  payout: string;

  AdminriskElem: any = { 1: "25.00", 2: "50", 3: "75.00" };
  providentElem: any = { 1: "0", 2: "0", 3: "0", 4: "0" };
  monthlyPayElem: any = { 1: "25.00", 2: "50", 3: "75.00" };

  findkey(total_payment: string) {
    return Object.keys(this.payOutElem).find(key => this.payOutElem[key] === total_payment);
  }

  onInputAmount(eventData: string): void {
    if (eventData) {
      console.log('hellowwwwww', eventData);
      let total_payment = eventData;
      let key = this.findkey(total_payment);
      this.payout = total_payment;
      this.provident = this.providentElem[key];
      this.adminrisk = this.AdminriskElem[key]
      this.monthlypayment = this.monthlyPayElem[key];
      this.total40month = this.totalPayElem[key];
    }
  }

}
