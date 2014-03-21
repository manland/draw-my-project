/**
 * 
 */
package com.itkweb.hday.interceptors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**
 * Service implementing {@link HandlerInterceptor} to manage response character encoding
 * 
 * @author Vincent DAVY
 * 
 */
@Service
public class CharacterEncodingInterceptor implements HandlerInterceptor {

	// char encoding to use
	@Value("${rest.characterEncoding}")
	private String charsetToUse;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		if (!charsetToUse.equals(response.getCharacterEncoding())) {
			response.setCharacterEncoding(charsetToUse);
		}

		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {

	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {

	}

}
