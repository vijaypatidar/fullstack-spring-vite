package com.example.dtos;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;

public record GetTodoResponse(
    @NotNull Long id,
    @NotNull String title,
    @Nullable String description
) {
}
