package com.huayue.system.controller;

import java.util.ArrayList;
import java.util.List;

import com.huayue.business.model.nospace.AftDisReport;
import com.huayue.business.model.nospace.Bookmark;
import com.huayue.business.model.nospace.DBuiCity1;
import com.huayue.business.model.nospace.DBuiCity2;
import com.huayue.business.model.nospace.DBuiFirm;
import com.huayue.business.model.nospace.DCityRatio;
import com.huayue.business.model.nospace.DClimate;
import com.huayue.business.model.nospace.DEconomy;
import com.huayue.business.model.nospace.DEmePlan;
import com.huayue.business.model.nospace.DGovCommunication;
import com.huayue.business.model.nospace.DLocalHeadquarters;
import com.huayue.business.model.nospace.DLocalNet;
import com.huayue.business.model.nospace.DMedical;
import com.huayue.business.model.nospace.DNsbCommunication;
import com.huayue.business.model.nospace.DPopDensity;
import com.huayue.business.model.nospace.DPopulation;
import com.huayue.business.model.nospace.DReliefTroop2;
import com.huayue.business.model.nospace.DRurRatio;
import com.huayue.business.model.nospace.DStoInventory;
import com.huayue.business.model.nospace.DTroopCommunication;
import com.huayue.business.model.nospace.DisStaReport;
import com.huayue.business.model.nospace.EmeReport;
import com.huayue.business.model.nospace.MacAnoReports;
import com.huayue.business.model.nospace.SitSituReport;
import com.huayue.business.model.space.DangerousSource;
import com.huayue.business.model.space.EnterpriseCode;
import com.huayue.business.model.space.EvacuationSite;
import com.huayue.business.model.space.GeologicalHazard;
import com.huayue.business.model.space.School;
import com.huayue.business.model.space.SigObjective;
import com.huayue.common.UrlConfig;
import com.huayue.db.model.DB;
import com.jfinal.ext.route.ControllerBind;
import com.jfinal.plugin.activerecord.Db;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.huayue.jbase.jfinal.ext.model.Model;
import com.huayue.system.model.Res;
import com.huayue.system.model.Role;
import com.huayue.system.model.User;

@ControllerBind(controllerKey = "/system/db", viewPath = UrlConfig.SYSTEM)
public class DBController extends Controller {
	/**
	 * 添加
	 */

