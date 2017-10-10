package com.huayue.business.model.nospace;

import java.util.List;

import com.huayue.business.util.DataAllCtrl;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 地方抗震救灾指挥部联系数据表
 * 
 * @author CXL
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName = "d_local_headquarters")
public class DLocalHeadquarters extends Model<DLocalHeadquarters> {
	public static final DLocalHeadquarters dLocalHeadquarters = new DLocalHeadquarters();
	DataAllCtrl dac = new DataAllCtrl();

	/**
	 * 查询所有数据
	 * 
	 * @param parameter
	 *            传入查询数据的条件
	 * @return 返回查询结果
	 */
	@SuppressWarnings("unchecked")
	public List<DLocalHeadquarters> query(Object parameter) throws Exception{
		return (List<DLocalHeadquarters>) dac.query(dLocalHeadquarters, parameter);
	}
}
