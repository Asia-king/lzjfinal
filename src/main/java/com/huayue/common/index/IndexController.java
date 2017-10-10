package com.huayue.common.index;

import java.io.File;
import java.security.interfaces.RSAPublicKey;

import org.apache.commons.codec.binary.Hex;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;

import com.huayue.common.Consts;
import com.huayue.common.UrlConfig;
import com.huayue.common.validator.LoginValidator;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.huayue.jbase.util.RSA;
import com.huayue.jbase.util.Sec;
import com.huayue.jbase.util.Validate;
import com.huayue.service.InitService;
import com.huayue.service.ZbusServer;
import com.huayue.system.model.Log;
import com.huayue.system.model.User;
import com.jfinal.aop.Before;
import com.jfinal.ext.route.ControllerBind;

/***
 * 
 * 月落斜阳 灯火阑珊
 * 
 * @author 12
 * 
 */
@ControllerBind(controllerKey = "/",viewPath=UrlConfig.INDEX)
public class IndexController extends Controller
{
	
	public void jump()
	{
		Log.dao.insert(this, Log.EVENT_VISIT);
		render(UrlConfig.VIEW_COMMON_JUMP);
	}

	public void initDb()
	{
		new InitService().initDb(getRequest().getRealPath("/static/file") + File.separator + "init.sql");
		forwardAction("/jump");
	}

	public void loginView()
	{
		//new ZbusServer(); 
		if (firstInto()) return;

		RSAPublicKey publicKey = RSA.getDefaultPublicKey();
		String modulus = new String(Hex.encodeHex(publicKey.getModulus().toByteArray()));
		String exponent = new String(Hex.encodeHex(publicKey.getPublicExponent().toByteArray()));

		setAttr("modulus", modulus);
		setAttr("exponent", exponent);

		render(UrlConfig.VIEW_COMMON_LOGIN);

	}

	private boolean firstInto()
	{
		String init = getCookie("init");
		if (init == null) setCookie("init", "init", 1000 * 60 * 60 * 24 * 365);
		render(UrlConfig.VIEW_COMMON_INIT);

		return Validate.isEmpty(init);
	}

	public void loginOut()
	{
		try
		{
			Subject subject = SecurityUtils.getSubject();
			subject.logout();
			renderTop(UrlConfig.VIEW_LOGIN);

		} catch (AuthenticationException e)
		{
			e.printStackTrace();
			renderText("异常：" + e.getMessage());
		}
	}
	
