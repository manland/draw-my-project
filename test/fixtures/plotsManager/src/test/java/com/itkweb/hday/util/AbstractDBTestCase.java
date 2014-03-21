package com.itkweb.hday.util;

import java.io.InputStream;

import javax.sql.DataSource;

import org.dbunit.DataSourceDatabaseTester;
import org.dbunit.IDatabaseTester;
import org.dbunit.database.DatabaseConfig;
import org.dbunit.database.IDatabaseConnection;
import org.dbunit.dataset.IDataSet;
import org.dbunit.dataset.xml.FlatXmlDataSetBuilder;
import org.dbunit.ext.mysql.MySqlDataTypeFactory;
import org.dbunit.operation.DatabaseOperation;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.transaction.AfterTransaction;
import org.springframework.test.context.transaction.BeforeTransaction;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@RunWith(SpringJUnit4ClassRunner.class)
@TestExecutionListeners({ TransactionalTestExecutionListener.class, DependencyInjectionTestExecutionListener.class })
public abstract class AbstractDBTestCase extends AbstractSimpleTestCase {

	private IDatabaseTester dbTester;

	@Autowired
	private DataSource dataSource;

	@Autowired
	private ApplicationContext applicationContext;

	@BeforeTransaction
	public void setUp() throws Exception {
		dbTester = new DataSourceDatabaseTester(dataSource) {
			@Override
			public IDatabaseConnection getConnection() throws Exception {
				IDatabaseConnection connection = super.getConnection();
				connection.getConfig()
				.setProperty(DatabaseConfig.PROPERTY_DATATYPE_FACTORY, new MySqlDataTypeFactory());

				return connection;
			}
		};
		dbTester.getConnection().getConfig()
		.setProperty(DatabaseConfig.PROPERTY_DATATYPE_FACTORY, new MySqlDataTypeFactory());
		dbTester.setDataSet(getDataSet(getDataSetFilename()));
		dbTester.onSetup();
	}

	/**
	 * @AfterTransaction Indicates that the annotated public void method should be executed after a transaction has
	 *                   ended for test methods configured to run within a transaction through the @Transactional
	 *                   annotation (AbstractDBTestCase is @Transactional).
	 * 
	 *                   If we use the classical @After, there can be deadlocks when tests save new object in database :
	 *                   teardown try to delete the entire database while newly created objects is not committed.
	 * 
	 *                   http://static.springsource.org/spring/docs/3.0.x/reference/testing.html
	 * 
	 */
	@AfterTransaction
	public void tearDown() throws Exception {
		DatabaseOperation.CLOSE_CONNECTION(DatabaseOperation.DELETE_ALL).execute(dbTester.getConnection(),
				dbTester.getDataSet());
		dbTester.onTearDown();

	}

	protected abstract String getDataSetFilename() throws Exception;

	/**
	 * Returns a IDataSet from a XML file. Can be used in the {@link #getDataSetFilename()} method.
	 * 
	 * @param xmlFile
	 *            name of the XML data file located in src/test/resources/dbUnitDatasets and conform to
	 *            database_schema.dtd, in the same directory
	 * @return a valid IDataSet to be used by a DBUnit test case
	 * @throws Exception
	 */
	protected IDataSet getDataSet(String xmlFile) throws Exception {
		InputStream stream = this.getClass().getResourceAsStream(xmlFile);
		String dtdResourceName = "classpath:database_schema.dtd";
		Resource res = applicationContext.getResource(dtdResourceName);
		FlatXmlDataSetBuilder builder = new FlatXmlDataSetBuilder();
		builder.setMetaDataSetFromDtd(res.getInputStream());
		return builder.build(stream);
	}
}
