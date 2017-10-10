package com.huayue.common.index;

import com.huayue.common.UrlConfig;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

@ControllerBind(controllerKey = "/layout",viewPath=UrlConfig.LAYOUT)
public class LayoutController extends Controller
{
}
