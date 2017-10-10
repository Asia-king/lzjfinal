package com.huayue.business.controller.nospace;

import com.huayue.business.model.nospace.Bookmark;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

/**
 * 用户书签表
 * @author CXL
 *
 */

@ControllerBind(controllerKey = "/business/bookmark")
public class BookmarkController extends Controller<Bookmark>{
	/**
	 * 添加书签
	 * 根据传入的parameter参数添加书签路径
	 */
	public void add() throws Exception{
		renderJson(Bookmark.bookmark.add((Object)getPara("userId"),(Object)getPara("markContent")));
	}
	
	/**
	 * 查询书签
	 * 根据传入的userId参数查询查询书签
	 */
	public void query() throws Exception{
		renderJson(Bookmark.bookmark.query((Object)getPara("userId")));
	}
	/**
	 * 删除书签
	 * 根据传入的书签id删除书签
	 */
	public void deleteId(){
		renderJson(Bookmark.bookmark.deleteId((Object)getPara("id")));
	}
	/**
	 * 删除书签
	 * 根据传入的userId参数删除书签
	 */
	public void delete() throws Exception{
		renderJson(Bookmark.bookmark.delete((Object)getPara("userId")));
	}
	/**
	 * 修改书签
	 * 根据传入的id和markContent参数修改书签
	 */
	public void updata() throws Exception{
		renderJson(Bookmark.bookmark.updata((Object)getPara("id"),(Object)getPara("markContent")));
	}

	public void adds()
	{
		renderJsonResult(getModel(Bookmark.class,"Bookmark").save());
	}
	public void edit()
	{
		renderJsonResult(getModel(Bookmark.class,"Bookmark").update());
	}
	public void deletes()
	{
		renderJsonResult(Bookmark.bookmark.deleteBysId(getParaToInt("id")));
	}
}
