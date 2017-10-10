package com.huayue.business.model.space;

import java.util.HashMap;

import com.huayue.business.model.nospace.DCounty;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 学校
 * @author CXL
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName="school")
public class School extends Model<School>{
	public static final School school = new School();
	/**
	 * 统计
	 * @return
	 */
	public HashMap<String,Integer> count() throws Exception{
		return DCounty.dCounty.count(school);
	}
}
