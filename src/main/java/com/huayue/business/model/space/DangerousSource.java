package com.huayue.business.model.space;

import java.util.HashMap;

import com.huayue.business.model.nospace.DCounty;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 重大火灾、爆炸、有毒和放射危险源属性表
 * @author CXL
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName="dangerous_source")
public class DangerousSource extends Model<DangerousSource>{
	public static final DangerousSource dangerousSource = new DangerousSource();
	/**
	 * 统计
	 * @return
	 */
	public HashMap<String,Integer> count() throws Exception{
		return DCounty.dCounty.count(dangerousSource);
	}
}
