import { Component } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FaqsService } from 'src/app/services/faqs.service';
import { ToastrHandleService } from 'src/app/services/toastr-handle.service';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  currentLanguage$: Observable<string>;

  faqs: any;

  constructor(
    private faqService: FaqsService,
    private toastrHandleService: ToastrHandleService,
    private router: Router,
    private faqsService: FaqsService,
    private languageService: LanguageService
  ) {
    this.currentLanguage$ = this.languageService.getLanguage();
  }

  ngOnInit(): void {
    this.getFaqs();
  }

  getFaqs() {
    this.faqService.getFAQs()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          this.faqs = res;
        },
        error: err => {
          this.toastrHandleService.error(err.message);
        }
      });
  }

  editFAQ(faqId: number) {
    this.router.navigate(['faqs/edit', faqId]);
  }

  deleteFAQ(faqId: number) {
    this.faqsService.deleteFAQ(faqId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          this.toastrHandleService.success("Belirtilen soru silindi.");
          this.getFaqs();
        },
        error: err => {
          this.toastrHandleService.error(err.message)
        }
      });
  }
}
