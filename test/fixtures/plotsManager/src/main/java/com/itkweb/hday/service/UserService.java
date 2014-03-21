package com.itkweb.hday.service;

import com.itkweb.hday.model.database.User;

public interface UserService {

	/**
	 * Get user data
	 * 
	 * @param login
	 *            the user login
	 * @param password
	 *            the user password
	 * @return User with Farm and Plots, or <code>null</code> if user not found
	 */
	public User getUserByLogin(String login, String password);

	public User addPlot(User user);

	public User modifyPlot(User user);

	/**
	 * Delete a plot of an user
	 * 
	 * @param login
	 *            the user login
	 * @param password
	 *            the user password
	 * @param plotId
	 *            the plot id (must belong to the user)
	 * @return <code>true</code> if plot was deleted, <code>false</code> otherwise
	 */
	public boolean deletePlot(String login, String password, Integer plotId);
}
