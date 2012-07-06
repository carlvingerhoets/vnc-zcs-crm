package biz.vnc.helpers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import biz.vnc.base.AbstractBean;
import biz.vnc.base.InterfaceHelper;
import biz.vnc.beans.CategoryBean;
import biz.vnc.beans.ChannelBean;
import biz.vnc.beans.CompanyBean;
import biz.vnc.beans.CountryBean;
import biz.vnc.beans.LeadBean;
import biz.vnc.beans.PriorityBean;
import biz.vnc.beans.SectionBean;
import biz.vnc.beans.StageBean;
import biz.vnc.beans.StateBean;
import biz.vnc.util.DBUtility;

public class LeadHelper implements InterfaceHelper {

	Gson gson = new Gson();
	int operationStatus=0;
	DBUtility dbu = new DBUtility();
	@Override
	public String listView() {
		// TODO Auto-generated method stub
		System.out.println("10");
		String strOfAllRecords = gson.toJson(getAllRecords());
		System.out.println("str of all records:::" + strOfAllRecords);
		return strOfAllRecords;
	}

	@Override
	public int add(AbstractBean ab) {
		// TODO Auto-generated method stub
		LeadBean leadBean = (LeadBean)ab;
		String query = "insert into tbl_crm_lead values (" + leadBean.getLeadId() + ",\"" + leadBean.getSubjectName() + "\",\"" + leadBean.getLeadDescription() + "\",\"" + leadBean.getContactName() + "\"," + leadBean.getCompanyId() + ",\"" + leadBean.getValuation() + "\",'" + leadBean.getLeadState() +"','" + leadBean.getPartnerName() + "','" + leadBean.getPhone() + "','" + leadBean.getFax() + "','" + leadBean.getEmail() + "','" + leadBean.getWorkPhone() + "','" + leadBean.getMobile() + "','" + leadBean.getStreet1() + "','" + leadBean.getStreet2() + "','" + leadBean.getCity() + "','" + leadBean.getZip() + "'," + leadBean.getStateId() + "," + leadBean.getCountryId() + "," + leadBean.getType() + ",'" + leadBean.getDateOpen() + "','" + leadBean.getDateClose() + "','" + leadBean.getExpectedDateClose() + "'," + leadBean.getStageId() + "," + leadBean.getProbability() + "," + leadBean.getChannelId() + "," + leadBean.getSectionId() + "," + leadBean.getCategoryId() + "," + leadBean.getDayClose() + "," + leadBean.getDayOpen() + ",'" + leadBean.getReferredBy() + "','" + leadBean.getUserId() + "'," + leadBean.getPriorityId() + ",'" + leadBean.getNextActionDate() + "','" + leadBean.getNextAction() + "'," + leadBean.isStatus() + ",'" + leadBean.getCreateBy() + "','" + new Timestamp(System.currentTimeMillis()) + "','" + leadBean.getWriteBy() + "','" + leadBean.getWriteDate()+ "');" ;
		System.out.println("1111111111111 " + query );
		operationStatus = dbu.insert(query);
		System.out.println("Op st " + operationStatus);
		return operationStatus;
	}

	@Override
	public int update(AbstractBean ab) {
		// TODO Auto-generated method stub
		LeadBean leadBean = (LeadBean)ab;
		String query = "update tbl_crm_lead set subjectName = \"" + leadBean.getSubjectName() + "\", leadDescription='" + leadBean.getLeadDescription() + "', contactName = '" + leadBean.getContactName() + "', companyId = " + leadBean.getCompanyId() + ", valuation = '" + leadBean.getValuation() + "', leadState = '" +leadBean.getLeadState() + "', partnerName = '" + leadBean.getPartnerName() + "', phone = '" + leadBean.getPhone() + "', fax = '" + leadBean.getFax() + "', email = '" + leadBean.getEmail() + "', workPhone = '" + leadBean.getWorkPhone() + "', mobile = '" + leadBean.getMobile() + "', street1 = '" + leadBean.getStreet1() + "', street2 = '" + leadBean.getStreet2() + "', city = '" + leadBean.getCity() + "', zip = '" + leadBean.getZip() + "', stateId = " + leadBean.getStateId() + ", countryId = " + leadBean.getCountryId() + ", type = '" + leadBean.getType() + "', dateOpen = '" + leadBean.getDateOpen() + "', dateClose = '" + leadBean.getDateClose() + "', expectedDateClose = '" + leadBean.getExpectedDateClose() + "', stageId = " + leadBean.getStageId() + ", probability = '" + leadBean.getProbability() +  "', channelId = " + leadBean.getChannelId() + ", sectionId = " + leadBean.getSectionId() + ", categoryId = " + leadBean.getCategoryId() + ", dayClose = " + leadBean.getDayClose() + ",dayOpen = " + leadBean.getDayOpen() + ", referredBy = '" + leadBean.getReferredBy() + "', userId = '" + leadBean.getUserId() + "', priorityId = " + leadBean.getPriorityId() + ", nextActionDate = '" + leadBean.getNextActionDate() + "', nextAction = '" + leadBean.getNextAction() + "', writeBy = \"" + leadBean.getWriteBy() + "\", writeDate = '" + new Timestamp(System.currentTimeMillis()) + "' " + "where leadId = " + leadBean.getLeadId() + ";" ;
		System.out.println("Query------------->" + query);
		operationStatus = dbu.update(query);
		return operationStatus;
	}

