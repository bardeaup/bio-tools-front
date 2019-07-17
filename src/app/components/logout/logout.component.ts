import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor( 
    private tokenService: TokenStorageService,
    private router: Router) {
  }

  ngOnInit() {
    this.logout();
    this.router.navigate(['login']);
  }

  logout() {
    this.tokenService.signOut();
    window.location.reload();
  }

}
