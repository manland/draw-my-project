/**
 * 
 */
package com.itkweb.hday.controller;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.HashSet;

import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.itkweb.hday.model.database.Farm;
import com.itkweb.hday.model.database.Plot;
import com.itkweb.hday.model.database.User;
import com.itkweb.hday.model.json.LoginData;
import com.itkweb.hday.service.UserService;

/**
 * Test the {@link LoginController}
 * 
 * @author Vincent DAVY
 * 
 */
public class TestLoginController extends AbstractTestController {

	// mocks (with injection)
	@Autowired
	@InjectMocks
	private LoginController loginController;

	// mock part
	@Mock
	private UserService userServiceMock;

	/**
	 * Test an empty request
	 * 
	 * @throws Exception
	 */
	@Test
	public void testEmptyRequest() throws Exception {
		// setup data
		LoginData loginData = new LoginData();
		loginData.setLogin("");
		loginData.setPassword("");
		String json = objectMapper.writeValueAsString(loginData);

		// call controller
		mockMvc.perform(MockMvcRequestBuilders.post("/server/rest/login").content(json))
		.andExpect(MockMvcResultMatchers.status().isBadRequest())
		.andExpect(
				MockMvcResultMatchers.jsonPath("$.errorMessage").value(
						messageSource.getMessage("hday.loginPasswordNoEmpty", null, null)));
	}

