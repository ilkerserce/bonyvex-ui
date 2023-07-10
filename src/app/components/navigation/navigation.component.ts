import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  isMenuExpanded: boolean = false; // Menü genişletme durumunu takip eden bir değişken

  constructor(private userService: UserService) { }

  // Bağlantı tıklama işlemini işleyen işlev
  handleLinkClick(event: Event) {
    if (!this.isMenuExpanded) {
      event.preventDefault();
    }
    this.toggleMenu();
  }

  toggleMenu() {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

  closeMenu(): void {
    const checkbox = document.querySelector('.navigation__checkbox') as HTMLInputElement;
    if (checkbox && checkbox.checked) {
      checkbox.checked = false;
    }
  }

  logout() {
    this.userService.logout();
  }
}
