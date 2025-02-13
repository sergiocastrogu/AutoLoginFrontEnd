import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { LoginResponse } from 'src/app/core/models/LoginResponse';
import { ResponseBase } from 'src/app/core/models/responseBase';
import { UserRepository } from 'src/app/core/repositories/login.repository';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userRepository: UserRepository = inject(UserRepository);
  userData!: LoginResponse;

  ngOnInit(): void {
    this.getUserData();
  }


  getUserData(){
    this.userRepository.userData().subscribe({
      next: (res: ResponseBase<LoginResponse>)=> {
        this.userData = res.data;
      },
      error (err : HttpErrorResponse){
        console.error(err)
      }
    })
  }

}
