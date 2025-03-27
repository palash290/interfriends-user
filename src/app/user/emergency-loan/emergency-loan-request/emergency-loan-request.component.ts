import { Component, OnInit, Input, Output, EventEmitter, SimpleChange} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserList } from 'src/app/model/userList.model';
import { AuthService } from 'src/app/service/auth.service';
import { LoanService } from 'src/app/service/loan.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-emergency-loan-request',
  templateUrl: './emergency-loan-request.component.html',
  styleUrls: ['./emergency-loan-request.component.css']
})
export class EmergencyLoanRequestComponent implements OnInit {
  userList: UserList[] = [];
  form: FormGroup;
  @Input() eachChange: string;
  @Input() add: string;
  @Output() valueChange = new EventEmitter();
  isLoading = false;
  mainId: string;
  userId: string;
  groupId: string;
  unique_ID : string;
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
      this.user =  response.userinfo;
       this.unique_ID =  this.user.unique_id.toString();
       localStorage.setItem("userUniqueId", this.unique_ID.toString());
       console.log("Aishwarya Unique ID", this.unique_ID);
    });


    this.form = new FormGroup({
      loan_amount: new FormControl(null, { validators: [Validators.required] }),
      pay_by	: new FormControl(null, { validators: [Validators.required] }),
      contact_number	: new FormControl(null, { validators: [Validators.required] }),
      gurarantor	: new FormControl('', {})
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
    this.form.patchValue({ contact_number: this.unique_ID  });
  }


  onSave(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    if(this.form.value.loan_amount > 500) {
      this.toastr.error('Please enter amount less then 500');
      return;
    }

    this.isLoading = true;

    this.loanService.addEmergencyLoan(
        this.userId,
        this.groupId,
        this.form.value.loan_amount,
        this.form.value.pay_by,
        this.form.value.contact_number,
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
    this.form.reset();

    this.form.patchValue({
      gurarantor: ''
    });
  }
}
