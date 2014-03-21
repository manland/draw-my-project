package com.itkweb.hday.util;

import org.springframework.test.context.ContextConfiguration;

import com.itkweb.hday.config.SpringServiceTestConfiguration;

@ContextConfiguration(classes = SpringServiceTestConfiguration.class)
public abstract class AbstractIntegrationTestCase extends AbstractDBTestCase {

}
