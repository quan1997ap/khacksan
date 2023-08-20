import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslationService } from './modules/i18n';
// language list
import { locale as enLang } from './modules/i18n/vocabs/en';
import { locale as viLang } from './modules/i18n/vocabs/vi';
import { Subject } from 'rxjs';
@Component({
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private destroy$ = new Subject();
  public loading = false;

  constructor(
    private translationService: TranslationService
  ) {
    // register translations
    this.translationService.loadTranslations(
      viLang,
      enLang
    );
  }

  ngOnInit() { }


  ngOnDestroy(): void {
    this.destroy$.next(null);  // trigger the unsubscribe
    this.destroy$.complete(); // finalize & clean up the subject stream
  }


}
