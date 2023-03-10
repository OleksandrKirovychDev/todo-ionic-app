import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  NgModule,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ITodo } from '../../shared/interfaces/todo.interface';

@Component({
  selector: 'app-todo-form',
  styles: [
    `
      ion-card-title {
        padding-left: 20px;
      }

      ion-card-content {
        padding-top: 0;
      }
    `,
  ],
  template: `
    <form [formGroup]="todoForm" (ngSubmit)="onSubmit()">
      <ion-card-content>
        <ion-input
          type="text"
          formControlName="title"
          placeholder="title..."
        ></ion-input>
      </ion-card-content>
      <ion-card-content>
        <ion-input
          type="text"
          formControlName="description"
          placeholder="description..."
        ></ion-input>
        <ion-button expand="full" type="submit" [disabled]="todoForm.invalid"
          >Save Todo</ion-button
        >
      </ion-card-content>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {
  @Output() todoSubmitted = new EventEmitter<ITodo>();

  public todoForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
  });

  constructor(private fb: FormBuilder) {}

  public onSubmit() {
    const value = this.todoForm.value;

    if (this.todoForm.valid && value.title && value.description) {
      this.todoSubmitted.emit({
        title: value.title,
        description: value.description,
        id: Date.now().toString(),
      });
    }
  }
}

@NgModule({
  declarations: [TodoFormComponent],
  exports: [TodoFormComponent],
  imports: [IonicModule, ReactiveFormsModule],
})
export class TodoFormComponentModule {}
