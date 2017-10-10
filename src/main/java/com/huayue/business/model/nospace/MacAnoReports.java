package com.huayue.business.model.nospace;

import java.net.URLEncoder;
import java.util.List;

import com.huayue.business.util.DataAllCtrl;
import com.huayue.common.Consts;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;


/**
 * 宏观异常上报表
 * 
 * @author CXL
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName = "mac_ano_reports")
public class MacAnoReports extends Model<MacAnoReports> {
	public static final MacAnoReports macAnoReports = new MacAnoReports();
	DataAllCtrl dac = new DataAllCtrl();
	
	/**
	 * 添加
	 * @param time
	 * @param x
	 * @param y
	 * @param address
	 * @param imgUrl
	 * @param videoUrl
	 * @param audioUrl
	 * @param abnormalId
	 * @param abnormalName
	 * @param abnormalState
	 * @param description
	 * @param userId
	 * @param userName
	 * @return
	 * @throws Exception
	 */
	
	public Boolean add(Object time,Object x,Object y,Object address,Object imgUrl,Object videoUrl,Object audioUrl,Object abnormalId,Object abnormalName,Object abnormalState,Object description,Object userId,Object userName) throws Exception{
		String state = "0";
		if(time == null||time.equals("") ){
			time = DataAllCtrl.getCurrentDefault();
		}
		return macAnoReports.clear().set("time", time).set("x", x).set("y", y).set("address", address).set("state", state).set("img_url", imgUrl).set("video_url", videoUrl).set("audio_url", audioUrl).set("abnormal_id", abnormalId).set("abnormal_name", abnormalName).set("abnormal_state", abnormalState).set("description", description).set("user_id", userId).set("user_name", userName).save();
	}
	
	/**
	 * 查询
	 * @param parameter
	 * @return
	 * @throws Exception
	 */

	@SuppressWarnings("unchecked")
	public List<MacAnoReports> query(Object parameter) throws Exception{
		return (List<MacAnoReports>) dac.reportQuery(macAnoReports, parameter);
	}
	
	/**
	 * 查询
	 * @return
	 */
	
	public List<MacAnoReports> querybyId(Object id){
		return macAnoReports.listbyId(id);
	}
	
	/**
	 * 查询
	 * @param parameter
	 * @param sqlCon
	 * @return
	 * @throws Exception
	 */

	@SuppressWarnings("unchecked")
	public List<MacAnoReports> query(Object parameter,String sqlCon) throws Exception{
		return (List<MacAnoReports>) dac.reportQuery(macAnoReports, parameter, sqlCon);
	}
		
	/**
	 * 根据传入的参数删除
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	
	public Boolean deleteByIds(Object ids) throws Exception{
		return dac.reportDelete(macAnoReports, ids);
	}
}
