import { Component, OnInit, Input, Output, EventEmitter, SimpleChange} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { LoanService } from 'src/app/service/loan.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-safe-keeping-request',
  templateUrl: './add-safe-keeping-request.component.html',
  styleUrls: ['./add-safe-keeping-request.component.css']
})
export class AddSafeKeepingRequestComponent implements OnInit {

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
      date	: new FormControl(null, { validators: [Validators.required] }),
      reason	: new FormControl(null, { validators: [Validators.required] })
    });
  }

  onSave(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    this.userService.requestSafeKeepingWithdral(
        this.groupId,
        this.userId,
        this.form.value.amount,
        this.form.value.date,
        this.form.value.reason,
        "Safe Keeping"
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
