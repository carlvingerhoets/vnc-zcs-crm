package biz.vnc.helpers;


import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import biz.vnc.base.AbstractBean;
import biz.vnc.base.InterfaceHelper;
import biz.vnc.beans.SectionBean;

import biz.vnc.util.DBUtility;

import com.google.gson.Gson;
import com.zimbra.cs.account.Account;
import com.zimbra.cs.account.Domain;
import com.zimbra.cs.account.soap.SoapProvisioning;
import com.zimbra.cs.account.soap.SoapProvisioning.Options;

public class SectionHelper implements InterfaceHelper {

	Gson gson = new Gson();
	int operationStatus=0;
	DBUtility dbu = new DBUtility();
	@Override
	public String listView() {
		String str = gson.toJson(getAllRecords());
		return str;
	}

	@Override
	public int add(AbstractBean ab) {

		SectionBean sectionBean = (SectionBean)ab;
		String query = "insert into tbl_crm_section values (" + sectionBean.getSectionId() + ",\"" + sectionBean.getSectionName() + "\",\"" + sectionBean.getSectionCode() + "\",\"" + sectionBean.getSectionManagerId() + "\",\"" + sectionBean.getSectionLeaderId() + "\",\"" + sectionBean.getSectionWatcherId() + "\",\"" + sectionBean.getSectionSalesTeamIds() + "\"," + sectionBean.isStatus() + ",\"" + sectionBean.getCreateBy() + "\",'" + new Timestamp(System.currentTimeMillis()) + "',\"" + sectionBean.getWriteBy() + "\",'" + new Timestamp(System.currentTimeMillis()) + "');" ;
		System.out.println("Query--------->>>>>>>" +query);
		operationStatus = dbu.insert(query);
		return operationStatus;
	}

	@Override
	public int update(AbstractBean ab) {
		SectionBean sectionBean = (SectionBean)ab;
		String query = "update tbl_crm_section set sectionName = \"" + sectionBean.getSectionName() + "\", sectionCode =\"" + sectionBean.getSectionCode() + "\", sectionManagerId =\"" + sectionBean.getSectionManagerId() + "\", sectionLeaderId =\"" + sectionBean.getSectionLeaderId() + "\", sectionWatcherId =\"" + sectionBean.getSectionWatcherId() + "\", sectionSalesTeamIds =\"" + sectionBean.getSectionSalesTeamIds() + "\", status =" + sectionBean.isStatus() + ", writeBy = \"" + sectionBean.getWriteBy() + "\", writeDate = '" + new Timestamp(System.currentTimeMillis()) + "' " + "where sectionId = " + sectionBean.getSectionId() + ";" ;
		operationStatus = dbu.update(query);
		return operationStatus;
	}

