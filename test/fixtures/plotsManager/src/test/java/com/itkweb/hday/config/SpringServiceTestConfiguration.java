package com.itkweb.hday.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@ComponentScan("com.itkweb.hday.service")
@PropertySource("classpath:/properties/MySQL-test.properties")
@EnableTransactionManagement
public class SpringServiceTestConfiguration {


}
