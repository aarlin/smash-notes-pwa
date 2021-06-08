import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Note } from '../shared/interface/note.interface';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class NoteService {

  constructor(private http: HttpClient,
    private firestore: AngularFirestore,
    private authenticationService: AuthenticationService) { }

  load(): Observable<Note[]> {
    return this.http
      .get<Note[]>('assets/data/notes.json')
      .pipe(
        delay(1500),
      );
  }

  async createNote(note: any) {
    console.log('create', note);

    const uid = await this.authenticationService.getUid();
    return new Promise<any>((resolve, reject) => {
      let newNoteRef = this.firestore.collection("notes").doc();
      let id = newNoteRef.ref.id

      newNoteRef
        .set({ ...note, uid, id })
        .then(ref => {
          console.log(ref);
        }, error => {
          console.log(error);
        })

      // this.firestore
      //   .collection("notes")
      //   .add({ uid, ...note })
      //   .then(ref => {
      //     console.log(res)
      //   }, err => {
      //     reject(err)
      //   });
    });
  }

  async getNotesByUser() {
    let uid = await this.authenticationService.getUid();
    console.log(uid);

    return this.firestore.collection("notes").ref
      .where('uid', '==', uid)
      .get();
  }

  async getNotesByFighter(fighter: any) {
    let uid = await this.authenticationService.getUid();

    return this.firestore.collection("notes").ref
      .where('uid', '==', uid)
      .where('player', '==', fighter)
      .get();
  }

  async getNotesByOthers() {
    let uid = await this.authenticationService.getUid();
    console.log('uid', uid)

    return this.firestore.collection("notes").ref
      .where('uid', '!=', uid)
      .where('visible', '==', true)
      .get();
  }

  updateNote(note: any) {
    console.log('update', note);
    console.log(this.firestore
      .collection("notes")
      .doc(note.id))
    return this.firestore
      .collection("notes")
      .doc(note.id)
      .set({ ...note }, { merge: true });
  }

  deleteNote(note: any) {
    console.log(note.id)
    return this.firestore
      .collection("notes")
      .doc(note.id)
      .delete();
  }
}
