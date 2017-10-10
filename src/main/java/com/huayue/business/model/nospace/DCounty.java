package com.huayue.business.model.nospace;

import java.util.HashMap;
import java.util.List;

import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 区县
 * @author CXL
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName="d_county")
public class DCounty extends Model<DCounty>{
	public static final DCounty dCounty = new DCounty();
	
	/**
	 * 统计数据
	 * @param className 传入的model
	 * @return 统计结果
	 */
	@SuppressWarnings("unchecked")
	public HashMap<String,Integer> count(Model<?> className){
		HashMap<String,Integer> hm = new HashMap<>();
		List<DCounty> ldc = DCounty.dCounty.list();
		for (int i = 0; i < ldc.size(); i++) {
			List<Model<?>> ldrt2 = (List<Model<?>>) className.list();
			int count = 0;
			for (int j = 0; j < ldrt2.size(); j++) {
				if(ldc.get(i).getStr("code").equals(ldrt2.get(j).getStr("county_id"))){
					count++;
				}
			}
			hm.put(ldc.get(i).getStr("code"), count);
		}
		return hm; 
	}
}
