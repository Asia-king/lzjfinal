package com.huayue.system.model;

import java.util.Collections;
import java.util.List;

import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

@TableBind(tableName = "index_msg")
public class Msg extends Model<Msg>
{
	private static final long serialVersionUID = -128801010211787215L;

	public static Msg dao = new Msg();

	public List<Msg> list()
	{
		List<Msg> list= dao.find(sql("index.msg.list"));
		Collections.reverse(list);
		return list;
	}
	
	
	

}
