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
  subheaderTitle = '';
  subheaderText = '';

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
        this.subheaderTitle = 'İkincil Kategori Düzenleme';
        this.subheaderText = 'Burada daha önce girilmiş olan kategoriyi düzenleme işlemi yapılmaktadır. Lütfen gerekli alanları eksiksiz bir şekilde doldurun.';
        this.getSubCategoryForm();
      } else {
        this.nextButtonText = 'Oluştur';
        this.subheaderTitle = 'Yeni İkincil Kategori Ekle';
        this.subheaderText = 'İkincil kategorileri oluşturmak' +
          'için aşağıdaki alanları doldurmanız gerekmektedir.';
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
          this.toastrHandleService.error(err.message);
        }
      })
  }

  getSubCategoryForm() {
    this.categoriesService.getSubCategoryForm(this.categoryId).pipe(takeUntil(this.destroy$)).subscribe({
      next: res => {
        this.populateForm(res);

      },
      error: err => {
        this.toastrHandleService.error(err.message);
      }
    })
  }

  createAddRequestModel() {
    const addCategoryFormGroup = this.addCategoryFormGroup.getRawValue();

    const requestModel: AddSubCategoryRequestModel = {
      nameTR: addCategoryFormGroup.newCategoryNameTR,
      nameENG: addCategoryFormGroup.newCategoryNameENG,
      nameARB: addCategoryFormGroup.newCategoryNameARB,
      parent_id: +addCategoryFormGroup.targetCategory
    }
    return requestModel;
  }

  createEditRequestModel() {
    const addCategoryFormGroup = this.addCategoryFormGroup.getRawValue();
    const requestModel: EditSubCategoryRequestModel = {
      id: this.categoryId,
      nameTR: addCategoryFormGroup.newCategoryNameTR,
      nameENG: addCategoryFormGroup.newCategoryNameENG,
      nameARB: addCategoryFormGroup.newCategoryNameARB,
      parent_id: +addCategoryFormGroup.targetCategory
    }
    return requestModel;
  }

  addSubCategory() {
    this.categoriesService.addSubCategory(this.createAddRequestModel())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          this.toastrHandleService.success("İkincil kategori eklendi.");
          this.router.navigate(['/categories']);
        },
        error: err => {
          this.toastrHandleService.error(err.message);
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
          this.toastrHandleService.error(err.message);
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
