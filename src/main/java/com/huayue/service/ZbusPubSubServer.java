package com.huayue.service;

import java.io.IOException;

import org.zbus.broker.Broker;
import org.zbus.broker.BrokerConfig;
import org.zbus.broker.SingleBroker;
import org.zbus.mq.Producer;
import org.zbus.mq.Protocol.MqMode;
import org.zbus.net.http.Message;

public class ZbusPubSubServer {
	
	public void server(String hostport,String messageType,int messagenum,Message msg) throws IOException, InterruptedException{
		BrokerConfig config = new BrokerConfig();
		config.setServerAddress(hostport);
		final Broker broker = new SingleBroker(config);
		 
		Producer producer = new Producer(broker, messageType, MqMode.PubSub);
		producer.createMQ();  
		for(int i=0;i<messagenum;i++){
			producer.sendSync(msg);
		}
		broker.close();
	}

}
