package org.cmpe273.calculator.BS;

import org.cmpe273.calculator.operations;

public class calculatorImpl implements operations {
	
	public int add(int oldValue,int newValue){
		return oldValue+newValue;
	}

	public int subtract(int oldValue,int newValue){
		return oldValue-newValue;
	}
	
	public int mutliply(int oldValue,int newValue){
		return oldValue*newValue;
	}
	
	public int division(int oldValue,int newValue){
		return oldValue/newValue;
	}
}
