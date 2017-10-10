package com.huayue.business.model.nospace;

import java.util.List;

import com.huayue.business.util.DataAllCtrl;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 灾情速报网络数据表
 * 
 * @author CXL
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName = "d_local_net")
public class DLocalNet extends Model<DLocalNet> {
	public static final DLocalNet dLocalNet = new DLocalNet();
	DataAllCtrl dac = new DataAllCtrl();

	/**
	 * 查询所有数据
	 * 
	 * @param parameter
	 *            传入查询数据的条件
	 * @return 返回查询结果
	 */
	@SuppressWarnings("unchecked")
	public List<DLocalNet> query(Object parameter) throws Exception{
		return (List<DLocalNet>) dac.query(dLocalNet, parameter);
	}
}
