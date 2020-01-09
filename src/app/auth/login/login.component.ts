import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  cargando: boolean;
  suscription: Subscription;

  constructor( private authService: AuthService, private store: Store<AppState>) { }

  ngOnInit() {
    this.suscription = this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading);
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  Login(form: any) {
    this.authService.loginUser(form.email, form.password);
  }

}
