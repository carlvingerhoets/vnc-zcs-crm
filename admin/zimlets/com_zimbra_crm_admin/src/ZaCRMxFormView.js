function ZaCRMxFormView (parent) {
	ZaTabView.call(this, {
        parent:parent,
        iKeyName:"ZaCRMxFormView",
        contextId:"_CRM_Admin_"
        });
		this.initForm(ZaCRMadmin.myXModel,this.getMyXForm());	
		this._localXForm.setController(ZaApp.getInstance());
}

ZaCRMxFormView.prototype = new ZaTabView;
ZaCRMxFormView.prototype.constructor = ZaCRMxFormView;

ZaCRMxFormView.prototype.toString = function() {
	
	return "ZaCRMadminListView";

}
ZaCRMxFormView.prototype.getTitle = function () {

	return com_zimbra_crm_admin.CRM_view_title
}

ZaCRMxFormView.prototype.getTabIcon = 
function () {
	return "Backup";
}

ZaCRMxFormView.prototype.getTabTitle = 
function () {
	return com_zimbra_crm_admin.CRM_tab_title

}

ZaTabView.XFormModifiers["ZaCRMxFormView"] = new Array();


ZaCRMxFormView.prototype.TAB_INDEX=0;
ZaCRMxFormView.prototype.lastid=0;
ZaCRMxFormView.prototype.setObject = 
function (entry) {


	
	this.entry = entry;
	
	this._containedObject = {attrs:{}};
	
	this._containedObject.name = entry.name;
    this._containedObject.type = entry.type ;
	
	var json,reqHeader,reqJson,response;

    if(entry.id)
	{
    	this._containedObject.id = entry.id;
	}
	
	json = "jsonobj={\"action\":\"LIST\",\"object\":\"country\"}";
	reqHeader = {"Content-Type":"application/x-www-form-urlencoded"};
	reqJson = AjxStringUtil.urlEncode(json);
	response = AjxRpc.invoke(reqJson,com_zimbra_crm_admin.jspUrl, reqHeader, null, false);
	this._containedObject[ZaCRMadmin.A_country] = jsonParse(response.text);
	
	json = "jsonobj={\"action\":\"LIST\",\"object\":\"state\"}";
//	reqHeader = {"Content-Type":"application/x-www-form-urlencoded"};
	reqJson = AjxStringUtil.urlEncode(json);
	response = AjxRpc.invoke(reqJson,com_zimbra_crm_admin.jspUrl, reqHeader, null, false);
	this._containedObject[ZaCRMadmin.A_state] = jsonParse(response.text);

	json = "jsonobj={\"action\":\"LIST\",\"object\":\"channel\"}";
//	reqHeader = {"Content-Type":"application/x-www-form-urlencoded"};
	reqJson = AjxStringUtil.urlEncode(json);
	response = AjxRpc.invoke(reqJson,com_zimbra_crm_admin.jspUrl, reqHeader, null, false);
	this._containedObject[ZaCRMadmin.A_channel] = jsonParse(response.text);
	
	json = "jsonobj={\"action\":\"LIST\",\"object\":\"priority\"}";
//	reqHeader = {"Content-Type":"application/x-www-form-urlencoded"};
	reqJson = AjxStringUtil.urlEncode(json);
	response = AjxRpc.invoke(reqJson,com_zimbra_crm_admin.jspUrl, reqHeader, null, false);
	this._containedObject[ZaCRMadmin.A_priority] = jsonParse(response.text);

	json = "jsonobj={\"action\":\"LIST\",\"object\":\"category\"}";
//	reqHeader = {"Content-Type":"application/x-www-form-urlencoded"};
	reqJson = AjxStringUtil.urlEncode(json);
	response = AjxRpc.invoke(reqJson,com_zimbra_crm_admin.jspUrl, reqHeader, null, false);
	this._containedObject[ZaCRMadmin.A_category] = jsonParse(response.text);
	
	json = "jsonobj={\"action\":\"LIST\",\"object\":\"section\"}";
//	reqHeader = {"Content-Type":"application/x-www-form-urlencoded"};
	reqJson = AjxStringUtil.urlEncode(json);
	response = AjxRpc.invoke(reqJson,com_zimbra_crm_admin.jspUrl, reqHeader, null, false);
	this._containedObject[ZaCRMadmin.A_section] = jsonParse(response.text);

	json = "jsonobj={\"action\":\"LIST\",\"object\":\"stage\"}";
//	reqHeader = {"Content-Type":"application/x-www-form-urlencoded"};
	reqJson = AjxStringUtil.urlEncode(json);
	response = AjxRpc.invoke(reqJson,com_zimbra_crm_admin.jspUrl, reqHeader, null, false);
	this._containedObject[ZaCRMadmin.A_stage] = jsonParse(response.text);
	
    if(entry.attrs) {
        for (var a in entry.attrs) {
            var modelItem = this._localXForm.getModel().getItem(a) ;
            if ((modelItem != null && modelItem.type == _LIST_)
               || (entry.attrs[a] != null && entry.attrs[a] instanceof Array))
            {  //need deep clone
                this._containedObject.attrs [a] =
                        ZaItem.deepCloneListItem (entry.attrs[a]);
            } else {
                this._containedObject.attrs[a] = entry.attrs[a];
                   }
        }
    }

 /*
 if(entry[ZaCRMadmin.A_country]) {
		for(var a in entry[ZaCRMadmin.A_country]) {
            this._containedObject[ZaCRMadmin.A_country][a] = {};
            if(entry[ZaCRMadmin.A_country][a]) {
                for(var v in entry[ZaCRMadmin.A_country][a]) {
                    this._containedObject[ZaCRMadmin.A_country][a][v] = entry[ZaCRMadmin.A_country][a][v];
                }
            }
        }
    }

	if(entry[ZaCRMadmin.A_state]) {
		for(var a in entry[ZaCRMadmin.A_state]) {
            this._containedObject[ZaCRMadmin.A_state][a] = {};
            if(entry[ZaCRMadmin.A_state][a]) {
                for(var v in entry[ZaCRMadmin.A_state][a]) {
                    this._containedObject[ZaCRMadmin.A_state][a][v] = entry[ZaCRMadmin.A_state][a][v];
                }
            }
        }
    }
	*/
	if(!entry[ZaModel.currentTab]){
	     this._containedObject[ZaModel.currentTab] = "1";
	}else {
	     this._containedObject[ZaModel.currentTab] = entry[ZaModel.currentTab];
	}
    this._localXForm.setInstance(this._containedObject);
	this.formDirtyLsnr = new AjxListener(ZaApp.getInstance().getCurrentController(),ZaXFormViewController.prototype.handleXFormChange);
    this._localXForm.addListener(DwtEvent.XFORMS_FORM_DIRTY_CHANGE, this.formDirtyLsnr);
    this._localXForm.addListener(DwtEvent.XFORMS_VALUE_ERROR, this.formDirtyLsnr);
	this.updateTab();

}

