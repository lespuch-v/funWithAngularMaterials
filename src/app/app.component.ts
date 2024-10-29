import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { loadTranslations } from '@angular-devkit/build-angular/src/utils/i18n-webpack';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatCardModule, CdkDropList, CdkDrag, MatFormField, MatInput, MatButton, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'toDoApp';

  todoItems = ['get up', 'have dinner'];
  doneItems = ['eat a beagle'];
  userTodo!: string;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  deleteItem(todo: string, section: string): void {
    if( section === 'itemTodo') {
      this.todoItems = this.todoItems.filter(item => item !== todo)
    }else if (section === 'done'){
      this.doneItems = this.doneItems.filter(items => items !== todo)
    }
    console.log(this.todoItems)
  }

  addTodo() {
    this.todoItems.push(this.userTodo);
    this.userTodo = '';
  }
}
