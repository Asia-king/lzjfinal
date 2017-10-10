package com.huayue.business.model.nospace;

import java.util.List;

import com.huayue.business.util.DataAllCtrl;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.jfinal.ext.plugin.tablebind.TableBind;

@SuppressWarnings("serial")
@TableBind(tableName="earth_catalogue")
public class EarthquakeList extends Model<EarthquakeList> {
	
	public static EarthquakeList earthquakeList = new EarthquakeList();
	DataAllCtrl dac = new DataAllCtrl();
	

}
