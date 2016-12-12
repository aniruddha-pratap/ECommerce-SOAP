package com.aniruddha.ebay.BS;

import java.sql.*;
import javax.jws.WebService;
import org.json.JSONArray;

import com.aniruddha.ebay.DBConnect;
import com.aniruddha.ebay.DBConnectWithPool;
//import com.mysql.jdbc.Connection;
import com.aniruddha.ebay.RsToJSON;



@WebService
public class ebayImplementation {
	
	//DBConnectWithPool dataSource = new DBConnectWithPool();
		DBConnect db = new DBConnect();
		Connection conn = db.getConnection();
		String arr[];	
		
		public String getProduct(String email) throws Exception{
			JSONArray json = new JSONArray();
			try{
			//	Connection conn = DBConnectWithPool.getConnection();
				PreparedStatement ps = conn.prepareStatement("select * from products where sellerInfo != '"+email+"' AND type = 'new'");
				ResultSet rs = ps.executeQuery();
				json = RsToJSON.converter(rs);
			}
			catch(Exception e){
				System.out.println(e);
			}
			conn.close();
			return json.toString();
		}
		
		public String getBiddingProduct(String email) throws Exception{
			JSONArray json = new JSONArray();
			try{
				PreparedStatement ps = conn.prepareStatement("select * from products where sellerInfo != '"+email+"' AND type = 'bidding' AND timestampdiff(day, date, now()) < 4");
				ResultSet rs = ps.executeQuery();
				json = RsToJSON.converter(rs);
			}catch(Exception e){
				System.out.println(e);
			}
			conn.close();
			return json.toString();
		}
		
		public String getLandingProduct() throws Exception{
			JSONArray json = new JSONArray();
			try{
				PreparedStatement ps = conn.prepareStatement("select name,description,price,quantity,sellerInfo from products where type = 'new'");
				ResultSet rs = ps.executeQuery();
				json = RsToJSON.converter(rs);
			}catch(Exception e){
				System.out.println(e);
			}
			conn.close();
			return json.toString();
		}
		
		public String getCart(String email) throws Exception{
			JSONArray json = new JSONArray();
			try{
				PreparedStatement ps = conn.prepareStatement("Select * from cart where addedBy = '"+email+"'");
				ResultSet rs = ps.executeQuery();
				json = RsToJSON.converter(rs);
			}catch(Exception e){
				System.out.println(e);
			}
			conn.close();
			return json.toString();
		}
		
		public String getUserBids(String email) throws Exception{
			JSONArray json = new JSONArray();
			try{
				PreparedStatement ps = conn.prepareStatement("select * from biddingdetails where bidowner = '"+email+"'");
				ResultSet rs = ps.executeQuery();
				json = RsToJSON.converter(rs);
			}catch(Exception e){
				System.out.println(e);
			}
			return json.toString();
		}
		
		public String getUserOrders(String email) throws Exception{
			JSONArray json = new JSONArray();
			try{
				PreparedStatement ps = conn.prepareStatement("select * from orders where owner = '"+email+"'");
				ResultSet rs = ps.executeQuery();
				json = RsToJSON.converter(rs);
			}catch(Exception e){
				System.out.println(e);
			}
			conn.close();
			return json.toString();
		}
		
		public String getUserPosted(String email) throws Exception{
			JSONArray json = new JSONArray();
			try{
				PreparedStatement ps = conn.prepareStatement("select * from products where sellerInfo = '"+email+"'");
				ResultSet rs = ps.executeQuery();
				json = RsToJSON.converter(rs);
			}catch(Exception e){
				System.out.println(e);
			}
			conn.close();
			return json.toString();
		}
		
		public boolean postProduct(String name, String description, String price, String quantity, String sellerInfo, String type) throws Exception{
			boolean res = false;
			try{
				PreparedStatement ps = conn.prepareStatement("INSERT into products(name,description,price,quantity,sellerInfo,type) values ('" + name + "','" + description + "','" + price + "','" + quantity + "','" + sellerInfo +"','"+type+"')");
				int insertedRecords = ps.executeUpdate();
				if(insertedRecords == 1){
					res = true;
				}
			}catch(Exception e){
				
			}
			conn.close();
			return res;
		}
		
