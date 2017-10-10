package com.huayue.service;

import java.io.IOException;

import org.zbus.broker.Broker;
import org.zbus.broker.BrokerConfig;
import org.zbus.broker.SingleBroker;
import org.zbus.kit.ConfigKit;
import org.zbus.rpc.RpcProcessor;
import org.zbus.rpc.biz.InterfaceImpl;
import org.zbus.rpc.mq.Service;
import org.zbus.rpc.mq.ServiceConfig;
import org.zbus.rpc.biz.*;

public class ZbusRPCMQServer {
	public Service svc = null;

	public void server(String[] args, String hostport,String messageType,String serveropt,String threadopt,String mqopt,int threadnum) throws IOException {
		final String serverAddress = ConfigKit.option(args, serveropt, hostport);
		final int threadCount = ConfigKit.option(args, threadopt, threadnum);
		final String mq = ConfigKit.option(args, mqopt, messageType);

		RpcProcessor processor = new RpcProcessor();
		// 增加模块，模块名在调用时需要指定
		processor.addModule(new InterfaceImpl());

		// 配置Broker
		BrokerConfig brokerCfg = new BrokerConfig();
		brokerCfg.setServerAddress(serverAddress);
		brokerCfg.setMaxTotal(threadCount);
		brokerCfg.setMinIdle(threadCount);

		Broker broker = new SingleBroker(brokerCfg);

		ServiceConfig config = new ServiceConfig();
		config.setConsumerCount(threadCount);
		config.setMq(mq);
		config.setBroker(broker);
		config.setMessageProcessor(processor);

		
		svc = new Service(config);
		svc.start();
	}
}
