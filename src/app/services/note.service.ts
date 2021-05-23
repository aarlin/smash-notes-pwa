import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Note } from '../shared/interface/note';
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
    let uid = await this.authenticationService.getUid();

    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("notes")
        .add({ uid, ...note })
        .then(res => console.log(res), err => reject(err));
    });
  }

  async getNotes() {
    let uid = await this.authenticationService.getUid();

    return this.firestore.collection("notes").ref.where('uid', '==', uid).get();
  }

  updateNote(note: any) {
    return this.firestore
      .collection("notes")
      .doc(note.payload.doc.id)
      .set({ completed: true }, { merge: true });
  }

  deleteNote(note: any) {
    return this.firestore
      .collection("notes")
      .doc(note.payload.doc.id)
      .delete();
  }
}
