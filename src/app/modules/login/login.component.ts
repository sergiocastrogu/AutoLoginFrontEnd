import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModelRequest } from 'src/app/core/models/loginRequest.model';
import { LoginResponse } from 'src/app/core/models/LoginResponse';
import { ResponseBase } from 'src/app/core/models/responseBase';
import { UserRepository } from 'src/app/core/repositories/login.repository';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  fb: FormBuilder = inject(FormBuilder);
  form!: FormGroup;
  userRepository: UserRepository = inject(UserRepository);
  router:Router =  inject(Router)

  ngOnInit(): void {
    this.form =  this.fb.group({
      userName: new FormControl(null,[ Validators.required]),
      password: new FormControl(null,[Validators.required])
    });
  }


  login(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
    }
    let request = new LoginModelRequest(this.form.get('userName')?.value, this.form.get('password')?.value);
    this.userRepository.login(request).subscribe({
      next:(res: ResponseBase<LoginResponse>)=> {
        sessionStorage.setItem('user', JSON.stringify(res.data))
        this.router.navigate(['user']);
      },
      error: (err : HttpErrorResponse)=> {
        console.error(err);
      }
    })

  }



}
