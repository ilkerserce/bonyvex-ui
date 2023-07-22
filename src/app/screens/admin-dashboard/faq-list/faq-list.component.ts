import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FaqsService } from 'src/app/services/faqs.service';
import { ToastrHandleService } from 'src/app/services/toastr-handle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.scss']
})
export class FaqListComponent {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  faqs: any;

  constructor(
    private faqService: FaqsService,
    private toastrHandleService: ToastrHandleService,
    private router: Router,
    private faqsService: FaqsService
  ) {

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
