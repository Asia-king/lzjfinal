package com.huayue.service;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class ZbusSpringRPCServer {
	
	public ZbusSpringRPCServer(){
		new ClassPathXmlApplicationContext("SpringRpcService.xml"); 
	}

}
