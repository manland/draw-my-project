package com.itkweb.hday.dao.impl;

import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import com.itkweb.hday.dao.AbstractBaseDAO;
import com.itkweb.hday.dao.UserDAO;
import com.itkweb.hday.model.database.User;

@Repository
public class UserDAOImpl extends AbstractBaseDAO implements UserDAO {

	@Override
	public User getUserByLoginAndPassword(String login, String password) {
		TypedQuery<User> query = entityManager
				.createQuery(
						"select u from User as u join fetch u.farms as f join fetch f.plots where u.login = :login and u.password = :password",
						User.class);
		query.setParameter("login", login);
		query.setParameter("password", password);

		try {
			return query.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	@Override
	public User getById(Integer id) {

		TypedQuery<User> query = entityManager.createQuery("select u from User as u where u.id = :id", User.class);

		query.setParameter("id", id);

		User user;
		try {
			user = query.getSingleResult();
		} catch (NoResultException e) {
			user = null;
		}

		return user;
	}

	@Override
	@Transactional
	public User saveOrUpdate(User user) {

		if (user.getId() == null) {
			entityManager.persist(user); // save
		} else {
			entityManager.merge(user); // update
		}

		Assert.notNull(user.getId());

		return getById(user.getId());
	}

}
