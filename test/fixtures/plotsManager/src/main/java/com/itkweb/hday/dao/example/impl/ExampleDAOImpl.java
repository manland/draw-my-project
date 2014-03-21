package com.itkweb.hday.dao.example.impl;

import java.util.List;

import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;

import org.junit.Assert;
import org.springframework.stereotype.Repository;

import com.itkweb.hday.dao.AbstractBaseDAO;
import com.itkweb.hday.dao.example.ExampleDAO;
import com.itkweb.hday.model.database.example.manyToMany.Book;
import com.itkweb.hday.model.database.example.oneToMany.Mother;
import com.itkweb.hday.model.database.example.oneToOne.Person;

@Repository
public class ExampleDAOImpl extends AbstractBaseDAO implements ExampleDAO {


	@Override
	public Mother getMotherById(Integer id) {

		TypedQuery<Mother> query = entityManager.createQuery("select m from Mother as m where m.id = :id", Mother.class);

		query.setParameter("id", id);

		try {
			Mother result = query.getSingleResult();
			return result;
		} catch (NoResultException e) {
			return null;
		}
	}

	@Override
	public Person getPersonByName(String firstname, String lastname) {

		TypedQuery<Person> query = entityManager.createQuery("select p from Person as p where p.firstname = :firstname and p.lastname = :lastname", Person.class);

		query.setParameter("firstname", firstname);
		query.setParameter("lastname", lastname);

		try {
			Person result = query.getSingleResult();
			return result;
		} catch (NoResultException e) {
			return null;
		}

	}

	@Override
	public List<Book> getBooksByAuthorId(Integer authorId) {

		TypedQuery<Book> query = entityManager.createQuery("select b from Book as b join b.authors as a where a.id = :authorId", Book.class);

		query.setParameter("authorId", authorId);

		List<Book> results = query.getResultList();

		return results;
	}

	@Override
	public Book persistBook(Book book) {

		entityManager.persist(book);

		Assert.assertNotNull(book.getId());

		return book;
	}

	@Override
	public void killMother(Integer motherId) {

		Mother mother = entityManager.find(Mother.class, motherId);

		Assert.assertNotNull(mother);

		entityManager.remove(mother);
	}


}