	/**
	 * Test a bad login/password request
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWrongUserLoginPasswordRequest() throws Exception {
		// setup data
		LoginData loginData = new LoginData();
		loginData.setLogin("login");
		loginData.setPassword("pass");
		String json = objectMapper.writeValueAsString(loginData);

		// init mock
		when(userServiceMock.getUserByLogin(loginData.getLogin(), loginData.getPassword())).thenReturn(null);

		// call controller
		mockMvc.perform(MockMvcRequestBuilders.post("/server/rest/login").content(json))
		.andExpect(MockMvcResultMatchers.status().isBadRequest())
		.andExpect(
				MockMvcResultMatchers.jsonPath("$.errorMessage").value(
						messageSource.getMessage("hday.wrongLoginPassword", null, null)));

		// verify mock
		verify(userServiceMock).getUserByLogin(loginData.getLogin(), loginData.getPassword());
	}

	/**
	 * Test a correct request
	 * 
	 * @throws Exception
	 */
	@Test
	public void testCorrectRequest() throws Exception {
		// setup login data
		LoginData loginData = new LoginData();
		loginData.setLogin("login");
		loginData.setPassword("pass");
		String json = objectMapper.writeValueAsString(loginData);

		// setup return data
		// user part
		User user = new User();
		user.setId(10);
		user.setLogin(loginData.getLogin());
		user.setFarms(new HashSet<Farm>());

		// farm part
		Farm farm = new Farm();
		farm.setId(100);
		farm.setName("La ferme");
		farm.setPlots(new HashSet<Plot>());
		user.getFarms().add(farm);

		// plot part
		// plot 1
		Plot plot1 = new Plot();
		plot1.setId(50);
		plot1.setName("Ma belle parcelle");
		plot1.setArea(33.5f);
		plot1.setLongitude(47.63f);
		plot1.setLatitude(2.22f);
		farm.getPlots().add(plot1);

		// plot 2
		Plot plot2 = new Plot();
		plot2.setId(51);
		plot2.setName("Ma parcelle");
		plot2.setArea(11.5f);
		plot2.setLongitude(48.63f);
		plot2.setLatitude(20.35f);
		farm.getPlots().add(plot2);

		// plot 3
		Plot plot3 = new Plot();
		plot3.setId(52);
		plot3.setName("No name");
		plot3.setArea(28.36f);
		plot3.setLongitude(47.2f);
		plot3.setLatitude(2.25f);
		farm.getPlots().add(plot3);

		// init mock
		when(userServiceMock.getUserByLogin(loginData.getLogin(), loginData.getPassword())).thenReturn(user);

		// call controller
		mockMvc.perform(MockMvcRequestBuilders.post("/server/rest/login").content(json))
		.andExpect(MockMvcResultMatchers.status().isOk())
		.andExpect(MockMvcResultMatchers.jsonPath("$.userId").value(user.getId().intValue()))
		.andExpect(MockMvcResultMatchers.jsonPath("$.login").value(user.getLogin()))
		.andExpect(MockMvcResultMatchers.jsonPath("$.password").doesNotExist())
		.andExpect(MockMvcResultMatchers.jsonPath("$.farm").isArray())
		.andExpect(MockMvcResultMatchers.jsonPath("$.farm[0].user").doesNotExist())
		.andExpect(MockMvcResultMatchers.jsonPath("$.farm[0].farmId").value(farm.getId().intValue()))
		.andExpect(MockMvcResultMatchers.jsonPath("$.farm[0].name").value(farm.getName()))
		.andExpect(MockMvcResultMatchers.jsonPath("$.farm[0].plots").isArray())
		.andExpect(
				MockMvcResultMatchers.jsonPath("$.farm[0].plots[?(@.plotId  == 50)].name").value(
						plot1.getName()))
						.andExpect(
								MockMvcResultMatchers.jsonPath("$.farm[0].plots[?(@.plotId  == 50)].area").value(
										truncateDouble(plot1.getArea().doubleValue(), 2)))
										.andExpect(
												MockMvcResultMatchers.jsonPath("$.farm[0].plots[?(@.plotId  == 50)].longitude").value(
														truncateDouble(plot1.getLongitude().doubleValue(), 2)))
														.andExpect(
																MockMvcResultMatchers.jsonPath("$.farm[0].plots[?(@.plotId  == 50)].latitude").value(
																		truncateDouble(plot1.getLatitude().doubleValue(), 2)))
																		.andExpect(MockMvcResultMatchers.jsonPath("$.farm[0].plots[?(@.plotId  == 50)].farm").doesNotExist())

																		.andExpect(
																				MockMvcResultMatchers.jsonPath("$.farm[0].plots[?(@.plotId  == 51)].name").value(
																						plot2.getName()))
																						.andExpect(
																								MockMvcResultMatchers.jsonPath("$.farm[0].plots[?(@.plotId  == 51)].area").value(
																										truncateDouble(plot2.getArea().doubleValue(), 2)))
																										.andExpect(
																												MockMvcResultMatchers.jsonPath("$.farm[0].plots[?(@.plotId  == 51)].longitude").value(
																														truncateDouble(plot2.getLongitude().doubleValue(), 2)))
																														.andExpect(
																																MockMvcResultMatchers.jsonPath("$.farm[0].plots[?(@.plotId  == 51)].latitude").value(
																																		truncateDouble(plot2.getLatitude().doubleValue(), 2)))
																																		.andExpect(MockMvcResultMatchers.jsonPath("$.farm[0].plots[?(@.plotId  == 51)].farm").doesNotExist())

																																		.andExpect(
																																				MockMvcResultMatchers.jsonPath("$.farm[0].plots[?(@.plotId  == 52)].name").value(
																																						plot3.getName()))
																																						.andExpect(
																																								MockMvcResultMatchers.jsonPath("$.farm[0].plots[?(@.plotId  == 52)].area").value(
																																										truncateDouble(plot3.getArea().doubleValue(), 3)))
																																										.andExpect(
																																												MockMvcResultMatchers.jsonPath("$.farm[0].plots[?(@.plotId  == 52)].longitude").value(
																																														truncateDouble(plot3.getLongitude().doubleValue(), 2)))
																																														.andExpect(
																																																MockMvcResultMatchers.jsonPath("$.farm[0].plots[?(@.plotId  == 52)].latitude").value(
																																																		truncateDouble(plot3.getLatitude().doubleValue(), 2)))
																																																		.andExpect(MockMvcResultMatchers.jsonPath("$.farm[0].plots[?(@.plotId  == 52)].farm").doesNotExist());

		// verify mock
		verify(userServiceMock).getUserByLogin(loginData.getLogin(), loginData.getPassword());
	}

	private double truncateDouble(double number, int numDigits) {
		double result = number;
		String arg = "" + number;
		int idx = arg.indexOf('.');
		if (idx != -1) {
			if (arg.length() > idx + numDigits) {
				arg = arg.substring(0, idx + numDigits + 1);
				result = Double.parseDouble(arg);
			}
		}
		return result;
	}
}
