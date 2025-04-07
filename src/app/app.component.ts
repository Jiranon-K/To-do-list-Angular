import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'TO-DO-LIST-ANGULARJS';

  // user input varible
  todoText: string = '';

  //storage Todo varible
  todos: Todo[] = [];

  ngOnInit(): void {
    // call Local Storage when load
    this.loadTodos();
  }

  // add todolist function
  addTodo(): void {
    if (this.todoText.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: this.todoText,
        completed: false,
      };

      // add to array
      this.todos.push(newTodo);

      // save to Local Storage
      this.saveTodos();

      // clear
      this.todoText = '';
    }
  }

  // delete
  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    //save
    this.saveTodos();
  }

  // func: status
  toggleComplete(id: number): void {
    // find and change to completed
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    // save
    this.saveTodos();
  }

  // save to Local Storage
  saveTodos(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }

  // load data form Local Storage
  loadTodos(): void {
    if (typeof window !== 'undefined') {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        this.todos = JSON.parse(storedTodos);
      }
    }
  }

  createRipple(event: MouseEvent): void {
    const button = event.currentTarget as HTMLElement;
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
}
