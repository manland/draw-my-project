package com.itkweb.hday.config;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

/**
 * Initializer of project context
 * 
 * @see http://kielczewski.eu/2013/11/spring-mvc-without-web-xml-using-webapplicationinitializer/
 * @see http://docs.spring.io/spring/docs/current/javadoc-api/index.html?org/springframework/web/
 *      SpringServletContainerInitializer.html
 * @author Vincent DAVY
 * 
 */
public class WebAppInitializer implements WebApplicationInitializer {

	private static final String DISPATCH_SERVLET_NAME = "dispatcher";
	private static final String DISPATCH_SERVLET_MAPPING = "/rest/*";

	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		// Create the 'root' Spring application context
		AnnotationConfigWebApplicationContext rootContext = new AnnotationConfigWebApplicationContext();
		rootContext.register(SpringMainConfiguration.class);

		// Manage the lifecycle of the root application context
		servletContext.addListener(new ContextLoaderListener(rootContext));

		// Register and map the dispatcher servlet
		ServletRegistration.Dynamic dispatcher = servletContext.addServlet(DISPATCH_SERVLET_NAME,
				new DispatcherServlet(rootContext));
		dispatcher.setLoadOnStartup(1);
		dispatcher.addMapping(DISPATCH_SERVLET_MAPPING);
	}
}
