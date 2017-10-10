package com.huayue.service;

import javax.mail.MessagingException;

import com.huayue.jbase.util.Eml;
import com.huayue.jbase.util.Validate;

public class EmailService
{

	public void sendModifyPwdEmail(String email)
	{

		try
		{
			if(Validate.isEmpty(email))return;
			
			Eml eml = new Eml("smtp.126.com", "wangshuaiby@126.com", "wangshuaiby@126.com", "231566qq");
			eml.addTo(email);
			eml.setSubject("密码修改提示");
			eml.setBody("你最近修改了密码 如非本人操作 请及时 联系管理员 By Jfinal Authority");
			eml.send();
		} catch (MessagingException e)
		{
			e.printStackTrace();
		}

	}

}
