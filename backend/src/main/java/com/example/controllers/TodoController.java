package com.example.controllers;

import com.example.dtos.AddTodoRequest;
import com.example.dtos.AddTodoResponse;
import com.example.dtos.GetTodoResponse;
import com.example.dtos.UpdateTodoRequest;
import com.example.dtos.UpdateTodoResponse;
import com.example.services.TodoService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/todos")
public class TodoController {


  private final TodoService todoService;

  public TodoController(TodoService todoService) {
    this.todoService = todoService;
  }

  @GetMapping
  public List<GetTodoResponse> getAllTodos() {
    return todoService.findAll();
  }

  @GetMapping("/{id}")
  public ResponseEntity<GetTodoResponse> getTodoById(@PathVariable Long id) {
    GetTodoResponse todo = todoService.findById(id);
    if (todo == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(todo);
  }

  @PostMapping
  public ResponseEntity<AddTodoResponse> addTodo(@Valid @RequestBody AddTodoRequest request) {
    AddTodoResponse response = todoService.add(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @PutMapping("/{id}")
  public ResponseEntity<UpdateTodoResponse> updateTodo(@PathVariable Long id,
                                                       @Valid @RequestBody
                                                       UpdateTodoRequest request) {
    UpdateTodoResponse response = todoService.update(id, request);
    if (response == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
    if (todoService.deleteById(id)) {
      return ResponseEntity.ok().build();
    }
    return ResponseEntity.notFound().build();
  }

}
