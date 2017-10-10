package com.huayue.service;

import java.io.IOException;

import org.zbus.broker.Broker;
import org.zbus.broker.BrokerConfig;
import org.zbus.broker.SingleBroker;
import org.zbus.mq.Producer;
import org.zbus.mq.Protocol.MqMode;
import org.zbus.net.Sync.ResultCallback;
import org.zbus.net.http.Message;

public class ZbusPubSubAsyncServer {

	public void server(String hostport, String messageType, Message msg) throws IOException, InterruptedException {
		BrokerConfig config = new BrokerConfig();
		config.setServerAddress(hostport);
		final Broker broker = new SingleBroker(config);

		Producer producer = new Producer(broker, messageType, MqMode.PubSub);
		producer.createMQ();

		producer.sendAsync(msg, new ResultCallback<Message>() {

			@Override
			public void onReturn(Message result) {
				// System.out.println(result);
				// ignore
			}
		});

		Thread.sleep(5000); // safe message sending out
		broker.close();
	}

}
