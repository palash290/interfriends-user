import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, OnChanges} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { LoanService } from 'src/app/service/loan.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-contact-investment',
  templateUrl: './contact-investment.component.html',
  styleUrls: ['./contact-investment.component.css']
})
export class ContactInvestmentComponent implements OnInit, OnChanges {

  @Input() uniqueId: string;
  @Input() eachChange: string;
  mainId: string;
  form: FormGroup;
  isLoading = false;
  userId: string;
  groupId: string;




  constructor(
    public userService: UserService,
    public authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.groupId = this.authService.getgroupId();
    this.form = new FormGroup({
      amount: new FormControl(null, { validators: [Validators.required] }),
      phone_number	: new FormControl(null, { validators: [Validators.required] }),
      message	: new FormControl(null, { validators: [Validators.required] })
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
      }
    }
  }

  onSave(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    this.userService.requestInvestment(
        this.groupId,
        this.userId,
        this.form.value.amount,
        this.form.value.phone_number,
        this.form.value.message,
        this.mainId
      ).subscribe((response: any) => {
        this.form.reset();
        document.getElementById('closePopupRequest').click();
        this.isLoading = false;
        if (response.success === '1') {
          this.toastr.success(response.message);
        } else {
          this.toastr.error(response.message);
        }
      });
  }

  onClose() {
    this.form.reset();
  }

}
