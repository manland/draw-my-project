/**
 * 
 */
package com.itkweb.hday.controller;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.HashSet;

import org.junit.Test;
import org.mockito.ArgumentMatcher;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.itkweb.hday.model.database.Farm;
import com.itkweb.hday.model.database.Plot;
import com.itkweb.hday.model.database.User;
import com.itkweb.hday.service.UserService;

/**
 * Test the {@link AddModifyPlotController}
 * 
 * @author Vincent DAVY
 * 
 */
public class TestAddModifyController extends AbstractTestController {

	// mocks (with injection)
	@Autowired
	@InjectMocks
	private AddModifyPlotController addModifyPlotController;

	// mock part
	@Mock
	private UserService userServiceMock;
	private User user;
	private Farm farm;
	private Plot plot1;
	private Plot plot2;
	private Plot plot3;

	/**
	 * Test an empty request
	 * 
	 * @param url
	 *            URL to call
	 * @throws Exception
	 */
	private void testEmptyRequest(String url) throws Exception {
		// setup data
		User user = new User();
		user.setLogin("");
		user.setPassword("");
		String json = objectMapper.writeValueAsString(user);

		// call controller
		mockMvc.perform(MockMvcRequestBuilders.post(url).content(json))
				.andExpect(MockMvcResultMatchers.status().isBadRequest())
				.andExpect(
						MockMvcResultMatchers.jsonPath("$.errorMessage").value(
								messageSource.getMessage("hday.wrongData", null, null)));
	}

	/**
	 * Test an empty add request
	 * 
	 * @throws Exception
	 */
	@Test
	public void testEmptyAddRequest() throws Exception {
		testEmptyRequest("/server/rest/add");
	}

	/**
	 * Test an empty modify request
	 * 
	 * @throws Exception
	 */
	@Test
	public void testEmptyModifyRequest() throws Exception {
		testEmptyRequest("/server/rest/modif");
	}

	/**
	 * Test a too much plot request
	 * 
	 * @param url
	 *            URL to call
	 * @throws Exception
	 */
	private void testTooMuchPlotRequest(String url) throws Exception {
		generateUserWith3PlotsData();

		// call controller
		mockMvc.perform(MockMvcRequestBuilders.post(url).content(objectMapper.writeValueAsString(user)))
				.andExpect(MockMvcResultMatchers.status().isBadRequest())
				.andExpect(
						MockMvcResultMatchers.jsonPath("$.errorMessage").value(
								messageSource.getMessage("hday.onlyOnePlot", null, null)));

	}

	/**
	 * Test a too much plot add request
	 * 
	 * @throws Exception
	 */
	@Test
	public void testTooMuchPlotAddRequest() throws Exception {
		testTooMuchPlotRequest("/server/rest/add");
	}

	/**
	 * Test a too much plot modify request
	 * 
	 * @throws Exception
	 */
	@Test
	public void testTooMuchPlotModifyRequest() throws Exception {
		testTooMuchPlotRequest("/server/rest/modif");
	}

	/**
	 * Generate {@link User} with 3 plots
	 * 
	 * @return a {@link User

	 */
	private void generateUserWith3PlotsData() {
		// setup data
		// user part
		user = new User();
		user.setId(10);
		user.setLogin("login");
		user.setPassword("password");
		user.setFarms(new HashSet<Farm>());

		// farm part
		farm = new Farm();
		farm.setId(100);
		farm.setName("La ferme");
		farm.setPlots(new HashSet<Plot>());
		user.getFarms().add(farm);

		// plot part
		// plot 1
		plot1 = new Plot();
		plot1.setId(50);
		plot1.setName("Ma belle parcelle");
		plot1.setArea(33.5f);
		plot1.setLongitude(47.63f);
		plot1.setLatitude(2.22f);
		farm.getPlots().add(plot1);

		// plot 2
		plot2 = new Plot();
		plot2.setId(51);
		plot2.setName("Ma parcelle");
		plot2.setArea(11.5f);
		plot2.setLongitude(48.63f);
		plot2.setLatitude(20.35f);
		farm.getPlots().add(plot2);

		// plot 3
		plot3 = new Plot();
		plot3.setId(52);
		plot3.setName("No name");
		plot3.setArea(28.36f);
		plot3.setLongitude(47.2f);
		plot3.setLatitude(2.25f);
		farm.getPlots().add(plot3);
	}

