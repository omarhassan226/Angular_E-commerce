
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IProduct } from '../../models/product.model';
import { DeleteConfirmationService } from '../../services/delete-confirmation.service';
import { CartService } from '../../services/cart.service';
// import { filter } from 'dom7';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems:any = [];
  subtotal: number = 0;
  total: number = 0;

  constructor(private cartService: CartService, private DeleteConfirmationService: DeleteConfirmationService) { }




  ngOnInit(): void {
    this.showData()
    this.cartService.getCount()
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product._id, 1).subscribe({
      next: () => {
        // this.router.navigate(['/cart']);
        this.cartService.incrementCartCounter();
      }
    })
  }

    showData(): void {
    this.cartService.getCartItems().subscribe({
      next: (data:any) => {
        console.log(data);
        this.cartItems = data.items
        this.total = data.price
      },
      error:(err)=>{        this.cartItems = []
        this.total = 0}
    })
  }

  deleteItem(id: string) {

    console.log(id);

    this.cartService.removeCartItem(id).subscribe({
      next: () => {
        // Remove the item from the cartItems array
        this.cartItems = this.cartItems.filter((item: any) => item.productId._id !== id);
        console.log(this.cartItems);

        // Recalculate the total price
        // this.total = this.cartItems.reduce((total: number, item: any) => {
        //   return total + (item.quantity * item.productId.price);
        // }, 0);
        this.cartService.getCount()
      },

      error: (error: any) => {
        console.error('Error removing item from cart:', error);
      }
    });

    }

  increaseQuantity(cartId: any, quantity: any) {
    console.log(quantity);

    this.cartService.updateCart(cartId, ++quantity).subscribe({
      next: (res) => {
        console.log(res);
          this.showData()
          this.calculateTotal();
      }
    })

  }

decreaseQuantity(cartId: any, quantity: any) {
  this.cartService.updateCart(cartId, --quantity).subscribe({
    next: (res) => {
      console.log(res);
      if (quantity === 0) {
        this.deleteItem(cartId); // Delete the item if quantity becomes zero
      } else {
        this.showData();
        this.calculateTotal();
      }
    }
  });
}


    calculateTotal(): void {
    this.total = this.cartItems.reduce((total: number, item: any) => {
      return total + (item.quantity * item.productId.price);
    }, 0);
  }

  openConfirmationDialog(productId: string): void {
  this.DeleteConfirmationService.openConfirmationDialog('Are you sure you want to delete this item from your cart?')
    .subscribe(result => {
      if (result) {
        this.deleteItem(productId);
      }
    });
  }

}
