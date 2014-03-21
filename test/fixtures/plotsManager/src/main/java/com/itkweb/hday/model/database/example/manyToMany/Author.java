package com.itkweb.hday.model.database.example.manyToMany;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="author")
public class Author {

	@Id
	@GeneratedValue
	@Column(name="id", nullable=false)
	private Integer id;

	@Column(name="firstname")
	private String firstname;

	@Column(name="lastname")
	private String lastname;

	@ManyToMany(cascade=CascadeType.ALL)
	@JoinTable(name = "book_author",
	joinColumns = {@JoinColumn(name = "author_id", referencedColumnName = "id")},
	inverseJoinColumns = {@JoinColumn(name = "book_id", referencedColumnName = "id")})
	private Set<Book> books;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public Set<Book> getBooks() {
		return books;
	}

	public void setBooks(Set<Book> books) {
		this.books = books;
	}




}
