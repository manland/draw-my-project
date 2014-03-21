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

import com.itkweb.hday.model.database.Farm;
import com.itkweb.hday.model.database.User;
import com.itkweb.hday.model.json.ErrorMessage;
import com.itkweb.hday.service.UserService;

/**
 * Add/modify plot controller class
 * 
 * @author Vincent DAVY
 * 
 */
@RestController
public class AddModifyPlotController {

	private static final Logger LOGGER = LoggerFactory.getLogger(AddModifyPlotController.class);

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private UserService userService;

	/**
	 * Add plot to user
	 * 
	 * @param user
	 *            the user data
	 * @param result
	 *            the validation process result
	 * @return the {@link ResponseEntity}
	 */
	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	public ResponseEntity<?> addPlot(@RequestBody @Valid User user, BindingResult result) {
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("Received user data to add : " + user);
		}

		return callService(user, result, false);
	}

	/**
	 * Call the {@link UserService}
	 * 
	 * @param user
	 *            the user
	 * @param result
	 *            the binding result
	 * @param modify
	 *            <code>true</code> to call modify method, <code>false</code> to call add
	 * @return the {@link ResponseEntity}
	 */
	private ResponseEntity<?> callService(User user, BindingResult result, boolean modify) {
		// check first validation
		ResponseEntity<?> responseEntity = null;
		if (result.hasErrors()) { // check if we have error (empty fields)
			ErrorMessage error = new ErrorMessage();
			error.setErrorMessage(messageSource.getMessage("hday.wrongData", null, null));
			responseEntity = new ResponseEntity<ErrorMessage>(error, HttpStatus.BAD_REQUEST);
			LOGGER.warn("Incorrect data : " + result.getFieldErrors());
		}

		// check plot count
		if (responseEntity == null) {
			Farm[] farms = user.getFarms().toArray(new Farm[0]);
			if (farms[0].getPlots().size() > 1) {
				ErrorMessage error = new ErrorMessage();
				error.setErrorMessage(messageSource.getMessage("hday.onlyOnePlot", null, null));
				responseEntity = new ResponseEntity<ErrorMessage>(error, HttpStatus.BAD_REQUEST);
				LOGGER.warn("Only one plot is required");
			}
		}

		// check login and password
		if (responseEntity == null) { // if we don't have already an error
			User userReturn = modify ? userService.modifyPlot(user) : userService.addPlot(user);
			if (userReturn != null) { // user found
				responseEntity = new ResponseEntity<User>(userReturn, HttpStatus.OK);
				if (LOGGER.isDebugEnabled()) {
					LOGGER.debug("User data found for : " + userReturn);
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

	/**
	 * Modify plot of user
	 * 
	 * @param user
	 *            the user data
	 * @param result
	 *            the validation process result
	 * @return the {@link ResponseEntity}
	 */
	@RequestMapping(value = "/modif", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	public ResponseEntity<?> modifyPlot(@RequestBody @Valid User user, BindingResult result) {
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("Received user data for modify : " + user);
		}

		return callService(user, result, true);
	}

}
