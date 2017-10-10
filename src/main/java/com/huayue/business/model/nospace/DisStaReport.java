package com.huayue.business.model.nospace;

import java.util.List;

import com.huayue.business.util.DataAllCtrl;
import com.huayue.common.Consts;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 救灾状态上报
 * @author CXL
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName="dis_sta_report")
public class DisStaReport extends Model<DisStaReport>{
	public static final DisStaReport disStaReport = new DisStaReport();
	DataAllCtrl dac = new DataAllCtrl();
	
	/**
	 * 添加
	 * @param eqId
	 * @param type
	 * @param name
	 * @param time
	 * @param xy
	 * @param address
	 * @param disState
	 * @param videoUrl
	 * @param audioUrl
	 * @param imgUrl
	 * @param remark
	 * @param userId
	 * @param userName
	 * @return
	 */
	
	public Boolean add(Object eqId,Object type,Object name,Object time,Object xy,Object address,Object disState,Object videoUrl,Object audioUrl,Object imgUrl,Object remark,Object userId,Object userName){
		String state = "0";
		String check = "0";
		if(time == null||time.equals("")){
			time = DataAllCtrl.getCurrentDefault();
		}
		return disStaReport.clear().set("eq_id", eqId).set("type", type).set("name", name).set("time", time).set("xy", xy).set("address", address).set("dis_state", disState).set("video_url", videoUrl).set("audio_url", audioUrl).set("img_url", imgUrl).set("state", state).set("check", check).set("remark", remark).set("user_id", userId).set("user_name", userName).save();
	}
	
	/**
	 * 查询
	 * @return
	 */
	
	public List<DisStaReport> query(){
		return disStaReport.list();
	}
	
	
	/**
	 * 查询
	 * @param parameter
	 * @param sqlCon
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<DisStaReport> query(Object parameter, String sqlCon) throws Exception{
		return (List<DisStaReport>) dac.reportQuery(disStaReport, parameter, sqlCon);
	}
	/**
	 * 查询
	 * @param id
	 * @return
	 */
	
	public List<DisStaReport> querybyId(Object id){
		return disStaReport.listbyId(id);
	}
	
	/**
	 * 根据传入的参数查询
	 * @param parameter 
	 * @return
	 * @throws Exception
	 */
	
	@SuppressWarnings("unchecked")
	public List<DisStaReport> query(Object parameter) throws Exception{
		return (List<DisStaReport>) dac.reportQuery(disStaReport, parameter);
	}
	
	/**
	 * 根据传入的参数修改
	 * @param id
	 * @param check
	 * @return
	 * @throws Exception
	 */
	
	public Boolean updataByCheck(Object id,Object check) throws Exception{
		return dac.reportUpdate(disStaReport, id, check);
	}
	
	/**
	 * 修改信息
	 * @param all
	 * @return
	 * @throws Exception
	 */
	public Boolean updateMessage(Object id,Object eqId,Object type,Object name,Object time,Object xy,Object address,Object disState,Object check,Object state,Object remark) throws Exception{
		return disStaReport.findById(id).set("eq_id", eqId).set("type", type).set("name", name).set("time", time).set("xy", xy).set("address", address).set("dis_state", disState).set("state", state).set("check", check).set("remark", remark).update();
	}
	
	
	/**
	 * 根据传入的参数删除
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	
	public Boolean deleteByIds(Object ids) throws Exception{
		return dac.reportDelete(disStaReport, ids);
	}
}
