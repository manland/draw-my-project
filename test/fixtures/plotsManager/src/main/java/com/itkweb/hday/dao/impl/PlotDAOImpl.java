package com.itkweb.hday.dao.impl;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import com.itkweb.hday.dao.AbstractBaseDAO;
import com.itkweb.hday.dao.PlotDAO;
import com.itkweb.hday.model.database.Plot;

@Repository
public class PlotDAOImpl extends AbstractBaseDAO implements PlotDAO {

	@Override
	@Transactional
	public void deletePlot(Integer plotId) {

		Plot plot = entityManager.find(Plot.class, plotId);
		Assert.notNull(plot);

		entityManager.remove(plot);
	}
}
