package com.huayue.business.model.nospace;

import java.util.List;

import com.huayue.business.util.DataAllCtrl;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 区县中农村房屋统计比例表
 * 
 * @author CXL
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName = "d_rur_ratio")
public class DRurRatio extends Model<DRurRatio> {
	public static final DRurRatio dRurRatio = new DRurRatio();
	DataAllCtrl dac = new DataAllCtrl();

	/**
	 * 查询所有数据
	 * 
	 * @param parameter
	 *            传入查询数据的条件
	 * @return 返回查询结果
	 */
	@SuppressWarnings("unchecked")
	public List<DRurRatio> query(Object parameter) throws Exception{
		return (List<DRurRatio>) dac.query(dRurRatio, parameter);
	}
}
