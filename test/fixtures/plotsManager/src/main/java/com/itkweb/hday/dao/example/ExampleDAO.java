package com.itkweb.hday.dao.example;

import java.util.List;

import com.itkweb.hday.model.database.example.manyToMany.Book;
import com.itkweb.hday.model.database.example.oneToMany.Mother;
import com.itkweb.hday.model.database.example.oneToOne.Person;

public interface ExampleDAO {

	public Mother getMotherById(Integer id);

	public Person getPersonByName(String firstname, String lastname);

	public List<Book> getBooksByAuthorId(Integer authorId);

	public Book persistBook(Book book);

	public void killMother(Integer motherId);

}
