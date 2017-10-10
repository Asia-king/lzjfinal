package com.huayue.business.model.space;

import java.util.HashMap;

import com.huayue.business.model.nospace.DCounty;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 地震地质灾害危险区分布属性表
 * @author CXL
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName="geo_hazard")
public class GeologicalHazard extends Model<GeologicalHazard>{
	public static final GeologicalHazard geologicalHazard = new GeologicalHazard();
	/**
	 * 统计
	 * @return
	 */
	public HashMap<String,Integer> count() throws Exception{
		return DCounty.dCounty.count(geologicalHazard);
	}
}
