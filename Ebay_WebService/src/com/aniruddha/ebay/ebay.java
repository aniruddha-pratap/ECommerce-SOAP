package com.aniruddha.ebay;

import javax.jws.WebMethod;
import javax.jws.WebService;

import org.json.JSONArray;

@WebService
public interface ebay {
	
	@WebMethod
	public JSONArray getProduct(String email);
	
	@WebMethod
	public JSONArray getBiddingProduct(String email);
	
	@WebMethod
	public JSONArray getLandingProduct();
	
	@WebMethod
	public JSONArray getCart(String email);
	
	@WebMethod
	public JSONArray getUserBids(String email);
	
	@WebMethod
	public JSONArray getUserOrders(String email);
	
	@WebMethod
	public JSONArray getUserPosted(String email);
	
	@WebMethod
	public boolean postProduct(String name, String description, String price, String quantity, String sellerInfo, String type);
	
	@WebMethod
	public JSONArray getUser(String email, String password);
	
	@WebMethod
	public boolean updateUserProfile(String firstName, String lastName, String phoneNumber, String dob, String address, String email);
	
	@WebMethod
	public boolean insertUser(String email, String password, String firstName, String lastName);
	
	@WebMethod
	public boolean addToCart(String productId, String email);
	
	@WebMethod
	public boolean removeFromCart(String productId, String email);
	
	@WebMethod
	public boolean checkout(String email);
	
	@WebMethod
	public boolean bidding(String productId, String email, String bidAmount);

}
