package org.cmpe273.calculator;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface operations {
	
	@WebMethod
	public int add(int oldValue,int newValue);
		
	@WebMethod
	public int subtract(int oldValue,int newValue);
		
	@WebMethod
	public int mutliply(int oldValue,int newValue);
		
	@WebMethod
	public int division(int oldValue, int newValue);
		
}
