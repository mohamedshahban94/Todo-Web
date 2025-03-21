package com.shahban.ToDoListWeb.controller;

import com.shahban.ToDoListWeb.model.TodoList;
import com.shahban.ToDoListWeb.service.TodoListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoListController {

    @Autowired
    private TodoListService todoListService;

    @GetMapping({"/","/home"})
    public ResponseEntity<List<TodoList>> getAllTasks(){
        List<TodoList> tasks = todoListService.getAllTasks();
        return new ResponseEntity<>(tasks,HttpStatus.OK);
    }

    @PostMapping("/addTask")
    public ResponseEntity<TodoList> addTask(@RequestBody TodoList task){
        TodoList savedtask = todoListService.addTask(task);
        return ResponseEntity.status(201).body(savedtask);
    }

    @PostMapping("/editTask/{id}")
    public ResponseEntity<TodoList> editTask(@PathVariable int id, @RequestBody TodoList updatedTask){

        TodoList task = todoListService.getToDoListById(id);
        if(task!= null){
            task.setTitle(updatedTask.getTitle());
            task.setDescription(updatedTask.getDescription());
            task.setCompleted(updatedTask.getCompleted());
            TodoList savedTask = todoListService.updateTask(task);
            return new ResponseEntity<>(savedTask,HttpStatus.OK);

        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping("/updateStatus/{id}")
    public ResponseEntity<TodoList> updateTaskStatus(@PathVariable int id) {
        TodoList task = todoListService.getToDoListById(id);
        if (task != null) {
            // Toggle the completed status
            task.setCompleted(!task.getCompleted());
            TodoList updatedTask = todoListService.updateTask(task);
            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/dropTask/{id}")
    public ResponseEntity<String> dropTask(@PathVariable int id){
        TodoList deleteList = todoListService.getToDoListById(id);
        if(deleteList != null) {
            todoListService.dropTask(id);
            return new ResponseEntity<>("Deleted", HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Not Found",HttpStatus.NOT_FOUND);
    }

}
