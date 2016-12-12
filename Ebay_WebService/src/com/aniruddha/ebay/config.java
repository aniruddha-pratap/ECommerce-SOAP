package com.aniruddha.ebay;

public class config {
		 public String DB_USER_NAME ;
		  
		 public String DB_PASSWORD ;
		  
		 public String DB_URL;
		  
		 public String DB_DRIVER;
		  
		 public Integer DB_MAX_CONNECTIONS;
		  
		 public config(){
		  init();
		 }
		  
		 private static config configuration = new config();
		  
		 public static config getInstance(){ 
		  return configuration;
		 }
		  
		 private void init(){
		  DB_USER_NAME = "root";
		  DB_PASSWORD = "Kutki_89";
		  DB_URL = "jdbc:mysql://localhost:3306/test";
		  DB_DRIVER = "com.mysql.jdbc.Driver";
		  DB_MAX_CONNECTIONS = 100;
		 }
}
