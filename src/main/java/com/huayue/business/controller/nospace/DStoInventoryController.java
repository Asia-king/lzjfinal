package com.huayue.business.controller.nospace;

import com.huayue.business.model.nospace.DRurRatio;
import com.huayue.business.model.nospace.DStoInventory;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

/**
 * 救灾物资仓库明细数据表
 * 
 * @author CXL
 *
 */

@ControllerBind(controllerKey = "/business/dstoinventory")
public class DStoInventoryController extends Controller<DStoInventory>{
	/**
	 * 查询数据
	 * parameter参数为null则查询所有数据
	 * parameter参数不为null则根据parameter参数为条件查询数据
	 * 返回json格式
	 */
	public void query() throws Exception{
		renderJson(DStoInventory.dStoInventory.query((Object)getPara("parameter")));
	}
	public void addDB()
	{
		renderJsonResult(getModel(DStoInventory.class,"DStoInventory").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(DStoInventory.class,"DStoInventory").update());
	}
	public void deleteDB()
	{
		renderJsonResult(DStoInventory.dStoInventory.deleteBysId(getParaToInt("id")));
	}
}
