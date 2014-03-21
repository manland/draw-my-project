package com.itkweb.hday.dao.example;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.itkweb.hday.model.database.example.manyToMany.Author;
import com.itkweb.hday.model.database.example.manyToMany.Book;
import com.itkweb.hday.model.database.example.oneToMany.Mother;
import com.itkweb.hday.model.database.example.oneToOne.Person;
import com.itkweb.hday.util.AbstractDAOTestCase;

public class ExampleDAOTest extends AbstractDAOTestCase {

	@Override
	protected String getDataSetFilename() throws Exception {
		return "ExampleDAOTest.xml";
	}

	@Autowired
	private ExampleDAO exampleDAO;

	@Test
	public void getMotherById() {

		Integer motherId = 1;

		Mother mother = exampleDAO.getMotherById(motherId);

		Assert.assertNotNull(mother);
		Assert.assertEquals("super maman", mother.getName());
		Assert.assertEquals(2, mother.getChildren().size());


	}

	@Test
	public void getPersonByName() {

		String firstname = "Toto";
		String lastname = "Cutugno";

		Person person = exampleDAO.getPersonByName(firstname, lastname);

		Assert.assertNotNull(person);
		Assert.assertNotNull(person.getCpam());
		Assert.assertEquals(new Integer(118218), person.getCpam().getSsNumber());
	}

	@Test
	public void getBooksByAuthorId() {
		Integer authorId = 1;
		List<Book> books = exampleDAO.getBooksByAuthorId(authorId);

		Assert.assertNotNull(books);
		Assert.assertFalse(books.isEmpty());
		Assert.assertEquals(3, books.size());

		int count = 0;
		List<String> bookTitles = Arrays.asList("Hamlet", "Macbeth", "King Lear");
		for (Book book : books) {
			Assert.assertTrue(bookTitles.contains(book.getTitle()));
			Assert.assertEquals(1, book.getAuthors().size());
			Assert.assertEquals("Shakespeare", book.getAuthors().iterator().next().getLastname());
			count++;
		}
		Assert.assertEquals(bookTitles.size(), count);
	}

	@Test
	public void persistBook() {

		Book book = new Book();
		book.setTitle("A brave new world");

		Author author = new Author();
		author.setFirstname("Aldous");
		author.setLastname("Huxley");

		book.setAuthors(new HashSet<Author>());
		author.setBooks(new HashSet<Book>());

		book.getAuthors().add(author);
		author.getBooks().add(book);

		Assert.assertNull(book.getId());
		Assert.assertNull(book.getAuthors().iterator().next().getId());

		Book persistedBook = exampleDAO.persistBook(book);

		Assert.assertNotNull(persistedBook.getId());
		Assert.assertEquals(1, book.getAuthors().size());
		Assert.assertNotNull(book.getAuthors().iterator().next().getId());

	}

	@Test
	public void killMother() {

		Integer motherId = 2;

		exampleDAO.killMother(motherId);

		Mother mother = exampleDAO.getMotherById(motherId);

		Assert.assertNull(mother);
	}

}
