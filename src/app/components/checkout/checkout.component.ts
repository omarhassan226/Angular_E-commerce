import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ShippingInfo } from '../../models/shipping-info.model';
import { PaymentInfo } from '../../models/payment-info.model';
import { IProduct } from '../../models/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
[x: string]: any;
    countries: string[] = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua & Barbuda', 'Argentina', 'Armenia', 'Australia',
    'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda',
    'Bhutan', 'Bolivia', 'Bosnia & Herzegovina', 'Botswana', 'Brazil', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi',
    'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'China',
    'Colombia', 'Comoros', 'Congo', 'Congo', 'Cook Islands', 'Costa Rica', "Cote d'Ivoire", 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
    'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia',
    'Ethiopia', 'Fiji', 'Finland', 'France', 'French Guiana', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece',
    'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras',
    'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica',
    'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea', 'Korea', 'Kuwait', 'Kyrgyz Republic', 'Lao', 'Latvia',
    'Lebanon', 'Lesotho', 'Liberia', 'Libyan Arab Jamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia',
    'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius',
    'Mayotte', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar',
    'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria',
    'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territory', 'Panama',
    'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion',
    'Romania', 'Russian Federation', 'Rwanda', 'Saint Barthelemy', 'Saint Helena', 'Saint Kitts & Nevis', 'Saint Lucia', 'Saint Martin',
    'Saint Pierre & Miquelon', 'Saint Vincent & the Grenadines', 'Samoa', 'San Marino', 'Sao Tome & Principe', 'Saudi Arabia', 'Senegal',
    'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'Spain',
    'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard & Jan Mayen', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan',
    'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad & Tobago', 'Tunisia', 'Turkey',
    'Turkmenistan', 'Turks & Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States',
    'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Virgin Islands, British', 'Virgin Islands, U.S.', 'Wallis & Futuna',
    'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'
  ];
  cartItems: any[] = [];
  total: number = 0;
  shippingInfo: any = { country: '' } as ShippingInfo;
  paymentInfo: PaymentInfo = {} as PaymentInfo;
  errorMessage: string = '';
  paymentMethod: string = '';
  cartId: any;
  checkoutForm: FormGroup;

  constructor(private cartService: CartService, private router: Router, private formBuilder: FormBuilder) {
    this.checkoutForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]{6,}')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
      streetAddress: ['', [Validators.required, Validators.pattern('[A-Za-z0-9\s]{10,}')]],
      city: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      postalCode: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
      country: ['', Validators.required],
      paymentMethod: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe({
      next: (data: any) => {
        this.cartId = data._id;
        this.cartItems = data.items;
        this.total = data.price;
      },
      error: (error: any) => {
        console.error('Error fetching cart items:', error);
      }
    });

    this.checkoutForm.get('paymentMethod')?.valueChanges.subscribe((value) => {
    console.log('Payment method changed:', value);
    // You can perform any actions here based on the selected payment method
  });
  }

  placeOrder(): void {
    console.log(this.checkoutForm.value);

    if (!this.checkoutForm.valid) return;
    if (this.checkoutForm.invalid) {
      return;
    }


    if (this.checkoutForm.value["paymentMethod"] === "cash") {
        console.log("cash");

        this.cartService.placeOrder(this.cartId, this.checkoutForm.value).subscribe({
          next: (data) => {
            this.cartService.cartCounterSubject.next(0);
            this.router.navigateByUrl('/thank-you/' + data.data._id);
          }
        });
    } else {
      console.log("card");

        this.cartService.makePayment(this.cartId, this.checkoutForm.value).subscribe({
          next: (data) => {
            this.router.navigate(["/"]).then(result => { window.location.href = data.session.url; });
          }
        });
      }
  }


}
