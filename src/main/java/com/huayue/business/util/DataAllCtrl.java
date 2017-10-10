package com.huayue.business.util;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.huayue.jbase.jfinal.ext.model.Model;

public class DataAllCtrl {
	/**默认的格式化方式*/
	private static final String defaultFormat = "yyyy-MM-dd HH:mm:ss";
	
	/**
	 * 以指定格式返回当前时间的字符串表现形式
	 * yyyy-MM-dd
	 * @return
	 */
	public static String getCurrentDate() {
		String format="yyyy-MM-dd";
		Date date = new Date();
		date.setTime(System.currentTimeMillis());
		if (format == null || "".equals(format.trim())) {
			format = defaultFormat;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		return sdf.format(date);
	}
	/**
	 * 以指定格式返回当前时间的字符串表现形式
	 * yyyyMMddHHmmss
	 * @return
	 */
	public static String getCurrentTime() {
		String format="yyyyMMddHHmmss";
		Date date = new Date();
		date.setTime(System.currentTimeMillis());
		if (format == null || "".equals(format.trim())) {
			format = defaultFormat;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		return sdf.format(date);
	}
	/**
	 * 以传入格式返回当前时间的字符串表现形式
	 * @param format
	 * @return
	 */
	public static String getCurrentDefault(){
		String format = "";
		Date date = new Date();
		date.setTime(System.currentTimeMillis());
		if (format == null || "".equals(format.trim())) {
			format = defaultFormat;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		return sdf.format(date);
	}
	
	/**
	 * 根据传入的参数，动态的去查询
	 * 
	 * @param className
	 *            传入的实体对象
	 * @param parameter
	 *            传入的查询参数
	 * @return 返回传入的对象查询结果的list集合
	 */
	@SuppressWarnings("unchecked")
	public List<?> query(Model<?> className, Object parameter) throws Exception {
		List<Model<?>> list = new ArrayList<Model<?>>();
		String tableName = className.tableName.toString();
		if (parameter.toString().toLowerCase().equals("all")) {
			list = (List<Model<?>>) className.list();
		} else {
			String fields = "select COLUMN_NAME from information_schema.COLUMNS where table_name = '" + tableName
					+ "' and table_schema = 'earthquake';";
			list = (List<Model<?>>) className.find(fields);
			String sqlBegin = "select * from " + tableName + " where";
			String sqlEnd = "";
			for (int i = 0; i < list.size(); i++) {
				sqlEnd += (" " + list.get(i).getStr("COLUMN_NAME") + " like '%" + parameter + "%' or");
			}
			sqlEnd = sqlEnd.substring(0, sqlEnd.length() - 2);
			list = (List<Model<?>>) className.find(sqlBegin + sqlEnd + ";");
		}
		return list;
	}
	
	/**
	 * 根据传入的实体对象和参数查询数据
	 * @param className 传入的实体对象
	 * @param parameter	传入的参数
	 * @return 返回传入参数的对象查询结果的list集合
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<?> reportQuery(Model<?> className,Object parameter) throws Exception{
		List<String> removeList = new ArrayList<String>();
		removeList.add("id");
		removeList.add("eq_id");
		removeList.add("state");
		removeList.add("check");
		removeList.add("img_url");
		removeList.add("video_url");
		removeList.add("audio_url");
		removeList.add("user_id");
		removeList.add("abnormal_id");
		List<Model<?>> list = new ArrayList<Model<?>>();
		String tableName = className.tableName.toString();
		if(parameter.toString().toLowerCase().equals("all")){
			list = (List<Model<?>>) className.list();
		} else {
			String fields = "select COLUMN_NAME from information_schema.COLUMNS where table_name = '" + tableName
					+ "' and table_schema = 'earthquake';";
			list = (List<Model<?>>) className.find(fields);
			String sqlBegin = "select * from "+ tableName+" where";
			String sqlEnd = "";
			for(int i = 0;i < list.size(); i++){
				for(int j = 0;j < removeList.size(); j++){
					if((removeList.get(j).equals(list.get(i).getStr("COLUMN_NAME")))){
						list.remove(i);
					}
				}
			}
			for(int i = 0;i < list.size();i++){
				sqlEnd += (" " + list.get(i).getStr("COLUMN_NAME") + " like '%" + parameter + "%' or");
			}
			sqlEnd = sqlEnd.substring(0, sqlEnd.length() - 2);
			list = (List<Model<?>>) className.find(sqlBegin+ sqlEnd + ";");
		}
		return list;
	}
	
	/**
	 * 根据传入的实体对象和参数查询数据
	 * @param className 传入的实体对象
	 * @param parameter	传入的参数
	 * @return 返回传入参数的对象查询结果的list集合
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<?> reportQuery(Model<?> className,Object parameter,String sqlCon) throws Exception{
		List<String> removeList = new ArrayList<String>();
		removeList.add("id");
		removeList.add("eq_id");
		removeList.add("state");
		removeList.add("check");
		removeList.add("img_url");
		removeList.add("video_url");
		removeList.add("audio_url");
		removeList.add("user_id");
		removeList.add("abnormal_id");
		List<Model<?>> list = new ArrayList<Model<?>>();
		String tableName = className.tableName.toString();
		if(parameter.toString().toLowerCase().equals("all")){
			if(sqlCon.toString().equals( "NULL")){
				list = (List<Model<?>>) className.list();
			}else{
				list = (List<Model<?>>) className.list("where " + sqlCon);
			}
				
		} else {
			String fields = "select COLUMN_NAME from information_schema.COLUMNS where table_name = '" + tableName
					+ "' and table_schema = 'earthquake';";
			list = (List<Model<?>>) className.find(fields);
			String sqlBegin = "";
			String sqlEnd = "";
			for(int i = 0;i < list.size(); i++){
				for(int j = 0;j < removeList.size(); j++){
					if((removeList.get(j).equals(list.get(i).getStr("COLUMN_NAME")))){
						list.remove(i);
					}
				}
			}
			for(int i = 0;i < list.size();i++){
				sqlEnd += (" " + list.get(i).getStr("COLUMN_NAME") + " like '%" + parameter + "%' or");
			}
			
			if(sqlCon.toString().equals( "NULL")){
				sqlBegin = "select * from "+ tableName+" where";
				sqlEnd = sqlEnd.substring(0, sqlEnd.length() - 2);
			}else{
				sqlBegin = "select * from "+ tableName+" where " + sqlCon +"and (" ;
				sqlEnd = sqlEnd.substring(0, sqlEnd.length() - 2) + ")";
			}
			
			list = (List<Model<?>>) className.find(sqlBegin+ sqlEnd + ";");
			
		}
		return list;
	}
	
	/**
	 * 根据传入的实体对象以及参数，修改上报审核状态
	 * @param className
	 * @param id
	 * @param check
	 * @return
	 */
	
	public Boolean reportUpdate(Model<?> className,Object id,Object check){
		return className.findById(id).set("check", check).update();
	}
	
	/**
	 * 根据传入的实体对象以及参数，删除上报数据
	 * @param className
	 * @param ids
	 * @return
	 */
	
	public Boolean reportDelete(Model<?> className,Object ids){
		Boolean flg = true;
		String[] id = ids.toString().split(",");
		for(int i = 0;i < id.length;i++){
			if(!className.deleteById(id[i])){
				flg = false;
			};
		}
		if(flg){
			return true;
		}else{
			return false;
		}
	}

}
