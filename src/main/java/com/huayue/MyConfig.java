package com.huayue;

import org.beetl.core.GroupTemplate;
import org.beetl.ext.jfinal.BeetlRenderFactory;

import com.alibaba.druid.filter.stat.StatFilter;
import com.alibaba.druid.wall.WallFilter;
import com.huayue.common.Consts;
import com.huayue.common.DateUtil;
import com.huayue.jbase.jfinal.ext.ShiroExt;
import com.huayue.jbase.jfinal.ext.xss.XssHandler;
import com.huayue.shiro.SessionHandler;
import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.core.Const;
import com.jfinal.core.JFinal;
import com.jfinal.ext.handler.ContextPathHandler;
import com.jfinal.ext.handler.FakeStaticHandler;
import com.jfinal.ext.interceptor.SessionInViewInterceptor;
import com.jfinal.ext.plugin.config.ConfigKit;
import com.jfinal.ext.plugin.config.ConfigPlugin;
import com.jfinal.ext.plugin.shiro.ShiroInterceptor;
import com.jfinal.ext.plugin.shiro.ShiroPlugin;
import com.jfinal.ext.plugin.sqlinxml.SqlInXmlPlugin;
import com.jfinal.ext.plugin.tablebind.AutoTableBindPlugin;
import com.jfinal.ext.plugin.tablebind.SimpleNameStyles;
import com.jfinal.ext.route.AutoBindRoutes;
import com.jfinal.plugin.activerecord.SqlReporter;
import com.jfinal.plugin.druid.DruidPlugin;
import com.jfinal.plugin.druid.DruidStatViewHandler;
import com.jfinal.plugin.ehcache.EhCachePlugin;
//import com.jfinal.plugin.zbus.ZbusPlugin;
//import com.jfinal.plugin.zbus.ZbusPlugin;
import com.jfinal.plugin.zbus.ZbusPlugin;

/**
 * API引导式配置
 */
public class MyConfig extends JFinalConfig {
	public boolean OPEN_SHIRO = true;
	public boolean OPEN_ADV = true; // 可设置隐藏 项目介绍等

	private Routes routes;
	private boolean isDev = isDevMode();

	private boolean isDevMode() {
		String osName = System.getProperty("os.name");
		return osName.indexOf("Windows") != -1;
	}
	public final static String relativePath="uploadFile//"+DateUtil.getCurrentDate();
	public final static String filePath="D://middleplatform/Tomcat7/webapps/lzdz/static/"+relativePath;
	


	/**
	 * 配置常量
	 */
	public void configConstant(Constants me) {
		me.setError404View("/page/error/404.html");
		me.setError401View("/page/error/401.html");
		me.setError403View("/page/error/403.html");
		me.setError500View("/page/error/500.html");

		new ConfigPlugin(".*.txt").reload(false).start();

		me.setDevMode(isDev);
		me.setEncoding("utf-8");
		// me.setViewType(ViewType.OTHER);

		// beel
		me.setMainRenderFactory(new BeetlRenderFactory());
		GroupTemplate gt = BeetlRenderFactory.groupTemplate;
		gt.registerFunctionPackage("so", new ShiroExt());

		me.setUploadedFileSaveDirectory(filePath);//文件上传保存路径
//		System.out.print(filePath);
		me.setMaxPostSize(50*Const.DEFAULT_MAX_POST_SIZE);//上传文件最大为10M
		

	}

	/**
	 * 配置路由
	 */
	public void configRoute(Routes me) {
		this.routes = me;
		// 自动扫描 建议用注解
		me.add(new AutoBindRoutes(false));
	}

