import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { Location } from '@angular/common';
declare var $: any;

@Component({
    selector: 'app-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.css'],
    standalone: false
})
export class HelpComponent implements OnInit {

  form: UntypedFormGroup;
  isLoading = false;
  userId: string;
  groupId: string;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private toastr: ToastrService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.groupId = this.authService.getgroupId();

    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(null, { validators: [Validators.required] }),
      type: new UntypedFormControl('', { validators: [Validators.required] }),
      message: new UntypedFormControl('', { validators: [Validators.required] }),
    });
  }


  onSave(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    this.userService.help(
      this.form.value.name,
      this.form.value.type,
      this.form.value.message
    ).subscribe((response: any) => {
      this.form.reset();
      this.isLoading = false;
      if (response.success === '1') {
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
    });
  }

  backClicked() {
    this._location.back();
  }

  ngAfterViewInit(): void {
    $('.open-message-tab').on('click', () => {
      $('#msg-tab').tab('show');
    });
  }


}
