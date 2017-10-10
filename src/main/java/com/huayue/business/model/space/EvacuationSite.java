package com.huayue.business.model.space;

import java.util.HashMap;

import com.huayue.business.model.nospace.DCounty;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 城区疏散场地
 * @author CXL
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName="evacuation_site")
public class EvacuationSite extends Model<EvacuationSite>{
	public static final EvacuationSite evacuationSite = new EvacuationSite();
	/**
	 * 统计
	 * @return
	 */
	public HashMap<String, Integer> count() throws Exception{
		return DCounty.dCounty.count(evacuationSite);
	}
}
