package com.huayue.service;

import java.io.IOException;

import org.zbus.mq.server.MqServer;
import org.zbus.mq.server.MqServerConfig;

public class ZbusServer {
	public ZbusServer(){
		MqServerConfig config = new MqServerConfig();
		config.serverHost="127.0.0.1";
		config.serverPort = 15555;
		config.storePath = "./store";
		@SuppressWarnings("resource")
		final MqServer server = new MqServer(config);
		try {
			server.start();
			System.out.println("启动成功");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			System.out.println("启动失败");
			e.printStackTrace();
		}
	}
}
