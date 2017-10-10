package com.huayue.business.model.nospace;

import java.util.List;

import com.huayue.business.util.DataAllCtrl;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 地震系统联系数据表
 * 
 * @author CXL
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName = "d_nsb_communication")
public class DNsbCommunication extends Model<DNsbCommunication> {
	public static final DNsbCommunication dNsbCommunication = new DNsbCommunication();
	DataAllCtrl dac = new DataAllCtrl();

	/**
	 * 查询所有数据
	 * 
	 * @param parameter
	 *            传入查询数据的条件
	 * @return 返回查询结果
	 */
	@SuppressWarnings("unchecked")
	public List<DNsbCommunication> query(Object parameter) throws Exception{
		return (List<DNsbCommunication>) dac.query(dNsbCommunication, parameter);
	}
}
