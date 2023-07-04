import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  isMenuExpanded: boolean = false; // Menü genişletme durumunu takip eden bir değişken

  // Bağlantı tıklama işlemini işleyen işlev
  handleLinkClick(event: Event) {
    if (!this.isMenuExpanded) {
      event.preventDefault(); // Bağlantının varsayılan davranışını engelle
      // Bağlantıya tıklandığında yapılması gereken işlemleri burada gerçekleştir
      // Örneğin: Router ile yönlendirme yapabilirsiniz
    }
    // Menüyü kapatma işlemini gerçekleştir
    this.toggleMenu();
  }

  // Menüyü genişletme/daraltma işlemini gerçekleştiren işlev
  toggleMenu() {
    this.isMenuExpanded = !this.isMenuExpanded;
  }
}
