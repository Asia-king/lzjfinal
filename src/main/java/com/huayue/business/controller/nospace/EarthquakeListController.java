package com.huayue.business.controller.nospace;

import com.huayue.business.model.nospace.EarthquakeList;
import com.huayue.common.UrlConfig;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

@ControllerBind(controllerKey="/business/earthquakeList", viewPath = UrlConfig.SYSTEM)
public class EarthquakeListController extends Controller<EarthquakeList>{
	/**
	 * 查询
	 */
	public void queryAll(){
		renderJson(EarthquakeList.earthquakeList.list());
	}

}
