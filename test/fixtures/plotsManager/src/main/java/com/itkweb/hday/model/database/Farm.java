package com.itkweb.hday.model.database;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "farm")
@JsonInclude(Include.NON_NULL)
public class Farm {

	@Id
	@GeneratedValue
	@Column(name = "id")
	@JsonProperty("farmId")
	private Integer id;

	@Column(name = "name")
	@NotEmpty
	private String name;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	@JsonIgnore
	private User user;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "farm", fetch = FetchType.EAGER)
	private Set<Plot> plots;

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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<Plot> getPlots() {
		return plots;
	}

	public void setPlots(Set<Plot> plots) {
		this.plots = plots;
	}

}
