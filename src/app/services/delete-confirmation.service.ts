import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DeleteConfirmationComponent  } from '../components/delete-confirmation/delete-confirmation.component';

@Injectable({
  providedIn: 'root'
})
export class DeleteConfirmationService {

  constructor(
    private dialog: MatDialog
    ) { }

  openConfirmationDialog(message: string): Observable<boolean> {
    const dialogRef: MatDialogRef<DeleteConfirmationComponent > = this.dialog.open(DeleteConfirmationComponent , {
      width: '250px',
      data: { message: 'Are you sure you want to delete this item?' }
    });

    return dialogRef.afterClosed();
  }
}
