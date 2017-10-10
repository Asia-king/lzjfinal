package com.huayue.business.model.nospace;

import java.util.List;

import com.huayue.business.util.DataAllCtrl;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 军队与武装力量联系数据表
 * 
 * @author CXL
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName = "d_troop_communication")
public class DTroopCommunication extends Model<DTroopCommunication> {
	public static final DTroopCommunication dTroopCommunication = new DTroopCommunication();
	DataAllCtrl dac = new DataAllCtrl();

	/**
	 * 查询所有数据
	 * 
	 * @param parameter
	 *            传入查询数据的条件
	 * @return 返回查询结果
	 */
	@SuppressWarnings("unchecked")
	public List<DTroopCommunication> query(Object parameter) throws Exception{
		return (List<DTroopCommunication>) dac.query(dTroopCommunication, parameter);
	}
}
