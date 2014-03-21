package com.itkweb.hday.model.database.example.oneToMany;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="child")
public class Child {

	@Id
	@GeneratedValue
	@Column(name="id", nullable=false)
	private Integer id;

	@Column(name="name")
	private String name;

	@Column(name="age")
	private Integer age;

	@ManyToOne
	@JoinColumn(name="mother_id", nullable=false)
	private Mother mother;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public Mother getMother() {
		return mother;
	}

	public void setMother(Mother mother) {
		this.mother = mother;
	}


}
