package com.itkweb.hday.config;

import java.util.List;
import java.util.Properties;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import javax.transaction.TransactionManager;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Spring configuration class to manage JPA transaction manager<br />
 * Enable also the entity manager factory
 * 
 * @author Vincent DAVY
 * 
 */

@Configuration
@ComponentScan("com.itkweb.hday.dao")
@PropertySource("classpath:/properties/MySQL-test.properties")
@EnableTransactionManagement
public class SpringDAOTestConfiguration {

	@Value("${jdbc.driverclass}")
	private String driverClass;

	@Value("${db.schemaName}")
	private String schemaName;

	@Value("${db.login}")
	private String login;

	@Value("${db.password}")
	private String password;

	@Value("${db.address}")
	private String address;

	@Value("#{'${hibernate.properties}'.split(',')}")
	private List<String> propertiesList;

	/**
	 * Create the {@link DataSource}
	 * 
	 * @return the {@link DataSource}
	 */
	@Bean
	public DataSource dataSource() {
		BasicDataSource dataSource = new BasicDataSource();
		dataSource.setDriverClassName(driverClass);
		dataSource.setUrl(address + schemaName);
		dataSource.setUsername(login);
		dataSource.setPassword(password);
		dataSource.setMaxActive(200);
		return dataSource;
	}

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
	 * Create the {@link TransactionManager}
	 *
	 * @return the {@link TransactionManager}
	 */
	@Bean
	public PlatformTransactionManager transactionManager() {
		return new JpaTransactionManager(entityManagerFactory().getObject());
	}

	/**
	 * Create the {@link EntityManagerFactory}
	 *
	 * @return the {@link LocalContainerEntityManagerFactoryBean}
	 */
	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
		LocalContainerEntityManagerFactoryBean emf = new LocalContainerEntityManagerFactoryBean();
		emf.setDataSource(dataSource());
		emf.setPackagesToScan("com.itkweb.hday");
		emf.setJpaVendorAdapter(new HibernateJpaVendorAdapter());

		Properties properties = new Properties();
		for (String property : propertiesList) {
			String[] propertyArray = property.split(":");
			if (propertyArray != null && propertyArray.length > 1) {
				properties.setProperty(propertyArray[0], propertyArray[1]);
			}

		}
		emf.setJpaProperties(properties);

		return emf;
	}
}
