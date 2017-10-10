package com.huayue.common;

import java.util.ArrayList;
import java.util.List;

public class Consts
{
	public static final String SESSION_USER = "user";

	/***
	 * 分布式session开关 请在redis.properties 配置ip和端口
	 */
	public static boolean OPEN_REDIS = true;
	public static String ZBUS_SERVERPORT = "10.246.2.3:15555";

	public static List<String> filepath = new ArrayList<String>();
}
