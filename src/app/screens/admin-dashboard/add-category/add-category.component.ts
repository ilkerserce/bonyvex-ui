import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from "rxjs";
import { AddCategoryRequestModel } from 'src/app/models/addCategoryRequestModel';
import { AddCategoryService } from 'src/app/services/add-category.service';
import { ToastrHandleService } from 'src/app/services/toastr-handle.service'

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  addCategoryFormGroup: FormGroup;

  constructor(private fb: FormBuilder,
    private addCategoryService: AddCategoryService,
    private toastrHandleService: ToastrHandleService) {
    this.addCategoryFormGroup = this.fb.group({
      primaryCategory: ['', Validators.required],
      secondaryCategory: ['', Validators.required],
    });
  }

  get f() {
    return this.addCategoryFormGroup.controls;
  }

  clearForm() {
    this.addCategoryFormGroup.patchValue({
      primaryCategory: '',
      secondaryCategory: '',
    });
  }

  createRequestModel() {
    let addCategoryFormGroup = this.addCategoryFormGroup.getRawValue();
    let requestModel: AddCategoryRequestModel = {
      primaryCategory: addCategoryFormGroup.primaryCategory,
      secondaryCategory: addCategoryFormGroup.secondaryCategory,
    }
    return requestModel;
  }

  addCategory() {
    this.addCategoryService.addCategory(this.createRequestModel())
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
