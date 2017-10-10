package com.huayue.service;

import java.io.IOException;

import org.zbus.broker.Broker;
import org.zbus.broker.BrokerConfig;
import org.zbus.broker.SingleBroker;
import org.zbus.rpc.RpcProcessor;
import org.zbus.rpc.biz.InterfaceImpl;
import org.zbus.rpc.mq.Service;
import org.zbus.rpc.mq.ServiceConfig;
import org.zbus.rpc.biz.*;

public class ZbusRPCMQMuiltBrokerServer {
	public Service svc=null;
	public void server(String hostport1,String hostport2,String messageType,int consumernum) throws IOException{
		RpcProcessor processor = new RpcProcessor();
		// 增加模块，模块名在调用时需要指定
		processor.addModule(new InterfaceImpl());

		
		BrokerConfig brokerConfig1 = new BrokerConfig();
		brokerConfig1.setServerAddress(hostport1);
		Broker broker1 = new SingleBroker(brokerConfig1);
		
		BrokerConfig brokerConfig2 = new BrokerConfig();
		brokerConfig2.setServerAddress(hostport2);
		Broker broker2 = new SingleBroker(brokerConfig2);
		
		ServiceConfig config = new ServiceConfig();
		config.setConsumerCount(consumernum); 
		config.setMq(messageType);  
		//同时注册到多条zbus总线上
		config.setBrokers(new Broker[]{broker1, broker2});
		config.setMessageProcessor(processor);
		
		svc = new Service(config);
		svc.start();
	}

}
