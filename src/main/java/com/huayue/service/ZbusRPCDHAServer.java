package com.huayue.service;

import java.io.IOException;

import org.zbus.rpc.RpcProcessor;
import org.zbus.rpc.biz.InterfaceImpl;
import org.zbus.rpc.direct.Service;
import org.zbus.rpc.direct.ServiceConfig;

public class ZbusRPCDHAServer {
	public Service svc=null;
	public void server(String hahostport,String messageType) throws IOException{
		RpcProcessor processor = new RpcProcessor();
		// 增加模块，模块名在调用时需要指定
		processor.addModule(new InterfaceImpl());
 
		
		ServiceConfig config = new ServiceConfig();    
		config.messageProcessor = processor;
		
		//HA配置， TrackServer地址列表+Entry识别标识
		config.trackServerList = hahostport; 
		config.entryId = messageType;
		
		svc = new Service(config);
		svc.start(); 
	}

}
