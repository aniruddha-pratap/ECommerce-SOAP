package com.aniruddha.ebay;

import java.sql.SQLException;

import com.mysql.jdbc.Connection;
 
public class DBConnectWithPool {
  
 static ConnectionPool pool = new ConnectionPool();
  
 public static Connection getConnection() throws ClassNotFoundException, SQLException{
  Connection connection = pool.getConnectionFromPool();
  return connection;
 }
  
 public static void returnConnection(Connection connection) {
  pool.returnConnectionToPool(connection);
 }
}