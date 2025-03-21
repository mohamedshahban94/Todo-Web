package com.shahban.ToDoListWeb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.SQLOutput;

@SpringBootApplication
public class ToDoListWebApplication {

	public static void main(String[] args) {
		SpringApplication.run(ToDoListWebApplication.class, args);
		System.out.println("ToDo List WebApp");
	}

}