	@Override
	public int delete(AbstractBean ab) {
		// TODO Auto-generated method stub
		LeadBean leadBean = (LeadBean)ab;
		String query = "delete from tbl_crm_lead where leadId =" + leadBean.getLeadId() + ";" ;
		operationStatus = dbu.delete(query);
		return operationStatus;
	}

	@Override
	public int deleteByIds(String arrayIds, String user) {
		// TODO Auto-generated method stub
		String query = "update tbl_crm_lead set status = false, writeBy = '" + user + "', writeDate = '" + new Timestamp(System.currentTimeMillis()) + "' where leadId IN (" + arrayIds + ");" ;
		operationStatus = dbu.delete(query);
		return operationStatus;
	}

	@Override
	public List<AbstractBean> getAllRecords() {
		// TODO Auto-generated method stub
		List<AbstractBean> retValue = new ArrayList<AbstractBean>();
		String query = "select * from tbl_crm_lead;" ;
		System.out.println("11 " + query );
		ResultSet rs = dbu.select(query);
		try {
			System.out.println("Number of records : " + rs.getRow());
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		System.out.println("result:::::::" + rs.toString());
		LeadBean leadBean = null;
		CountryHelper countryHelper = new CountryHelper();
		StateHelper stateHelper = new StateHelper();
		ChannelHelper channelHelper = new ChannelHelper();
		SectionHelper sectionHelper = new SectionHelper();
		CategoryHelper categoryHelper = new CategoryHelper();
		PriorityHelper priorityHelper = new PriorityHelper();
		StageHelper stageHelper = new StageHelper();
		CompanyHelper companyHelper = new CompanyHelper();

		try {
			while(rs.next()) {
				leadBean = new LeadBean();
				leadBean.setLeadId(rs.getInt("leadId"));
				leadBean.setSubjectName(rs.getString("subjectName"));
				leadBean.setLeadDescription(rs.getString("leadDescription"));
				leadBean.setContactName(rs.getString("contactName"));
				leadBean.setCompanyBean((CompanyBean)(companyHelper.getRecordById(rs.getString("companyId"))));
				leadBean.setValuation(rs.getString("valuation"));
				leadBean.setLeadState(rs.getString("leadState"));
				leadBean.setPartnerName(rs.getString("partnerName"));
				leadBean.setPhone(rs.getString("phone"));
				leadBean.setFax(rs.getString("fax"));
				leadBean.setEmail(rs.getString("email"));
				leadBean.setWorkPhone(rs.getString("workPhone"));
				leadBean.setMobile(rs.getString("mobile"));
				leadBean.setStreet1(rs.getString("street1"));
				leadBean.setStreet2(rs.getString("street2"));
				leadBean.setCity(rs.getString("city"));
				leadBean.setZip(rs.getString("zip"));
				leadBean.setCountryBean((CountryBean) (countryHelper.getRecordById(rs.getString("countryId"))));
				leadBean.setStateBean((StateBean) (stateHelper.getRecordById(rs.getString("stateId"))));
				leadBean.setChannelBean((ChannelBean) (channelHelper.getRecordById(rs.getString("channelId"))));
				leadBean.setPriorityBean((PriorityBean) (priorityHelper.getRecordById(rs.getString("priorityId"))));
				leadBean.setStageBean((StageBean) (stageHelper.getRecordById(rs.getString("stageId"))));
				leadBean.setCategoryBean((CategoryBean) (categoryHelper.getRecordById(rs.getString("categoryId"))));
				leadBean.setSectionBean((SectionBean) (sectionHelper.getRecordById(rs.getString("sectionId"))));
				leadBean.setType(rs.getString("type"));
				leadBean.setDateOpen(rs.getString("dateOpen"));
				leadBean.setDateClose(rs.getString("dateClose"));
				leadBean.setExpectedDateClose(rs.getString("expectedDateClose"));
				leadBean.setProbability(rs.getString("probability"));
				leadBean.setDayClose(rs.getString("dayClose"));
				leadBean.setDayOpen(rs.getString("dayOpen"));
				leadBean.setReferredBy(rs.getString("referredBy"));
				leadBean.setUserId(rs.getString("userId"));
				leadBean.setNextActionDate(rs.getString("nextActionDate"));
				leadBean.setNextAction(rs.getString("nextAction"));
				leadBean.setStatus(rs.getBoolean("status"));
				leadBean.setCreateBy(rs.getString("createBy"));
				leadBean.setCreateDate(rs.getString("createDate"));
				leadBean.setWriteBy(rs.getString("writeBy"));
				leadBean.setWriteDate(rs.getString("writeDate"));
				retValue.add(leadBean);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		System.out.println("return value:::::" + retValue.toString());
		return retValue;
	}

	@Override
	public AbstractBean getRecordById(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public AbstractBean getRecordByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public AbstractBean toBean(String jsonString) {
		// TODO Auto-generated method stub
		try {
			LeadBean leadBean  = new LeadBean();
			leadBean = gson.fromJson(jsonString, LeadBean.class);
			return leadBean;
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
	public String getUsers() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<AbstractBean> getAllActiveRecords() {
		// TODO Auto-generated method stub
		List<AbstractBean> retValue = new ArrayList<AbstractBean>();
		String query = "select * from tbl_crm_lead where type = 0 and status = true;" ;
		System.out.println("11 " + query );
		ResultSet rs = dbu.select(query);
		try {
			System.out.println("Number of records : " + rs.getRow());
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		System.out.println("result:::::::" + rs.toString());
		LeadBean leadBean = null;
		CountryHelper countryHelper = new CountryHelper();
		StateHelper stateHelper = new StateHelper();
		ChannelHelper channelHelper = new ChannelHelper();
		SectionHelper sectionHelper = new SectionHelper();
		CategoryHelper categoryHelper = new CategoryHelper();
		PriorityHelper priorityHelper = new PriorityHelper();
		StageHelper stageHelper = new StageHelper();
		CompanyHelper companyHelper = new CompanyHelper();
		try {
			while(rs.next()) {
				leadBean = new LeadBean();
				leadBean.setLeadId(rs.getInt("leadId"));
				leadBean.setSubjectName(rs.getString("subjectName"));
				leadBean.setLeadDescription(rs.getString("leadDescription"));
				leadBean.setContactName(rs.getString("contactName"));
				leadBean.setCompanyBean((CompanyBean)(companyHelper.getRecordById(rs.getString("companyId"))));
				leadBean.setValuation(rs.getString("valuation"));
				leadBean.setLeadState(rs.getString("leadState"));
				leadBean.setPartnerName(rs.getString("partnerName"));
				leadBean.setPhone(rs.getString("phone"));
				leadBean.setFax(rs.getString("fax"));
				leadBean.setEmail(rs.getString("email"));
				leadBean.setWorkPhone(rs.getString("workPhone"));
				leadBean.setMobile(rs.getString("mobile"));
				leadBean.setStreet1(rs.getString("street1"));
				leadBean.setStreet2(rs.getString("street2"));
				leadBean.setCity(rs.getString("city"));
				leadBean.setZip(rs.getString("zip"));
				leadBean.setCountryBean((CountryBean) (countryHelper.getRecordById(rs.getString("countryId"))));
				leadBean.setStateBean((StateBean) (stateHelper.getRecordById(rs.getString("stateId"))));
				leadBean.setChannelBean((ChannelBean) (channelHelper.getRecordById(rs.getString("channelId"))));
				leadBean.setPriorityBean((PriorityBean) (priorityHelper.getRecordById(rs.getString("priorityId"))));
				leadBean.setStageBean((StageBean) (stageHelper.getRecordById(rs.getString("stageId"))));
				leadBean.setCategoryBean((CategoryBean) (categoryHelper.getRecordById(rs.getString("categoryId"))));
				leadBean.setSectionBean((SectionBean) (sectionHelper.getRecordById(rs.getString("sectionId"))));
				leadBean.setType(rs.getString("type"));
				leadBean.setDateOpen(rs.getString("dateOpen"));
				leadBean.setDateClose(rs.getString("dateClose"));
				leadBean.setExpectedDateClose(rs.getString("expectedDateClose"));
				leadBean.setProbability(rs.getString("probability"));
				leadBean.setDayClose(rs.getString("dayClose"));
				leadBean.setDayOpen(rs.getString("dayOpen"));
				leadBean.setReferredBy(rs.getString("referredBy"));
				leadBean.setUserId(rs.getString("userId"));
				leadBean.setNextActionDate(rs.getString("nextActionDate"));
				leadBean.setNextAction(rs.getString("nextAction"));
				leadBean.setStatus(rs.getBoolean("status"));
				leadBean.setCreateBy(rs.getString("createBy"));
				leadBean.setCreateDate(rs.getString("createDate"));
				leadBean.setWriteBy(rs.getString("writeBy"));
				leadBean.setWriteDate(rs.getString("writeDate"));
				retValue.add(leadBean);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		System.out.println("return value:::::" + retValue.toString());
		return retValue;
	}

	@Override
	public String listClientView() {
		// TODO Auto-generated method stub
		System.out.println("10");
		String strOfAllRecords = gson.toJson(getAllActiveRecords());
		System.out.println("str of all records:::" + strOfAllRecords);
		return strOfAllRecords;

	}

	@Override
	public String filterView(String array) {
		// TODO Auto-generated method stub
		String field = "leadState";
		String strOfAllRecords = gson.toJson(getAllActiveFilterRecords(array,field));
		return strOfAllRecords;

	}

	@Override
	public List<AbstractBean> getAllActiveFilterRecords(String array, String field) {
		// TODO Auto-generated method stub
		List<AbstractBean> retValue = new ArrayList<AbstractBean>();
		String query = "select * from tbl_crm_lead where type = 0 and status = true and " + field + " IN (" + array + ");"  ;
		System.out.println("11 " + query );
		ResultSet rs = dbu.select(query);
		try {
			System.out.println("Number of records : " + rs.getRow());
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		System.out.println("result:::::::" + rs.toString());
		LeadBean leadBean = null;
		CountryHelper countryHelper = new CountryHelper();
		StateHelper stateHelper = new StateHelper();
		ChannelHelper channelHelper = new ChannelHelper();
		SectionHelper sectionHelper = new SectionHelper();
		CategoryHelper categoryHelper = new CategoryHelper();
		PriorityHelper priorityHelper = new PriorityHelper();
		StageHelper stageHelper = new StageHelper();
		CompanyHelper companyHelper = new CompanyHelper();
		try {
			while(rs.next()) {
				leadBean = new LeadBean();
				leadBean.setLeadId(rs.getInt("leadId"));
				leadBean.setSubjectName(rs.getString("subjectName"));
				leadBean.setLeadDescription(rs.getString("leadDescription"));
				leadBean.setContactName(rs.getString("contactName"));
				leadBean.setCompanyBean((CompanyBean)(companyHelper.getRecordById(rs.getString("companyId"))));
				leadBean.setValuation(rs.getString("valuation"));
				leadBean.setLeadState(rs.getString("leadState"));
				leadBean.setPartnerName(rs.getString("partnerName"));
				leadBean.setPhone(rs.getString("phone"));
				leadBean.setFax(rs.getString("fax"));
				leadBean.setEmail(rs.getString("email"));
				leadBean.setWorkPhone(rs.getString("workPhone"));
				leadBean.setMobile(rs.getString("mobile"));
				leadBean.setStreet1(rs.getString("street1"));
				leadBean.setStreet2(rs.getString("street2"));
				leadBean.setCity(rs.getString("city"));
				leadBean.setZip(rs.getString("zip"));
				leadBean.setCountryBean((CountryBean) (countryHelper.getRecordById(rs.getString("countryId"))));
				leadBean.setStateBean((StateBean) (stateHelper.getRecordById(rs.getString("stateId"))));
				leadBean.setChannelBean((ChannelBean) (channelHelper.getRecordById(rs.getString("channelId"))));
				leadBean.setPriorityBean((PriorityBean) (priorityHelper.getRecordById(rs.getString("priorityId"))));
				leadBean.setStageBean((StageBean) (stageHelper.getRecordById(rs.getString("stageId"))));
				leadBean.setCategoryBean((CategoryBean) (categoryHelper.getRecordById(rs.getString("categoryId"))));
				leadBean.setSectionBean((SectionBean) (sectionHelper.getRecordById(rs.getString("sectionId"))));
				leadBean.setType(rs.getString("type"));
				leadBean.setDateOpen(rs.getString("dateOpen"));
				leadBean.setDateClose(rs.getString("dateClose"));
				leadBean.setExpectedDateClose(rs.getString("expectedDateClose"));
				leadBean.setProbability(rs.getString("probability"));
				leadBean.setDayClose(rs.getString("dayClose"));
				leadBean.setDayOpen(rs.getString("dayOpen"));
				leadBean.setReferredBy(rs.getString("referredBy"));
				leadBean.setUserId(rs.getString("userId"));
				leadBean.setNextActionDate(rs.getString("nextActionDate"));
				leadBean.setNextAction(rs.getString("nextAction"));
				leadBean.setStatus(rs.getBoolean("status"));
				leadBean.setCreateBy(rs.getString("createBy"));
				leadBean.setCreateDate(rs.getString("createDate"));
				leadBean.setWriteBy(rs.getString("writeBy"));
				leadBean.setWriteDate(rs.getString("writeDate"));
				retValue.add(leadBean);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		System.out.println("return value:::::" + retValue.toString());
		return retValue;
	}

	@Override
	public String filterByContact(String array) {
		// TODO Auto-generated method stub
		String field = "partnerName";
		String strOfAllRecords = gson.toJson(getAllActiveFilterRecords(array,field));
		return strOfAllRecords;
	}

	@Override
	public int addHistory(String array, String leadId) {
		// TODO Auto-generated method stub
		String[] str = array.split(",");
		for(String messageId : str) {
			String query = "insert into tbl_crm_lead_mailHistory values ('" + leadId +"','" + messageId + "');";
			operationStatus = dbu.insert(query);
		}
		return operationStatus;
	}

	@Override
	public String listHistory(String leadId) {
		// TODO Auto-generated method stub
		String query = "select messageId from tbl_crm_lead_mailHistory where leadId = " + leadId + ";";
		ResultSet rs = dbu.select(query);
		String str;
		String msgArray = null;
		try {
			while(rs.next()) {
				str = rs.getString("messageId");
				if(msgArray == null) {
					msgArray = str;
				} else
					msgArray = msgArray + "," + str;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("msgArray :::::: >>>>>>>>>> "  + msgArray);
		return msgArray;
	}

	@Override
	public int deleteHistory(String array,String leadId) {
		// TODO Auto-generated method stub
		String query = "delete from tbl_crm_lead_mailHistory where leadId = " + leadId + " and messageId IN (" + array + ");";
		operationStatus = dbu.delete(query);
		return operationStatus;
	}

	@Override
	public int addAppointment(String array, String leadId) {
		// TODO Auto-generated method stub
		String[] str = array.split(",");
		for(String appointmentId : str) {
			String query = "insert into tbl_crm_lead_calendar values ('" + leadId +"','" + appointmentId + "');";
			operationStatus = dbu.insert(query);
		}
		return operationStatus;
	}

	@Override
	public String listAppointment(String leadId) {
		// TODO Auto-generated method stub
		String query = "select appointmentId from tbl_crm_lead_calendar where leadId = " + leadId + ";";
		ResultSet rs = dbu.select(query);
		String str;
		String msgArray = null;
		try {
			while(rs.next()) {
				str = rs.getString("appointmentId");
				if(msgArray == null) {
					msgArray = str;
				} else
					msgArray = msgArray + "," + str;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("msgArray :::::: >>>>>>>>>> "  + msgArray);
		return msgArray;
	}

	@Override
	public int deleteAppointment(String array,String leadId) {
		// TODO Auto-generated method stub
		String query = "delete from tbl_crm_lead_calendar where leadId = " + leadId + " and appointmentId IN (" + array + ");";
		operationStatus = dbu.delete(query);
		return operationStatus;
	}

	@Override
	public int addTask(String array, String leadId) {
		// TODO Auto-generated method stub
		String[] str = array.split(",");
		for(String taskId : str) {
			String query = "insert into tbl_crm_lead_task values ('" + leadId +"','" + taskId + "');";
			operationStatus = dbu.insert(query);
		}
		return operationStatus;
	}

	@Override
	public String listTask(String leadId) {
		// TODO Auto-generated method stub
		String query = "select taskId from tbl_crm_lead_task where leadId = " + leadId + ";";
		ResultSet rs = dbu.select(query);
		String str;
		String msgArray = null;
		try {
			while(rs.next()) {
				str = rs.getString("taskId");
				if(msgArray == null) {
					msgArray = str;
				} else
					msgArray = msgArray + "," + str;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("msgArray :::::: >>>>>>>>>> "  + msgArray);
		return msgArray;
	}

	@Override
	public int deleteTask(String array,String leadId) {
		// TODO Auto-generated method stub
		String query = "delete from tbl_crm_lead_task where leadId = " + leadId + " and taskId IN (" + array + ");";
		operationStatus = dbu.delete(query);
		return operationStatus;
	}

}