		public String getUser(String email, String password) throws Exception{
			//DBConnectWithPool dataSource = new DBConnectWithPool();
			JSONArray json = new JSONArray();
			try{
				Connection conn = DBConnectWithPool.getConnection();
				PreparedStatement ps = conn.prepareStatement("select * from users where username ='"+email+"'");
				ResultSet rs = ps.executeQuery();
				while(rs.next()){
					System.out.println(rs.getString("password"));
					if(rs.getString("password").equals(password)){
						json = RsToJSON.converter(rs);
					}
				}
			}catch(Exception e){
				System.out.println(e);
			}
			//DBConnectWithPool.returnConnection(conn);
			conn.close();
			return json.toString();
		}
		
		public boolean updateUserProfile(String firstName, String lastName, String phoneNumber, String dob, String address, String email) throws Exception{
			boolean res = false;
			try{
				PreparedStatement ps = conn.prepareStatement("UPDATE users SET firstName = '"+firstName+"',lastName = '"+lastName+"',cellnumber = '"+phoneNumber+"',dob ='"+dob+"',address = '"+address+"' WHERE username ='"+email+"'");
				int insertedRecords = ps.executeUpdate();
				if(insertedRecords == 1){
					res = true;
				}
			}catch(Exception e){
				
			}
			conn.close();
			return res;
		}
		
		public boolean insertUser(String email, String password, String firstName, String lastName) throws Exception{
			boolean res = false;
			try{
				int counter = 0;
				PreparedStatement ps = conn.prepareStatement("select username, password from users where username='"+email+"'");
				PreparedStatement psInsert = conn.prepareStatement("INSERT INTO users (firstName,lastName,username,password) values ('" + firstName + "','" + lastName + "','" + email + "','" + password +"')");
				ResultSet rs = ps.executeQuery();
				while(rs.next()){
					counter++;			
				}
				System.out.println(counter);
				if(counter == 0){
					int insertedRecords = psInsert.executeUpdate();
					if(insertedRecords == 1){
						res = true;
					}else{
						res = false;
					}
				}else{
					res = false;
				}
			}catch(Exception e){
				System.out.println(e);
			}
			conn.close();
			return res;
		}
		
		public boolean addToCart(String productId, String email) throws Exception{
			boolean res = false;
			try {
				int counter = 0;
				PreparedStatement ps = conn.prepareStatement("select * from products where p_id = '"+productId+"'");
				ResultSet rs =ps.executeQuery();
				while(rs.next()){
					int quantity = rs.getInt(5);
					System.out.println("Product Qty "+quantity);
					if(quantity != 0){
						PreparedStatement queryCart = conn.prepareStatement("Select product, quantity from cart where productId = '"+productId+"' AND addedBy = '"+ email +"'");
						ResultSet cart = queryCart.executeQuery();
						while(cart.next()){
							counter++;
							int cartQty = cart.getInt(2);
							System.out.println("Cart Product Qty "+cartQty);
							PreparedStatement updateCart = conn.prepareStatement("UPDATE cart SET quantity = quantity + 1 where productId = '"+productId+"' AND addedBy = '"+ email +"'");
							if(cartQty < quantity){
								int cartUpdated = updateCart.executeUpdate();
								if(cartUpdated != 0){
									res = true;
								}
							}
						}
						if(counter == 0){
							System.out.println("Inside insert into cart");
							PreparedStatement insertCart = conn.prepareStatement("INSERT INTO cart (product, quantity, price, addedBy, productId) values ('" + rs.getString("name") + "','" + '1' + "','" + rs.getString("price") + "','" + email + "','" + productId+"')");
							int cartInserted = insertCart.executeUpdate();
							if(cartInserted != 0){
								res = true;
							}
						}
					}
				}
			}
			catch (Exception e) {
				System.out.println(e);
			}
			conn.close();
			return res;
		}
		