ZaCRMxFormView.currentFieldChanged = function (value, event, form) {
	ZaCRMxFormView.onFormFieldChanged.call(this, value, event, form);
}


ZaCRMxFormView.onFormFieldChanged = 
function (value, event, form) {
	form.parent.setDirty(true);
	this.setInstanceValue(value);
	return value;
}

ZaCRMxFormView.myXFormModifier = function(xFormObject) {	
	xFormObject.tableCssStyle="width:100%;";
	
	DBG.println(AjxDebug.DBG3, "CRM Admin under constructor");
	var tabChoices=new Array();
	var _tab1=1;
	var _tab2=2;
	var newTab=++this.TAB_INDEX;
	
	
	xFormObject.items=[{type:_TAB_BAR_,  ref:ZaModel.currentTab,id:"crm_admin_xform_tabbar", containerCssStyle: "padding-top:0px",cssClass:"ZaTabBar",
				choices:[
				{value:1,label:com_zimbra_crm_admin.TBB_country},
				{value:2,label:com_zimbra_crm_admin.TBB_country_state},
				{value:3,label:com_zimbra_crm_admin.TBB_channel},
				{value:4,label:com_zimbra_crm_admin.TBB_priority},
				{value:5,label:com_zimbra_crm_admin.TBB_category},
				{value:6,label:com_zimbra_crm_admin.TBB_section},
				{value:7,label:com_zimbra_crm_admin.TBB_stage}
				]
			   },
			   {type:_SWITCH_,id:"tab1",
				items:[{ type:_ZATABCASE_,id:"crm_country",ref:ZaModel.currentTab,relevant:"instance[ZaModel.currentTab] == 1",numCols:1,colSizes:["800px"],caseKey:newTab++,
					items:[{type:_ZA_TOP_GROUPER_, id:"crm_country_group",width:"100%",
							numCols:1,colSizes:["auto"],label:"Country List",
							// cssStyle apply for country list box
							cssStyle:"margin-top:10px;margin-bottom:10px;padding-bottom:0px;margin-left:10px;margin-right:10px;",
							items: [
							//for main box of header list
							{ref:ZaCRMadmin.A_country, type:_DWT_LIST_, height:"300px",width:"1300", 
							forceUpdate: true, preserveSelection:false,multiselect:true,
							cssClass:"DLSource", headerList:headerList_cont, widgetClass:ZaCRMadminCountryListView,
							onSelection:ZaCRMCountryModel.countrySelectionListener,onChange:ZaCRMxFormView.currentFieldChanged,
							valueChangeEventSources:[ZaCRMadmin.A_country]
							},
							//That for button
							{type:_GROUP_, numCols:5, colSizes:["100px","auto","100px","auto","100px"],width:"350px",
							cssStyle:"margin-bottom:10px;padding-bottom:0px;margin-top:10px;margin-left:0px;margin-right:0px;",	
							items: [{type:_DWT_BUTTON_, label:com_zimbra_crm_admin.BTN_Delete,width:"100px",
							onActivate:"ZaCRMCountryModel.deleteButtonListener.call(this);",
							enableDisableChangeEventSources:[ZaCRMadmin.A_country_list_cache],
							enableDisableChecks:[ZaCRMCountryModel.isDeleteCountryEnabled],
							relevant:"ZaCRMCountryModel.isDeleteCountryEnabled.call(this)",
							relevantBehavior:_DISABLE_
								},
								{type:_CELLSPACER_},
								{type:_DWT_BUTTON_, label:com_zimbra_crm_admin.BTN_Edit,width:"100px",
								onActivate:"ZaCRMCountryModel.editButtonListener.call(this);",
								enableDisableChangeEventSources:[ZaCRMadmin.A_country_list_cache],
								enableDisableChecks:[ZaCRMCountryModel.isEditCountryEnabled],
								relevant:"ZaCRMCountryModel.isEditCountryEnabled.call(this)",
								relevantBehavior:_DISABLE_
								},
								{type:_CELLSPACER_},
								{type:_DWT_BUTTON_, label:com_zimbra_crm_admin.BTN_Add,width:"100px",
								onActivate:"ZaCRMCountryModel.addButtonListener.call(this);"
								}]
							}]
						}]
				},
				{ type:_ZATABCASE_,id:"crm_state",ref:ZaModel.currentTab,relevant:"instance[ZaModel.currentTab] == 2",numCols:1,colSizes:["800px"],caseKey:newTab++,
					items:[{type:_ZA_TOP_GROUPER_, id:"crm_state_group",width:"100%", 
							numCols:1,colSizes:["auto"],label:"Country States List",
							// cssStyle apply for country list box
							cssStyle:"margin-top:10px;margin-bottom:10px;padding-bottom:0px;margin-left:10px;margin-right:10px;margin-right:50px;",
							items: [
							//for main box of header list
							{ref:ZaCRMadmin.A_state, type:_DWT_LIST_, height:"300px",width:"1350px", 
							forceUpdate: true, preserveSelection:false,multiselect:true,
							cssClass:"DLSource", headerList:headerList_cont_state, widgetClass:ZaCRMadminCountryStateListView,
							onSelection:ZaCRMStateModel.stateSelectionListener,onChange:ZaCRMxFormView.currentFieldChanged,
							valueChangeEventSources:[ZaCRMadmin.A_state]
							},
							//That for button
							{type:_GROUP_, numCols:5, colSizes:["100px","auto","100px","auto","100px"],width:"350px",
							cssStyle:"margin-bottom:10px;padding-bottom:0px;margin-top:10px;margin-left:0px;margin-right:0px;",	
							items: [{type:_DWT_BUTTON_, label:com_zimbra_crm_admin.BTN_Delete,width:"100px",
							onActivate:"ZaCRMStateModel.deleteButtonListener_state.call(this);",
							enableDisableChangeEventSources:[ZaCRMadmin.A_state_list_cache],
							enableDisableChecks:[ZaCRMStateModel.isDeleteStateEnabled],
							relevant:"ZaCRMStateModel.isDeleteStateEnabled.call(this)",
							relevantBehavior:_DISABLE_
							},
							{type:_CELLSPACER_},
								{type:_DWT_BUTTON_, label:com_zimbra_crm_admin.BTN_Edit,width:"100px",
								onActivate:"ZaCRMStateModel.editButtonListener.call(this);",
								enableDisableChangeEventSources:[ZaCRMadmin.A_state_list_cache],
								enableDisableChecks:[ZaCRMStateModel.isEditStateEnabled],
								relevant:"ZaCRMStateModel.isEditStateEnabled.call(this)",
								relevantBehavior:_DISABLE_
								},
								{type:_CELLSPACER_},
								{type:_DWT_BUTTON_, label:com_zimbra_crm_admin.BTN_Add,width:"100px",
								onActivate:"ZaCRMStateModel.addButtonListener_state.call(this);"
								}]
							}]
						}]
					},
					{ type:_ZATABCASE_,id:"crm_channel",ref:ZaModel.currentTab,relevant:"instance[ZaModel.currentTab] == 3",numCols:1,colSizes:["800px"],caseKey:newTab++,
					items:[{type:_ZA_TOP_GROUPER_, id:"crm_channel_group",width:"100%", 
							numCols:1,colSizes:["auto"],label:"Channel List",
							// cssStyle apply for channel list box
							cssStyle:"margin-top:10px;margin-bottom:10px;padding-bottom:0px;margin-left:10px;margin-right:10px;",
							items: [
							//for main box of header list
							{ref:ZaCRMadmin.A_channel, type:_DWT_LIST_, height:"300px",width:"1300", 
							forceUpdate: true, preserveSelection:false,multiselect:true,
							cssClass:"DLSource", headerList:headerList_channel, widgetClass:ZaCRMadminChannelListView,
							onSelection:ZaCRMChannelModel.channelSelectionListener,onChange:ZaCRMxFormView.currentFieldChanged,
							valueChangeEventSources:[ZaCRMadmin.A_channel]
							},
							//That for button
							{type:_GROUP_, numCols:5, colSizes:["100px","auto","100px","auto","100px"],width:"350px",
							cssStyle:"margin-bottom:10px;padding-bottom:0px;margin-top:10px;margin-left:0px;margin-right:0px;",	
							items: [{type:_DWT_BUTTON_, label:com_zimbra_crm_admin.BTN_Delete,width:"100px",
							onActivate:"ZaCRMChannelModel.deleteButtonListener.call(this);",
							enableDisableChangeEventSources:[ZaCRMadmin.A_channel_list_cache],
							enableDisableChecks:[ZaCRMChannelModel.isDeleteChannelEnabled],
							relevant:"ZaCRMChannelModel.isDeleteChannelEnabled.call(this)",
							relevantBehavior:_DISABLE_
								},
								{type:_CELLSPACER_},
								{type:_DWT_BUTTON_, label:com_zimbra_crm_admin.BTN_Edit,width:"100px",
								onActivate:"ZaCRMChannelModel.editButtonListener.call(this);",
								enableDisableChangeEventSources:[ZaCRMadmin.A_channel_list_cache],
								enableDisableChecks:[ZaCRMChannelModel.isEditChannelEnabled],
								relevant:"ZaCRMChannelModel.isEditChannelEnabled.call(this)",
								relevantBehavior:_DISABLE_
								},
								{type:_CELLSPACER_},
								{type:_DWT_BUTTON_, label:com_zimbra_crm_admin.BTN_Add,width:"100px",
								onActivate:"ZaCRMChannelModel.addButtonListener.call(this);"
								}]
							}]
						}]
				},
				{ type:_ZATABCASE_,id:"crm_priority",ref:ZaModel.currentTab,relevant:"instance[ZaModel.currentTab] == 4",numCols:1,colSizes:["800px"],caseKey:newTab++,
					items:[{type:_ZA_TOP_GROUPER_, id:"crm_priority_group",width:"100%", 
							numCols:1,colSizes:["auto"],label:"Priority List",
							// cssStyle apply for priority list box
							cssStyle:"margin-top:10px;margin-bottom:10px;padding-bottom:0px;margin-left:10px;margin-right:10px;",
							items: [
							//for main box of header list
							{ref:ZaCRMadmin.A_priority, type:_DWT_LIST_, height:"300px",width:"1300", 
							forceUpdate: true, preserveSelection:false,multiselect:true,
							cssClass:"DLSource", headerList:headerList_priority, widgetClass:ZaCRMadminPriorityListView,
							onSelection:ZaCRMPriorityModel.prioritySelectionListener,onChange:ZaCRMxFormView.currentFieldChanged,
							valueChangeEventSources:[ZaCRMadmin.A_priority]
							},
							//That for button
							{type:_GROUP_, numCols:5, colSizes:["100px","auto","100px","auto","100px"],width:"350px",
							cssStyle:"margin-bottom:10px;padding-bottom:0px;margin-top:10px;margin-left:0px;margin-right:0px;",	
							items: [{type:_DWT_BUTTON_, label:com_zimbra_crm_admin.BTN_Delete,width:"100px",
							onActivate:"ZaCRMPriorityModel.deleteButtonListener.call(this);",
							enableDisableChangeEventSources:[ZaCRMadmin.A_priority_list_cache],
							enableDisableChecks:[ZaCRMPriorityModel.isDeletePriorityEnabled],
							relevant:"ZaCRMPriorityModel.isDeletePriorityEnabled.call(this)",
							relevantBehavior:_DISABLE_
								},
								{type:_CELLSPACER_},
								{type:_DWT_BUTTON_, label:com_zimbra_crm_admin.BTN_Edit,width:"100px",
								onActivate:"ZaCRMPriorityModel.editButtonListener.call(this);",
								enableDisableChangeEventSources:[ZaCRMadmin.A_priority_list_cache],
								enableDisableChecks:[ZaCRMPriorityModel.isEditPriorityEnabled],
								relevant:"ZaCRMPriorityModel.isEditPriorityEnabled.call(this)",
								relevantBehavior:_DISABLE_
								},
								{type:_CELLSPACER_},
								{type:_DWT_BUTTON_, label:com_zimbra_crm_admin.BTN_Add,width:"100px",
								onActivate:"ZaCRMPriorityModel.addButtonListener.call(this);"
								}]
							}]
						}]
					},
					{ type:_ZATABCASE_,id:"crm_category",ref:ZaModel.currentTab,relevant:"instance[ZaModel.currentTab] == 5",numCols:1,colSizes:["800px"],caseKey:newTab++,
					items:[{type:_ZA_TOP_GROUPER_, id:"crm_category_group",width:"100%", 
							numCols:1,colSizes:["auto"],label:"Category List",
							// cssStyle apply for category list box
							cssStyle:"margin-top:10px;margin-bottom:10px;padding-bottom:0px;margin-left:10px;margin-right:10px;",
							items: [
							//for main box of header list
							{ref:ZaCRMadmin.A_category, type:_DWT_LIST_, height:"300px",width:"1300", 
							forceUpdate: true, preserveSelection:false,multiselect:true,
							cssClass:"DLSource", headerList:headerList_category, widgetClass:ZaCRMadminCategoryListView,
							onSelection:ZaCRMCategoryModel.categorySelectionListener,onChange:ZaCRMxFormView.currentFieldChanged,
							valueChangeEventSources:[ZaCRMadmin.A_category]
							},
							//That for button
							{type:_GROUP_, numCols:5, colSizes:["100px","auto","100px","auto","100px"],width:"350px",
							cssStyle:"margin-bottom:10px;padding-bottom:0px;margin-top:10px;margin-left:0px;margin-right:0px;",	
							items: [{type:_DWT_BUTTON_, label:com_zimbra_crm_admin.BTN_Delete,width:"100px",
							onActivate:"ZaCRMCategoryModel.deleteButtonListener.call(this);",
							enableDisableChangeEventSources:[ZaCRMadmin.A_category_list_cache],
							enableDisableChecks:[ZaCRMCategoryModel.isDeleteCategoryEnabled],
							relevant:"ZaCRMCategoryModel.isDeleteCategoryEnabled.call(this)",
							relevantBehavior:_DISABLE_
								},
								{type:_CELLSPACER_},
								{type:_DWT_BUTTON_, label:com_zimbra_crm_admin.BTN_Edit,width:"100px",
								onActivate:"ZaCRMCategoryModel.editButtonListener.call(this);",
								enableDisableChangeEventSources:[ZaCRMadmin.A_category_list_cache],
								enableDisableChecks:[ZaCRMCategoryModel.isEditCategoryEnabled],
								relevant:"ZaCRMCategoryModel.isEditCategoryEnabled.call(this)",
								relevantBehavior:_DISABLE_
								},
								{type:_CELLSPACER_},
								{type:_DWT_BUTTON_, label:com_zimbra_crm_admin.BTN_Add,width:"100px",
								onActivate:"ZaCRMCategoryModel.addButtonListener.call(this);"
								}]
							}]
						}]
					},
					{ type:_ZATABCASE_,id:"crm_section",ref:ZaModel.currentTab,relevant:"instance[ZaModel.currentTab] == 6",numCols:1,colSizes:["800px"],caseKey:newTab++,
						items:[{type:_ZA_TOP_GROUPER_, id:"crm_section_group",width:"100%", 
								numCols:1,colSizes:["auto"],label:"section List",
								// cssStyle apply for country list box
								cssStyle:"margin-top:10px;margin-bottom:10px;padding-bottom:0px;margin-left:10px;margin-right:10px;",
								items: [
								//for main box of header list
								{ref:ZaCRMadmin.A_section, type:_DWT_LIST_, height:"300px",width:"1350", 
								forceUpdate: true, preserveSelection:false,multiselect:true,
								cssClass:"DLSource", headerList:headerList_section, widgetClass:ZaCRMadminSectionListView,
								onSelection:ZaCRMSectionModel.sectionSelectionListener,onChange:ZaCRMxFormView.currentFieldChanged,
								valueChangeEventSources:[ZaCRMadmin.A_section]
								},
								//That for button
								{type:_GROUP_, numCols:5, colSizes:["100px","auto","100px","auto","100px"],width:"350px",
								cssStyle:"margin-bottom:10px;padding-bottom:0px;margin-top:10px;margin-left:0px;margin-right:0px;",	
								items: [{type:_DWT_BUTTON_, label:com_zimbra_crm_admin.BTN_Delete,width:"100px",
								onActivate:"ZaCRMSectionModel.deleteButtonListener.call(this);",
								enableDisableChangeEventSources:[ZaCRMadmin.A_section_list_cache],
								enableDisableChecks:[ZaCRMSectionModel.isDeleteSectionEnabled],
								relevant:"ZaCRMSectionModel.isDeleteSectionEnabled.call(this)",
								relevantBehavior:_DISABLE_
									},
									{type:_CELLSPACER_},
									{type:_DWT_BUTTON_, label:com_zimbra_crm_admin.BTN_Edit,width:"100px",
									onActivate:"ZaCRMSectionModel.editButtonListener.call(this);",
									enableDisableChangeEventSources:[ZaCRMadmin.A_section_list_cache],
									enableDisableChecks:[ZaCRMSectionModel.isEditSectionEnabled],
									relevant:"ZaCRMSectionModel.isEditSectionEnabled.call(this)",
									relevantBehavior:_DISABLE_
									},
									{type:_CELLSPACER_},
									{type:_DWT_BUTTON_, label:com_zimbra_crm_admin.BTN_Add,width:"100px",
									onActivate:"ZaCRMSectionModel.addButtonListener.call(this);"
									}]
								}]
							}]
						},
						{ type:_ZATABCASE_,id:"crm_stage",ref:ZaModel.currentTab,relevant:"instance[ZaModel.currentTab] == 7",numCols:1,colSizes:["800px"],caseKey:newTab++,
							items:[{type:_ZA_TOP_GROUPER_, id:"crm_stage_group",width:"100%", 
							numCols:1,colSizes:["auto"],label:"Stage List",
							// cssStyle apply for stage list box
							cssStyle:"margin-top:10px;margin-bottom:10px;padding-bottom:0px;margin-left:10px;margin-right:10px;",
							items: [
							//for main box of header list
							{ref:ZaCRMadmin.A_stage, type:_DWT_LIST_, height:"300px",width:"1350", 
							forceUpdate: true, preserveSelection:false,multiselect:true,
							cssClass:"DLSource", headerList:headerList_cont, widgetClass:ZaCRMadminStageListView,
							onSelection:ZaCRMStageModel.stageSelectionListener,onChange:ZaCRMxFormView.currentFieldChanged,
							valueChangeEventSources:[ZaCRMadmin.A_stage]
							},
							//That for button
							{type:_GROUP_, numCols:5, colSizes:["100px","auto","100px","auto","100px"],width:"350px",
							cssStyle:"margin-bottom:10px;padding-bottom:0px;margin-top:10px;margin-left:0px;margin-right:0px;",	
							items: [{type:_DWT_BUTTON_, label:com_zimbra_crm_admin.BTN_Delete,width:"100px",
							onActivate:"ZaCRMStageModel.deleteButtonListener.call(this);",
							enableDisableChangeEventSources:[ZaCRMadmin.A_stage_list_cache],
							enableDisableChecks:[ZaCRMStageModel.isDeleteStageEnabled],
							relevant:"ZaCRMStageModel.isDeleteStageEnabled.call(this)",
							relevantBehavior:_DISABLE_
								},
								{type:_CELLSPACER_},
								{type:_DWT_BUTTON_, label:com_zimbra_crm_admin.BTN_Edit,width:"100px",
								onActivate:"ZaCRMStageModel.editButtonListener.call(this);",
								enableDisableChangeEventSources:[ZaCRMadmin.A_stage_list_cache],
								enableDisableChecks:[ZaCRMStageModel.isEditStageEnabled],
								relevant:"ZaCRMStageModel.isEditStageEnabled.call(this)",
								relevantBehavior:_DISABLE_
								},
								{type:_CELLSPACER_},
								{type:_DWT_BUTTON_, label:com_zimbra_crm_admin.BTN_Add,width:"100px",
								onActivate:"ZaCRMStageModel.addButtonListener.call(this);"
								}]
							}]
						}]
					}]
				}];
}

ZaTabView.XFormModifiers["ZaCRMxFormView"].push(ZaCRMxFormView.myXFormModifier);

