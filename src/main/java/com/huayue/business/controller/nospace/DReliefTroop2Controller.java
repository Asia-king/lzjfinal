package com.huayue.business.controller.nospace;

import com.huayue.business.model.nospace.DPopulation;
import com.huayue.business.model.nospace.DReliefTroop2;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

/**
 * 行业救灾队伍数据表
 * 
 * @author CXL
 *
 */

@ControllerBind(controllerKey = "/business/drelieftroop2")
public class DReliefTroop2Controller extends Controller<DReliefTroop2>{
	/**
	 * 查询数据
	 * parameter参数为null则查询所有数据
	 * parameter参数不为null则根据parameter参数为条件查询数据
	 * 返回json格式
	 * @throws Exception
	 */
	public void query() throws Exception{
		renderJson(DReliefTroop2.dReliefTroop2.query((Object)getPara("parameter")));
	}
	/**
	 * 统计
	 * @throws Exception
	 */
	public void count() throws Exception{
		renderJson(DReliefTroop2.dReliefTroop2.count());
	}
	
	public void addDB()
	{
		renderJsonResult(getModel(DReliefTroop2.class,"DReliefTroop2").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(DReliefTroop2.class,"DReliefTroop2").update());
	}
	public void deleteDB()
	{
		renderJsonResult(DReliefTroop2.dReliefTroop2.deleteBysId(getParaToInt("id")));
	}
}
