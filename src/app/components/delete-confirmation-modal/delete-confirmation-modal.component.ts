import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.scss']
})
export class DeleteConfirmationModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onConfirm(): void {
    // Silme işlemini burada gerçekleştirin
    this.dialogRef.close(true); // Silme onayı olduğunda true değeriyle modalı kapatın
  }

  onCancel(): void {
    this.dialogRef.close(false); // Silme işleminden vazgeçildiğinde false değeriyle modalı kapatın
  }
}
