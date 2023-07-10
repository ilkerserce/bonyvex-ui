import { Component, Input } from '@angular/core';
import { FaqsService } from 'src/app/services/faqs.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddFAQRequestModel, EditFAQRequestModel } from 'src/app/models/faqs.model';

@Component({
  selector: 'app-faq-add-update',
  templateUrl: './faq-add-update.component.html',
  styleUrls: ['./faq-add-update.component.scss']
})
export class FaqAddUpdateComponent {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  faqId!: number;
  nextButtonText = '';
  subheaderTitle = '';
  subheaderText = '';

  addFAQFormGroup: FormGroup;

  constructor(private faqsService: FaqsService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastrService: ToastrService) {
    this.addFAQFormGroup = this.fb.group({
      questionTR: ['', Validators.required],
      questionENG: ['', Validators.required],
      questionARB: ['', Validators.required],
      answerTR: ['', Validators.required],
      answerENG: ['', Validators.required],
      answerARB: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.faqId = +params['id']; // foodId parametresini alıp number tipine dönüştürüyoruz
      if (this.faqId) {
        this.nextButtonText = 'Güncelle';
        this.subheaderTitle = 'Sıkça Sorulan Soru Düzenleme';
        this.subheaderText = 'Burada daha önce girilmiş olan soruyu düzenleme işlemi yapılmaktadır. Lütfen gerekli alanları eksiksiz bir şekilde doldurun.';
        this.getFAQForm();

      } else {
        this.nextButtonText = 'Oluştur';
        this.subheaderTitle = 'Sıkça Sorulan Soru Ekleme';
        this.subheaderText = 'Burada misafirlerimizin sıkça sorduğu soruları ekleme işlemi yapılmaktadır. ' +
          'Sıkça sorulan bir soruyu ve onun cevabını Türkçe, İngilizce ve Arapça olacak şekilde eklemelisiniz .' +
          'Sıkça sorulan sorular giriş ekranında kullancıya gözükmektedir.';
      }
    })
  }

  get f() {
    return this.addFAQFormGroup.controls;
  }

  private populateForm(data: any) {
    this.addFAQFormGroup.patchValue({
      questionTR: data.questionTR,
      questionENG: data.questionENG,
      questionARB: data.questionARB,
      answerTR: data.answerTR,
      answerENG: data.answerENG,
      answerARB: data.answerARB,
    })
  }

  getFAQForm() {
    this.faqsService.getFAQForm(this.faqId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          console.log(res);
          this.populateForm(res);
        },
        error: err => {

        }
      })
  }

  createAddFAQRequestModel() {
    const addFAQFormGroup = this.addFAQFormGroup.getRawValue();
    const requestModel: AddFAQRequestModel = {
      questionTR: addFAQFormGroup.questionTR,
      questionENG: addFAQFormGroup.questionENG,
      questionARB: addFAQFormGroup.questionARB,
      answerTR: addFAQFormGroup.answerTR,
      answerENG: addFAQFormGroup.answerENG,
      answerARB: addFAQFormGroup.answerARB,
    };

    return requestModel;
  }

  addFAQ() {
    this.faqsService.addFAQ(this.createAddFAQRequestModel())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          this.toastrService.success("Soru başarıyla eklendi.");
          this.router.navigate(['/faqs']);
        },
        error: err => {
          this.toastrService.error(err.message);
        }
      })
  }

  createEditFAQRequestModel() {
    const addFAQFormGroup = this.addFAQFormGroup.getRawValue();
    const requestModel: EditFAQRequestModel = {
      questionTR: addFAQFormGroup.questionTR,
      questionENG: addFAQFormGroup.questionENG,
      questionARB: addFAQFormGroup.questionARB,
      answerTR: addFAQFormGroup.answerTR,
      answerENG: addFAQFormGroup.answerENG,
      answerARB: addFAQFormGroup.answerARB,
      faqId: this.faqId,
    };

    return requestModel;
  }

  editFAQ() {
    this.faqsService.editFAQ(this.createEditFAQRequestModel())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          this.toastrService.success("Soru başarıyla düzenlendi.");
          this.router.navigate(['/faqs']);
        },
        error: err => {
          this.toastrService.error(err.message);
        }
      })
  }

  nextButton() {
    if (this.faqId) {
      this.editFAQ();
    } else {
      this.addFAQ();
    }
  }
}
