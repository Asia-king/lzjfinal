package com.huayue.business.model.nospace;

import java.util.List;

import com.huayue.business.util.DataAllCtrl;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 行政区医疗力量数据表
 * 
 * @author CXL
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName = "d_medical")
public class DMedical extends Model<DMedical> {
	public static final DMedical dMedical = new DMedical();
	DataAllCtrl dac = new DataAllCtrl();

	/**
	 * 查询所有数据
	 * 
	 * @param parameter
	 *            传入查询数据的条件
	 * @return 返回查询结果
	 */
	@SuppressWarnings("unchecked")
	public List<DMedical> query(Object parameter) throws Exception{
		return (List<DMedical>) dac.query(dMedical, parameter);
	}
}
