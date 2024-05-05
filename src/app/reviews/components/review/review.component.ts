import { DeleteConfirmationService } from './../../../services/delete-confirmation.service';
import { DeleteConfirmationComponent } from './../../../components/delete-confirmation/delete-confirmation.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Review } from '../../models/review';
import { ReviewService } from './../../services/review.service';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { filter } from 'rxjs';
import { ProductService } from '../../../products/services/product.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent implements OnInit {
  currentPage: number = 0;
  totalPages: number = 0;
  page: any;
  limit: number = 3;
  totalPagesArray: number[] = [];
  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private DeleteConfirmationService: DeleteConfirmationService,
    private productService: ProductService
  ) {
    this.getCurrentUser();
  }
  id: any;

  userId!: string;
  // userId: string ="6600ef79ae7cf1ca32567fbb";
  // headers = new HttpHeaders().set('user', this.userId);
  updateData!: FormGroup;
  dataReview: Review[] = [];
  // dataReview: any;
  name!: string;
  image!: string;
  idEditReview!: string;
  itemEdit!: any;
  @Input() productName!: string;
  @Input() productRatingReview!: number;

  @ViewChild('exampleModal') exampleModalInput!: ElementRef;
  myForm!: FormGroup;
  addReview: boolean = true;
  updateRev: boolean = false;
  formdata: Review = {
    _id: '',
    reviewDetails: '',
    rating: 0,
    user: { name: '', image: '', _id: '' },
    product: '',
  };
  dataEnter: object = {
    reviewDetails: '',
    user: '',
    product: '',
    ratingsAverage: 0,
  };
  dataEdit: object = {
    reviewDetails: '',
  };
  updateFormGroup: any;

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        console.log(event);
        this.page = this.route.snapshot.queryParamMap.get('page');
        this.currentPage = this.page || 1;
        this.getCurrentUser();
        this.id = this.route.snapshot.paramMap.get('id');
        this.getProductReviews(this.currentPage);
      });

    this.page = this.route.snapshot.queryParamMap.get('page');
    this.currentPage = this.page || 1;
    this.getCurrentUser();
    this.id = this.route.snapshot.paramMap.get('id');

    this.myForm = this.formBuilder.group({
      review: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.minLength(3),
        ],
      ],
      ratingsAverage: [0, [Validators.required]],
    });

    this.getProductReviews(this.currentPage);
  }
  getCurrentUser() {
    this.reviewService.getCurrentUser().subscribe((response: any) => {
      this.userId = response._id;
    });
  }
  getProductReviews(page: number) {
    this.reviewService
      .getProductReviews(page, this.id)
      .subscribe((data: any) => {
        console.log(data.data);
        this.dataReview = data.data;
        this.currentPage = data.paginationResult.currentPage;
        this.limit = data.paginationResult.limit;
        this.totalPages = data.paginationResult.numberPages;
        this.totalPagesArray = Array.from(
          { length: this.totalPages },
          (_, i) => i
        );
      });
  }
  add() {
    if (localStorage.getItem('token')) {
      this.addReview = true;
      this.updateRev = false;
      this.myForm.reset();
      this.openModal();
    } else {
      this.router.navigate(['/login']);
    }
  }

  openConfirmationDialog(id: string): void {
    if (id) {
      this.DeleteConfirmationService.openConfirmationDialog(
        'Are you sure you want to delete this item from your cart?'
      ).subscribe((result) => {
        if (result) {
          this.deleteReview(id);
        }
      });
    } else {
      console.error('Review ID is undefined');
    }
  }
  deleteReview(id: any) {
    this.reviewService.deleteProductReviews(id).subscribe({
      next: (data) => {
        this.dataReview = this.dataReview.filter((review) => review._id != id);
      },
      error: (err) => {
        alert('Error deleting review: ' + err.message);
      },
    });
  }
  openModal() {
    if (this.exampleModalInput != null) {
      this.exampleModalInput.nativeElement.style.display = 'block';
    }
  }
  closeModal() {
    if (this.exampleModalInput != null) {
      this.exampleModalInput.nativeElement.style.display = 'none';
    }
  }
  onSubmit(form: FormGroup) {
    console.log(form.value);
    if (form.valid) {
      console.log('form.value.ratingsAverage', form.value.ratingsAverage);
      this.dataEnter = {
        reviewDetails: form.value.review,
        ratingsAverage: form.value.ratingsAverage,
        user: this.userId,
        product: this.id,
      };
      this.reviewService.addroductReviews(this.id, this.dataEnter).subscribe({
        next: (data) => {
          console.log(data);
          //@ts-ignore
          this.productService.rating.next(data.rating);
        },
        complete: () => {
          this.router.navigate(['/product-detail/', this.id]);

          this.getProductReviews(this.currentPage);
          console.log(' this.id this.id', this.id);
        },
      });
      console.log('id', 'this.dataReview)');
    }
  }
  onupdata(form: FormGroup) {
    if (form.valid) {
      this.dataEdit = {
        reviewDetails: form.value.review,
        user: this.userId,
      };
      this.reviewService
        .updateoductReviews(this.dataEdit, this.idEditReview)
        .subscribe({
          next: (data) => console.log(data),
          error: (err) => console.log(err),
          complete: () => this.getProductReviews(this.currentPage),
        });
    }
  }
  EditReview(itemEdit: any, idEditReview: string) {
    this.idEditReview = idEditReview;
    this.itemEdit = itemEdit;

    this.myForm.patchValue({
      review: itemEdit.reviewDetails,
      user: itemEdit.user,
    });

    this.addReview = false;
    this.updateRev = true;
    this.openModal();
  }
  changePage(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          page: this.currentPage + 1,
        },
        queryParamsHandling: 'merge',
      });
      console.log('pagesss', this.router);
    }
  }
}
