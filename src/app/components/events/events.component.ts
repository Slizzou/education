import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  T:any=[
    {id:1,name:"Which Country Handles Student Debt?",duration:30,Time:"15.00 - 15.30",place:"25 New York City",event_day:"27",event_month:"Auguest",image:"/assets/images/event_1.jpg"},
    {id:1,name:"Which Town Handles Student Debt?",duration:150,Time:"16.00 - 18.30",place:"23 Netherland",event_day:"28",event_month:"April",image:"/assets/images/event_2.jpg"},
    {id:1,name:"Which City Handles Student Debt?",duration:70,Time:"19.00 - 20.10",place:"21 Frankfurt ",event_day:"2",event_month:"feburary",image:"/assets/images/event_3.jpg"},

  
  
  ]


  constructor() { }

  ngOnInit(): void {
  }
  eventSize(sc1:number){
    if (sc1<100 &&sc1>50){
      return '100px';

    }else if (sc1<50 &&sc1>1){
      return '50px';
    }

    else {
    return'20px';
  }
  }
}

