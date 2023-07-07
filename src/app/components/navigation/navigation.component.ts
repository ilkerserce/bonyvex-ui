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

  logout() {
    this.userService.logout();
  }
}
