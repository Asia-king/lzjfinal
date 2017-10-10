package com.huayue.business.model.nospace;

import java.util.List;

import com.huayue.business.util.DataAllCtrl;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 房屋统计表1(按结构)
 * 
 * @author CXL
 * 
 */

@SuppressWarnings("serial")
@TableBind(tableName = "d_bui_city1")
public class DBuiCity1 extends Model<DBuiCity1> {
	public static final DBuiCity1 dBuiCity1 = new DBuiCity1();
	DataAllCtrl dac = new DataAllCtrl();
	
	/**
	 * 查询所有数据
	 * @param parameter 传入查询数据的条件
	 * @return 返回查询结果
	 */
	@SuppressWarnings("unchecked")
	public List<DBuiCity1> query(Object parameter) throws Exception{
		return (List<DBuiCity1>) dac.query(dBuiCity1,parameter);
	}
}
