package com.shahban.ToDoListWeb.service;

import com.shahban.ToDoListWeb.model.TodoList;
import com.shahban.ToDoListWeb.repo.TodoListRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoListService {

    @Autowired
    private TodoListRepo todoListRepo;

    public TodoList getToDoListById(int id) {
        return todoListRepo.findById(id).get();
    }

    public TodoList addTask(TodoList task) {
        return todoListRepo.save(task);
    }

    public void dropTask(int id) {
        if(todoListRepo.existsById(id))
            todoListRepo.deleteById(id);
        else
            throw new EntityNotFoundException("Task with ID " + id + " not found");
    }

    public List<TodoList> getAllTasks() {
        return todoListRepo.findAll();
    }

    public TodoList updateTask(TodoList task) {
        return todoListRepo.save(task);
    }
}
