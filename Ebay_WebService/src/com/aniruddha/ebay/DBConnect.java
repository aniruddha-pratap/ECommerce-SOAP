package com.aniruddha.ebay;
import java.sql.*;

public class DBConnect {
 	private Connection conn;
	public Connection getConnection(){
		try{
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/test","root","Kutki_89");
			System.out.println("Connected to the DB");
			return conn;
		}catch(Exception e){
			System.out.println("Exception "+e);
		}
		return null;
	}
}
