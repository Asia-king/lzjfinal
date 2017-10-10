package com.huayue.business.model.nospace;

import java.util.List;

import com.huayue.business.util.DataAllCtrl;
import com.huayue.common.Consts;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 安置点灾情上报表
 * @author CXL
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName="sit_situ_report")
public class SitSituReport extends Model<SitSituReport>{
	public static final SitSituReport sitSituReport = new SitSituReport();
	DataAllCtrl dac = new DataAllCtrl();
	
	/**
	 * 添加
	 * @param eqId
	 * @param name
	 * @param x
	 * @param y
	 * @param address
	 * @param totalNum
	 * @param realNum
	 * @param injuredNum
	 * @param material
	 * @param medical
	 * @param videoUrl
	 * @param audioUrl
	 * @param imgUrl
	 * @param userId
	 * @param userName
	 * @param description
	 * @return
	 */

	public Boolean add(Object eqId,Object name,Object time,Object x,Object y,Object address,Object totalNum,Object realNum,Object injuredNum,Object material,Object medical,Object videoUrl,Object audioUrl,Object imgUrl,Object userId,Object userName,Object description) throws Exception{
		String state = "0";
		String check = "0";
		if(time == null||time.equals("") ){
			time = DataAllCtrl.getCurrentDefault();
		}
		return sitSituReport.clear().set("eq_id", eqId).set("name", name).set("time", time).set("x", x).set("y", y).set("address", address).set("total_num", totalNum).set("real_num", realNum).set("injured_num", injuredNum).set("material", material).set("medical", medical).set("video_url", videoUrl).set("audio_url", audioUrl).set("img_url", imgUrl).set("state", state).set("check", check).set("user_id", userId).set("user_name", userName).set("description", description).save();
	}
	
	/**
	 * 查询
	 * @return
	 */
	
	public List<SitSituReport> querybyId(Object id){
		return sitSituReport.listbyId(id);
	}
	
	/**
	 * 查询
	 * @param parameter
	 * @return
	 * @throws Exception
	 */
	
	@SuppressWarnings("unchecked")
	public List<SitSituReport> query(Object parameter) throws Exception{
		return (List<SitSituReport>) dac.reportQuery(sitSituReport, parameter);
	}
	
	/**
	 * 查询
	 * @param parameter
	 * @param sqlCon
	 * @return
	 * @throws Exception
	 */
	
	@SuppressWarnings("unchecked")
	public List<SitSituReport> query(Object parameter, String sqlCon) throws Exception{
		return (List<SitSituReport>) dac.reportQuery(sitSituReport, parameter, sqlCon);
	}
	
	/**
	 * 根据传入的参数修改
	 * @param id
	 * @param check
	 * @return
	 * @throws Exception
	 */
	
	public Boolean updataByCheck(Object id,Object check) throws Exception{
		return dac.reportUpdate(sitSituReport, id, check);
	}
	/**
	 * 修改信息
	 * @param all
	 * @return
	 * @throws Exception
	 */
	public Boolean updateMessage(Object id,Object name,Object time,Object x,Object y,Object address,Object totalNum,Object realNum,Object injuredNum,Object material,Object medical,Object description) throws Exception{
		return sitSituReport.findById(id).set("name", name).set("time", time).set("x", x).set("y", y).set("address", address).set("total_num", totalNum).set("real_num", realNum).set("injured_num", injuredNum).set("material", material).set("medical", medical).set("description", description).update();
	}
	
	/**
	 * 根据传入的参数删除
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	
	public Boolean deleteByIds(Object ids) throws Exception{
		return dac.reportDelete(sitSituReport, ids);
	}
}
