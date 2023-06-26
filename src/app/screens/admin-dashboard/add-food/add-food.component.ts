import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from "rxjs";
import { ToastrHandleService } from 'src/app/services/toastr-handle.service'
import { AddFoodRequestModel } from 'src/app/models/addFoodRequestModel';
import { AddFoodService } from 'src/app/services/add-food.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss']
})
export class AddFoodComponent {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  addFoodFormGroup: FormGroup;

  constructor(private fb: FormBuilder,
    private addFoodService: AddFoodService,
    private toastrHandleService: ToastrHandleService) {
    this.addFoodFormGroup = this.fb.group({
      foodName: ['', Validators.required],
      foodDescription: ['', Validators.required],
      foodPrice: ['', Validators.required],
      foodImageUrl: ['', Validators.required],
      foodVideoUrl: ['', Validators.required]
    });
  }

  get f() {
    return this.addFoodFormGroup.controls;
  }

  clearForm() {
    this.addFoodFormGroup.patchValue({
      foodName: '',
      foodDescription: '',
      foodPrice: null,
      foodImageUrl: '',
      foodVideoUrl: '',
    });
  }

  createRequestModel() {
    let addFoodFormGroup = this.addFoodFormGroup.getRawValue();
    let requestModel: AddFoodRequestModel = {
      foodName: addFoodFormGroup.customerCode,
      foodDescription: addFoodFormGroup.code,
      foodPrice: addFoodFormGroup.birthDate,
      foodImageUrl: addFoodFormGroup.phoneNumber,
      foodVideoUrl: addFoodFormGroup.email,
    }
    return requestModel;
  }

  addFood() {
    this.addFoodService.addFood(this.createRequestModel())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          if (!res.hasError && res.data) {
            this.clearForm();
            this.toastrHandleService.success();
          } else
            this.toastrHandleService.error(res.errorMessage);
        },
        error: err => {
          if (err.error)
            this.toastrHandleService.error(err.error);
        }
      });
  }
}
