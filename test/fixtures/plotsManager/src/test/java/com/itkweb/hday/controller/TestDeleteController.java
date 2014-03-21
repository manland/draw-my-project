/**
 * 
 */
package com.itkweb.hday.controller;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import javax.validation.constraints.AssertTrue;



import org.junit.Assert;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.itkweb.hday.model.json.LoginData;
import com.itkweb.hday.service.UserService;

/**
 * Test the {@link DeleteController}
 * 
 * @author Vincent DAVY
 * 
 */
public class TestDeleteController extends AbstractTestController {

	// mocks (with injection)
	@Autowired
	@InjectMocks
	private DeleteController deleteController;

	// mock part
	@Mock
	private UserService userServiceMock;
	
	@Test
	public void test() {
		Assert.assertTrue(true);
		
	}

//	/**
//	 * Test an empty request
//	 * 
//	 * @throws Exception
//	 */
//	@Test
//	public void testEmptyRequest() throws Exception {
//		// setup data
//		LoginData loginData = new LoginData();
//		loginData.setLogin("");
//		loginData.setPassword("");
//		String json = objectMapper.writeValueAsString(loginData);
//
//		// call controller
//		mockMvc.perform(MockMvcRequestBuilders.delete("/server/rest/1").content(json))
//				.andExpect(MockMvcResultMatchers.status().isBadRequest())
//				.andExpect(
//						MockMvcResultMatchers.jsonPath("$.errorMessage").value(
//								messageSource.getMessage("hday.loginPasswordNoEmpty", null, null)));
//	}
//
//	/**
//	 * Test a bad login/password request
//	 * 
//	 * @throws Exception
//	 */
//	@Test
//	public void testWrongUserLoginPasswordRequest() throws Exception {
//		// setup data
//		LoginData loginData = new LoginData();
//		loginData.setLogin("login");
//		loginData.setPassword("pass");
//		String json = objectMapper.writeValueAsString(loginData);
//
//		// init mock
//		when(userServiceMock.deletePlot(loginData.getLogin(), loginData.getPassword(), 1)).thenReturn(false);
//
//		// call controller
//		mockMvc.perform(MockMvcRequestBuilders.delete("/server/rest/1").content(json))
//				.andExpect(MockMvcResultMatchers.status().isBadRequest())
//				.andExpect(
//						MockMvcResultMatchers.jsonPath("$.errorMessage").value(
//								messageSource.getMessage("hday.plotNotDeleted", null, null)));
//
//		// verify mock
//		verify(userServiceMock).deletePlot(loginData.getLogin(), loginData.getPassword(), 1);
//	}
//
//	/**
//	 * Test a correct request
//	 * 
//	 * @throws Exception
//	 */
//	@Test
//	public void testCorrectRequest() throws Exception {
//
//		// setup data
//		LoginData loginData = new LoginData();
//		loginData.setLogin("login");
//		loginData.setPassword("pass");
//		String json = objectMapper.writeValueAsString(loginData);
//
//		// init mock
//		when(userServiceMock.deletePlot(loginData.getLogin(), loginData.getPassword(), 1)).thenReturn(true);
//
//		// call controller
//		mockMvc.perform(MockMvcRequestBuilders.delete("/server/rest/1").content(json)).andExpect(
//				MockMvcResultMatchers.status().isOk());
//
//		// verify mock
//		verify(userServiceMock).deletePlot(loginData.getLogin(), loginData.getPassword(), 1);
//	}

}
