import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Observable, switchMap } from 'rxjs';
import { TodoService } from '../shared/data-access/todo.service';
import { ITodo } from '../shared/interfaces/todo.interface';

@Component({
  selector: 'app-detail',
  template: `
    <ng-container *ngIf="todo$ | async as todo">
      <ion-header>
        <ion-toolbar>
          <ion-title>{{ todo.title }}</ion-title>
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/home"></ion-back-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <h2>{{ todo.title }}</h2>
        <p>{{ todo.description }}</p>
      </ion-content>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent {
  public todo$: Observable<ITodo | undefined> = this.route.params.pipe(
    switchMap((params) => this.todoService.getTodoById(params['id']))
  );

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService
  ) {}
}

@NgModule({
  declarations: [DetailComponent],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DetailComponent,
      },
    ]),
  ],
})
export class DetailComponentModule {}
