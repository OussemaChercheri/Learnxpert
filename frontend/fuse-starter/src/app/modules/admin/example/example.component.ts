import { UserService } from './../../../core/user/user.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'example',
    standalone: true,
    templateUrl: './example.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ExampleComponent implements OnInit {
    /**
     * Constructor
     */
    constructor(private userService: UserService, private router: Router) {}

    ngOnInit(): void {
        this.userService.user$.subscribe((user) => {
            console.log(user);
            if (user.role == 'ROLE_SUPER_ADMIN') {
                this.router.navigate(['/admins']);
            } else {
                this.router.navigate(['/courses']);
            }
        });
    }
}
