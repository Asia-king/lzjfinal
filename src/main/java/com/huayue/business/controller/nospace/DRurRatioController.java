package com.huayue.business.controller.nospace;

import com.huayue.business.model.nospace.DReliefTroop2;
import com.huayue.business.model.nospace.DRurRatio;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

/**
 * 区县中农村房屋统计比例表
 * 
 * @author CXL
 *
 */

@ControllerBind(controllerKey = "/business/drurratio")
public class DRurRatioController extends Controller<DRurRatio>{
	/**
	 * 查询数据
	 * parameter参数为null则查询所有数据
	 * parameter参数不为null则根据parameter参数为条件查询数据
	 * 返回json格式
	 */
	public void query() throws Exception{
		renderJson(DRurRatio.dRurRatio.query((Object)getPara("parameter")));
	}
	
	public void addDB()
	{
		renderJsonResult(getModel(DRurRatio.class,"DRurRatio").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(DRurRatio.class,"DRurRatio").update());
	}
	public void deleteDB()
	{
		renderJsonResult(DRurRatio.dRurRatio.deleteBysId(getParaToInt("id")));
	}
}
