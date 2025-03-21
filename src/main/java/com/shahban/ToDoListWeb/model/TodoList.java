package com.shahban.ToDoListWeb.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.stereotype.Service;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class TodoList {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int id ;
    private String title;
    private String description;

    private boolean completed;

    public boolean getCompleted() {
        return completed;
    }
}
