package com.huayue.business.model.nospace;

import java.util.HashMap;
import java.util.List;

import com.huayue.business.util.DataAllCtrl;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 大型企业房屋统计表
 * @author CXL
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName="d_bui_firm")
public class DBuiFirm extends Model<DBuiFirm>{
	public static final DBuiFirm dBuiFirm = new DBuiFirm();
	DataAllCtrl dac = new DataAllCtrl();
	
	/**
	 * 查询所有数据
	 * @param parameter 传入查询数据的条件
	 * @return 返回查询结果
	 */
	@SuppressWarnings("unchecked")
	public List<DBuiFirm> query(Object parameter) throws Exception{
		return (List<DBuiFirm>) dac.query(dBuiFirm,parameter);
	}
	/**
	 * 统计
	 * @return
	 */
	public HashMap<String,Integer> count() throws Exception{
		return DCounty.dCounty.count(dBuiFirm);
	}
}
