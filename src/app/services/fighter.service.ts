import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

const TOTAL_PAGES = 4;

enum Game {
  First = 'ssb64',
  Second = 'ssbm',
  Third = 'sssb',
  Fourth = 'ssb4',
  Fifth = 'ssbu',
}

export class Character {
  name: string;
  appearsIn: Game[];
}

@Injectable()
export class FighterService {

  constructor(private http: HttpClient) {}

  load(page: number, pageSize: number): Observable<Character[]> {
    const startIndex = ((page - 1) % TOTAL_PAGES) * pageSize;

    if (page < TOTAL_PAGES + 1) {
      return this.http
      .get<Character[]>('assets/data/fighters.json')
      .pipe(
        map(character => character.splice(startIndex, pageSize)),
        delay(1500),
      );
    }
  }
}
