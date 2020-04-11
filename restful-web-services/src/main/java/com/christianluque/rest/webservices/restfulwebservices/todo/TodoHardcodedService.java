package com.christianluque.rest.webservices.restfulwebservices.todo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TodoHardcodedService {

    private static List<Todo> todos = new ArrayList<>();
    private static Long intCounter = 0L;

    static {
        todos.add(new Todo(++intCounter, "christian", "Learn react", new  Date(), false));
        todos.add(new Todo(++intCounter, "christian", "Learn microservices", new  Date(), false));
        todos.add(new Todo(++intCounter, "christian", "Learn redux", new  Date(), false));
    }

    public List<Todo> findAll() {
        return todos;
    }

    public Todo save(Todo todo) {
        if(todo.getId()==-1 || todo.getId()==0) {
            todo.setId(++intCounter);
            todos.add(todo);
        } else {
            deleteById(todo.getId());
            todos.add(todo);              
        }
        return todo;
    }

    public Todo deleteById(Long id) {
        Todo todo =  findById(id);
        if(todos.remove(todo)) {
            return todo;
        }
        return null;
    }

    public Todo findById(Long id) {
        for(Todo todo:todos) {
            if(todo.getId()==id){
                return todo;
            }
        }
        return null;
    }
}
