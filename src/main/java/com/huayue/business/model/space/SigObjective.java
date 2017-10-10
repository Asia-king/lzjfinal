package com.huayue.business.model.space;

import java.util.HashMap;

import com.huayue.business.model.nospace.DCounty;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 重大目标
 * @author CXL
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName="sig_objective")
public class SigObjective extends Model<SigObjective>{
	public static final SigObjective sigObjective = new SigObjective();
	/**
	 * 统计
	 * @return
	 */
	public HashMap<String, Integer> count() throws Exception{
		return DCounty.dCounty.count(sigObjective);
	}
}
