import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user.models';
import { ESGIService } from './services/esgi.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ESGIKing';
  user:User=new User("","","Invité");
  userName!:string

  constructor(private ESGIService:ESGIService,private UserService:UserService,private router:Router) {
  this.user=this.ESGIService.user;
  }
  async ngOnInit(): Promise<void> {
    this.refreshName();

  }
  goLanding(){
    this.router.navigate(["/"]).then();
  }
  refreshName(){
    this.user=this.ESGIService.user;
  }
  toUserOrLogin(){
    if(this.user.login=="Invité"){
      this.router.navigate(["/login"]).then();
    }else{
      this.ESGIService.setUserPage(this.router);
    }
  }
}
