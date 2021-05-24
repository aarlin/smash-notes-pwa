import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Note } from '../shared/interface/note.interface';
import { AuthenicationService } from './authentication-service';


@Injectable()
export class NoteService {

  constructor(private http: HttpClient, private firestore: AngularFirestore, private authenticationService: AuthenicationService) { }

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
    const id = this.firestore.createId();
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("notes")
        .add({ id, uid, ...note })
        .then(res => console.log(res), err => reject(err));
    });
  }

  async getNotesByUser() {
    let uid = await this.authenticationService.getUid();

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
    return this.firestore
      .collection("notes")
      .doc(note.id)
      .set({ completed: true }, { merge: true });
  }

  deleteNote(note: any) {
    return this.firestore
      .collection("notes")
      .doc(note.id)
      .delete();
  }
}
