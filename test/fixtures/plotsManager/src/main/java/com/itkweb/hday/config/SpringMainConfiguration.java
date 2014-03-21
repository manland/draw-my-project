/**
 * 
 */
package com.itkweb.hday.config;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.http.converter.json.Jackson2ObjectMapperFactoryBean;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Enable Spring features Component scan is here for Spring configuration
 * 
 * @author Vincent DAVY
 * 
 */
@Configuration
@ComponentScan("com.itkweb.hday")
@PropertySources({ @PropertySource("classpath:/properties/REST.properties"),
		@PropertySource("classpath:/properties/MySQL.properties") })
public class SpringMainConfiguration {

	/**
	 * This is needed to parse properties placeholders (${...}) and is must be in a static way
	 * 
	 * @see http://www.java-allandsundry.com/2013/07/spring-bean-and-propertyplaceholderconf.html
	 * @see http 
	 *      ://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/context/annotation/Configuration.html
	 *      "Working with externalized values" section
	 * @return the {@link PropertySourcesPlaceholderConfigurer}
	 */
	@Bean
	public static PropertySourcesPlaceholderConfigurer placeHolderConfigurer() {
		return new PropertySourcesPlaceholderConfigurer();
	}

	/**
	 * Create a {@link Jackson2ObjectMapperFactoryBean} to allow to use {@link ObjectMapper} into services
	 * 
	 * @return the factory bean
	 */
	@Bean
	public Jackson2ObjectMapperFactoryBean jackson2ObjectMapperFactoryBean() {
		Jackson2ObjectMapperFactoryBean factoryBean = new Jackson2ObjectMapperFactoryBean();
		return factoryBean;
	}

	/**
	 * Setup a {@link MessageSource} for any internationalization
	 * 
	 * @return the {@link MessageSource}
	 */
	@Bean
	public MessageSource messageSource() {
		ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
		messageSource.setBasename("classpath:/messages/messages");
		return messageSource;
	}

}
