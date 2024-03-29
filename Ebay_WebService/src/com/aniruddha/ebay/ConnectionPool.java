package com.aniruddha.ebay;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
 
import com.mysql.jdbc.Connection;
 
public class ConnectionPool {
  
 List<Connection> availableConnections = new ArrayList<Connection>();
 
 public ConnectionPool()
 {
  initializeConnectionPool();
 }
 
 private void initializeConnectionPool()
 {
  while(!checkIfConnectionPoolIsFull())
  {
   availableConnections.add(createNewConnectionForPool());
  }
 }
 
 private synchronized boolean checkIfConnectionPoolIsFull()
 {
  final int MAX_POOL_SIZE = config.getInstance().DB_MAX_CONNECTIONS;
 
  if(availableConnections.size() < MAX_POOL_SIZE)
  {
   return false;
  }
 
  return true;
 }
 
 //Creating a connection
 private Connection createNewConnectionForPool()
 {
  config configure = config.getInstance();
  try {
   Class.forName(configure.DB_DRIVER);
   Connection connection = (Connection) DriverManager.getConnection(
		   configure.DB_URL, configure.DB_USER_NAME, configure.DB_PASSWORD);
   return connection;
  } catch (ClassNotFoundException e) {
   e.printStackTrace();
  } catch (SQLException e) {
   e.printStackTrace();
  }
  return null;
   
 }
 
 public synchronized Connection getConnectionFromPool()
 {
  Connection connection = null;
  if(availableConnections.size() > 0)
  {
   connection = (Connection) availableConnections.get(0);
   availableConnections.remove(0);
  }
  return connection;
 }
 
 public synchronized void returnConnectionToPool(Connection connection)
 {
  availableConnections.add(connection);
 }
}