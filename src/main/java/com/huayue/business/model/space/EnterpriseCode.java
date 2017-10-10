package com.huayue.business.model.space;

import java.util.HashMap;

import com.huayue.business.model.nospace.DCounty;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 大型企业表
 * @author CXL
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName="enterprise_code")
public class EnterpriseCode extends Model<EnterpriseCode>{
	public static final EnterpriseCode enterpriseCode = new EnterpriseCode();
	/**
	 * 统计
	 * @return
	 */
	public HashMap<String, Integer> count(){
		return DCounty.dCounty.count(enterpriseCode);
	}
}
