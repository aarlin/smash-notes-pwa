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
    const uid = await this.authenticationService.getUid();
    return new Promise<any>((resolve, reject) => {
      let newNoteRef = this.firestore.collection("notes").doc();
      let id = newNoteRef.ref.id;
      let timestamp = new Date();

      newNoteRef
        .set({ ...note, uid, id, timestamp })
        .then(ref => {
          console.log(ref);
        }, error => {
          console.log(error);
        })
    });
  }

  async getNotesByUser(searchLimit: number, startKey?: any) {
    const uid = await this.authenticationService.getUid();
    if (startKey) {
      return this.firestore.collection("notes").ref
        .where('uid', '==', uid)
        .orderBy('timestamp', 'desc')
        .startAfter(startKey)
        .limit(searchLimit)
        .get();
    } else {
      return this.firestore.collection("notes").ref
        .where('uid', '==', uid)
        .orderBy('timestamp', 'desc')
        .limit(searchLimit)
        .get();
    }
  }

  async getNotesByFighter(fighter: any) {
    const uid = await this.authenticationService.getUid();

    return this.firestore.collection("notes").ref
      .where('uid', '==', uid)
      .where('player', '==', fighter)
      .get();
  }

  async getNotesByOthers(last?: any) {
    const uid = await this.authenticationService.getUid();
    if (last) {
      return this.firestore.collection("notes").ref
        .where('uid', '!=', uid)
        .where('visible', '==', true)
        .orderBy('uid', 'desc')
        .orderBy('timestamp', 'desc')
        .startAfter(last)
        .limit(15)
        .get();
    } else {
      return this.firestore.collection("notes").ref
        .where('uid', '!=', uid)
        .where('visible', '==', true)
        .orderBy('uid', 'desc')
        .orderBy('timestamp', 'desc')
        .limit(15)
        .get();
    }

  }

  updateNote(note: any) {
    const timestamp = new Date();
    return this.firestore
      .collection("notes")
      .doc(note.id)
      .set({ ...note, timestamp }, { merge: true });
  }

  deleteNote(note: any) {
    return this.firestore
      .collection("notes")
      .doc(note.id)
      .delete();
  }
}
