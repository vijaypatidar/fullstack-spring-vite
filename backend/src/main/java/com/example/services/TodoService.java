package com.example.services;

import com.example.dtos.AddTodoRequest;
import com.example.dtos.AddTodoResponse;
import com.example.dtos.GetTodoResponse;
import com.example.dtos.UpdateTodoRequest;
import com.example.dtos.UpdateTodoResponse;
import com.example.entities.Todo;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.stereotype.Service;

@Service
public class TodoService {
  private final AtomicLong idGenerator = new AtomicLong(1);
  private final Map<Long, Todo> todosMap = new ConcurrentHashMap<>();

  public List<GetTodoResponse> findAll() {
    return todosMap.values().stream().map(this::toDto).toList();
  }

  public GetTodoResponse findById(Long id) {
    return toDto(todosMap.get(id));
  }

  public AddTodoResponse add(AddTodoRequest request) {
    long id = idGenerator.getAndIncrement();
    todosMap.put(id, new Todo(id, request.title(), request.description()));
    return new AddTodoResponse(id);
  }

  public boolean deleteById(Long id) {
    return todosMap.remove(id) != null;
  }

  public UpdateTodoResponse update(Long id, @Valid UpdateTodoRequest request) {
    Todo todo = todosMap.get(id);

    if (todo != null) {
      todo.setTitle(request.title());
      todo.setDescription(request.description());
      return new UpdateTodoResponse(true);
    }
    return null;
  }

  private GetTodoResponse toDto(Todo todo) {
    if (todo == null) {
      return null;
    }
    return new GetTodoResponse(todo.getId(), todo.getTitle(), todo.getDescription());
  }
}
