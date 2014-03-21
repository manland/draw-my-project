package com.itkweb.hday.model.database;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "plot")
@JsonInclude(Include.NON_NULL)
public class Plot {

	@Id
	@GeneratedValue
	@Column(name = "id")
	@JsonProperty("plotId")
	private Integer id;

	@Column(name = "name")
	@NotEmpty
	private String name;

	@Column(name = "latitude")
	@NotNull
	@Min(1)
	private Float latitude;

	@Column(name = "longitude")
	@NotNull
	@Min(1)
	private Float longitude;

	@Column(name = "area")
	@NotNull
	@Min(1)
	private Float area;

	@ManyToOne
	@JoinColumn(name = "farm_id", nullable = false)
	@JsonIgnore
	private Farm farm;

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

	public Float getLatitude() {
		return latitude;
	}

	public void setLatitude(Float latitude) {
		this.latitude = latitude;
	}

	public Float getLongitude() {
		return longitude;
	}

	public void setLongitude(Float longitude) {
		this.longitude = longitude;
	}

	public Float getArea() {
		return area;
	}

	public void setArea(Float area) {
		this.area = area;
	}

	public Farm getFarm() {
		return farm;
	}

	public void setFarm(Farm farm) {
		this.farm = farm;
	}

}
