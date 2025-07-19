package com.example.dtos;

import jakarta.annotation.Nullable;

public record UpdateTodoRequest(@Nullable String title, @Nullable String description) {
}
