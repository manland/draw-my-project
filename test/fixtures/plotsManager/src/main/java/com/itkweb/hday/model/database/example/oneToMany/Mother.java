package com.itkweb.hday.model.database.example.oneToMany;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="mother")
public class Mother {

	@Id
	@GeneratedValue
	@Column(name="id", nullable=false)
	private Integer id;

	@Column(name="name")
	private String name;

	@Column(name="age")
	private Integer age;

	@OneToMany(cascade=CascadeType.ALL, mappedBy="mother")
	private Set<Child> children;

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

	public Set<Child> getChildren() {
		return children;
	}

	public void setChildren(Set<Child> children) {
		this.children = children;
	}

}
