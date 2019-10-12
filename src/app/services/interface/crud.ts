import {Observable} from 'rxjs';

export interface Crud<T> {
  save(element: T): Observable<T>;

  find(id: number): Observable<T>;

  findAll(): Observable<T[]>;

  update(element: T);

  delete(id: number);
}
