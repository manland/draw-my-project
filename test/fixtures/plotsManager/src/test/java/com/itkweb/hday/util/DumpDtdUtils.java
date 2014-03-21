package com.itkweb.hday.util;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;

import org.apache.commons.dbcp.BasicDataSource;
import org.dbunit.database.DatabaseConfig;
import org.dbunit.database.DatabaseDataSourceConnection;
import org.dbunit.database.DatabaseSequenceFilter;
import org.dbunit.database.IDatabaseConnection;
import org.dbunit.dataset.DataSetException;
import org.dbunit.dataset.FilteredDataSet;
import org.dbunit.dataset.IDataSet;
import org.dbunit.dataset.xml.FlatDtdDataSet;
import org.dbunit.ext.mysql.MySqlDataTypeFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.itkweb.hday.config.SpringDatabaseDtdTestConfiguration;

public class DumpDtdUtils {

	protected static final Logger logger = LoggerFactory.getLogger(DumpDtdUtils.class);

	/**
	 * @param args
	 * @throws SQLException
	 * @throws DataSetException
	 * @throws IOException
	 * @throws FileNotFoundException
	 */
	public static void main(String[] args) throws SQLException, DataSetException, FileNotFoundException, IOException {
		BasicDataSource dataSource = loadSpringConfiguration();
		IDataSet dataSet = extractDataSet(dataSource);
		FileOutputStream stream = new FileOutputStream("database_schema.dtd");
		FlatDtdDataSet.write(dataSet, stream);
		logger.info("DTD Dump written. Look for database_schema.dtd in your project");
	}

	private static IDataSet extractDataSet(BasicDataSource dataSource) throws SQLException, DataSetException {
		IDatabaseConnection connection = new DatabaseDataSourceConnection(dataSource);
		connection.getConfig().setProperty(DatabaseConfig.PROPERTY_DATATYPE_FACTORY, new MySqlDataTypeFactory());
		IDataSet dataSet = new FilteredDataSet(new DatabaseSequenceFilter(connection), connection.createDataSet());
		return dataSet;
	}

	private static BasicDataSource loadSpringConfiguration() {
		final AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(
				SpringDatabaseDtdTestConfiguration.class);

		BasicDataSource dataSource = (BasicDataSource) context.getBean("dataSource");
		return dataSource;
	}

}