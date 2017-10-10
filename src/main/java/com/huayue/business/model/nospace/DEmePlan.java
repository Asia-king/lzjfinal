package com.huayue.business.model.nospace;

import java.util.List;

import com.huayue.business.util.DataAllCtrl;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 地震应急法规与预案数据表
 * 
 * @author CXL
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName = "d_eme_plan")
public class DEmePlan extends Model<DEmePlan> {
	public static final DEmePlan dEmePlan = new DEmePlan();
	DataAllCtrl dac = new DataAllCtrl();

	/**
	 * 查询所有数据
	 * 
	 * @param parameter
	 *            传入查询数据的条件
	 * @return 返回查询结果
	 */
	@SuppressWarnings("unchecked")
	public List<DEmePlan> query(Object parameter) throws Exception{
		return (List<DEmePlan>) dac.query(dEmePlan, parameter);
	}
}
