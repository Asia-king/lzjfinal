package com.huayue.business.controller.nospace;

import com.huayue.business.model.nospace.DBuiCity1;
import com.huayue.business.model.nospace.DBuiCity2;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

/**
 * 房屋统计表2(按年代)
 * @author CXL
 *	
 */

@ControllerBind(controllerKey="/business/dbuicity2")
public class DBuiCity2Controller extends Controller<DBuiCity2>{
	/**
	 * 查询数据
	 * parameter参数为null则查询所有数据
	 * parameter参数不为null则根据parameter参数为条件查询数据
	 * 返回json格式
	 */
	public void query() throws Exception{
		renderJson(DBuiCity2.dBuiCity2.query((Object)getPara("parameter")));
	}
	public void addDB()
	{
		renderJsonResult(getModel(DBuiCity2.class,"DBuiCity2").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(DBuiCity2.class,"DBuiCity2").update());
	}
	public void deleteDB()
	{
		renderJsonResult(DBuiCity2.dBuiCity2.deleteBysId(getParaToInt("id")));
	}
}
