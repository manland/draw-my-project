package com.itkweb.hday.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itkweb.hday.dao.PlotDAO;
import com.itkweb.hday.dao.UserDAO;
import com.itkweb.hday.model.database.User;
import com.itkweb.hday.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private PlotDAO plotDAO;

	@Autowired
	private UserDAO userDAO;

	@Override
	public User getUserByLogin(String login, String password) {
		User user = userDAO.getUserByLoginAndPassword(login, password);
		return user;
	}

	@Override
	public User addPlot(User user) {
		User savedUser = userDAO.saveOrUpdate(user);
		return savedUser;
	}

	@Override
	public boolean deletePlot(String login, String password, Integer plotId) {
		plotDAO.deletePlot(plotId);
		return true;
	}

	@Override
	public User modifyPlot(User user) {
		User savedUser = userDAO.saveOrUpdate(user);
		return savedUser;
	}

}
