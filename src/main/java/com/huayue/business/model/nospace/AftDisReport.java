package com.huayue.business.model.nospace;

import java.util.List;

import com.huayue.business.util.DataAllCtrl;
import com.huayue.common.Consts;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 震后灾情上报表
 * @author CXL
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName="aft_dis_report")
public class AftDisReport extends Model<AftDisReport>{
	public static  AftDisReport aftDisReport = new AftDisReport();
	DataAllCtrl dac = new DataAllCtrl();
	
	/**
	 * 添加
	 * @param eqId
	 * @param time
	 * @param x
	 * @param y
	 * @param description
	 * @param address
	 * @param imgUrl
	 * @param videoUrl
	 * @param audioUrl
	 * @param abnormalId
	 * @param abnormalState
	 * @param abnormalName
	 * @param userId
	 * @param userName
	 * @return
	 * @throws Exception
	 */
	
	public Boolean add(Object eqId,Object time,Object x,Object y,Object description,Object address,Object imgUrl,Object videoUrl,Object audioUrl,Object abnormalId,Object abnormalState,Object abnormalName,Object userId,Object userName) throws Exception{
		String state = "0";
		String check = "0";
		if(time == null || time.equals("") ){
			time = DataAllCtrl.getCurrentDefault();
		}
		return aftDisReport.clear().set("eq_id", eqId).set("time", time).set("x", x).set("y", y).set("description", description).set("address", address).set("img_url", imgUrl).set("video_url", videoUrl).set("audio_url", audioUrl).set("abnormal_id", abnormalId).set("abnormal_state", abnormalState).set("abnormal_name", abnormalName).set("state", state).set("check", check).set("user_id", userId).set("user_name", userName).save();
	}
	
	public List<AftDisReport> querybyId(Object id){
		return aftDisReport.listbyId(id);
	}
	
	/**
	 * 根据传入的参数查询
	 * @param parameter 
	 * @return
	 * @throws Exception
	 */
	
	@SuppressWarnings("unchecked")
	public List<AftDisReport> query(Object parameter) throws Exception{
		return (List<AftDisReport>) dac.reportQuery(aftDisReport, parameter);
	}
	
	/**
	 * 根据传入的参数查询
	 * @param parameter 
	 * @return
	 * @throws Exception
	 */
	
	@SuppressWarnings("unchecked")
	public List<AftDisReport> query(Object parameter,String sqlCon) throws Exception{
		return (List<AftDisReport>) dac.reportQuery(aftDisReport, parameter,sqlCon);
	}
	
	/**
	 * 根据传入的参数修改
	 * @param id
	 * @param check
	 * @return
	 * @throws Exception
	 */
	
	public Boolean updataByCheck(Object id,Object check) throws Exception{
		return dac.reportUpdate(aftDisReport, id, check);
	}
	
	public Boolean updataEventMessage(Object id,Object time,Object x,Object y,Object description,Object address,Object abnormalId,Object abnormalState,Object abnormalName) throws Exception{
		return aftDisReport.findById(id).set("time", time).set("x", x).set("y", y).set("description", description).set("address", address).set("abnormal_id", abnormalId).set("abnormal_state", abnormalState).set("abnormal_name", abnormalName).update();
	}
	
	/**
	 * 根据传入的参数删除
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	
	public Boolean deleteByIds(Object ids) throws Exception{
		return dac.reportDelete(aftDisReport, ids);
	}
}
