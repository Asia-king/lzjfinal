package com.huayue.service;

import java.io.IOException;

import org.zbus.broker.Broker;
import org.zbus.broker.BrokerConfig;
import org.zbus.broker.ha.HaBroker;
import org.zbus.rpc.RpcProcessor;
import org.zbus.rpc.biz.InterfaceImpl;
import org.zbus.rpc.mq.Service;
import org.zbus.rpc.mq.ServiceConfig;

public class ZbusRPCMQHAServer {
	public Service svc = null;

	public void server(String hahostport, String messageType, int consumernum) throws IOException {
		RpcProcessor processor = new RpcProcessor();
		// 增加模块，模块名在调用时需要指定
		processor.addModule(new InterfaceImpl());

		BrokerConfig brokerConfig = new BrokerConfig();
		brokerConfig.setTrackServerList(hahostport);
		Broker broker = new HaBroker(brokerConfig);

		ServiceConfig config = new ServiceConfig();
		config.setConsumerCount(consumernum);
		config.setMq(messageType);
		config.setBroker(broker);
		config.setMessageProcessor(processor);

		svc = new Service(config);
		svc.start();
	}
}
