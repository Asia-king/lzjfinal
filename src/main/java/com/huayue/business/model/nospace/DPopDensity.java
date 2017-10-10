package com.huayue.business.model.nospace;

import java.util.List;

import com.huayue.business.util.DataAllCtrl;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 人口密度
 * 
 * @author CXL
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName = "d_pop_density")
public class DPopDensity extends Model<DPopDensity> {
	public static final DPopDensity dPopDensity = new DPopDensity();
	DataAllCtrl dac = new DataAllCtrl();

	/**
	 * 查询所有数据
	 * 
	 * @param parameter
	 *            传入查询数据的条件
	 * @return 返回查询结果
	 */
	@SuppressWarnings("unchecked")
	public List<DPopDensity> query(Object parameter) throws Exception{
		return (List<DPopDensity>) dac.query(dPopDensity, parameter);
	}
}
