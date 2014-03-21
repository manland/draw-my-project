/**
 * 
 */
package com.itkweb.hday.controller;

import org.junit.Before;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.itkweb.hday.config.SpringMainConfiguration;

/**
 * Abstract test controller
 * 
 * @author Vincent DAVY
 * 
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringMainConfiguration.class)
@WebAppConfiguration
public class AbstractTestController {

	// IoC parts
	@Autowired
	private WebApplicationContext applicationContext;

	@Autowired
	protected ObjectMapper objectMapper;

	@Autowired
	protected MessageSource messageSource;

	protected MockMvc mockMvc;

	/**
	 * Initialize {@link MockMvc}
	 */
	@Before
	public void initialiazeMockMVC() {
		MockitoAnnotations.initMocks(this);
		mockMvc = MockMvcBuilders
				.webAppContextSetup(applicationContext)
				.defaultRequest(
						MockMvcRequestBuilders.get("/").contextPath("/server").servletPath("/rest")
								.accept(MediaType.APPLICATION_JSON).characterEncoding("UTF-8")
								.contentType(MediaType.APPLICATION_JSON)).alwaysDo(MockMvcResultHandlers.print())
				.alwaysExpect(MockMvcResultMatchers.content().encoding("UTF-8"))
				.alwaysExpect(MockMvcResultMatchers.content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
				.build();
	}
}
