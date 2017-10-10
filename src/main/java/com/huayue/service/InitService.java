package com.huayue.service;

import java.io.File;

import com.huayue.jbase.util.Fs;
import com.huayue.jbase.util.L;
import com.jfinal.plugin.activerecord.Db;

public class InitService
{

	public void initDb(String path){
		
		try
		{
			String sql = Fs.readFile(new File(path));
			
			String[] sqls = sql.split(";");
			
			for(String s :sqls ){
				Db.update(s);
				L.i(s);
			}
			
		} catch (Exception e)
		{
			e.printStackTrace();
		}

	}
	
	
	
}
