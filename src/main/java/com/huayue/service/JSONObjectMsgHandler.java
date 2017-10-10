package com.huayue.service;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.log.Logger;
import com.jfinal.plugin.zbus.annotation.MqHandler;
import com.jfinal.plugin.zbus.handler.TMsgHandler;

//MQ消息处理器
@MqHandler("MyMQ")
//Topic（pubsub）消息处理器
//@TopicHandler(mq="Topic", topic="Check")
public class JSONObjectMsgHandler extends TMsgHandler<JSONObject> {
  private static final Logger LOG = Logger.getLogger("JSONObjectMsgHandler");

  @Override
  public void handle(JSONObject msg) {
      LOG.info(msg.getString("filename").toString());
      System.out.println(msg.getString("filename").toString()+"===="+msg.getString("url").toString());
  }
}
