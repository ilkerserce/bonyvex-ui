import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from "rxjs";
import { AddPrimaryCategoryRequestModel, AddSubCategoryRequestModel } from 'src/app/models/addCategoryRequestModel';
import { CategoriesService } from 'src/app/services/categories.service';
import { ToastrHandleService } from 'src/app/services/toastr-handle.service'

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  isSubCategory: boolean = false;

  addCategoryFormGroup: FormGroup;

  constructor(private fb: FormBuilder,
    private categoriesService: CategoriesService) {
    this.addCategoryFormGroup = this.fb.group({
      primaryCategory: ['', Validators.required],
      secondaryCategory: ['', Validators.required],
    });
  }

  subCategoryChanged() {
    this.isSubCategory = !this.isSubCategory
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
    if (this.isSubCategory) {
      let requestModel: AddSubCategoryRequestModel = {
        primaryCategory: addCategoryFormGroup.primaryCategory,
        secondaryCategory: addCategoryFormGroup.secondaryCategory,
      }
      return requestModel;
    } else {
      let requestModel: AddPrimaryCategoryRequestModel = {
        primaryCategory: addCategoryFormGroup.primaryCategory,
      }
      return requestModel;
    }
  }

  addPrimaryCategory() {
    this.categoriesService.addPrimaryCategory(this.createRequestModel())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
         
        },
        error: err => {
         
      }});
  }

  addSubCategory() {
    this.categoriesService.addSubCategory(this.createRequestModel())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
         
        },
        error: err => {

        }
      });
  }

  addCategory() {
    if (this.isSubCategory) {
      this.addSubCategory();
    } else {
      this.addPrimaryCategory();
    }
  }

}
