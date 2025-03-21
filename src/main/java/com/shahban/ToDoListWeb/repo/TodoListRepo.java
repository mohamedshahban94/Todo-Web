package com.shahban.ToDoListWeb.repo;

import com.shahban.ToDoListWeb.model.TodoList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoListRepo extends JpaRepository<TodoList, Integer> {

}
