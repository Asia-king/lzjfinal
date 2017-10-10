package com.huayue.business.model.nospace;

import java.util.List;

import com.huayue.business.util.DataAllCtrl;
import com.huayue.common.Consts;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 紧急事件上报表
 * @author CXL
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName="eme_report")
public class EmeReport extends Model<EmeReport>{
	public static final EmeReport emeReport = new EmeReport();
	DataAllCtrl dac = new DataAllCtrl();
	
	/**
	 * 添加
	 * @param eqId
	 * @param time
	 * @param x
	 * @param y
	 * @param address
	 * @param description
	 * @param imgUrl
	 * @param videoUrl
	 * @param audioUrl
	 * @param name
	 * @param userId
	 * @param userName
	 * @return
	 */
	
	public Boolean add(Object eqId,Object time,Object x,Object y,Object address,Object description,Object imgUrl,Object videoUrl,Object audioUrl,Object name,Object userId,Object userName){
		String state = "0";
		String check = "0";
		if(time.equals("") || time == null){
			time = DataAllCtrl.getCurrentDefault();
		}
		return emeReport.clear().set("eq_id", eqId).set("time", time).set("x", x).set("y", y).set("address", address).set("description", description).set("state", state).set("img_url", imgUrl).set("video_url", videoUrl).set("audio_url", audioUrl).set("name", name).set("check", check).set("user_id", userId).set("user_name", userName).save();
	}
	/**
	 * 查询
	 * @return
	 */
	
	public List<EmeReport> querybyId(Object id){
		return emeReport.listbyId(id);
	}
	/**
	 * 查询
	 * @param parameter
	 * @return
	 * @throws Exception
	 */
	
	@SuppressWarnings("unchecked")
	public List<EmeReport> query(Object parameter) throws Exception{
		return (List<EmeReport>) dac.reportQuery(emeReport, parameter);
	}
	
	/**
	 * 查询
	 * @param parameter
	 * @param sqlCon
	 * @return
	 * @throws Exception
	 */
	
	@SuppressWarnings("unchecked")
	public List<EmeReport> query(Object parameter, String sqlCon) throws Exception{
		return (List<EmeReport>) dac.reportQuery(emeReport, parameter, sqlCon);
	}
	
	/**
	 * 修改信息
	 * @param all
	 * @return
	 * @throws Exception
	 */
	public Boolean updataMessage(Object id,Object time,Object x,Object y,Object address,Object description,Object name) throws Exception{
		return emeReport.findById(id).set("time", time).set("x", x).set("y", y).set("address", address).set("description", description).set("name", name).update();
	}
	
	/**
	 * 根据传入的参数修改
	 * @param id
	 * @param check
	 * @return
	 * @throws Exception
	 */
	
	public Boolean updataByCheck(Object id,Object check) throws Exception{
		return dac.reportUpdate(emeReport, id, check);
	}
	
	/**
	 * 根据传入的参数删除
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	
	public Boolean deleteByIds(Object ids) throws Exception{
		return dac.reportDelete(emeReport, ids);
	}
}
