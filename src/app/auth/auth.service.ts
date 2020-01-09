import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();
  constructor(
    private angularFireAtuh: AngularFireAuth,
    private router: Router,
    private afDb: AngularFirestore,
    private store: Store<AppState>
    ) { }

  initAuthListener() {
    this.angularFireAtuh.authState.subscribe( (fireBaseUser: firebase.User) => {
      if (fireBaseUser) {
        this.userSubscription = this.afDb.doc(`${fireBaseUser.uid}/usuario`).valueChanges().subscribe( (ObjUsuario: any) => {
          const newUser = new User( ObjUsuario );
          this.store.dispatch( new SetUserAction (newUser));
        });
      } else {

        this.userSubscription.unsubscribe();
        // more code here
      }
    });
  }

  createUser(email: string , name: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());

    this.angularFireAtuh.auth.createUserWithEmailAndPassword(email, password)
    .then(resp => {

      const USER: User = {
        uId: resp.user.uid,
        nombre: name,
        email: resp.user.email
      };
      // guardando el objeto de usuario, devuelve una promesa
      this.afDb.doc(`${USER.uId}/usuario`).set( USER).then(() => {
        this.router.navigate(['/']); // ira al dashboard
        this.store.dispatch(new DesactivarLoadingAction());
      })
      .catch(error => {
        this.store.dispatch(new DesactivarLoadingAction());
        console.error(error);
      });
    })
    .catch(error => {
      Swal.fire('Error en el registro', error.message, 'error');
      this.store.dispatch(new DesactivarLoadingAction());
    });
  }

  loginUser(email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction());
    this.angularFireAtuh.auth.signInWithEmailAndPassword(email, password)
    .then(response => {
      this.router.navigate(['/']);
      this.store.dispatch(new DesactivarLoadingAction());
    })
    .catch( error => {
      Swal.fire('Error en la autenticación', error.message, 'error');
      this.store.dispatch(new DesactivarLoadingAction());
    });
  }

  logOut() {
    this.router.navigate(['/login']);
    this.angularFireAtuh.auth.signOut().then(response => {
    });
  }

  isLogged() {
    return this.angularFireAtuh.authState.pipe(map( fbUser => {
      if (!fbUser) {
        this.router.navigate(['/login']);
      }
      return fbUser != null;
    }
      ));
  }
}
