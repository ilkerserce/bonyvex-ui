import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from "rxjs";
import { ToastrHandleService } from 'src/app/services/toastr-handle.service'
import { AddFoodRequestModel, UpdateFoodRequestModel } from 'src/app/models/addFoodRequestModel';
import { FoodsService } from 'src/app/services/foods.service';
import { AuthorizationModel } from 'src/app/models/login.model';
import { DropdownListModel } from 'src/app/models/dropdown-list.model';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss']
})
export class AddFoodComponent {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  @Input('currentUserAuthorizations') currentUserAuthorizations: AuthorizationModel = new AuthorizationModel();
  @Input('id') id: any = null;

  primaryCategoryList: DropdownListModel[] = [];
  subCategoryList: DropdownListModel[] = [];

  nextButtonText = '';
  addFoodFormGroup: FormGroup;

  constructor(private fb: FormBuilder,
    private foodsService: FoodsService,
    private toastrHandleService: ToastrHandleService) {
    this.addFoodFormGroup = this.fb.group({
      foodName: ['', Validators.required],
      foodDescription: ['', Validators.required],
      foodPrice: ['', Validators.required],
      foodImageUrl: [''],
      foodVideoUrl: [''],
      foodPrimaryCategory: ['', Validators.required],
      foodSubCategory: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.id) {
      this.nextButtonText = 'Güncelle';
    } else {
      this.nextButtonText = 'Oluştur';
    }
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
      foodPrimaryCategory: null,
      foodSubCategory: null,
    });
  }

  private populateLists(data: any) {
    this.primaryCategoryList = data.primaryCategoryList;
    this.subCategoryList = data.subCategoryList;
  }

  private populateForm(data: any) {
    this.addFoodFormGroup.patchValue({
      foodName: data.foodName,
      foodDescription: data.foodDescription,
      foodPrice: data.foodPrice,
      foodImageUrl: data.foodImageUrl,
      foodVideoUrl: data.foodVideoUrl,
      foodPrimaryCategory: data.foodPrimaryCategory,
      foodSubCategory: data.foodSubCategory,
    })
  }

  createRequestModel() {
    if (this.id) {
      let addFoodFormGroup = this.addFoodFormGroup.getRawValue();
      let requestModel: UpdateFoodRequestModel = {
        id: this.id,
        name: addFoodFormGroup.foodName,
        description: addFoodFormGroup.foodDescription,
        price: +addFoodFormGroup.foodPrice,
        imageUrl: addFoodFormGroup.foodImageUrl,
        videoUrl: addFoodFormGroup.foodVideoUrl,
        primary_id: +addFoodFormGroup.foodPrimaryCategory,
        sub_id: +addFoodFormGroup.foodSubCategory,
      }

      return requestModel;

    } else {
      let addFoodFormGroup = this.addFoodFormGroup.getRawValue();
      let requestModel: AddFoodRequestModel = {
        name: addFoodFormGroup.foodName,
        description: addFoodFormGroup.foodDescription,
        price: +addFoodFormGroup.foodPrice,
        imageUrl: addFoodFormGroup.foodImageUrl,
        videoUrl: addFoodFormGroup.foodVideoUrl,
        primary_id: +addFoodFormGroup.foodPrimaryCategory,
        sub_id: +addFoodFormGroup.foodSubCategory,
      }

      return requestModel;

    }
  }

  addFood() {
    this.foodsService.addFood(this.createRequestModel())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {

        },
        error: err => {

        }
      });
  }

  editFood() {
    this.foodsService.editFood(this.createRequestModel())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {

        },
        error: err => {

        }
      });
  }
}
