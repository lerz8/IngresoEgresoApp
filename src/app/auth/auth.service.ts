import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private angularFireAtuh: AngularFireAuth, private router: Router, private afDb: AngularFirestore ) { }

  initAuthListener() {
    this.angularFireAtuh.authState.subscribe( (fireBaseUser: firebase.User) => {
    });
  }

  createUser(email: string , name: string, password: string) {
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
      })
      .catch(error => console.error(error));
    })
    .catch(error => Swal.fire('Error en el registro', error.message, 'error'));
  }

  loginUser(email: string, password: string) {
    this.angularFireAtuh.auth.signInWithEmailAndPassword(email, password)
    .then(response => {
      this.router.navigate(['/']);
    })
    .catch( error => Swal.fire('Error en la autenticación', error.message, 'error'));
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
