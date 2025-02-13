import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/core/models/registerRequest';
import { ResponseBase } from 'src/app/core/models/responseBase';
import { UserRepository } from 'src/app/core/repositories/login.repository';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  fb: FormBuilder = inject(FormBuilder);
  form!: FormGroup;
  userRepository: UserRepository = inject(UserRepository);
  router:Router =  inject(Router)

  ngOnInit(): void {
    this.form = this.fb.group({
      identification: ['', Validators.required],
      firstName: ['', Validators.required],
      secondName: [''],
      firstLastName: ['', Validators.required],
      secondLastName: [''],
      phoneNumber: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  register(){
      let request: RegisterRequest = {
        identification: this.form.get('identification')?.value,
        firstName: this.form.get('firstName')?.value,
        secondName: this.form.get('secondName')?.value || undefined,
        firstLastName: this.form.get('firstLastName')?.value,
        secondLastName: this.form.get('secondLastName')?.value || undefined,
        phoneNumber: this.form.get('phoneNumber')?.value || undefined,
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value
      }
      this.userRepository.register(request).subscribe({
        next: (res: ResponseBase<null>)=> {
          this.router.navigate(['login']);
        },
        error: (error: HttpErrorResponse)=> {
          console.log(error);
        }
      })
  }
}
