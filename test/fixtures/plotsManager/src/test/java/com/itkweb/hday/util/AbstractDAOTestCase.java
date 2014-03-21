package com.itkweb.hday.util;

import org.springframework.test.context.ContextConfiguration;

import com.itkweb.hday.config.SpringDAOTestConfiguration;

@ContextConfiguration(classes = SpringDAOTestConfiguration.class)
public abstract class AbstractDAOTestCase extends AbstractDBTestCase {

}
