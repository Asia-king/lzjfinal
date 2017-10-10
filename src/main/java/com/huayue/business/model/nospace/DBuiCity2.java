package com.huayue.business.model.nospace;

import java.util.List;

import com.huayue.business.util.DataAllCtrl;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 房屋统计表2(按年代)
 * @author CXL
 *	
 */

@SuppressWarnings("serial")
@TableBind(tableName = "d_bui_city2")
public class DBuiCity2 extends Model<DBuiCity2>{
	public static final DBuiCity2 dBuiCity2 = new DBuiCity2();
	DataAllCtrl dac = new DataAllCtrl();
	
	/**
	 * 查询所有数据
	 * @param parameter 传入查询数据的条件
	 * @return 返回查询结果
	 */
	@SuppressWarnings("unchecked")
	public List<DBuiCity2> query(Object parameter) throws Exception{
		return (List<DBuiCity2>) dac.query(dBuiCity2,parameter);
	}
	
}
