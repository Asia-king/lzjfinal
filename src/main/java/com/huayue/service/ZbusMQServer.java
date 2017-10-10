package com.huayue.service;

import java.io.IOException;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.plugin.zbus.sender.MqSender;
import com.jfinal.plugin.zbus.sender.Sender;
import com.jfinal.plugin.zbus.sender.TopicSender;

public class ZbusMQServer {

	// json格式
	public void server(JSONObject json, String messageType, int sendType) throws IOException, InterruptedException {
		@SuppressWarnings("resource")
		Sender<JSONObject> mqSender = new MqSender<JSONObject>(messageType);

		// 同步发送对象到MQ
		if (sendType == 0)
			mqSender.sendSync(json);
		else if (sendType == 1)
			// 异步发送对象到MQ
			mqSender.sendAsync(json);
	}

	// String格式
	public void server(String sendtext, String topic, String check, int sendType)
			throws IOException, InterruptedException {

		@SuppressWarnings("resource")
		Sender<String> topicSender = new TopicSender<String>(topic, check);

		if (sendType == 0)
			// 同步发送对象到topic
			topicSender.sendSync(sendtext);
		else if (sendType == 1)
			// 异步发送对象到topic
			topicSender.sendAsync(sendtext);
	}

}
