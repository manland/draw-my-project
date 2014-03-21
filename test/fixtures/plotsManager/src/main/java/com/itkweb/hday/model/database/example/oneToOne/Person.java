package com.itkweb.hday.model.database.example.oneToOne;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="person")
public class Person {

	@Id
	@GeneratedValue
	@Column(name="id", nullable=false)
	private Integer id;

	@Column(name="firstname")
	private String firstname;

	@Column(name="lastname")
	private String lastname;

	@OneToOne(fetch = FetchType.LAZY, mappedBy = "person", cascade = CascadeType.ALL)
	private Cpam cpam;

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

	public Cpam getCpam() {
		return cpam;
	}

	public void setCpam(Cpam cpam) {
		this.cpam = cpam;
	}

}
