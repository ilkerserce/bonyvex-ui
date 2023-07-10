import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from "rxjs";
import { ToastrHandleService } from 'src/app/services/toastr-handle.service'
import { AddFoodRequestModel, EditFoodRequestModel } from 'src/app/models/add-food-request.model';
import { FoodsService } from 'src/app/services/foods.service';
import { AuthorizationModel } from 'src/app/models/login.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss']
})
export class AddFoodComponent {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  @Input('currentUserAuthorizations') currentUserAuthorizations: AuthorizationModel = new AuthorizationModel();
  @Input('id') id: any = null;

  primaryCategoryList: any;
  subCategoryList: any;

  nextButtonText = '';
  subheaderTitle = '';
  subheaderText = '';

  addFoodFormGroup: FormGroup;
  foodId!: number;
  data: any;

  constructor(private fb: FormBuilder,
    private foodsService: FoodsService,
    private categoriesService: CategoriesService,
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
      foodPrice: [null, Validators.required],
      foodImageUrl: [''],
      foodVideoUrl: [''],
      foodPrimaryCategory: [null, Validators.required],
      foodSubCategory: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.route.params.subscribe(params => {
      this.foodId = +params['id']; // foodId parametresini alıp number tipine dönüştürüyoruz
      if (this.foodId) {
        this.nextButtonText = 'Güncelle';
        this.subheaderTitle = 'Yemek Bilgileri Düzenleme';
        this.subheaderText = 'Burada daha önce girilmiş olan yemeğin düzenleme işlemi yapılmaktadır. Lütfen gerekli alanları eksiksiz bir şekilde doldurun.';
        this.getFoodForm();
      } else {
        this.nextButtonText = 'Oluştur';
        this.subheaderTitle = 'Yeni Yemek Ekle';
        this.subheaderText = 'Yemek menüsüne yemek eklemek için aşağıdaki gerekli alanları doldurmanız gerekmektedir.';
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

  private populateLists(data: any) {
    this.primaryCategoryList = data.primaryCategories;
    this.subCategoryList = data.secondaryCategories;
  }

  getCategories() {
    this.categoriesService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          this.populateLists(res);
        },
        error: err => {

        }
      })
  }

  getFoodForm() {
    this.foodsService.getFoodForm(this.foodId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          this.populateForm(res);
        },
        error: err => {

        }
      })
  }

  createAddRequestModel() {
    const addFoodFormGroup = this.addFoodFormGroup.getRawValue();
    const requestModel: AddFoodRequestModel = {
      nameTR: addFoodFormGroup.foodNameTR,
      nameENG: addFoodFormGroup.foodNameENG,
      nameARB: addFoodFormGroup.foodNameARB,
      descriptionTR: addFoodFormGroup.foodDescriptionTR,
      descriptionENG: addFoodFormGroup.foodDescriptionENG,
      descriptionARB: addFoodFormGroup.foodDescriptionARB,
      price: +addFoodFormGroup.foodPrice,
      imageUrl: addFoodFormGroup.foodImageUrl,
      videoUrl: addFoodFormGroup.foodVideoUrl,
      primaryCategory: +addFoodFormGroup.foodPrimaryCategory,
      subCategory: +addFoodFormGroup.foodSubCategory,
    };

    return requestModel;
  }

  createEditRequestModel() {
    const addFoodFormGroup = this.addFoodFormGroup.getRawValue();

    const requestModel: EditFoodRequestModel = {
      id: this.foodId,
      nameTR: addFoodFormGroup.foodNameTR,
      nameENG: addFoodFormGroup.foodNameENG,
      nameARB: addFoodFormGroup.foodNameARB,
      descriptionTR: addFoodFormGroup.foodDescriptionTR,
      descriptionENG: addFoodFormGroup.foodDescriptionENG,
      descriptionARB: addFoodFormGroup.foodDescriptionARB,
      price: +addFoodFormGroup.foodPrice,
      imageUrl: addFoodFormGroup.foodImageUrl,
      videoUrl: addFoodFormGroup.foodVideoUrl,
      primaryCategory: addFoodFormGroup.foodPrimaryCategory,
      subCategory: addFoodFormGroup.foodSubCategory,
    };
    return requestModel;
  }

  addFood() {
    this.foodsService.addFood(this.createAddRequestModel())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          this.toastrHandleService.success("Belirtilen yemek eklendi.")
        },
        error: err => {
          this.toastrHandleService.error(err.message)
        }
      });
  }

  editFood() {
    this.foodsService.editFood(this.foodId, this.createEditRequestModel())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          this.toastrHandleService.success("Belirtilen yemek güncellendi.")
          this.router.navigate(['/foods']);
        },
        error: err => {
          this.toastrHandleService.error(err.message)
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
          this.toastrHandleService.error(err.message)
        }
      });
  }

  next() {
    if (this.foodId) {
      this.editFood()
    } else {
      this.addFood()
    }
    // this.router.navigate(['/foods']);
  }
}
