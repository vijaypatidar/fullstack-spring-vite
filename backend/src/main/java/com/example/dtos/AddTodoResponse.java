package com.example.dtos;

import jakarta.validation.constraints.NotNull;

public record AddTodoResponse(
    @NotNull Long id
) {
}
