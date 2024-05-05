import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {


  constructor(private http: HttpClient) {
    this.onLoginSuccess();
  }

  ngOnInit(): void {

    this.onLoginSuccess();
    this.getUserProfile();

  }

  user= {name:"",email:"",image:""};
  private apiUrl = environment.apiUrl

  onLoginSuccess(): void {
    //console.log("aaaaaaaaaaaaaaaaaaaaaahhhhhhhhhhhhhhhhhhhh");

    const url = `${this.apiUrl}/api/profile`;

    this.http
      .get(url)
      .pipe(
        catchError((error) => {
          console.error(error);
          throw error;
        })
      )
      .subscribe((response: any) => {
        this.user.name = response.name;
        this.user.email = response.email;
        response.image?this.user.image=response.image:this.user.image="istockphoto-1682296067-612x612.jpg"

      });
  }


  editMode = false; // Flag to track edit mode

  getUserProfile(): void {
    const url = `${this.apiUrl}/api/profile`;

    this.http.get(url)
      .pipe(
        catchError((error) => {
          console.error(error);
          throw error;
        })
      )
      .subscribe((response: any) => {
        //console.log(response);
        this.user.name = response.name;
        this.user.email = response.email;

      });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

updateUserProfile(): void {
  const url = `${this.apiUrl}/api/profile`;


  this.http.patch(url, this.user)
    .pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    )
    .subscribe((response: any) => {
      //console.log(response);
      this.editMode = false;
      // Optionally, you can show a success message to the user
      // Or navigate back to the profile page
    });
  }
cancelUpdate(): void {
      this.editMode = false;
  }


}
