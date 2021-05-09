import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

interface Note {
  id: number,
  groupName: string,
  player: string,
  enemy: string,
  title: string,
  body: string,
  enemyImage?: string
}

@Injectable()
export class NoteService {

  constructor(private http: HttpClient) { }

  load(): Observable<Note[]> {
    return this.http
      .get<Note[]>('assets/data/notes.json')
      .pipe(
        delay(1500),
      );
  }
}
