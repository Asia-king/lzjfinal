package com.huayue.business.model.nospace;

import java.util.List;

import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

/**
 * 用户书签表
 * 
 * @author CXL
 *
 */

@SuppressWarnings("serial")
@TableBind(tableName = "bookmark")
public class Bookmark extends Model<Bookmark> {
	public static final Bookmark bookmark = new Bookmark();

	/**
	 * 添加书签方法
	 * 
	 * @param parameter 传入的参数 根据传入的parameter参数，如果为空，则不操作，否则根据parameter参数添加数据
	 * @return 方法执行成功或失败
	 */
	public Boolean add(Object userId, Object markContent)throws Exception{
		markContent = markContent.toString().replace("&quot;", "'");
		return bookmark.clear().set("user_id", userId).set("mark_content", markContent).save();
	}

	/**
	 * 根据用户查询书签
	 * 
	 * @param userId 传入的用户名称
	 * @return 返回该用户的书签list集合
	 */
	public List<Bookmark> query(Object userId) throws Exception{
		return bookmark.find("select * from bookmark where user_id='"+userId+"';");
	}
	
	/**
	 * 根据书签id删除
	 * @param id 传入的书签id
	 * @return  返回执行成功或失败
	 */
	public Boolean deleteId(Object id){
		return bookmark.deleteById(id);
	}

	/**
	 * 根据用户删除对应的书签
	 * 
	 * @param userId 传入的用户名称
	 * @return 返回执行成功或失败
	 */
	public Boolean delete(Object userId) throws Exception{
		return bookmark.deleteById("user_id", userId);
	}

	/**
	 * 根据id修改书签内容
	 * 
	 * @param id 传入的id
	 * @param markContent 传入的书签内容
	 * @return 返回执行成功或失败
	 */
	public Boolean updata(Object id, Object markContent) throws Exception{
		markContent = markContent.toString().replace("&quot;", "'");
		return bookmark.findById(id).set("mark_content", markContent).update();
	}
}
