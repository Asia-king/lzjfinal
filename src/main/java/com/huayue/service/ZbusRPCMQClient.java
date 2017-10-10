package com.huayue.service;

import java.io.IOException;

import org.zbus.broker.Broker;
import org.zbus.broker.BrokerConfig;
import org.zbus.broker.SingleBroker;
import org.zbus.rpc.RpcInvoker;
import org.zbus.rpc.mq.MqInvoker;

public class ZbusRPCMQClient {
	public RpcInvoker rpc = null;

	public void client(String hostport, String messageType) throws IOException {

		BrokerConfig brokerConfig = new BrokerConfig();
		brokerConfig.setServerAddress(hostport);
		Broker broker = new SingleBroker(brokerConfig);

		MqInvoker messageInvoker = new MqInvoker(broker, messageType);
		rpc = new RpcInvoker(messageInvoker);
		rpc.setVerbose(true);

		broker.close();
	}

}
