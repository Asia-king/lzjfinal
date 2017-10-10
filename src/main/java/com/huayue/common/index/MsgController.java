package com.huayue.common.index;

import com.huayue.common.Consts;
import com.huayue.common.UrlConfig;
import com.huayue.common.validator.MsgValidator;
import com.huayue.jbase.jfinal.ext.ShiroExt;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.huayue.system.model.Msg;
import com.huayue.system.model.User;
import com.jfinal.aop.Before;
import com.jfinal.ext.route.ControllerBind;
import com.jfinal.plugin.ehcache.CacheName;
import com.jfinal.plugin.ehcache.EvictInterceptor;

@CacheName(value = "/index/msg")
@ControllerBind(controllerKey = "/index/msg")
public class MsgController extends Controller<Msg>
{

	/***
	 * 使用页面缓存 注意：经常变动的不能使用缓存 与权限相关的 不能用页面缓存 可使用 sql 缓存
	 * 
	 */
//	@Before(value = { CacheInterceptor.class })
	public void list()
	{
		setAttr("list", Msg.dao.list());

		render(UrlConfig.VIEW_INDEX_MSG);
	}

	@Before(value = { EvictInterceptor.class, MsgValidator.class })
	public void add()
	{
		User user = ShiroExt.getSessionAttr(Consts.SESSION_USER);
		renderJsonResult(getModel( ).set("uid", user.getId()).saveAndDate());
	}

}