	/**
	 * Generate {@link User} with 1 plot
	 * 
	 * @return a {@link User

	 */
	private User generateUserWith1PlotData() {
		// setup data
		// user part
		User user = new User();
		user.setId(10);
		user.setLogin("login");
		user.setPassword("password");
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

		return user;
	}

	/**
	 * Test a wrong user password add request
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWrongUserPasswordAddRequest() throws Exception {
		final User user = generateUserWith1PlotData();

		// init mock
		when(userServiceMock.addPlot(user)).thenReturn(null);

		// call controller
		mockMvc.perform(MockMvcRequestBuilders.post("/server/rest/add").content(objectMapper.writeValueAsString(user)))
				.andExpect(MockMvcResultMatchers.status().isBadRequest())
				.andExpect(
						MockMvcResultMatchers.jsonPath("$.errorMessage").value(
								messageSource.getMessage("hday.wrongLoginPassword", null, null)));

		// verify mock
		verify(userServiceMock).addPlot(Matchers.argThat(new ArgumentMatcher<User>() {
			@Override
			public boolean matches(Object argument) {
				return argument instanceof User && ((User) argument).getId() == user.getId();
			}
		}));
	}

	/**
	 * Test a wrong user password modify request
	 * 
	 * @throws Exception
	 */
	@Test
	public void testWrongUserPasswordModifyRequest() throws Exception {
		final User user = generateUserWith1PlotData();

		// init mock
		when(userServiceMock.modifyPlot(user)).thenReturn(null);

		// call controller
		mockMvc.perform(
				MockMvcRequestBuilders.post("/server/rest/modif").content(objectMapper.writeValueAsString(user)))
				.andExpect(MockMvcResultMatchers.status().isBadRequest())
				.andExpect(
						MockMvcResultMatchers.jsonPath("$.errorMessage").value(
								messageSource.getMessage("hday.wrongLoginPassword", null, null)));

		// verify mock
		verify(userServiceMock).modifyPlot(Matchers.argThat(new ArgumentMatcher<User>() {
			@Override
			public boolean matches(Object argument) {
				return argument instanceof User && ((User) argument).getId() == user.getId();
			}
		}));
	}

	/**
	 * Test a correct add request
	 * 
	 * @throws Exception
	 */
	@Test
	public void testCorrectAddRequest() throws Exception {
		final User inputUser = generateUserWith1PlotData();
		generateUserWith3PlotsData();

		// init mock
		when(userServiceMock.addPlot(Matchers.argThat(new ArgumentMatcher<User>() {
			@Override
			public boolean matches(Object argument) {
				return argument instanceof User && ((User) argument).getId() == inputUser.getId();
			}
		}))).thenReturn(user);

		// call controller
		mockMvc.perform(
				MockMvcRequestBuilders.post("/server/rest/add").content(objectMapper.writeValueAsString(inputUser)))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.jsonPath("$.userId").value(user.getId().intValue()))
				.andExpect(MockMvcResultMatchers.jsonPath("$.login").value(user.getLogin()))
				.andExpect(MockMvcResultMatchers.jsonPath("$.password").value(user.getPassword()))
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
		verify(userServiceMock).addPlot(Matchers.argThat(new ArgumentMatcher<User>() {
			@Override
			public boolean matches(Object argument) {
				return argument instanceof User && ((User) argument).getId() == inputUser.getId();
			}
		}));

	}

	/**
	 * Test a correct modify request
	 * 
	 * @throws Exception
	 */
	@Test
	public void testCorrectModifyRequest() throws Exception {
		final User inputUser = generateUserWith1PlotData();
		generateUserWith3PlotsData();

		// init mock
		when(userServiceMock.modifyPlot(Matchers.argThat(new ArgumentMatcher<User>() {
			@Override
			public boolean matches(Object argument) {
				return argument instanceof User && ((User) argument).getId() == inputUser.getId();
			}
		}))).thenReturn(user);

		// call controller
		mockMvc.perform(
				MockMvcRequestBuilders.post("/server/rest/modif").content(objectMapper.writeValueAsString(inputUser)))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.jsonPath("$.userId").value(user.getId().intValue()))
				.andExpect(MockMvcResultMatchers.jsonPath("$.login").value(user.getLogin()))
				.andExpect(MockMvcResultMatchers.jsonPath("$.password").value(user.getPassword()))
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
		verify(userServiceMock).modifyPlot(Matchers.argThat(new ArgumentMatcher<User>() {
			@Override
			public boolean matches(Object argument) {
				return argument instanceof User && ((User) argument).getId() == inputUser.getId();
			}
		}));
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
