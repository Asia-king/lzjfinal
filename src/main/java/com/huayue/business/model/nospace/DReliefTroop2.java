package com.huayue.business.model.nospace;

import java.util.HashMap;
import java.util.List;

import com.huayue.business.util.DataAllCtrl;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 行业救灾队伍数据表
 * 
 * @author CXL
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName = "d_relief_troop2")
public class DReliefTroop2 extends Model<DReliefTroop2> {
	public static final DReliefTroop2 dReliefTroop2 = new DReliefTroop2();
	DataAllCtrl dac = new DataAllCtrl();
	
	/**
	 * 查询所有数据
	 * 
	 * @param parameter
	 *            传入查询数据的条件
	 * @return 返回查询结果
	 */
	@SuppressWarnings("unchecked")
	public List<DReliefTroop2> query(Object parameter) throws Exception{
		return (List<DReliefTroop2>) dac.query(dReliefTroop2, parameter);
	}
	/**
	 * 统计
	 * @return
	 */
	public HashMap<String,Integer> count() throws Exception{
		return DCounty.dCounty.count(dReliefTroop2);
	}
}
