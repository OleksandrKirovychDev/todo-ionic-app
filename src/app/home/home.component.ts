import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { TodoService } from '../shared/data-access/todo.service';
import { ITodo } from '../shared/interfaces/todo.interface';
import { TodoFormComponentModule } from './ui/todo-form.component';

@Component({
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Todo</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <app-todo-form (todoSubmitted)="createTodo($event)"></app-todo-form>

      <ion-list>
        <ion-item
          *ngFor="let todo of todos$ | async"
          button
          routerLink="/detail/{{ todo.id }}"
          routerDirection="forward"
        >
          <ion-label>{{ todo.title }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public todos$ = this.todoService.todos$;

  constructor(private todoService: TodoService) {}

  public createTodo(todo: ITodo) {
    this.todoService.addTodo(todo);
  }
}

@NgModule({
  declarations: [HomeComponent],
  imports: [
    IonicModule,
    CommonModule,
    TodoFormComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
})
export class HomeComponentModule {}