	public void db(){
		renderJson();
	}
	public void listView() {
		String config="aftDisReportListColumnName-aftDisReportList-AftDisReport-/business/aftdisreport/adds-/business/aftdisreport/edit-/business/aftdisreport/delete";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void aftDisReportListView() {
		String config="aftDisReportListColumnName-aftDisReportList-AftDisReport-/business/aftdisreport/adds-/business/aftdisreport/edit-/business/aftdisreport/delete";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void bookmarkListView() {
		String config="bookmarkListColumnName-bookmarkList-Bookmark-/business/bookmark/adds-/business/bookmark/edit-/business/bookmark/deletes";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void dBuiCity1ListView() {
		String config="dBuiCity1ListColumnName-dBuiCity1List-DBuiCity1-/business/dbuicity1/addDB-/business/dbuicity1/editDB-/business/dbuicity1/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void dBuiCity2ListView() {
		String config="dBuiCity2ListColumnName-dBuiCity2List-DBuiCity2-/business/dbuicity2/addDB-/business/dbuicity2/editDB-/business/dbuicity2/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void dBuiFirmListView() {
		String config="dBuiFirmListColumnName-dBuiFirmList-DBuiFirm-/business/dbuifirm/addDB-/business/dbuifirm/editDB-/business/dbuifirm/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void sitSituReportListView() {
		String config="sitSituReportListColumnName-sitSituReportList-SitSituReport-/business/sitsitureport/addDB-/business/sitsitureport/editDB-/business/sitsitureport/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void dCityRatioListView() {
		String config="dCityRatioListColumnName-dCityRatioList-DCityRatio-/business/dcityratio/addDB-/business/dcityratio/editDB-/business/dcityratio/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void dClimateListView() {
		String config="dClimateListColumnName-dClimateList-DClimate-/business/dclimate/addDB-/business/dclimate/editDB-/business/dclimate/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void dEconomyListView() {
		String config="dEconomyListColumnName-dEconomyList-DEconomy-/business/deconomy/addDB-/business/deconomy/editDB-/business/deconomy/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void dEmePlanListView() {
		String config="dEmePlanListColumnName-dEmePlanList-DEmePlan-/business/demeplan/addDB-/business/demeplan/editDB-/business/demeplan/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void dGovCommunicationListView() {
		String config="dGovCommunicationListColumnName-dGovCommunicationList-DGovCommunication-/business/dgovcommunication/addDB-/business/dgovcommunication/editDB-/business/dgovcommunication/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void disStaReportListView() {
		String config="disStaReportListColumnName-disStaReportList-DisStaReport-/business/disstareport/addDB-/business/disstareport/editDB-/business/disstareport/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void dLocalHeadquartersListView() {
		String config="dLocalHeadquartersListColumnName-dLocalHeadquartersList-DLocalHeadquarters-/business/dlocalheadquarters/addDB-/business/dlocalheadquarters/editDB-/business/dlocalheadquarters/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void dLocalNetListView() {
		String config="dLocalNetListColumnName-dLocalNetList-DLocalNet-/business/dlocalnet/addDB-/business/dlocalnet/editDB-/business/dlocalnet/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void dMedicalListView() {
		String config="dMedicalListColumnName-dMedicalList-DMedical-/business/dmedical/addDB-/business/dmedical/editDB-/business/dmedical/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void dNsbCommunicationListView() {
		String config="dNsbCommunicationListColumnName-dNsbCommunicationList-DNsbCommunication-/business/dnsbcommunication/addDB-/business/dnsbcommunication/editDB-/business/dnsbcommunication/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void dPopDensityListView() {
		String config="dPopDensityListColumnName-dPopDensityList-DPopDensity-/business/dpopdensity/addDB-/business/dpopdensity/editDB-/business/dpopdensity/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void dPopulationListView() {
		String config="dPopulationListColumnName-dPopulationList-DPopulation-/business/dpopulation/addDB-/business/dpopulation/editDB-/business/dpopulation/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void dReliefTroop2ListView() {
		String config="dReliefTroop2ListColumnName-dReliefTroop2List-DReliefTroop2-/business/drelieftroop2/addDB-/business/drelieftroop2/editDB-/business/drelieftroop2/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void dRurRatioListView() {
		String config="dRurRatioListColumnName-dRurRatioList-DRurRatio-/business/drurratio/addDB-/business/drurratio/editDB-/business/drurratio/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void dStoInventoryListView() {
		String config="dStoInventoryListColumnName-dStoInventoryList-DStoInventory-/business/dstoinventory/addDB-/business/dstoinventory/editDB-/business/dstoinventory/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void dTroopCommunicationListView() {
		String config="dTroopCommunicationListColumnName-dTroopCommunicationList-DTroopCommunication-/business/dtroopcommunication/addDB-/business/dtroopcommunication/editDB-/business/dtroopcommunication/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void emeReportListView() {
		String config="emeReportListColumnName-emeReportList-EmeReport-/business/emereport/addDB-/business/emereport/editDB-/business/emereport/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void macAnoReportsListView() {
		String config="macAnoReportsListColumnName-macAnoReportsList-MacAnoReports-/business/macanoreports/addDB-/business/macanoreports/editDB-/business/macanoreports/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	
	
	public void enterpriseCodeListView() {
		String config="enterpriseCodeListColumnName-enterpriseCodeList-EnterpriseCode-/business/enterprisecode/addDB-/business/enterprisecode/editDB-/business/enterprisecode/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void evacuationSiteListView() {
		String config="evacuationSiteListColumnName-evacuationSiteList-EvacuationSite-/business/evacuationsite/addDB-/business/evacuationsite/editDB-/business/evacuationsite/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void geologicalHazardListView() {
		String config="geologicalHazardListColumnName-geologicalHazardList-GeologicalHazard-/business/geologicalhazard/addDB-/business/geologicalhazard/editDB-/business/geologicalhazard/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void schoolListView() {
		String config="schoolListColumnName-schoolList-EnterpriseCode-/business/school/addDB-/business/school/editDB-/business/school/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void digObjectiveListView() {
		String config="digObjectiveListColumnName-digObjectiveList-SigObjective-/business/sigobjective/addDB-/business/sigobjective/editDB-/business/sigobjective/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	public void dangerousSourceListView() {
		String config="dangerousSourceListColumnName-dangerousSourceList-DangerousSource-/business/dangeroussource/addDB-/business/dangeroussource/editDB-/business/dangeroussource/deleteDB";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/dbm.html");
	}
	
	

	@SuppressWarnings("unchecked")
	public List<?> queryColumns(Model<?> className, int flag) throws Exception {
		List<Model<?>> list = new ArrayList<Model<?>>();
		if (flag == -1){
			list = (List<Model<?>>) className.listcolumns();
//			List colulist = new ArrayList();
//			for (Object o : list) {
//				System.out.println(o);
//				String oo=o.toString().substring(o.toString().lastIndexOf("{") + 1, o.toString().lastIndexOf("}"));
//				String[] ooo=oo.split(",");
//				List colu = new ArrayList();
//				for(int i=0;i<ooo.length;i++){
//					String[] oooo= ooo[i].split(":");
//					colu.add(oooo[0].toString());
//				}
//				colulist.add(colu);
//				System.out.println(colu);
//				break;
//			}
			return list;
		}else if (flag == 0){
			list = (List<Model<?>>) className.listcolumns();
//			for (Object o : list) {
//				System.out.println(o);
//			}
			return list;
			}
		else if (flag == 1)
			list = (List<Model<?>>) className.listcolumnname();
		else if (flag == 2)
			list = (List<Model<?>>) className.listcolumndatatype();
		List colulist = new ArrayList();
		for (Object o : list) {
//			System.out.println(o);
			List colu = new ArrayList();
			colu.add(o.toString().substring(o.toString().lastIndexOf(":") + 1, o.toString().lastIndexOf("}")));
			colulist.add(colu);
			 //System.out.println(colu);
		}
		//System.out.println(colulist);
		return colulist;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void listColumnName() throws Exception {
		renderJson((List<AftDisReport>) queryColumns(AftDisReport.aftDisReport,1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void aftDisReportListColumnName() throws Exception {
		renderJson((List<AftDisReport>) queryColumns(AftDisReport.aftDisReport,1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void bookmarkListColumnName() throws Exception {
		renderJson((List<Bookmark>) queryColumns(Bookmark.bookmark, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void dBuiCity1ListColumnName() throws Exception {
		renderJson((List<DBuiCity1>) queryColumns(DBuiCity1.dBuiCity1, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void dBuiCity2ListColumnName() throws Exception {
		renderJson((List<DBuiCity2>) queryColumns(DBuiCity2.dBuiCity2, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void dBuiFirmListColumnName() throws Exception {
		renderJson((List<DBuiFirm>) queryColumns(DBuiFirm.dBuiFirm, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void sitSituReportListColumnName() throws Exception {
		renderJson((List<SitSituReport>) queryColumns(SitSituReport.sitSituReport, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void dCityRatioListColumnName() throws Exception {
		renderJson((List<DCityRatio>) queryColumns(DCityRatio.dCityRatio, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void dClimateListColumnName() throws Exception {
		renderJson((List<DClimate>) queryColumns(DClimate.dClimate, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void dEconomyListColumnName() throws Exception {
		renderJson((List<DEconomy>) queryColumns(DEconomy.dEconomy, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void dEmePlanListColumnName() throws Exception {
		renderJson((List<DEmePlan>) queryColumns(DEmePlan.dEmePlan, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void dGovCommunicationListColumnName() throws Exception {
		renderJson((List<DGovCommunication>) queryColumns(DGovCommunication.dGovCommunication, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void disStaReportListColumnName() throws Exception {
		renderJson((List<DisStaReport>) queryColumns(DisStaReport.disStaReport, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void dLocalHeadquartersListColumnName() throws Exception {
		renderJson((List<DLocalHeadquarters>) queryColumns(DLocalHeadquarters.dLocalHeadquarters, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void dLocalNetListColumnName() throws Exception {
		renderJson((List<DLocalNet>) queryColumns(DLocalNet.dLocalNet, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void dMedicalListColumnName() throws Exception {
		renderJson((List<DMedical>) queryColumns(DMedical.dMedical, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void dNsbCommunicationListColumnName() throws Exception {
		renderJson((List<DNsbCommunication>) queryColumns(DNsbCommunication.dNsbCommunication, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void dPopDensityListColumnName() throws Exception {
		renderJson((List<DPopDensity>) queryColumns(DPopDensity.dPopDensity, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void dPopulationListColumnName() throws Exception {
		renderJson((List<DPopulation>) queryColumns(DPopulation.dPopulation, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void dReliefTroop2ListColumnName() throws Exception {
		renderJson((List<DReliefTroop2>) queryColumns(DReliefTroop2.dReliefTroop2, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void dRurRatioListColumnName() throws Exception {
		renderJson((List<DRurRatio>) queryColumns(DRurRatio.dRurRatio, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void dStoInventoryListColumnName() throws Exception {
		renderJson((List<DStoInventory>) queryColumns(DStoInventory.dStoInventory, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void dTroopCommunicationListColumnName() throws Exception {
		renderJson((List<DTroopCommunication>) queryColumns(DTroopCommunication.dTroopCommunication, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void emeReportListColumnName() throws Exception {
		renderJson((List<EmeReport>) queryColumns(EmeReport.emeReport, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void macAnoReportsListColumnName() throws Exception {
		renderJson((List<MacAnoReports>) queryColumns(MacAnoReports.macAnoReports, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void enterpriseCodeListColumnName() throws Exception {
		renderJson((List<EnterpriseCode>) queryColumns(EnterpriseCode.enterpriseCode, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void evacuationSiteListColumnName() throws Exception {
		renderJson((List<EvacuationSite>) queryColumns(EvacuationSite.evacuationSite, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void geologicalHazardListColumnName() throws Exception {
		renderJson((List<GeologicalHazard>) queryColumns(GeologicalHazard.geologicalHazard, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void schoolListColumnName() throws Exception {
		renderJson((List<School>) queryColumns(School.school, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void sigObjectiveListColumnName() throws Exception {
		renderJson((List<SigObjective>) queryColumns(SigObjective.sigObjective, 1));
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void dangerousSourceListColumnName() throws Exception {
		renderJson((List<DangerousSource>) queryColumns(DangerousSource.dangerousSource, 1));
	}
	


	@SuppressWarnings("unchecked")
	public List<?> query(Model<?> className) throws Exception {
		List<Model<?>> list = new ArrayList<Model<?>>();
		list = (List<Model<?>>) className.list();
//		for (Object o : list) {
//			System.out.println(o);
//		}
		return list;
	}

	@SuppressWarnings("unchecked")
	public void list() throws Exception {
		renderJson((List<AftDisReport>) query(AftDisReport.aftDisReport));
	}
	@SuppressWarnings("unchecked")
	public void aftDisReportList() throws Exception {
		renderJson((List<AftDisReport>) query(AftDisReport.aftDisReport));
	}
	@SuppressWarnings("unchecked")
	public void bookmarkList() throws Exception {
		 renderJson((List<Bookmark>)query(Bookmark.bookmark));
	}
	@SuppressWarnings("unchecked")
	public void dBuiCity1List() throws Exception {
		 renderJson((List<DBuiCity1>)query(DBuiCity1.dBuiCity1));
	}
	@SuppressWarnings("unchecked")
	public void dBuiCity2List() throws Exception {
		 renderJson((List<DBuiCity2>)query(DBuiCity2.dBuiCity2));
	}
	@SuppressWarnings("unchecked")
	public void dBuiFirmList() throws Exception {
		 renderJson((List<DBuiFirm>)query(DBuiFirm.dBuiFirm));
	}
	@SuppressWarnings("unchecked")
	public void sitSituReportList() throws Exception {
		 renderJson((List<SitSituReport>)query(SitSituReport.sitSituReport));
	}
	@SuppressWarnings("unchecked")
	public void dCityRatioList() throws Exception {
		 renderJson((List<DCityRatio>)query(DCityRatio.dCityRatio));
	}
	@SuppressWarnings("unchecked")
	public void dClimateList() throws Exception {
		 renderJson((List<DClimate>)query(DClimate.dClimate));
	}
	@SuppressWarnings("unchecked")
	public void dEconomyList() throws Exception {
		 renderJson((List<DEconomy>)query(DEconomy.dEconomy));
	}
	@SuppressWarnings("unchecked")
	public void dEmePlanList() throws Exception {
		 renderJson((List<DEmePlan>)query(DEmePlan.dEmePlan));
	}
	@SuppressWarnings("unchecked")
	public void dGovCommunicationList() throws Exception {
		 renderJson((List<DGovCommunication>)query(DGovCommunication.dGovCommunication));
	}
	@SuppressWarnings("unchecked")
	public void disStaReportList() throws Exception {
		 renderJson((List<DisStaReport>)query(DisStaReport.disStaReport));
	}
	@SuppressWarnings("unchecked")
	public void dLocalHeadquartersList() throws Exception {
		 renderJson((List<DLocalHeadquarters>)query(DLocalHeadquarters.dLocalHeadquarters));
	}
	@SuppressWarnings("unchecked")
	public void dLocalNetList() throws Exception {
		 renderJson((List<DLocalNet>)query(DLocalNet.dLocalNet));
	}
	@SuppressWarnings("unchecked")
	public void dMedicalList() throws Exception {
		 renderJson((List<DMedical>)query(DMedical.dMedical));
	}
	@SuppressWarnings("unchecked")
	public void dNsbCommunicationList() throws Exception {
		 renderJson((List<DNsbCommunication>)query(DNsbCommunication.dNsbCommunication));
	}
	@SuppressWarnings("unchecked")
	public void dPopDensityList() throws Exception {
		 renderJson((List<DPopDensity>)query(DPopDensity.dPopDensity));
	}
	@SuppressWarnings("unchecked")
	public void dPopulationList() throws Exception {
		 renderJson((List<DPopulation>)query(DPopulation.dPopulation));
	}
	@SuppressWarnings("unchecked")
	public void dReliefTroop2List() throws Exception {
		 renderJson((List<DReliefTroop2>)query(DReliefTroop2.dReliefTroop2));
	}
	@SuppressWarnings("unchecked")
	public void dRurRatioList() throws Exception {
		 renderJson((List<DRurRatio>)query(DRurRatio.dRurRatio));
	}
	@SuppressWarnings("unchecked")
	public void dStoInventoryList() throws Exception {
		 renderJson((List<DStoInventory>)query(DStoInventory.dStoInventory));
	}
	@SuppressWarnings("unchecked")
	public void dTroopCommunicationList() throws Exception {
		 renderJson((List<DTroopCommunication>)query(DTroopCommunication.dTroopCommunication));
	}
	@SuppressWarnings("unchecked")
	public void emeReportList() throws Exception {
		 renderJson((List<EmeReport>)query(EmeReport.emeReport));
	}
	@SuppressWarnings("unchecked")
	public void macAnoReportsList() throws Exception {
		 renderJson((List<MacAnoReports>)query(MacAnoReports.macAnoReports));
	}
	
	@SuppressWarnings("unchecked")
	public void enterpriseCodeList() throws Exception {
		 renderJson((List<EnterpriseCode>)query(EnterpriseCode.enterpriseCode));
	}
	@SuppressWarnings("unchecked")
	public void evacuationSiteList() throws Exception {
		 renderJson((List<EvacuationSite>)query(EvacuationSite.evacuationSite));
	}
	@SuppressWarnings("unchecked")
	public void geologicalHazardList() throws Exception {
		 renderJson((List<GeologicalHazard>)query(GeologicalHazard.geologicalHazard));
	}
	@SuppressWarnings("unchecked")
	public void schoolList() throws Exception {
		 renderJson((List<School>)query(School.school));
	}
	@SuppressWarnings("unchecked")
	public void sigObjectiveList() throws Exception {
		 renderJson((List<SigObjective>)query(SigObjective.sigObjective));
	}
	@SuppressWarnings("unchecked")
	public void dangerousSourceList() throws Exception {
		 renderJson((List<DangerousSource>)query(DangerousSource.dangerousSource));
	}
	
	
	
	

	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void listColumn() throws Exception {
		renderJson((List<AftDisReport>) queryColumns(AftDisReport.aftDisReport,0));
	}
	@SuppressWarnings("unchecked")
	public void aftDisReportListColumn() throws Exception {
		renderJson((List<AftDisReport>) queryColumns(AftDisReport.aftDisReport,0));
	}
	@SuppressWarnings("unchecked")
	public void bookmarkListColumn() throws Exception {
		 renderJson((List<Bookmark>)queryColumns(Bookmark.bookmark,0));
	}
	@SuppressWarnings("unchecked")
	public void dBuiCity1ListColumn() throws Exception {
		 renderJson((List<DBuiCity1>)queryColumns(DBuiCity1.dBuiCity1,0));
	}
	@SuppressWarnings("unchecked")
	public void dBuiCity2ListColumn() throws Exception {
		 renderJson((List<DBuiCity2>)queryColumns(DBuiCity2.dBuiCity2,0));
	}
	@SuppressWarnings("unchecked")
	public void dBuiFirmListColumn() throws Exception {
		 renderJson((List<DBuiFirm>)queryColumns(DBuiFirm.dBuiFirm,0));
	}
	@SuppressWarnings("unchecked")
	public void sitSituReportListColumn() throws Exception {
		 renderJson((List<SitSituReport>)queryColumns(SitSituReport.sitSituReport,0));
	}
	@SuppressWarnings("unchecked")
	public void dCityRatioListColumn() throws Exception {
		 renderJson((List<DCityRatio>)queryColumns(DCityRatio.dCityRatio,0));
	}
	@SuppressWarnings("unchecked")
	public void dClimateListColumn() throws Exception {
		 renderJson((List<DClimate>)queryColumns(DClimate.dClimate,0));
	}
	@SuppressWarnings("unchecked")
	public void dEconomyListColumn() throws Exception {
		 renderJson((List<DEconomy>)queryColumns(DEconomy.dEconomy,0));
	}
	@SuppressWarnings("unchecked")
	public void dEmePlanListColumn() throws Exception {
		 renderJson((List<DEmePlan>)queryColumns(DEmePlan.dEmePlan,0));
	}
	@SuppressWarnings("unchecked")
	public void dGovCommunicationListColumn() throws Exception {
		 renderJson((List<DGovCommunication>)queryColumns(DGovCommunication.dGovCommunication,0));
	}
	@SuppressWarnings("unchecked")
	public void disStaReportListColumn() throws Exception {
		 renderJson((List<DisStaReport>)queryColumns(DisStaReport.disStaReport,0));
	}
	@SuppressWarnings("unchecked")
	public void dLocalHeadquartersListColumn() throws Exception {
		 renderJson((List<DLocalHeadquarters>)queryColumns(DLocalHeadquarters.dLocalHeadquarters,0));
	}
	@SuppressWarnings("unchecked")
	public void dLocalNetListColumn() throws Exception {
		 renderJson((List<DLocalNet>)queryColumns(DLocalNet.dLocalNet,0));
	}
	@SuppressWarnings("unchecked")
	public void dMedicalListColumn() throws Exception {
		 renderJson((List<DMedical>)queryColumns(DMedical.dMedical,0));
	}
	@SuppressWarnings("unchecked")
	public void dNsbCommunicationListColumn() throws Exception {
		 renderJson((List<DNsbCommunication>)queryColumns(DNsbCommunication.dNsbCommunication,0));
	}
	@SuppressWarnings("unchecked")
	public void dPopDensityListColumn() throws Exception {
		 renderJson((List<DPopDensity>)queryColumns(DPopDensity.dPopDensity,0));
	}
	@SuppressWarnings("unchecked")
	public void dPopulationListColumn() throws Exception {
		 renderJson((List<DPopulation>)queryColumns(DPopulation.dPopulation,0));
	}
	@SuppressWarnings("unchecked")
	public void dReliefTroop2ListColumn() throws Exception {
		 renderJson((List<DReliefTroop2>)queryColumns(DReliefTroop2.dReliefTroop2,0));
	}
	@SuppressWarnings("unchecked")
	public void dRurRatioListColumn() throws Exception {
		 renderJson((List<DRurRatio>)queryColumns(DRurRatio.dRurRatio,0));
	}
	@SuppressWarnings("unchecked")
	public void dStoInventoryListColumn() throws Exception {
		 renderJson((List<DStoInventory>)queryColumns(DStoInventory.dStoInventory,0));
	}
	@SuppressWarnings("unchecked")
	public void dTroopCommunicationListColumn() throws Exception {
		 renderJson((List<DTroopCommunication>)queryColumns(DTroopCommunication.dTroopCommunication,0));
	}
	@SuppressWarnings("unchecked")
	public void emeReportListColumn() throws Exception {
		 renderJson((List<EmeReport>)queryColumns(EmeReport.emeReport,0));
	}
	@SuppressWarnings("unchecked")
	public void macAnoReportsListColumn() throws Exception {
		 renderJson((List<MacAnoReports>)queryColumns(MacAnoReports.macAnoReports,0));
	}
	@SuppressWarnings("unchecked")
	public void ResListColumn() throws Exception {
		 renderJson((List<Res>)queryColumns(Res.dao,0));
	}
	@SuppressWarnings("unchecked")
	public void RoleListColumn() throws Exception {
		 renderJson((List<Role>)queryColumns(Role.dao,0));
	}
	@SuppressWarnings("unchecked")
	public void UserListColumn() throws Exception {
		 renderJson((List<User>)queryColumns(User.dao,0));
	}
	
	
	@SuppressWarnings("unchecked")
	public void ResListColumnColumn() throws Exception {
		 renderJson((List<Res>)queryColumns(Res.dao,-1));
	}
	
	
	public void listColumnView(){
		String config="AftDisReport-/system/db/listColumn-/system/db/aftDisReportAddColumn-/system/db/aftDisReportEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	public void aftDisReportListColumnView() {
		String config="AftDisReport-/system/db/aftDisReportListColumn-/system/db/aftDisReportAddColumn-/system/db/aftDisReportEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	public void bookmarkListColumnView() {
		String config="Bookmark-/system/db/bookmarkListListColumn-/system/db/bookmarkAddColumn-/system/db/bookmarkEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	public void dBuiCity1ListColumnView() {
		String config="DBuiCity1-/system/db/dBuiCity1ListColumn-/system/db/dBuiCity1AddColumn-/system/db/DBuiCity1EditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	public void dBuiCity2ListColumnView() {
		String config="DBuiCity2-/system/db/dBuiCity2ListColumn-/system/db/dBuiCity2AddColumn-/system/db/dBuiCity2EditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	public void dBuiFirmListColumnView() {
		String config="DBuiFirm-/system/db/dBuiFirmListColumn-/system/db/dBuiFirmAddColumn-/system/db/dBuiFirmEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	public void sitSituReportListColumnView() {
		String config="SitSituReport-/system/db/sitSituReportListColumn-/system/db/sitSituReportAddColumn-/system/db/sitSituReportEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	public void dCityRatioListColumnView() {
		String config="DCityRatio-/system/db/dCityRatioListColumn-/system/db/dCityRatioAddColumn-/system/db/dCityRatioEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	public void dClimateListColumnView() {
		String config="DClimate-/system/db/dClimateListColumn-/system/db/dClimateAddColumn-/system/db/dClimateEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	public void dEconomyListColumnView() {
		String config="DEconomy-/system/db/dEconomyListColumn-/system/db/dEconomyAddColumn-/system/db/dEconomyEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	public void dEmePlanListColumnView() {
		String config="DEmePlan-/system/db/dEmePlanListColumn-/system/db/dEmePlanAddColumn-/system/db/dEmePlanEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	public void dGovCommunicationListColumnView() {
		String config="DGovCommunication-/system/db/dGovCommunicationListColumn-/system/db/dGovCommunicationAddColumn-/system/db/dGovCommunicationEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	public void disStaReportListColumnView() {
		String config="DisStaReport-/system/db/disStaReportListColumn-/system/db/disStaReportAddColumn-/system/db/disStaReportEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	public void dLocalHeadquartersListColumnView() {
		String config="DLocalHeadquarters-/system/db/dLocalHeadquartersListColumn-/system/db/dLocalHeadquartersAddColumn-/system/db/dLocalHeadquartersEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	public void dLocalNetListColumnView() {
		String config="DLocalNet-/system/db/dLocalNetListColumn-/system/db/dLocalNetAddColumn-/system/db/dLocalNetEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	public void dMedicalListColumnView() {
		String config="DMedical-/system/db/dMedicalListColumn-/system/db/dMedicalAddColumn-/system/db/dMedicalEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	public void dNsbCommunicationListColumnView() {
		String config="DNsbCommunication-/system/db/dNsbCommunicationListColumn-/system/db/dNsbCommunicationAddColumn-/system/db/dNsbCommunicationEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	public void dPopDensityListColumnView() {
		String config="DPopDensity-/system/db/dPopDensityListColumn-/system/db/dPopDensityAddColumn-/system/db/dPopDensityEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	public void dPopulationListColumnView() {
		String config="DPopulation-/system/db/dPopulationListColumn-/system/db/dPopulationAddColumn-/system/db/dPopulationEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	public void dReliefTroop2ListColumnView() {
		String config="DReliefTroop2-/system/db/dReliefTroop2ListColumn-/system/db/DReliefTroop2addColumn-/system/db/DReliefTroop2editColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	public void dRurRatioListColumnView() {
		String config="DRurRatio-/system/db/dRurRatioListColumn-/system/db/dRurRatioAddColumn-/system/db/dRurRatioEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	public void dStoInventoryListColumnView() {
		String config="DStoInventory-/system/db/dStoInventoryListColumn-/system/db/dStoInventoryAddColumn-/system/db/dStoInventoryEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	public void dTroopCommunicationListColumnView() {
		String config="DTroopCommunication-/system/db/dTroopCommunicationListColumn-/system/db/dTroopCommunicationAddColumn-/system/db/dTroopCommunicationEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	public void emeReportListColumnView() {
		String config="EmeReport-/system/db/emeReportListColumn-/system/db/EmeReportAddColumn-/system/db/EmeReportEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	public void macAnoReportsListColumnView() {
		String config="MacAnoReports-/system/db/macAnoReportsListColumn-/system/db/macAnoReportsAddColumn-/system/db/macAnoReportsEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	@SuppressWarnings("unchecked")
	public void ResListColumnView() throws Exception {
		String config="Res-/system/db/ResListColumn-/system/db/ResAddColumn-/system/db/ResEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	@SuppressWarnings("unchecked")
	public void RoleListColumnView() throws Exception {
		String config="Role-/system/db/RoleListColumn-/system/db/RoleAddColumn-/system/db/RoleEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	@SuppressWarnings("unchecked")
	public void UserListColumnView() throws Exception {
		String config="User-/system/db/UserListColumn-/system/db/UserAddColumn-/system/db/UserEditColumn-/system/db/deleteColumn";
		setAttr("dbmmodulus",config);
		setAttr("appname","");
		setAttr("childapp","");
		render("/page/system/db.html");
	}
	
	

	
	public void addColumn(String modelName)
	{
	String	dbname=getPara(modelName+".TABLE_SCHEMA"),
		dbtname=getPara(modelName+".TABLE_NAME"),
		coluname=getPara(modelName+".COLUMN_NAME"),
		colutype=getPara(modelName+".DATA_TYPE"),
		colukey=getPara(modelName+".COLUMN_KEY"),
		coluextra=getPara(modelName+".EXTRA"),
		colucol=getPara(modelName+".CHARACTER_OCTET_LENGTH"),
		colunp=getPara(modelName+".NUMERIC_PRECISION"),
		coluprivileges=getPara(modelName+".PRIVILEGES"),
		colucname=getPara(modelName+".COLLATION_NAME"),
		coluctype=getPara(modelName+".COLUMN_TYPE"),
		colucml=getPara(modelName+".CHARACTER_MAXIMUM_LENGTH"),
		colucsn=getPara(modelName+".CHARACTER_SET_NAME");
//		System.out.println(getPara(modelName+".TABLE_SCHEMA"));
//		System.out.println(getPara(modelName+".TABLE_NAME"));
//		System.out.println(getPara(modelName+".COLUMN_NAME"));
		//renderJsonResult(getModel(DB.class,"DB").save());
		Db.update("alter table "+dbtname +" add "+ coluname +" "+ coluctype +";");
		renderJsonResult(true);
	}

	public void aftDisReportAddColumn() throws Exception {
		addColumn("AftDisReport");
	}

	public void bookmarkAddColumn() throws Exception {
		addColumn("Bookmark");
	}

	public void dBuiCity1AddColumn() throws Exception {
		addColumn("DBuiCity1");
	}

	public void dBuiCity2AddColumn() throws Exception {
		addColumn("DBuiCity2");
	}

	public void dBuiFirmAddColumn() throws Exception {
		addColumn("DBuiFirm");
	}

	public void sitSituReportAddColumn() throws Exception {
		addColumn("SitSituReport");
	}
	
	public void dCityRatioAddColumn() throws Exception {
		addColumn("DCityRatio");
	}
	
	public void dClimateAddColumn() throws Exception {
		addColumn("DClimate");
	}
	
	public void dEconomyAddColumn() throws Exception {
		addColumn("DEconomy");
	}
	public void dEmePlanAddColumn() throws Exception {
		addColumn("DEmePlan");
	}
	
	public void dGovCommunicationAddColumn() throws Exception {
		addColumn("DGovCommunication");
	}
	
	public void disStaReportAddColumn() throws Exception {
		addColumn("DisStaReport");
	}

	public void dLocalHeadquartersAddColumn() throws Exception {
		addColumn("DLocalHeadquarters");
	}

	public void dLocalNetAddColumn() throws Exception {
		addColumn("DLocalNet");
	}
	
	public void dMedicalAddColumn() throws Exception {
		addColumn("DMedical");
	}

	public void dNsbCommunicationAddColumn() throws Exception {
		addColumn("DNsbCommunication");
	}

	public void dPopDensityAddColumn() throws Exception {
		addColumn("DPopDensity");
	}

	public void dPopulationAddColumn() throws Exception {
		addColumn("DPopulation");
	}

	public void dReliefTroop2AddColumn() throws Exception {
		addColumn("DReliefTroop2");
	}
	public void dRurRatioAddColumn() throws Exception {
		addColumn("DRurRatio");
	}

	public void dStoInventoryAddColumn() throws Exception {
		addColumn("DStoInventory");
	}
	
	public void dTroopCommunicationAddColumn() throws Exception {
		addColumn("DTroopCommunication");
	}
	
	public void emeReportAddColumn() throws Exception {
		addColumn("EmeReport");
	}
	
	public void macAnoReportsAddColumn() throws Exception {
		addColumn("MacAnoReports");
	}

	public void ResAddColumn() throws Exception {
		addColumn("Res");
	}

	public void RoleAddColumn() throws Exception {
		addColumn("Role");
	}

	public void UserAddColumn() throws Exception {
		addColumn("User");
	}
	
	
	public void editColumn(String modelName)
	{
		String	dbname=getPara(modelName+".TABLE_SCHEMA"),
				dbtname=getPara(modelName+".TABLE_NAME"),
				coluname=getPara(modelName+".COLUMN_NAME"),
				ncoluname=getPara(modelName+".NCOLUMN_NAME"),
				colutype=getPara(modelName+".DATA_TYPE"),
				colukey=getPara(modelName+".COLUMN_KEY"),
				coluextra=getPara(modelName+".EXTRA"),
				colucol=getPara(modelName+".CHARACTER_OCTET_LENGTH"),
				colunp=getPara(modelName+".NUMERIC_PRECISION"),
				coluprivileges=getPara(modelName+".PRIVILEGES"),
				colucname=getPara(modelName+".COLLATION_NAME"),
				coluctype=getPara(modelName+".COLUMN_TYPE"),
				colucml=getPara(modelName+".CHARACTER_MAXIMUM_LENGTH"),
				colucsn=getPara(modelName+".CHARACTER_SET_NAME");
//				System.out.println(getPara(modelName+".TABLE_SCHEMA"));
//				System.out.println(getPara(modelName+".TABLE_NAME"));
//				System.out.println(getPara(modelName+".COLUMN_NAME"));
				Db.update("alter table "+dbtname+" change "+coluname+" "+ ncoluname+" "+ coluctype+";");
				renderJsonResult(true);
 
//		renderJsonResult(getModel(DB.class,"DB").update());
	}
	public void aftDisReportEditColumn() throws Exception {
		editColumn("AftDisReport");
	}

	public void bookmarkEditColumn() throws Exception {
		editColumn("Bookmark");
	}

	public void dBuiCity1EditColumn() throws Exception {
		editColumn("DBuiCity1");
	}

	public void dBuiCity2EditColumn() throws Exception {
		editColumn("DBuiCity2");
	}

	public void dBuiFirmEditColumn() throws Exception {
		editColumn("DBuiFirm");
	}

	public void sitSituReportEditColumn() throws Exception {
		editColumn("SitSituReport");
	}
	
	public void dCityRatioEditColumn() throws Exception {
		editColumn("DCityRatio");
	}
	
	public void dClimateEditColumn() throws Exception {
		editColumn("DClimate");
	}
	
	public void dEconomyEditColumn() throws Exception {
		editColumn("DEconomy");
	}
	public void dEmePlanEditColumn() throws Exception {
		editColumn("DEmePlan");
	}
	
	public void dGovCommunicationEditColumn() throws Exception {
		editColumn("DGovCommunication");
	}
	
	public void disStaReportEditColumn() throws Exception {
		editColumn("DisStaReport");
	}

	public void dLocalHeadquartersEditColumn() throws Exception {
		editColumn("DLocalHeadquarters");
	}

	public void dLocalNetEditColumn() throws Exception {
		editColumn("DLocalNet");
	}
	
	public void dMedicalEditColumn() throws Exception {
		editColumn("DMedical");
	}

	public void dNsbCommunicationEditColumn() throws Exception {
		editColumn("DNsbCommunication");
	}

	public void dPopDensityEditColumn() throws Exception {
		editColumn("DPopDensity");
	}

	public void dPopulationEditColumn() throws Exception {
		editColumn("DPopulation");
	}

	public void dReliefTroop2EditColumn() throws Exception {
		editColumn("DReliefTroop2");
	}
	public void dRurRatioEditColumn() throws Exception {
		editColumn("DRurRatio");
	}

	public void dStoInventoryEditColumn() throws Exception {
		editColumn("DStoInventory");
	}
	
	public void dTroopCommunicationEditColumn() throws Exception {
		editColumn("DTroopCommunication");
	}
	
	public void emeReportEditColumn() throws Exception {
		editColumn("EmeReport");
	}
	
	public void macAnoReportsEditColumn() throws Exception {
		editColumn("MacAnoReports");
	}

	public void ResEditColumn() throws Exception {
		editColumn("Res");
	}

	public void RoleEditColumn() throws Exception {
		editColumn("Role");
	}

	public void UserEditColumn() throws Exception {
		editColumn("User");
	}
	public void deleteColumn()
	{
//				System.out.println(getPara("id"));
//				System.out.println(getPara("columnName"));
//				System.out.println(getPara("tabelName"));
				String dbtname=getPara("tabelName"),
						coluname=getPara("columnName");
			
		Db.update("alter table "+dbtname +" drop column "+ coluname+";");
//		renderJsonResult(DB.dao.deleteBysId(getParaToInt("id")));
		renderJsonResult(true);
	}
	
	
	public void newDataTable() {
		render("/page/system/ndb.html");
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void dbListColumn() throws Exception {
		renderJson((List<DB>) queryColumns(DB.dao,0));
	}

	public void createTable(){
		String	dbname=getPara("DB.TABLE_SCHEMA"),
				dbtname=getPara("DB.TABLE_NAME"),
				coluname=getPara("DB.COLUMN_NAME"),
				colutype=getPara("DB.DATA_TYPE"),
				coluctype=getPara("DB.COLUMN_TYPE");
		Db.update("DROP TABLE IF EXISTS `"+dbtname+"`");
		Db.update("CREATE TABLE "+dbtname+"( id int not null,"+ coluname+" "+ coluctype+");");
		renderJsonResult(true);
		//renderJson(Db.find("select * from information_schema.columns where table_name = '"+dbtname+"'"));
	}

}
