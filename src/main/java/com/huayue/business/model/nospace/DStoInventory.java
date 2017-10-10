package com.huayue.business.model.nospace;

import java.util.List;

import com.huayue.business.util.DataAllCtrl;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 救灾物资仓库明细数据表
 * 
 * @author CXL
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName = "d_sto_inventory")
public class DStoInventory extends Model<DStoInventory> {
	public static final DStoInventory dStoInventory = new DStoInventory();
	DataAllCtrl dac = new DataAllCtrl();

	/**
	 * 查询所有数据
	 * 
	 * @param parameter
	 *            传入查询数据的条件
	 * @return 返回查询结果
	 */
	@SuppressWarnings("unchecked")
	public List<DStoInventory> query(Object parameter) throws Exception{
		return (List<DStoInventory>) dac.query(dStoInventory, parameter);
	}
}
