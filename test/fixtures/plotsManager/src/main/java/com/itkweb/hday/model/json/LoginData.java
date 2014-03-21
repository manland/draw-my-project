/**
 * 
 */
package com.itkweb.hday.model.json;

import org.hibernate.validator.constraints.NotEmpty;

/**
 * JSON data for login
 * 
 * @author Vincent DAVY
 * 
 */
public class LoginData {

	@NotEmpty
	private String login;

	@NotEmpty
	private String password;

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

	@Override
	public String toString() {
		return "LoginData [login=" + login + ", password=" + password + "]";
	}

}
