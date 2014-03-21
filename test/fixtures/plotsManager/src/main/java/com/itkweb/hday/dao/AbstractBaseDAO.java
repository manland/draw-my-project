/**
 *
 */
package com.itkweb.hday.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author mscapin
 * 
 */
public abstract class AbstractBaseDAO {

	protected final Logger logger = LoggerFactory.getLogger(this.getClass());

	@PersistenceContext
	protected EntityManager entityManager;

}
