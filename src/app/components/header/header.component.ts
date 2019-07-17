import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  info: any;

  constructor(private tokenService: TokenStorageService) {}

  ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUsername(),
      authorities: this.tokenService.getAuthorities()
    };
  }

  isLoggedIn(): boolean {
    return this.tokenService.getToken() !== null;
  }
}
