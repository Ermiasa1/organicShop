import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private auth: AuthService, router: Router) {
    // retriving the stored url and redirecting to the url
    auth.user$.subscribe(user => {
      if (user) {
        userService.save(user);  // the user may change the name in google so we hava updated name

        let returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    });

  }
}
// we can unsubscribe but it doesnt really matter as doesn't have impact here.