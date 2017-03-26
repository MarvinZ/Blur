import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfigService } from './../../config.service'
import { ResponseStatus, ResponseAgentInfo, IUser } from './../../models/api';
import { Router } from '@angular/router'
import { Localization, LocaleService, TranslationService } from 'angular-l10n';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


import 'style-loader!./profile.scss';

@Component({
  selector: 'profile',
  templateUrl: './profile.html',
})
export class Profile extends Localization implements OnInit {

  profileForm: FormGroup
  private firstName: FormControl
  private lastName: FormControl
  // public email: AbstractControl;
  public username: AbstractControl;

  public password: AbstractControl;
  public submitted: boolean = false;


  public errorMessage: string
  public showInvalidCredentials: boolean
  public loading: boolean



  constructor(fb: FormBuilder, public config: ConfigService, private router: Router, public locale: LocaleService,
    public translation: TranslationService, public vcr: ViewContainerRef, public toastr: ToastsManager) {
    super(locale, translation);
    this.toastr.setRootViewContainerRef(vcr);


    //   this.form = fb.group({
    //     // 'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    //     'username': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
    //     'password': ['', Validators.compose([Validators.required, Validators.minLength(2)])]
    //   });

    //   // this.email = this.form.controls['email'];
    //   this.username = this.form.controls['username'];

    //   this.password = this.form.controls['password'];
  }


  ngOnInit() {
    this.firstName = new FormControl(this.config.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')])
    this.lastName = new FormControl(this.config.currentUser.lastName, Validators.required)

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  saveProfile(formValues) {
    if (this.profileForm.valid) {
      this.config.updateCurrentUser(formValues.firstName, formValues.lastName)
      this.toastr.success('Your profile has been updated!', 'Success');
    }
  }

  validateFirstName() {
    return this.firstName.valid || this.firstName.untouched
  }

  validateLastName() {
    return this.lastName.valid || this.lastName.untouched
  }

  cancel() {
    this.router.navigate(['dashboard'])
  }


}
