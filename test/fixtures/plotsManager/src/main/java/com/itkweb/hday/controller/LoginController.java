/**
 * 
 */
package com.itkweb.hday.controller;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.itkweb.hday.model.database.User;
import com.itkweb.hday.model.json.ErrorMessage;
import com.itkweb.hday.model.json.LoginData;
import com.itkweb.hday.service.UserService;

/**
 * Login controller class
 * 
 * @author Vincent DAVY
 * 
 */
@RestController
public class LoginController {

	private static final Logger LOGGER = LoggerFactory.getLogger(LoginController.class);

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private UserService userService;

	/**
	 * Get the user data
	 * 
	 * @param loginData
	 *            the login data
	 * @param result
	 *            the validation process result
	 * @return the {@link ResponseEntity}
	 */
	@RequestMapping(value = "/login", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	public ResponseEntity<?> login(@RequestBody @Valid LoginData loginData, BindingResult result) {
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("Received authentication data : " + loginData);
		}

		ResponseEntity<?> responseEntity = null;
		if (result.hasErrors()) { // check if we have error (empty fields)
			ErrorMessage error = new ErrorMessage();
			error.setErrorMessage(messageSource.getMessage("hday.loginPasswordNoEmpty", null, null));
			responseEntity = new ResponseEntity<ErrorMessage>(error, HttpStatus.BAD_REQUEST);
			LOGGER.warn("Login or password are not correct");
		}

		// check login and password
		if (responseEntity == null) { // if we don't have already an error
			User user = userService.getUserByLogin(loginData.getLogin(), loginData.getPassword());
			if (user != null) { // user found
				responseEntity = new ResponseEntity<User>(user, HttpStatus.OK);
				if (LOGGER.isDebugEnabled()) {
					LOGGER.debug("User data found for : " + loginData);
				}
			} else { // user was not found
				ErrorMessage error = new ErrorMessage();
				error.setErrorMessage(messageSource.getMessage("hday.wrongLoginPassword", null, null));
				responseEntity = new ResponseEntity<ErrorMessage>(error, HttpStatus.BAD_REQUEST);
				LOGGER.warn("Login or password are wrong");
			}
		}

		return responseEntity;
	}
}