		public boolean removeFromCart(String productId, String email) throws Exception{
			boolean res = false;
			try{
				PreparedStatement ps = conn.prepareStatement("select product, quantity from cart where productId = '"+productId+"' AND addedBy = '"+ email +"'");
				ResultSet rs =ps.executeQuery();
				while(rs.next()){
					int cartQty = rs.getInt(2);
					if(cartQty > 1){
						PreparedStatement updateCart = conn.prepareStatement("update cart set quantity = quantity - 1 where productId = '"+productId+"' AND addedBy = '"+ email +"'");
						int cartUpdated = updateCart.executeUpdate();
						if(cartUpdated != 0){
							res = true;
						}
					}else{
						PreparedStatement deleteCart = conn.prepareStatement("delete from cart where productId = '"+ productId +"' AND addedBy = '"+ email +"'");
						int cartDeleted = deleteCart.executeUpdate();
						if(cartDeleted != 0){
							res = true;
						}
					}
				}
			}catch(Exception e){
				System.out.println(e);
			}
			conn.close();
			return res;
		}
		
		public boolean checkout(String email) throws Exception{
			boolean res = false;
			try {
				int counter = 0;
				PreparedStatement getCart = conn.prepareStatement("select quantity, productId from cart where addedBy = '"+email+"'");
				ResultSet rs =getCart.executeQuery();
				while(rs.next()){
					PreparedStatement updateProduct = conn.prepareStatement("UPDATE products SET quantity = quantity - "+ rs.getInt(1) +" WHERE p_id = '"+rs.getString("productId")+"'");
					int updatedProduct = updateProduct.executeUpdate();
					if(updatedProduct != 0){
						counter++;
					}
				}
				if(counter != 0){
					PreparedStatement insertOrder = conn.prepareStatement("INSERT INTO orders (product,quantity,owner) SELECT product,quantity,addedBy FROM cart where addedBy = '"+email+"'");
					int orderInserted = insertOrder.executeUpdate();
					if(orderInserted != 0){
						PreparedStatement deleteCart = conn.prepareStatement("DELETE FROM cart where addedBy = '"+email+"'");
						int cartDeleted = deleteCart.executeUpdate();
						if(cartDeleted != 0){
							res = true;						
						}
					}
				}
			}
			catch (Exception e) {
				System.out.println(e);
			}
			conn.close();
			return res;
		}
		
		public boolean bidding(String productId, String email, String bidAmount) throws Exception{
			boolean res = false;
			try {
				int counter = 0;
				PreparedStatement getBids = conn.prepareStatement("select * from biddingdetails where productId = '"+productId+"' AND bidowner = '"+email+"'");
				ResultSet rs =getBids.executeQuery();
				while(rs.next()){
					counter++;
					PreparedStatement updateBid = conn.prepareStatement("update biddingdetails set bidprice ='"+bidAmount+"'");
					int bidUpdated = updateBid.executeUpdate();
					if(bidUpdated != 0){
						res= true;
					}
				}
				if(counter == 0){
					PreparedStatement getProduct = conn.prepareStatement("select * from products where p_id = '"+productId+"'");
					ResultSet rsProduct =getProduct.executeQuery();
					while(rsProduct.next()){
						PreparedStatement insertBid = conn.prepareStatement("INSERT into biddingdetails (product,productId,baseprice,sellerInfo,bidowner,bidprice) values ('"+rsProduct.getString("name")+"','"+productId+"','"+rsProduct.getString("price")+"','"+rsProduct.getString("sellerInfo")+"','"+email+"','"+bidAmount+"')");
						int bidInserted = insertBid.executeUpdate();
						if(bidInserted != 0){
							res= true;
						}
					}
				}
			}
			catch (Exception e) {
				System.out.println(e);
			}
			conn.close();
			return res;
		}
		
}
