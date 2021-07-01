import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $("#photo").click(function(){
      $("#photo").css({"transform":"translate(-450px) translateY(100px) scale(3)",
    "border-radius":"100px",
  "border":"none",
"opacity":"1"});
  $("main").css("opacity","0.5")
    });
    $("#photo").dblclick(function(){
      $("#photo").css({"transform":"translate(0px) translateY(0px) scale(1)",
    "border-radius":"100px",
  "border":"2px solid black",
"opacity":"1"});
  $("main").css("opacity","1")
    })
  }

}
