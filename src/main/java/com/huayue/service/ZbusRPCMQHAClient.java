package com.huayue.service;

import java.io.IOException;

import org.zbus.broker.Broker;
import org.zbus.broker.BrokerConfig;
import org.zbus.broker.ha.HaBroker;
import org.zbus.rpc.RpcInvoker;
import org.zbus.rpc.mq.MqInvoker;

public class ZbusRPCMQHAClient {
	public RpcInvoker rpc = null;

	public void client(String hahostport, String messageType) throws IOException {
		BrokerConfig brokerConfig = new BrokerConfig();
		brokerConfig.setTrackServerList(hahostport);
		Broker broker = new HaBroker(brokerConfig);

		MqInvoker messageInvoker = new MqInvoker(broker, messageType);

		rpc = new RpcInvoker(messageInvoker);

		broker.close();
	}
}