	public void app(){
		Log.dao.insert(this, Log.EVENT_VISIT);
//		System.out.println("4328950890386549032:"+getPara("id"));
//		setAttr("appname",getPara("id"));
//		renderJsonResult(true);
//		forwardAction("/goindex");
		Subject subject = SecurityUtils.getSubject();
		if (!subject.isAuthenticated())
		{
			
			setAttr("appname",subject.getSession(true).getAttribute(Consts.SESSION_USER));

		}
		render(UrlConfig.VIEW_COMMON_MODULEMENU);
	}
	public void appres(){
		Log.dao.insert(this, Log.EVENT_VISIT);
//		System.out.println("4328950890386549032:"+getPara("id"));
		setAttr("appname","res");
		
		String config="resdatabag-resbookmark-resstatics-restheme-reshistory";
		setAttr("childapp",config);
//		renderJsonResult(true);
		
		//设置登录成功的用户名和用户id
		Subject subject = SecurityUtils.getSubject();
		User loginUser = (User) subject.getSession(true).getAttribute(Consts.SESSION_USER);
		setAttr("sys_username",loginUser.getName());
		setAttr("sys_userid", loginUser.getId());
		
		forwardAction("/goindex");
		
	}
	public void appome(){
		Log.dao.insert(this, Log.EVENT_VISIT);
		setAttr("appname","ome");
		String config="resreport-";
		setAttr("childapp",config);
		
		//设置登录成功的用户名和用户id
		Subject subject = SecurityUtils.getSubject();
		User loginUser = (User) subject.getSession(true).getAttribute(Consts.SESSION_USER);
		setAttr("sys_username",loginUser.getName());
		setAttr("sys_userid", loginUser.getId());
		
		forwardAction("/goindex");
	}
	public void appeve(){
		Log.dao.insert(this, Log.EVENT_VISIT);
		setAttr("appname","eve");
		String config="eveearthquack-eveemerge-evesettle-evemanage";
		setAttr("childapp",config);
		
		//设置登录成功的用户名和用户id
		Subject subject = SecurityUtils.getSubject();
		User loginUser = (User) subject.getSession(true).getAttribute(Consts.SESSION_USER);
		setAttr("sys_username",loginUser.getName());
		setAttr("sys_userid", loginUser.getId());
		
		forwardAction("/goindex");
	}
	public void appeul(){
		Log.dao.insert(this, Log.EVENT_VISIT);
		setAttr("appname","eul");
		String config="preeul-seceul-reporteul";
		setAttr("childapp",config);
		
		//设置登录成功的用户名和用户id
		Subject subject = SecurityUtils.getSubject();
		User loginUser = (User) subject.getSession(true).getAttribute(Consts.SESSION_USER);
		setAttr("sys_username",loginUser.getName());
		setAttr("sys_userid", loginUser.getId());
		
		forwardAction("/goindex");
	}
	public void appaux(){
		Log.dao.insert(this, Log.EVENT_VISIT);
		setAttr("appname","aux");
		String config="auxspread-auxemergedeal-auxsettle-auxworkers-auxsomethings-auxcontingencyplan";
		setAttr("childapp",config);
		
		//设置登录成功的用户名和用户id
		Subject subject = SecurityUtils.getSubject();
		User loginUser = (User) subject.getSession(true).getAttribute(Consts.SESSION_USER);
		setAttr("sys_username",loginUser.getName());
		setAttr("sys_userid", loginUser.getId());
		
		forwardAction("/goindex");
	}
	public void appset(){
		Log.dao.insert(this, Log.EVENT_VISIT);
		setAttr("appname","set");
		setAttr("childapp","");
		
		//设置登录成功的用户名和用户id
		Subject subject = SecurityUtils.getSubject();
		User loginUser = (User) subject.getSession(true).getAttribute(Consts.SESSION_USER);
		setAttr("sys_username",loginUser.getName());
		setAttr("sys_userid", loginUser.getId());
		
		forwardAction("/goindex");
	}

	
	public void goindex(){
		render(UrlConfig.VIEW_INDEX_INDEX);
		//redirect("/");
	}
	
	public void toppage(){
		Log.dao.insert(this, Log.EVENT_VISIT);
		User user=User.dao.findByName("admin");
		setAttr("username",user);
		render(UrlConfig.VIEW_TOPPAGE);
	}

	@Before(LoginValidator.class)
	public void login()
	{
		String[] result = RSA.decryptUsernameAndPwd(getPara("key"));

		try
		{
			UsernamePasswordToken token = new UsernamePasswordToken(result[0], Sec.md5(result[1]));
			Subject subject = SecurityUtils.getSubject();
			if (!subject.isAuthenticated())
			{
				token.setRememberMe(true);
				subject.login(token);
				subject.getSession(true).setAttribute(Consts.SESSION_USER, User.dao.findByName(result[0]));

			}

			Log.dao.insert(this, Log.EVENT_LOGIN);

			User user=User.dao.findByName(result[0]);
			setAttr("username",token);
//			render(UrlConfig.VIEW_COMMON_MODULEMENU);
			forwardAction("/app");

		} catch (UnknownAccountException e)
		{

			forwardAction("用户名不存在", UrlConfig.LOGIN);

		} catch (IncorrectCredentialsException e)
		{
			forwardAction("密码错误", UrlConfig.LOGIN);

		} catch (LockedAccountException e)
		{
			forwardAction("对不起 帐号被封了", UrlConfig.LOGIN);
			e.printStackTrace();
		} catch (ExcessiveAttemptsException e)
		{
			forwardAction("尝试次数过多 请明天再试", UrlConfig.LOGIN);
		} catch (AuthenticationException e)
		{
			forwardAction("对不起 没有权限 访问", UrlConfig.LOGIN);
			
		}
		catch (Exception e)
		{
			e.printStackTrace();
			forwardAction("请重新登录", UrlConfig.LOGIN);
		}

	}

	public void unauthorized()
	{

		render(UrlConfig.VIEW_ERROR_401);
	}

}
