package com.itkweb.hday.dao;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.itkweb.hday.model.database.Farm;
import com.itkweb.hday.model.database.Plot;
import com.itkweb.hday.model.database.User;
import com.itkweb.hday.util.AbstractDAOTestCase;

public class UserDAOTest extends AbstractDAOTestCase {

	@Override
	protected String getDataSetFilename() throws Exception {
		return "UserDAOTest.xml";
	}

	@Autowired
	private UserDAO userDAO;

	@Test
	public void getById() {

		User user = userDAO.getById(1);

		Assert.assertNotNull(user);
		Assert.assertEquals("super login", user.getLogin());
	}

	@Test
	public void getById_has_one_farm_with_three_plots() {

		User user = userDAO.getById(2);

		Assert.assertNotNull(user);
		Assert.assertEquals(1, user.getFarms().size());

		Farm farm = user.getFarms().iterator().next();
		Assert.assertEquals(2, farm.getId().intValue());
		Assert.assertEquals(3, farm.getPlots().size());
	}

	@Test
	public void getById_fail_because_user_does_not_exist_in_db() {

		User user = userDAO.getById(100);

		Assert.assertNull(user);
	}

	@Test
	public void save_fail_because_login_is_missing() {

		User user = new User();
		user.setPassword("my password");

		try {
			userDAO.saveOrUpdate(user);
			Assert.fail("Should not persist user without login");
		} catch (Exception e) {
			Assert.assertNotNull(e);
			logger.debug(e.getMessage());
		}
	}

	@Test
	public void save_fail_because_password_is_missing() {

		User user = new User();
		user.setLogin("my login");

		try {
			userDAO.saveOrUpdate(user);
			Assert.fail("Should not persist user without password");
		} catch (Exception e) {
			Assert.assertNotNull(e);
			logger.debug(e.getMessage());
		}
	}

	@Test
	public void save_merged() {

		Integer id = 1;
		String formerLogin = "super login";
		String newLogin = "magic login";

		User userToUpdate = userDAO.getById(id);

		Assert.assertEquals(formerLogin, userToUpdate.getLogin());

		userToUpdate.setLogin(newLogin);

		User updatedUser = userDAO.saveOrUpdate(userToUpdate);

		Assert.assertEquals(id, updatedUser.getId());
		Assert.assertNotEquals(formerLogin, userToUpdate.getLogin());
		Assert.assertEquals(newLogin, userToUpdate.getLogin());

	}


	@Test
	public void save_add_new_plot() {

		Integer id = 2;

		User userToUpdate = userDAO.getById(id);

		Farm farm = userToUpdate.getFarms().iterator().next();
		Assert.assertEquals(3, farm.getPlots().size());

		Plot plotToAdd = new Plot();
		plotToAdd.setName("new plot");
		plotToAdd.setLatitude(new Float(42.5));
		plotToAdd.setLongitude(new Float(5.2));
		plotToAdd.setArea(new Float(12));

		plotToAdd.setFarm(farm);
		farm.getPlots().add(plotToAdd);

		User updatedUser = userDAO.saveOrUpdate(userToUpdate);

		Farm updatedFarm = updatedUser.getFarms().iterator().next();
		Assert.assertEquals(4, updatedFarm.getPlots().size());

		for (Plot plot : updatedFarm.getPlots()) {
			Assert.assertNotNull(plot.getId());
		}
	}

	@Test
	public void save_persist() {

		String login = "my login";
		String password = "my password";
		User user = new User();
		user.setLogin(login);
		user.setPassword(password);

		Assert.assertNull(user.getId());

		User persistedUser = userDAO.saveOrUpdate(user);

		Assert.assertNotNull(persistedUser.getId());
		Assert.assertEquals(login, persistedUser.getLogin());
		Assert.assertEquals(password, persistedUser.getPassword());
	}


}
