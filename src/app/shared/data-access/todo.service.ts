import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ITodo } from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _todos$ = new BehaviorSubject<ITodo[]>([]);

  public get todos$() {
    return this._todos$.asObservable();
  }

  public addTodo(todo: ITodo) {
    const newTodos = [...this._todos$.value, todo];
    this._todos$.next(newTodos);
  }

  public getTodoById(id: string) {
    return this.todos$.pipe(
      map((todos) => todos.find((todo) => todo.id === id))
    );
  }
}
