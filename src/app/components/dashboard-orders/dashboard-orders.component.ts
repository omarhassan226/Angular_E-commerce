import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-orders',
  templateUrl: './dashboard-orders.component.html',
  styleUrl: './dashboard-orders.component.css'
})
export class DashboardOrdersComponent implements OnInit {
  constructor(private ordersService :OrdersService , private activatedRoute: ActivatedRoute){
  }


subscription= new Subscription()
orders:any;
ngOnInit(): void {
  const route= this.activatedRoute.snapshot.url[1]?.path || ""
  //console.log("route",route);
  if(!route){
    this.subscription.add(
      this.ordersService.getOrders().subscribe({
        next:(orders:any)=>{
          this.orders=orders.data
          //console.log(orders)

        },
        error:(err)=>{
          alert(err.message)
        }
      })
    )

    return;
  }
  this.subscription.add(
    this.ordersService.getorderByStatus(route).subscribe({
      next:(orders:any)=>{
        this.orders=orders.data
        //console.log(orders)
      },
      error:(err)=>{
        alert(err.message)

      }
    })
  )


}



  changeStatus(newStatus :Event ,id:string){

    //@ts-ignore
    this.subscription.add(
      this.ordersService.setOrderStatus(id,{status:(newStatus.target as HTMLInputElement).value}).subscribe({
        next:(data)=>{
          //console.log(data);
        },
        error:(err)=>{
          alert(err.message)

        }
      })
    )

  }


}