	/**
	 * 配置插件
	 */
	@SuppressWarnings("unchecked")
	public void configPlugin(Plugins me) {
		// 配置Druid 数据库连接池插件
		//非空间
		DruidPlugin dpNoSpace = new DruidPlugin(ConfigKit.getStr("jdbcUrlNoSpace"), ConfigKit.getStr("user"),
				ConfigKit.getStr("password")
		// DruidUtil.decrypt(getProperty("password"),
		// getProperty("decrypt"))
		);
		// 设置 状态监听与 sql防御
		WallFilter wall = new WallFilter();
		wall.setDbType(ConfigKit.getStr("dbType"));
		dpNoSpace.addFilter(wall);
		dpNoSpace.addFilter(new StatFilter());
		me.add(dpNoSpace);
		
		//空间
		DruidPlugin dpSpace = new DruidPlugin(ConfigKit.getStr("jdbcUrlSpace"), ConfigKit.getStr("user"),
				ConfigKit.getStr("password")
		// DruidUtil.decrypt(getProperty("password"),
		// getProperty("decrypt"))
		);
		me.add(dpSpace);
		// redis
		// me.add(new JedisPlugin());
		// add EhCache
		me.add(new EhCachePlugin());
		// add sql xml plugin
		me.add(new SqlInXmlPlugin());
		// add shrio
		if (OPEN_SHIRO)
			me.add(new ShiroPlugin(this.routes));
		
		//元数据
		DruidPlugin dborigin = new DruidPlugin(ConfigKit.getStr("jdbcUrlorigin"), ConfigKit.getStr("user"),
				ConfigKit.getStr("password")
		);
		me.add(dborigin);
		me.add(new EhCachePlugin());
		me.add(new SqlInXmlPlugin());
		if (OPEN_SHIRO)
			me.add(new ShiroPlugin(this.routes));

		// 配置AutoTableBindPlugin插件
		//非空间
		AutoTableBindPlugin atbpNoSpace = new AutoTableBindPlugin("noSpace", dpNoSpace, SimpleNameStyles.LOWER);
		String[] packs={"com.huayue.business.model.space","com.huayue.system.model.db"};
		String[] packss={"com.huayue.system.model.db","com.huayue.business.model.space"};
		atbpNoSpace.scanPackages(new String[]{"com.huayue.business.model.nospace","com.huayue.system.model"});
		if (isDev)
			atbpNoSpace.setShowSql(true);
		atbpNoSpace.autoScan(false);
		me.add(atbpNoSpace);
		
		// 配置AutoTableBindPlugin插件
		//元数据
		AutoTableBindPlugin atdborigin = new AutoTableBindPlugin("dborigin", dborigin, SimpleNameStyles.LOWER);
		atdborigin.scanPackages("com.huayue.db.model");
		if (isDev)
			atdborigin.setShowSql(true);
		atdborigin.autoScan(false);
		me.add(atdborigin);

		// 自动绑定数据库表()
		AutoTableBindPlugin atbpSpace = new AutoTableBindPlugin("space", dpSpace, SimpleNameStyles.LOWER);
		atbpSpace.scanPackages("com.huayue.business.model.space");
		atbpSpace.setShowSql(true);
		// 不扫描没有注解的Model类
		atbpSpace.autoScan(false);
		me.add(atbpSpace);

		// sql记录
		SqlReporter.setLogger(true);

		 //cim 模块 可做聊天 推送等
//		 CIMPlugin cim = new CIMPlugin();
//		 cim.setBindHandler(new BindHandler());
//		 cim.setHeartBeatHandler(new HeartbeatHandler());
//		 cim.setLogoutHandler(new LogoutHandler());
//		 cim.setSessionClosedHandler(new SessionClosedHandler());
//		 me.add(cim);
		
		

		 String brokerAddress = Consts.ZBUS_SERVERPORT;
		 String scanRootPackage = "com.huayue";
		 ZbusPlugin zbusPlugin = new ZbusPlugin(brokerAddress,scanRootPackage);
		 me.add(zbusPlugin);
	}

	/**
	 * 配置全局拦截器
	 */
	public void configInterceptor(Interceptors me) {
		// shiro权限拦截器配置
		if (OPEN_SHIRO)
			me.add(new ShiroInterceptor());
		if (OPEN_SHIRO)
			me.add(new com.huayue.shiro.ShiroInterceptor());

		// 让 模版 可以使用session
		me.add(new SessionInViewInterceptor());
	}

	/**
	 * 配置处理器
	 */
	public void configHandler(Handlers me) {
		// 计算每个page 运行时间
		// me.add(new RenderingTimeHandler());

		// xss 过滤
		me.add(new XssHandler("s"));
		// 伪静态处理
		me.add(new FakeStaticHandler());
		// 去掉 jsessionid 防止找不到action
		me.add(new SessionHandler());
		me.add(new DruidStatViewHandler("/druid"));

		me.add(new ContextPathHandler());

		// me.add(new WebSocketHandler());

	}

	/**
	 * 运行此 main 方法可以启动项目，此main方法可以放置在任意的Class类定义中，不一定要放于此
	 */
	public static void main(String[] args) {
		
		JFinal.start("src/main/webapp", 2222, "/", 5);
	}

}
