import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from './../../config.service' 
import { LoginResponse, ResponseStatus, ResponseAgentInfo, IUser } from './../../models/api';
import { Router } from '@angular/router'
import { Localization, LocaleService, TranslationService } from 'angular-l10n';


import 'style-loader!./login.scss';

@Component({
  selector: 'login',
  templateUrl: './login.html',
})
export class Login extends Localization {

  public form: FormGroup;
  // public email: AbstractControl;
  public username: AbstractControl;

  public password: AbstractControl;
  public submitted: boolean = false;


  public tempRes: LoginResponse
  public errorMessage: string
  public showInvalidCredentials: boolean
  public loading: boolean



  constructor(fb: FormBuilder, public configService: ConfigService, private router: Router, public locale: LocaleService,
    public translation: TranslationService) {
        super(locale, translation);

    this.form = fb.group({
      // 'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'username': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(2)])]
    });

    // this.email = this.form.controls['email'];
    this.username = this.form.controls['username'];

    this.password = this.form.controls['password'];
  }

  public onSubmit(values: any): void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here

      this.configService.loginUser(values.username, values.password).subscribe(tempRes => {
        this.tempRes = tempRes;


        if (this.tempRes.ResponseStatus.Status === 'Success' && this.tempRes.ResponseAgentInfo.IdAgent != 0) {
          this.loading = true;


          this.configService.currentUser = {
            id: this.tempRes.ResponseAgentInfo.IdAgent,
            userName: values.username,
            firstName: values.username,
            lastName: 'Test Last name',
            userType: 'PPH',
            selectedSubagent: 0,
            profilePictureUrl:'Hernan'
          }

          alert(this.tempRes.ResponseAgentInfo.IdAgent);
          console.log(this.configService.currentUser);


          this.router.navigate(['pages/dashboard']);
        }
        else {
          this.showInvalidCredentials = true;
        }
      },
        error => this.errorMessage = <any>error);


      console.log(values);
    }
  }
}
