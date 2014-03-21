package com.itkweb.hday.model.database;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "user")
@JsonInclude(Include.NON_NULL)
public class User {

	@Id
	@GeneratedValue
	@Column(name = "id", nullable = false)
	@JsonProperty("userId")
	private Integer id;

	@Column(name = "login")
	@NotEmpty
	private String login;

	@Column(name = "password")
	@NotEmpty
	private String password;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "user", fetch = FetchType.EAGER)
	@JsonProperty("farm")
	private Set<Farm> farms;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Farm> getFarms() {
		return farms;
	}

	public void setFarms(Set<Farm> farms) {
		this.farms = farms;
	}

}
