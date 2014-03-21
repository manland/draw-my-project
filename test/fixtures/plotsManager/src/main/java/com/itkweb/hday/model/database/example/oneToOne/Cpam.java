package com.itkweb.hday.model.database.example.oneToOne;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

@Entity
@Table(name="cpam")
public class Cpam {


	@GenericGenerator(name = "generator", strategy = "foreign", parameters = @Parameter(name = "property", value = "person"))
	@Id
	@GeneratedValue(generator = "generator")
	@Column(name = "person_id", unique = true, nullable = false)
	private Integer id;

	@Column(name="ss_number")
	private Integer ssNumber;

	@OneToOne(fetch = FetchType.LAZY)
	@PrimaryKeyJoinColumn
	private Person person;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getSsNumber() {
		return ssNumber;
	}

	public void setSsNumber(Integer ssNumber) {
		this.ssNumber = ssNumber;
	}

	public Person getPerson() {
		return person;
	}

	public void setPerson(Person person) {
		this.person = person;
	}


}
