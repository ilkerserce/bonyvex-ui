import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AddPrimaryCategoryRequestModel, EditPrimaryCategoryRequestModel, AddSubCategoryRequestModel, EditSubCategoryRequestModel } from 'src/app/models/category-request.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ToastrHandleService } from 'src/app/services/toastr-handle.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DropdownListModel } from 'src/app/models/dropdown-list.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  primaryCategoryList: any;

  @Input('id') id: any = null;

  nextButtonText = '';

  isSubCategory: boolean = true;
  addCategoryFormGroup: FormGroup;
  categoryId!: number;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrHandleService: ToastrHandleService
  ) {
    this.addCategoryFormGroup = this.fb.group({
      newCategoryNameTR: ['', Validators.required],
      newCategoryNameENG: ['', Validators.required],
      newCategoryNameARB: ['', Validators.required],
      targetCategory: null,
    });
  }

  ngOnInit(): void {
    this.getPrimaryCategories();
    this.route.params.subscribe(params => {
      this.categoryId = +params['id']; // foodId parametresini alıp number tipine dönüştürüyoruz
      if (this.categoryId) {
        this.nextButtonText = 'Güncelle';
        this.getSubCategoryForm();
      } else {
        this.nextButtonText = 'Oluştur';
      }
    })
  }

  subCategoryChanged() {
    this.isSubCategory = !this.isSubCategory;
  }

  get f() {
    return this.addCategoryFormGroup.controls;
  }

  clearForm() {
    this.addCategoryFormGroup.patchValue({
      newCategoryNameTR: '',
      newCategoryNameENG: '',
      newCategoryNameARB: '',
      targetCategory: null
    });
  }

  private populateForm(data: any) {
    this.addCategoryFormGroup.patchValue({
      newCategoryNameTR: data.nameTR,
      newCategoryNameENG: data.nameENG,
      newCategoryNameARB: data.nameARB,
      targetCategory: data.parent_id,
    })
  }

  private populateLists(data: any) {
    this.primaryCategoryList = data.categories;
  }

  getPrimaryCategories() {
    this.categoriesService.getPrimaryCategories().pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          this.populateLists(res);
        },
        error: err => {
          this.toastrHandleService.error(err);
        }
      })


  }

  getSubCategoryForm() {
    this.categoriesService.getSubCategoryForm(this.categoryId).pipe(takeUntil(this.destroy$)).subscribe({
      next: res => {
        this.populateForm(res);

      },
      error: err => {
        this.toastrHandleService.error(err);
      }
    })
  }

  createAddRequestModel() {
    const addCategoryFormGroup = this.addCategoryFormGroup.getRawValue();

    const requestModel: AddSubCategoryRequestModel = {
      nameTR: addCategoryFormGroup.newCategoryNameTR,
      nameENG: addCategoryFormGroup.newCategoryNameENG,
      nameARB: addCategoryFormGroup.newCategoryNameARB,
      parent_id: addCategoryFormGroup.targetCategory
    }
    return requestModel;

    // const addCategoryFormGroup = this.addCategoryFormGroup.getRawValue();
    // if (this.isSubCategory) {
    //   const requestModel: AddSubCategoryRequestModel = {
    //     nameTR: addCategoryFormGroup.newCategoryNameTR,
    //     nameENG: addCategoryFormGroup.newCategoryNameENG,
    //     nameARB: addCategoryFormGroup.newCategoryNameARB,
    //     parent_id: addCategoryFormGroup.targetCategory
    //   }
    //   return requestModel;
    // } else {
    //   const requestModel: AddPrimaryCategoryRequestModel = {
    //     nameTR: addCategoryFormGroup.newCategoryNameTR,
    //     nameENG: addCategoryFormGroup.newCategoryNameENG,
    //     nameARB: addCategoryFormGroup.newCategoryNameARB,
    //   }
    //   return requestModel;
    // }
  }


  createEditRequestModel() {
    const addCategoryFormGroup = this.addCategoryFormGroup.getRawValue();
    const requestModel: EditSubCategoryRequestModel = {
      id: this.categoryId,
      nameTR: addCategoryFormGroup.newCategoryNameTR,
      nameENG: addCategoryFormGroup.newCategoryNameENG,
      nameARB: addCategoryFormGroup.newCategoryNameARB,
      parent_id: addCategoryFormGroup.targetCategory
    }
    return requestModel;

    // if (this.isSubCategory) {
    //   const requestModel: EditSubCategoryRequestModel = {
    //     id: this.categoryId,
    //     nameTR: addCategoryFormGroup.newCategoryNameTR,
    //     nameENG: addCategoryFormGroup.newCategoryNameENG,
    //     nameARB: addCategoryFormGroup.newCategoryNameARB,
    //     parent_id: addCategoryFormGroup.targetCategory
    //   }
    //   return requestModel;
    // } else {
    //   const requestModel: EditPrimaryCategoryRequestModel = {
    //     id: this.categoryId,
    //     nameTR: addCategoryFormGroup.newCategoryNameTR,
    //     nameENG: addCategoryFormGroup.newCategoryNameENG,
    //     nameARB: addCategoryFormGroup.newCategoryNameARB,
    //   }
    //   return requestModel;
    // }
  }

  //PRIMARY OZELLIGI SUANLIK DEVRE DISI.

  // addPrimaryCategory() {
  //   this.categoriesService.addPrimaryCategory(this.createAddRequestModel())
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe({
  //       next: res => {
  //         this.toastrHandleService.success("Birincil kategori eklendi.");
  //       },
  //       error: err => {
  //         this.toastrHandleService.error(err);
  //       }
  //     });
  // }

  // editPrimaryCategory() {
  //   this.categoriesService.editPrimaryCategory(this.categoryId, this.createEditRequestModel())
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe({
  //       next: res => {
  //         this.toastrHandleService.success("Kategori güncellendi.");
  //       },
  //       error: err => {
  //         this.toastrHandleService.error(err);
  //       }
  //     });
  // }

  addSubCategory() {
    this.categoriesService.addSubCategory(this.createAddRequestModel())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          this.toastrHandleService.success("İkincil kategori eklendi.");
        },
        error: err => {
          this.toastrHandleService.error(err);
        }
      });
  }

  editSubCategory() {
    this.categoriesService.editSubCategory(this.categoryId, this.createEditRequestModel())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          this.toastrHandleService.success("Kategori güncellendi.");
          this.router.navigate(['/categories']);

        },
        error: err => {
          this.toastrHandleService.error(err.err);
        }
      });
  }

  addCategory() {
    if (this.categoryId) {
      this.editSubCategory();
    } else {
      this.addSubCategory();
    }
  }
}
