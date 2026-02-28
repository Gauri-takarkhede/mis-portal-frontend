import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Elective {
  id: string;
  moduleName: string;
  registrationDeadline: string;
  subjects: any[];
}

@Injectable({
  providedIn: 'root',
})
export class ElectivesService {
  private electivesSubject = new BehaviorSubject<Elective[]>([]);
  electives$ = this.electivesSubject.asObservable();

  // Optional getter (clean access)
  get currentElectives(): Elective[] {
    return this.electivesSubject.value;
  }

  setElectives(data: Elective[]) {
    this.electivesSubject.next(data);
  }

  addElective(newElective: Elective) {
    this.electivesSubject.next([...this.currentElectives, newElective]);
  }

  removeElective(id: string) {
    this.electivesSubject.next(
      this.currentElectives.filter((e) => e.id !== id),
    );
  }

  updateElective(updated: Elective) {
    this.electivesSubject.next(
      this.currentElectives.map((e) => (e.id === updated.id ? updated : e)),
    );
  }
}
