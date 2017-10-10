package com.huayue.service;

import java.io.IOException;

import org.zbus.broker.Broker;
import org.zbus.broker.BrokerConfig;
import org.zbus.broker.ha.HaBroker;
import org.zbus.rpc.RpcInvoker;
import org.zbus.rpc.direct.HaInvoker;

public class ZbusRPCDHAClient {
	public RpcInvoker rpc = null;

	public void client(String hahostport, String sendType) throws IOException {
		BrokerConfig brokerConfig = new BrokerConfig();
		brokerConfig.setTrackServerList(hahostport);
		Broker broker = new HaBroker(brokerConfig);

		HaInvoker messageInvoker = new HaInvoker(broker, sendType);

		rpc = new RpcInvoker(messageInvoker);

		broker.close();
	}
}
