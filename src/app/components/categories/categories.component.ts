import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
  allCategors:Category[]=[];
  constructor(private categoryService:CategoriesService){

  }
  ngOnInit(): void {
    this.findAllCategories();

  }
  findAllCategories(){
    this.categoryService.getCategories().subscribe({
      next:(result:any)=>{
        this.allCategors=result.data;
      }})
  }




}