	@Override
	public int delete(AbstractBean ab) {
		SectionBean sectionBean = (SectionBean)ab;
		String query = "delete from tbl_crm_section where sectionId =" + sectionBean.getSectionId() + ";" ;
		operationStatus = dbu.delete(query);
		return operationStatus;
	}
	private SectionBean getRecordFromResultSet(ResultSet rs) {
		SectionBean sectionBean = new SectionBean();
		sectionBean = new SectionBean();
		try {
			while(rs.next()) {
				sectionBean.setSectionId(rs.getInt("sectionId"));
				sectionBean.setSectionName(rs.getString("sectionName"));
				sectionBean.setSectionCode(rs.getString("sectionCode"));
				sectionBean.setSectionManagerId(rs.getString("sectionManagerId"));
				sectionBean.setSectionLeaderId(rs.getString("sectionLeaderId"));
				sectionBean.setSectionWatcherId(rs.getString("sectionWatcherId"));
				sectionBean.setSectionSalesTeamIds(rs.getString("sectionSalesTeamIds"));
				sectionBean.setStatus(rs.getBoolean("status"));
				sectionBean.setCreateBy(rs.getString("createBy"));
				sectionBean.setCreateDate(rs.getString("createDate"));
				sectionBean.setWriteBy(rs.getString("writeBy"));
				sectionBean.setWriteDate(rs.getString("writeDate"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return sectionBean;
	}

	@Override
	public List<AbstractBean> getAllRecords() {
		List<AbstractBean> retValue = new ArrayList<AbstractBean>();
		String query = "select * from tbl_crm_section;" ;
		ResultSet rs = dbu.select(query);
		SectionBean sectionBean = null;
		try {
			while(rs.next()) {
				sectionBean = new SectionBean();
				sectionBean.setSectionId(rs.getInt("sectionId"));
				sectionBean.setSectionName(rs.getString("sectionName"));
				sectionBean.setSectionCode(rs.getString("sectionCode"));
				sectionBean.setSectionManagerId(rs.getString("sectionManagerId"));
				sectionBean.setSectionLeaderId(rs.getString("sectionLeaderId"));
				sectionBean.setSectionWatcherId(rs.getString("sectionWatcherId"));
				sectionBean.setSectionSalesTeamIds(rs.getString("sectionSalesTeamIds"));
				sectionBean.setStatus(rs.getBoolean("status"));
				sectionBean.setCreateBy(rs.getString("createBy"));
				sectionBean.setCreateDate(rs.getString("createDate"));
				sectionBean.setWriteBy(rs.getString("writeBy"));
				sectionBean.setWriteDate(rs.getString("writeDate"));

				retValue.add(sectionBean);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return retValue;
	}


	@Override
	public int deleteByIds(String arrayIds,String user) {
		String query = "update tbl_crm_section set status = false, writeBy = '" + user + "', writeDate = '" + new Timestamp(System.currentTimeMillis()) + "' where sectionId IN (" + arrayIds + ");" ;
		operationStatus = dbu.delete(query);
		return operationStatus;
	}

	@Override
	public AbstractBean getRecordById(String id) {
		String query = "select * from tbl_crm_section where sectionId = " + id + ";" ;
		ResultSet rs = dbu.select(query);
		return (getRecordFromResultSet(rs));
	}

	@Override
	public AbstractBean getRecordByName(String name) {
		String query = "select * from tbl_crm_section where sectionName = '" + name + "';" ;
		ResultSet rs = dbu.select(query);
		return (getRecordFromResultSet(rs));
	}

	@Override
	public AbstractBean toBean(String jsonString) {
		try {
			SectionBean sectionBean  = new SectionBean ();

			sectionBean = gson.fromJson(jsonString, SectionBean.class);
			//JSONObject jObj = (JSONObject)new JSONParser().parse(jsonString);
			//sectionBean.setSectionName(gson.get("sectionName").toString());
			//sectionBean.setSectionCode(gson.get("sectionCode").toString());
			return sectionBean;
		} catch(Exception e) {
			System.out.println("Error in toBean() :" + e);
		}
		return null;
	}

	@Override
	public List<AbstractBean> getStringRecord(AbstractBean ab) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getUsers () {
		try {
			int cnt = 1;
			String rec = "";
			List<String> listOfAccounts = new ArrayList<String>();
			SoapProvisioning soap = null;
			Options options=new Options();
			options.setLocalConfigAuth(true);
			soap = new SoapProvisioning(options);
			for(int i=0; i<soap.getAllDomains().size(); i++) {
				Domain singleD = soap.getAllDomains().get(i);
				for(int j=0; j<singleD.getAllAccounts().size(); j++) {
					Account ac = (Account) soap.getAllAccounts(singleD).get(j);
					rec = "{\"value\":\""+ac.getMail().toString()+"\",\"label\":\""+ac.getMail().toString()+"\"}";
					listOfAccounts.add(rec);
					//System.out.println(ac.getMail().toString());
					//listOfAccounts.add(ac.getMail().toString());
					cnt++;
				}
			}

			System.out.println("Whole List : " + listOfAccounts);
			/*for(int i=0;i<cnt;i++){
				System.out.println("Account [" + i + "] : " + listOfAccounts.get(i).toString());
			}*/
			return listOfAccounts.toString();
		} catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<AbstractBean> getAllActiveRecords() {
		// TODO Auto-generated method stub
		List<AbstractBean> retValue = new ArrayList<AbstractBean>();
		String query = "select * from tbl_crm_section where status = true;" ;
		ResultSet rs = dbu.select(query);
		SectionBean sectionBean = null;
		try {
			while(rs.next()) {
				sectionBean = new SectionBean();
				sectionBean.setSectionId(rs.getInt("sectionId"));
				sectionBean.setSectionName(rs.getString("sectionName"));
				sectionBean.setSectionCode(rs.getString("sectionCode"));
				sectionBean.setSectionManagerId(rs.getString("sectionManagerId"));
				sectionBean.setSectionLeaderId(rs.getString("sectionLeaderId"));
				sectionBean.setSectionWatcherId(rs.getString("sectionWatcherId"));
				sectionBean.setSectionSalesTeamIds(rs.getString("sectionSalesTeamIds"));
				sectionBean.setStatus(rs.getBoolean("status"));
				sectionBean.setCreateBy(rs.getString("createBy"));
				sectionBean.setCreateDate(rs.getString("createDate"));
				sectionBean.setWriteBy(rs.getString("writeBy"));
				sectionBean.setWriteDate(rs.getString("writeDate"));

				retValue.add(sectionBean);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return retValue;
	}

	@Override
	public String listClientView() {
		// TODO Auto-generated method stub
		String strOfAllRecords = gson.toJson(getAllActiveRecords());
		return strOfAllRecords;
	}



	@Override
	public String filterView(String array) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<AbstractBean> getAllActiveFilterRecords(String str, String field) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String filterByContact(String Array) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int addHistory(String array, String leadId) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public String listHistory(String leadId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int addAppointment(String array, String leadId) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public String listAppointment(String leadId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int addTask(String array, String leadId) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public String listTask(String leadId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int deleteHistory(String array, String leadId) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int deleteAppointment(String array, String leadId) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int deleteTask(String array, String leadId) {
		// TODO Auto-generated method stub
		return 0;
	}

}
