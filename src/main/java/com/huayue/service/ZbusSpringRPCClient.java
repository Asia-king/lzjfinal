package com.huayue.service;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.zbus.rpc.biz.Interface;

public class ZbusSpringRPCClient {
	public ApplicationContext context = null;
	public Interface intf = null;//接口列表
	public ZbusSpringRPCClient() {
		context = new ClassPathXmlApplicationContext("SpringRpcClient.xml");

		intf = (Interface) context.getBean("interface");
	}
}
