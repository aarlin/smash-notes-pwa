import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Note } from '../shared/interface/note';


@Injectable()
export class NoteService {

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

  load(): Observable<Note[]> {
    return this.http
      .get<Note[]>('assets/data/notes.json')
      .pipe(
        delay(1500),
      );
  }

  createNote(note: any) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("notes")
        .add(note)
        .then(res => { }, err => reject(err));
    });
  }

  getNotes() {
    return this.firestore.collection("notes").snapshotChanges();
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
