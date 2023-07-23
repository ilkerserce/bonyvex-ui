import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Serçe Restaurant';

  expandMenu(expanded: boolean): void {
    const navigation = document.querySelector('.navigation');
    if (navigation) {
      if (expanded) {
        navigation.classList.add('expanded');
      } else {
        navigation.classList.remove('expanded');
      }
    }
  }
}
