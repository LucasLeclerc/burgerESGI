import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';
import { CartContent } from '../models/cartContent.models';
import { Recipe } from '../models/recipe.models';
import { Location } from '@angular/common'

@Component({
  selector: 'app-cart-validation',
  templateUrl: './cart-validation.component.html',
  styleUrls: ['./cart-validation.component.css']
})
export class CartValidationComponent implements OnInit {

  user:User;
  activity:string="neutre";
  valideMessage:string="";
  error=false;
  cartList:CartContent[]=[];
  defaultCartList:CartContent[]=[];
  deleting:CartContent=new CartContent();
  modified:boolean=false;
  price:number=0;

  constructor(private ESGIService:ESGIService, private location: Location,private UserService:UserService,private router:Router,private AppComponent:AppComponent) {
    this.user=this.ESGIService.user;
  }

  ngOnInit(): void {
    console.log("a")
    this.user=this.ESGIService.user;
    if(this.user.login==="Invité"){
      console.log("merde")
      this.router.navigate(["/login"]).then();
    }else{
      console.log("b")
      this.ESGIService.user.getUser();
      this.user=this.ESGIService.user;
      this.cartList=[];
      this.user.instance.get("/cart/content",{}).
      then( (response) => {
        console.log(response.data)
        response.data.forEach((element: {
          recipe: { _id: string; tittle: string; description: string; price: number; ingredient: string[]; timeToPrepare: number; instruction: string; photo: string; requirerTool: string[]; type: string[]; };
          numberCart: number | undefined;
          quantity: number | undefined;
          id: string | undefined
        }) => {
          console.log(element)
          let recipe=new Recipe()
          recipe.setWithData(element.recipe);
          let tmp =new CartContent(element.id,element.quantity,recipe,element.numberCart);
          console.log("tmp ",tmp);
          this.cartList.push(tmp);
        });
        this.defaultCartList=this.cartList.slice(0,this.cartList.length);
        console.log(this.cartList,this.defaultCartList);
        this.error=false;
        this.priceUpdate();
      }, (error) => {
        console.log(error);
      });
      console.log("c")
      
    }
  }

  priceUpdate(){
    this.price=0;
    for (let elem of this.cartList) {
      this.price+=elem.recipe.price*elem.quantity;
    }
  }
  toPlanning(){
    this.router.navigate(['/plannification']).then()
  }

}
