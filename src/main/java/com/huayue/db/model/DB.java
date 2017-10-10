package com.huayue.db.model;

import com.huayue.jbase.jfinal.ext.model.EasyuiModel;
import com.jfinal.ext.plugin.tablebind.TableBind;

@TableBind(tableName = "columns")
public class DB extends EasyuiModel<DB>{
	/**
	 * 
	 */
	private static final long serialVersionUID = 597180210965138525L;
	public static DB dao = new DB();
}
