import { AuthService, TAuthInfo  } from './../../../../core/services/auth.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemSettingService } from 'src/app/core/services/system-setting.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  // defaultAuth: any = {
  //   email: 'dungttt@cbbank.vn',
  //   password: '123456',
  // };
  defaultAuth: any = {
    email: '',
    password: '',
  };
  loginForm: FormGroup;
  hasError: boolean; errMessage = 'Có lỗi xảy ra. Hãy thử lại';
  returnUrl: string;
  isLoading$: Observable<boolean>;
  isShowPwd: boolean = false;


  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private systemSettingService: SystemSettingService
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentAuthInfo) {
      console.log(this.authService.currentAuthInfo)
      console.log('redirect to home if already logged in');
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  changePwdVisible(event: any){
    this.isShowPwd = event.checked;
  }


  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        this.defaultAuth.email,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  validateEmail(mail: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    return (false)
  }

  submit() {
    const username = this.validateEmail(this.f.email.value) ? this.f.email.value : `${this.f.email.value}`;
    const password = this.f.password.value;

    // if username is not email => add "@cbbank.vn"

    this.hasError = false;
    const loginSubscr = this.authService
      .login(username, password)
      .pipe(first())
      .subscribe({
        next: (authInfo: TAuthInfo ) => {
          if (authInfo) {
            // Load setting
            this.systemSettingService.getAndSetAppConfig();
            // TODO  this.loadALLPermissions();
            this.router.navigate([this.returnUrl]);
          } else {
            this.hasError = true;
            this.errMessage = 'Thông tin đăng nhập không chính xác';
          }
        },
        error: (statusCodeErr) => {
          try{
            this.hasError = true;
            switch(statusCodeErr){
              case 401:
                this.errMessage  = 'Thông tin đăng nhập không chính xác';
                break;
              default:
                this.errMessage  = 'Có lỗi xảy ra. Hãy thử lại';
                break;
            
            }
          } catch(e){
            console.log(e)
          }
        },
        complete: () => {}
      });
    this.unsubscribe.push(loginSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
