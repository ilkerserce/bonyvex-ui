import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from "rxjs";
import { ToastrHandleService } from 'src/app/services/toastr-handle.service'
import { AddFoodRequestModel, EditFoodRequestModel } from 'src/app/models/addFoodRequestModel';
import { FoodsService } from 'src/app/services/foods.service';
import { AuthorizationModel } from 'src/app/models/login.model';
import { DropdownListModel } from 'src/app/models/dropdown-list.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
  foodId!: number;
  data: any;

  constructor(private fb: FormBuilder,
    private foodsService: FoodsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrHandleService: ToastrHandleService) {
    this.addFoodFormGroup = this.fb.group({
      foodNameTR: ['', Validators.required],
      foodNameENG: ['', Validators.required],
      foodNameARB: ['', Validators.required],
      foodDescriptionTR: ['', Validators.required],
      foodDescriptionENG: ['', Validators.required],
      foodDescriptionARB: ['', Validators.required],
      foodPrice: ['', Validators.required],
      foodImageUrl: [''],
      foodVideoUrl: [''],
      foodPrimaryCategory: ['', Validators.required],
      foodSubCategory: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.foodId = +params['id']; // foodId parametresini alıp number tipine dönüştürüyoruz
      if (this.foodId) {
        this.nextButtonText = 'Güncelle';
        this.getFoodForm();
        this.populateForm(this.data);
      } else {
        this.nextButtonText = 'Oluştur';
      }
    })
  }

  get f() {
    return this.addFoodFormGroup.controls;
  }

  clearForm() {
    this.addFoodFormGroup.patchValue({
      foodNameTR: '',
      foodNameENG: '',
      foodNameARB: '',
      foodDescriptionTR: '',
      foodDescriptionENG: '',
      foodDescriptioARB: '',
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

  getFoodForm() {
    this.foodsService.getFoodForm(this.foodId).pipe(takeUntil(this.destroy$)).subscribe({
      next: res => {
        console.log(res)
        this.populateForm(res)
      },
      error: err => {

      }
    })
  }

  private populateForm(data: any) {
    this.addFoodFormGroup.patchValue({
      foodNameTR: data.nameTR,
      foodNameENG: data.nameENG,
      foodNameARB: data.nameARB,
      foodDescriptionTR: data.descriptionTR,
      foodDescriptionENG: data.descriptionENG,
      foodDescriptionARB: data.descriptionARB,
      foodPrice: data.price,
      foodImageUrl: data.imageUrl,
      foodVideoUrl: data.videoUrl,
      foodPrimaryCategory: data.primaryCategory,
      foodSubCategory: data.subCategory,
    })
  }

  createRequestModel() {
    if (this.foodId) {
      let addFoodFormGroup = this.addFoodFormGroup.getRawValue();
      let requestModel: EditFoodRequestModel = {
        id: this.id,
        nameTR: addFoodFormGroup.foodNameTR,
        nameENG: addFoodFormGroup.foodNameENG,
        nameARB: addFoodFormGroup.foodNameARB,
        descriptionTR: addFoodFormGroup.foodDescriptionTR,
        descriptionENG: addFoodFormGroup.foodDescriptionENG,
        descriptionARB: addFoodFormGroup.foodDescriptionARB,
        price: +addFoodFormGroup.foodPrice,
        imageUrl: addFoodFormGroup.foodImageUrl,
        videoUrl: addFoodFormGroup.foodVideoUrl,
        primaryCategory: 1,
        subCategory: 1,
      }

      return requestModel;

    } else {
      let addFoodFormGroup = this.addFoodFormGroup.getRawValue();
      let requestModel: AddFoodRequestModel = {
        nameTR: addFoodFormGroup.foodNameTR,
        nameENG: addFoodFormGroup.foodNameENG,
        nameARB: addFoodFormGroup.foodNameARB,
        descriptionTR: addFoodFormGroup.foodDescriptionTR,
        descriptionENG: addFoodFormGroup.foodDescriptionENG,
        descriptionARB: addFoodFormGroup.foodDescriptionARB,
        price: +addFoodFormGroup.foodPrice,
        imageUrl: addFoodFormGroup.foodImageUrl,
        videoUrl: addFoodFormGroup.foodVideoUrl,
        primaryCategory: 1,
        subCategory: 1,
      }

      return requestModel;

    }
  }

  addFood() {
    this.foodsService.addFood(this.createRequestModel())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          this.toastrHandleService.success("Belirtilen yemek eklendi.")
        },
        error: err => {
          this.toastrHandleService.error(err)
        }
      });
  }

  editFood() {
    this.foodsService.editFood(this.foodId, this.createRequestModel())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          this.toastrHandleService.success("Belirtilen yemek güncellendi.")
          this.router.navigate(['/foods']);
        },
        error: err => {
          this.toastrHandleService.error()
        }
      });
  }

  deleteFood() {
    this.foodsService.deleteFood(this.foodId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          this.toastrHandleService.success("Belirtilen yemek silindi.")
        },
        error: err => {
         this.toastrHandleService.error(err)
        }
      });
  }

  next() {
    if (this.foodId) {
      this.editFood()
    } else {
      this.addFood()
    }
  }
}
