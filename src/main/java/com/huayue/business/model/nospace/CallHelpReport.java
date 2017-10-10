package com.huayue.business.model.nospace;

import java.util.List;

import com.huayue.business.util.DataAllCtrl;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 一件呼救上报表
 * @author wjj
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName="help_report")
public class CallHelpReport extends Model<CallHelpReport> {
	public static  CallHelpReport callHelpReport = new CallHelpReport();
	DataAllCtrl dac = new DataAllCtrl();
	
	/**
	 * 添加
	 */
	
	public Boolean add(Object eqId,Object time,Object x,Object y,Object imgUrl,Object videoUrl,Object audioUrl,Object userId,Object userName){
		if(time.equals("") || time == null){
			time = DataAllCtrl.getCurrentDefault();
		}
		return callHelpReport.clear().set("eq_id", eqId).set("time", time).set("x", x).set("y", y).set("img_url", imgUrl).set("video_url", videoUrl).set("audio_url", audioUrl).set("user_id", userId).set("user_name", userName).save();
	}
	
	//查询可以直接使用继承的Model的List方法

}
