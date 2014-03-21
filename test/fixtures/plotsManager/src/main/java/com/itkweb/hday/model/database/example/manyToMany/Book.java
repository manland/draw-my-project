package com.itkweb.hday.model.database.example.manyToMany;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="book")
public class Book {

	@Id
	@GeneratedValue
	@Column(name="id", nullable=false)
	private Integer id;

	@Column(name="title")
	private String title;

	@Column(name="year")
	private Integer year;

	@ManyToMany(cascade=CascadeType.ALL, mappedBy="books")
	//	@JoinTable(name = "book_author",
	//	joinColumns = {@JoinColumn(name = "book_id", referencedColumnName = "id")},
	//	inverseJoinColumns = {@JoinColumn(name = "author_id", referencedColumnName = "id")})
	private Set<Author> authors;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public Set<Author> getAuthors() {
		return authors;
	}

	public void setAuthors(Set<Author> authors) {
		this.authors = authors;
	}


}
