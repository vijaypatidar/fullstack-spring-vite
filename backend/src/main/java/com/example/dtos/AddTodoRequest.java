package com.example.dtos;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;

public record AddTodoRequest(
    @NotNull String title,
    @Nullable String description
) {
}
