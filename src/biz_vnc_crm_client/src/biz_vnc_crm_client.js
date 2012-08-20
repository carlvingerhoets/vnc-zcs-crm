/*
 * Defines the Zimlet handler class.
 *   
 */
function biz_vnc_crm_client_HandlerObject() {};

/*
 * Makes the Zimlet class a subclass of ZmZimletBase.
 *
 */
biz_vnc_crm_client_HandlerObject.prototype = new ZmZimletBase();
biz_vnc_crm_client_HandlerObject.prototype.constructor = biz_vnc_crm_client_HandlerObject;

/*
 * This method gets called by the Zimlet framework when the zimlet loads.
 *  
 */
biz_vnc_crm_client._app = null;
biz_vnc_crm_client_HandlerObject.prototype.init = function (app, toolbar, controller, view) {
    // create the tab application
    this._tabAppName = this.createApp(biz_vnc_crm_client.crmclient_label, "tabIcon", biz_vnc_crm_client.crmclient_tooltip);
    var rec;
    biz_vnc_crm_client.getContacts(0, [], rec);
    biz_vnc_crm_client._flag = 2;
    biz_vnc_crm_client.contactList = "";
    biz_vnc_crm_client.temp = "";
    biz_vnc_crm_client.mailData = "";
    biz_vnc_crm_client.apptData = "";
    biz_vnc_crm_client._app = appCtxt.getApp(this._tabAppName);

    biz_vnc_crm_client.responsePriority = "";
    biz_vnc_crm_client.responseCategory = "";
    biz_vnc_crm_client.responseStage = "";
    biz_vnc_crm_client.responseChannel = "";
    biz_vnc_crm_client.responseState = "";
    biz_vnc_crm_client.responseCountry = "";
    biz_vnc_crm_client.responseCompany = "";
    biz_vnc_crm_client.responseSection = "";
    biz_vnc_crm_client.responseLeadClass = "";
    biz_vnc_crm_client.responseUser = "";

    var json, reqJson;
    var reqHeader = {
        "Content-Type": "application/x-www-form-urlencoded"
    };

    json = "jsonobj={\"action\":\"LIST\",\"object\":\"priority\"}";
    reqJson = AjxStringUtil.urlEncode(json);
    biz_vnc_crm_client.responsePriority = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

    json = "jsonobj={\"action\":\"LIST\",\"object\":\"category\"}";
    reqJson = AjxStringUtil.urlEncode(json);
    biz_vnc_crm_client.responseCategory = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

    json = "jsonobj={\"action\":\"LIST\",\"object\":\"stage\"}";
    reqJson = AjxStringUtil.urlEncode(json);
    biz_vnc_crm_client.responseStage = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
    
    json = "jsonobj={\"action\":\"LIST\",\"object\":\"channel\"}";
    reqJson = AjxStringUtil.urlEncode(json);
    biz_vnc_crm_client.responseChannel = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

    json = "jsonobj={\"action\":\"LIST\",\"object\":\"state\"}";
    reqJson = AjxStringUtil.urlEncode(json);
    biz_vnc_crm_client.responseState = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

    json = "jsonobj={\"action\":\"LIST\",\"object\":\"country\"}";
    reqJson = AjxStringUtil.urlEncode(json);
    biz_vnc_crm_client.responseCountry = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

    json = "jsonobj={\"action\":\"LIST\",\"object\":\"company\"}";
    reqJson = AjxStringUtil.urlEncode(json);
    biz_vnc_crm_client.responseCompany = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

    json = "jsonobj={\"action\":\"LIST\",\"object\":\"section\"}";
    reqJson = AjxStringUtil.urlEncode(json);
    biz_vnc_crm_client.responseSection = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

    json = "jsonobj={\"action\":\"LIST\",\"object\":\"leadClass\"}";
    reqJson = AjxStringUtil.urlEncode(json);
    biz_vnc_crm_client.responseLeadClass = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

    json = "jsonobj={\"action\":\"USER\",\"object\":\"section\"}";
    reqJson = AjxStringUtil.urlEncode(json);
    biz_vnc_crm_client.responseUser = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

};


// Intializing the toolbar for putting zimbraCRM button in the toolbar

biz_vnc_crm_client_HandlerObject.prototype.initializeToolbar = function (app, toolbar, controller, view) {
    if (view == "CNS") {
        var menu = controller.getActionMenu();
        if (!menu.getMenuItem(biz_vnc_crm_client.ZIMBRACRM)) {
            menu.createMenuItem(biz_vnc_crm_client.ZIMBRACRM, {
                image: "tabIcon",
                text: biz_vnc_crm_client.lead_window_title
            });
        }
        if (toolbar.getOp("Zimbra CRM")) {
            return;
        }
        var buttonIndex = -1;
        for (var i = 0, count = toolbar.opList.length; i < count; i++) {
            if (toolbar.opList[i] == ZmOperation.TAG_MENU) {
                buttonIndex = i + 2;
                break;
            }
        }
        var buttonArgs = {
            text: biz_vnc_crm_client.lead_window_title,
            tooltip: "View Info",
            index: buttonIndex, // position of the button
            image: "tabIcon" // icon
        };
        var button = toolbar.createOp("Zimbra CRM", buttonArgs);
        button.addSelectionListener(new AjxListener(this, this._handleToolbarBtnClick, [controller, app]));
        menu.getMenuItem(biz_vnc_crm_client.ZIMBRACRM).addSelectionListener(new AjxListener(this, this._handleToolbarBtnClick, [controller, app]));
    } else if (view == "CLV") {
        var menu = controller.getActionMenu();
        if (!menu.getMenuItem(biz_vnc_crm_client.ZIMBRACRM)) {
            menu.createMenuItem(biz_vnc_crm_client.ZIMBRACRM, {
                image: "tabIcon",
                text: biz_vnc_crm_client.lead_window_title
            });
        }
        menu.addPopupListener(new AjxListener(this, biz_vnc_crm_client.onRightClick, [controller, menu]));
        if (toolbar.getOp(biz_vnc_crm_client.lead_window_title)) {
            return;
        }
        var buttonIndex = -1;
        for (var i = 0, count = toolbar.opList.length; i < count; i++) {
            if (toolbar.opList[i] == ZmOperation.TAG_MENU) {
                buttonIndex = i + 2;
                break;
            }
        }
        var buttonArgs = {
            text: biz_vnc_crm_client.crmclient_label,
            tooltip: "View Info",
            index: buttonIndex,
            image: "tabIcon"
        };
        var button = toolbar.createOp(biz_vnc_crm_client.lead_window_title, buttonArgs);
        button.addSelectionListener(new AjxListener(this, this._handleBtnClick, [controller, app]));
        menu.getMenuItem(biz_vnc_crm_client.ZIMBRACRM).addSelectionListener(new AjxListener(this, this._handleBtnClick, [controller, app]));
    } else if (view == "CLD" || view == "CLWW" || view == "CLM" || view == "CLW" || view == "CLL" || view == "CLS") {
        var menu = controller.getActionMenu();
        if (!menu.getMenuItem(biz_vnc_crm_client.ZIMBRACRM)) {
            menu.createMenuItem(biz_vnc_crm_client.ZIMBRACRM, {
                image: "tabIcon",
                text: biz_vnc_crm_client.lead_window_title
            });
        }
        menu.addPopupListener(new AjxListener(this, biz_vnc_crm_client.onRightClickCal, [controller, menu]));
        if (toolbar.getOp(biz_vnc_crm_client.lead_window_title)) {
            return;
        }
        var buttonIndex = -1;
        for (var i = 0, count = toolbar.opList.length; i < count; i++) {
            if (toolbar.opList[i] == ZmOperation.TAG_MENU) {
                buttonIndex = i + 2;
                break;
            }
        }
        var buttonArgs = {
            text: biz_vnc_crm_client.lead_window_title,
            tooltip: "View Info",
            index: buttonIndex,
            image: "tabIcon"
        };
        var button = toolbar.createOp(biz_vnc_crm_client.lead_window_title, buttonArgs);
        button.addSelectionListener(new AjxListener(this, this._handleBtnClick, [controller, app]));
        menu.getMenuItem(biz_vnc_crm_client.ZIMBRACRM).addSelectionListener(new AjxListener(this, this._handleBtnClick, [controller, app]));
    } else if (view == "TKL") {
        var menu = controller.getActionMenu();
        if (!menu.getMenuItem(biz_vnc_crm_client.ZIMBRACRM)) {
            menu.createMenuItem(biz_vnc_crm_client.ZIMBRACRM, {
                image: "tabIcon",
                text: biz_vnc_crm_client.lead_window_title
            });
        }
        menu.addPopupListener(new AjxListener(this, biz_vnc_crm_client.onRightClick, [controller, menu]));
        if (toolbar.getOp(biz_vnc_crm_client.lead_window_title)) {
            return;
        }
        var buttonIndex = -1;
        for (var i = 0, count = toolbar.opList.length; i < count; i++) {
            if (toolbar.opList[i] == ZmOperation.TAG_MENU) {
                buttonIndex = i + 2;
                break;
            }
        }
        var buttonArgs = {
            text: biz_vnc_crm_client.lead_window_title,
            tooltip: "View Info",
            index: buttonIndex, // position of the button
            image: "tabIcon" // icon
        };
        var button = toolbar.createOp(biz_vnc_crm_client.lead_window_title, buttonArgs);
        button.addSelectionListener(new AjxListener(this, this._handleBtnClick, [controller, app]));
        menu.getMenuItem(biz_vnc_crm_client.ZIMBRACRM).addSelectionListener(new AjxListener(this, this._handleBtnClick, [controller, app]));
    }
};

biz_vnc_crm_client.onRightClick = function (controller, actionMenu) {
    var selected = controller.getCurrentView().getDnDSelection();
    selected = (selected instanceof Array) ? selected : [selected];
    selected = selected.length;
    // default behaviour is disable for more than one, changed here
    actionMenu.enable([biz_vnc_crm_client.ZIMBRACRM], selected > 0);

};
biz_vnc_crm_client.onRightClickCal = function (controller, actionMenu) {
    var selected = controller.getCurrentView().getSelection();
    selected = (selected instanceof Array) ? selected : [selected];
    selected = selected.length;
    // default behaviour is disable for more than one, changed here
    actionMenu.enable([biz_vnc_crm_client.ZIMBRACRM], selected > 0);

};

// ---- Tool Tip begins ---------------------------------------------------------------------------------

biz_vnc_crm_client_HandlerObject.prototype.onEmailHoverOver = function (emailZimlet) {
    emailZimlet.addSubscriberZimlet(this, false);
    this.emailZimlet = emailZimlet;
    this._addSlide();
};

biz_vnc_crm_client_HandlerObject.prototype._addSlide = function () {
    var controller = appCtxt.getCurrentController();
    var app = appCtxt.getCurrentApp();
    var tthtml = this._getTooltipBGHtml();
    var selectCallback = new AjxCallback(this, this._handleToolbarBtnClick, [controller, app]);
    this._slide = new EmailToolTipSlide(tthtml, true, "tabIcon", selectCallback, "View Info");
    this.emailZimlet.slideShow.addSlide(this._slide);
};

biz_vnc_crm_client_HandlerObject.prototype._getTooltipBGHtml = function () {
    return AjxTemplate.expand("biz_vnc_crm_client.templates.LinkedIn#Frame");
};


// ---- Tool Tip ends ---------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------

biz_vnc_crm_client_HandlerObject.prototype._handleBtnClick = function (controller, app) {
    Ext.require(['Ext.tab.*', 'Ext.window.*', 'Ext.tip.*', 'Ext.layout.container.Border', 'Ext.window.MessageBox', 'Ext.grid.*', 'Ext.data.*', 'Ext.util.*', 'Ext.state.*', 'Ext.form.*', 'Ext.layout.container.Column', 'Ext.tab.Panel', 'Ext.panel.*', 'Ext.toolbar.*', 'Ext.button.*', 'Ext.container.ButtonGroup', 'Ext.layout.container.Table', 'Ext.selection.CheckboxModel', 'Ext.window.Window', 'Ext.toolbar.Spacer', 'Ext.layout.container.Card', 'Ext.chart.*']);
    Ext.MessageBox.buttonText.yes = biz_vnc_crm_client.btnYes;
    Ext.MessageBox.buttonText.no = biz_vnc_crm_client.btnNo;

    // ------------------------------------------------------------------------------------------------------------

    var json = "jsonobj={\"action\":\"LIST\",\"object\":\"opp\"}";
    var reqHeader = {
        "Content-Type": "application/x-www-form-urlencoded"
    };
    var reqJson = AjxStringUtil.urlEncode(json);
    var mailOppResponse = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

    json = "jsonobj={\"action\":\"LIST\",\"object\":\"lead\"}";
    var reqHeader = {
        "Content-Type": "application/x-www-form-urlencoded"
    };
    var reqJson = AjxStringUtil.urlEncode(json);
    var mailLeadResponse = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);


    Ext.define('model_mailLead', {
        extend: 'Ext.data.Model',

        fields: [{
            name: 'leadId',
            type: 'int'
        }, {
            name: 'subjectName',
            type: 'string'
        }, {
            name: 'leadDescription',
            type: 'string'
        }, {
            name: 'contactName',
            type: 'string'
        }, {
            name: 'companyName',
            mapping: 'companyBean.companyName',
            type: 'string'
        }, {
            name: 'companyId',
            mapping: 'companyBean.companyId',
            type: 'int'
        }, {
            name: 'valuation',
            type: 'string'
        }, {
            name: 'leadState',
            type: 'string'
        }, {
            name: 'phone',
            type: 'string'
        }, {
            name: 'fax',
            type: 'string'
        }, {
            name: 'partnerName',
            type: 'string'
        }, {
            name: 'email',
            type: 'string'
        }, {
            name: 'workPhone',
            type: 'string'
        }, {
            name: 'mobile',
            type: 'string'
        }, {
            name: 'street1',
            type: 'string'
        }, {
            name: 'street2',
            type: 'string'
        }, {
            name: 'city',
            type: 'string'
        }, {
            name: 'zip',
            type: 'string'
        }, {
            name: 'stateName',
            mapping: 'stateBean.stateName',
            type: 'string'
        }, {
            name: 'stateId',
            mapping: 'stateBean.stateId',
            type: 'int'
        }, {
            name: 'leadClassName',
            mapping: 'leadClassBean.leadClassName',
            type: 'string'
        }, {
            name: 'leadClassId',
            mapping: 'leadClassBean.leadClassId',
            type: 'int'
        }, {
            name: 'countryName',
            mapping: 'countryBean.countryName',
            type: 'string'
        }, {
            name: 'countryId',
            mapping: 'countryBean.countryId',
            type: 'int'
        }, {
            name: 'type',
            type: 'string'
        }, {
            name: 'dateOpen',
            type: 'date'
        }, {
            name: 'dateClose',
            type: 'date'
        }, {
            name: 'expectedDateClose',
            type: 'date'
        }, {
            name: 'stageName',
            mapping: 'stageBean.stageName',
            type: 'string'
        }, {
            name: 'stageId',
            mapping: 'stageBean.stageId',
            type: 'int'
        }, {
            name: 'stageProbability',
            mapping: 'stageBean.stageProbability',
            type: 'float'
        }, {
            name: 'probability',
            type: 'float'
        }, {
            name: 'channelName',
            mapping: 'channelBean.channelName',
            type: 'string'
        }, {
            name: 'channelId',
            mapping: 'channelBean.channelId',
            type: 'int'
        }, {
            name: 'sectionId',
            mapping: 'sectionBean.sectionId',
            type: 'int'
        }, {
            name: 'sectionName',
            mapping: 'sectionBean.sectionName',
            type: 'string'
        }, {
            name: 'categoryName',
            mapping: 'categoryBean.categoryName',
            type: 'string'
        }, {
            name: 'categoryId',
            mapping: 'categoryBean.categoryId',
            type: 'int'
        }, {
            name: 'dayClose',
            type: 'float'
        }, {
            name: 'dayOpen',
            type: 'float'
        }, {
            name: 'referredBy',
            type: 'string'
        }, {
            name: 'userId',
            type: 'string'
        }, {
            name: 'priorityId',
            mapping: 'priorityBean.priorityId',
            type: 'int'
        }, {
            name: 'priorityName',
            mapping: 'priorityBean.priorityName',
            type: 'string'
        }, {
            name: 'nextActionDate',
            type: 'date'
        }, {
            name: 'nextAction',
            type: 'string'
        }, {
            name: 'status',
            type: 'bool'
        }, {
            name: 'createBy',
            type: 'string'
        }, {
            name: 'createDate',
            type: 'date'
        }, {
            name: 'writeBy',
            type: 'string'
        }, {
            name: 'writeDate',
            type: 'date'
        }]
    });
    var MailOppPanel, MailLeadPanel;
    var mailOppGridWindow = Ext.create('widget.window', {
           maxWidth: 850,
        maxHeight: 420,
        minWidth: 850,
        minHeight: 420,
        shrinkWrap: true,
        titleCollapse: true,
        toFrontOnShow: true,
        title: null,
        closable: true,
        modal: true,
        collapsible: true,
        items: [MailOppPanel = Ext.create('Ext.form.Panel', {
            width: '100%',
            height: 200,
            title: biz_vnc_crm_client.lblMyOpportunities,
            id: 'mailOppPanel1',
            defaults: {
                    autoRender: true
            },
            bodyBorder: true,
            items: [{
                xtype: 'grid',
                width: '100%',
                height: 170,
                id: 'contactOpportunityGrid',
                defaults: {
                    autoRender: true,
                    overflowY: 'auto'
                },
                store: Ext.create('Ext.data.Store', {
                    model: 'model_mailLead',
                    proxy: {
                        type: 'memory',
                        data: jsonParse(mailOppResponse.text)
                    },
                    autoLoad: true,
                    actionMethods: {
                        read: 'POST'
                    }

                }),
                viewConfig: {
                    stripeRows: true
                },
                columns: [{
                    sortable: false,
                    xtype: 'actioncolumn',
                    width: 25,
                    items: [{
                        icon: "/service/zimlet/biz_vnc_crm_client/default/btn/attachment.png", // Use a URL in the icon config
                        tooltip: biz_vnc_crm_client.btnEdit,
                        handler: function (grid, rowIndex, colIndex) {
                            var view = appCtxt.getCurrentViewId();
                            if (view == "CLV") {
                                var rec = grid.getStore().getAt(rowIndex);
                                var leadId = rec.get('leadId');
                                var selmsg = appCtxt.getCurrentController().getSelection();
                                var len = selmsg.length
                                var msgids = [];
                                var k = 0;
                                for (var i = 0; i < len; i++) {
                                    if (selmsg[i].type == "CONV") {
                                        var count = selmsg[i].msgIds.length;
                                        for (var j = 0; j < count; j++) {
                                            msgids[k++] = selmsg[i].msgIds[j];
                                        }
                                    } else if (selmsg[i].type == "MSG") {
                                        msgids[k++] = selmsg[i].id;
                                    }
                                }
                                var json = "jsonobj={\"action\":\"HISTORY\",\"object\":\"opp\",\"array\":\"" + msgids + "\",\"leadId\":\"" + leadId + "\"}";
                                var reqHeader = {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                };
                                var reqJson = AjxStringUtil.urlEncode(json);
                                var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                                if (response.text == 1) {
                                    Ext.example.msg('',biz_vnc_crm_client.msgEmailAttach);
                                } else {
                                    Ext.example.msg('', biz_vnc_crm_client.msgEmailNotAttach);
                                }
                                mailOppGridWindow.hide();
                            } else if (view == "CAL") {
                                var rec = grid.getStore().getAt(rowIndex);
                                var leadId = rec.get('leadId');
                                var selmsg = appCtxt.getCurrentController().getSelection();
                                var len = selmsg.length
                                var appids = [];
                                for (var i = 0; i < len; i++) {
                                    appids[i] = selmsg[i].invId;
                                }

                                var json = "jsonobj={\"action\":\"CALHISTORY\",\"object\":\"opp\",\"array\":\"" + appids + "\",\"leadId\":\"" + leadId + "\"}";
                                var reqHeader = {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                };
                                var reqJson = AjxStringUtil.urlEncode(json);
                                var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                                if (response.text == 1) {
                                    Ext.example.msg('',biz_vnc_crm_client.msgApptAttach);
                                } else {
                                    Ext.example.msg('', biz_vnc_crm_client.msgApptNotAttach);
                                }
                                mailOppGridWindow.hide();
                            } else if (view == "TKL") {
                                var rec = grid.getStore().getAt(rowIndex);
                                var leadId = rec.get('leadId');
                                var selmsg = appCtxt.getCurrentController().getSelection();
                                var len = selmsg.length
                                var taskids = [];
                                for (var i = 0; i < len; i++) {
                                    taskids[i] = selmsg[i].invId;
                                }

                                var json = "jsonobj={\"action\":\"TASKHISTORY\",\"object\":\"opp\",\"array\":\"" + taskids + "\",\"leadId\":\"" + leadId + "\"}";
                                var reqHeader = {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                };
                                var reqJson = AjxStringUtil.urlEncode(json);
                                var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                                if (response.text == 1) {
                                    Ext.example.msg('',biz_vnc_crm_client.msgTaskAttach);

                                } else {
                                    Ext.example.msg('',biz_vnc_crm_client.msgTaskNotAttach);

                                }
                                mailOppGridWindow.hide();
                            }

                        }
                    }]
                }, {
                    header: biz_vnc_crm_client.opportunity,
                    width: 150,
                    dataIndex: 'subjectName',
                    sortable: true
                }, {
                    header: biz_vnc_crm_client.customer,
                    width: 150,
                    dataIndex: 'contactName',
                    sortable: true
                }, {
                    header: biz_vnc_crm_client.stage,
                    width: 150,
                    dataIndex: 'stageName',
                    sortable: true
                }, {
                    header: biz_vnc_crm_client.expectedRevenue,
                    width: 140,
                    dataIndex: 'valuation',
                    sortable: true
                }, {
                    header: biz_vnc_crm_client.probability,
                    width: 100,
                    dataIndex: 'probability',
                    sortable: true
                }, {
                    header: biz_vnc_crm_client.state,
                    width: 120,
                    dataIndex: 'leadState',
                    sortable: true
                }]
            }]
        }),
        MailLeadPanel = Ext.create('Ext.form.Panel', {
            width: '100%',
            id: 'mailLeadPanel1',
            height: 200,
            title: biz_vnc_crm_client.lblMyLeads,
            bodyBorder: true,
            items: [{
                xtype: 'grid',
                id: 'mailLeadGrid',
                height: 160,
                width: '100%',
                defaults: {
                    autoRender: true,
                    overflowY: 'auto'
                },
                store: Ext.create('Ext.data.Store', {
                    model: 'model_mailLead',
                    proxy: {
                        type: 'memory',
                        data: jsonParse(mailLeadResponse.text)
                    },
                    autoLoad: true,
                    actionMethods: {
                        read: 'POST'
                    }

                }),
                viewConfig: {
                    stripeRows: true
                },
                columns: [{
                    sortable: false,
                    xtype: 'actioncolumn',
                    width: 25,
                    items: [{
                        icon: "/service/zimlet/biz_vnc_crm_client/default/btn/attachment.png", // Use a URL in the icon config
                        tooltip: biz_vnc_crm_client.btnEdit,
                        handler: function (grid, rowIndex, colIndex) {
                            var view = appCtxt.getCurrentViewId();
                            if (view == "CLV") {
                                var rec = grid.getStore().getAt(rowIndex);
                                var leadId = rec.get('leadId');
                                var selmsg = appCtxt.getCurrentController().getSelection();
                                var len = selmsg.length
                                var msgids = [];
                                var k = 0;
                                for (var i = 0; i < len; i++) {

                                    if (selmsg[i].type == "CONV") {
                                        var count = selmsg[i].msgIds.length;
                                        for (var j = 0; j < count; j++) {
                                            msgids[k++] = selmsg[i].msgIds[j];
                                        }
                                    } else if (selmsg[i].type == "MSG") {
                                        msgids[k++] = selmsg[i].id;
                                    }
                                }
                                var json = "jsonobj={\"action\":\"HISTORY\",\"object\":\"opp\",\"array\":\"" + msgids + "\",\"leadId\":\"" + leadId + "\"}";
                                var reqHeader = {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                };
                                var reqJson = AjxStringUtil.urlEncode(json);
                                var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                                if (response.text == 1) {
                                    Ext.example.msg('', biz_vnc_crm_client.msgEmailAttach);
                                } else {
                                    Ext.example.msg('', biz_vnc_crm_client.msgEmailNotAttach);
                                }
                                mailOppGridWindow.hide();
                            } else if (view == "CAL") {
                                var rec = grid.getStore().getAt(rowIndex);
                                var leadId = rec.get('leadId');
                                var selmsg = appCtxt.getCurrentController().getSelection();
                                var len = selmsg.length
                                var appids = [];
                                for (var i = 0; i < len; i++) {
                                    appids[i] = selmsg[i].invId;
                                }

                                var json = "jsonobj={\"action\":\"CALHISTORY\",\"object\":\"opp\",\"array\":\"" + appids + "\",\"leadId\":\"" + leadId + "\"}";
                                var reqHeader = {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                };
                                var reqJson = AjxStringUtil.urlEncode(json);
                                var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                                if (response.text == 1) {
                                    Ext.example.msg('', biz_vnc_crm_client.msgApptAttach);
                                } else {
                                    Ext.example.msg('', biz_vnc_crm_client.msgApptNotAttach);
                                }
                                mailOppGridWindow.hide();
                            } else if (view == "TKL") {
                                var rec = grid.getStore().getAt(rowIndex);
                                var leadId = rec.get('leadId');
                                var selmsg = appCtxt.getCurrentController().getSelection();
                                var len = selmsg.length
                                var taskids = [];
                                for (var i = 0; i < len; i++) {
                                    taskids[i] = selmsg[i].invId;
                                }

                                var json = "jsonobj={\"action\":\"TASKHISTORY\",\"object\":\"lead\",\"array\":\"" + taskids + "\",\"leadId\":\"" + leadId + "\"}";
                                var reqHeader = {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                };
                                var reqJson = AjxStringUtil.urlEncode(json);
                                var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                                if (response.text == 1) {
                                    Ext.example.msg('', biz_vnc_crm_client.msgTaskAttach);

                                } else {
                                    Ext.example.msg('', biz_vnc_crm_client.msgTaskNotAttach);
                                }
                                mailOppGridWindow.hide();
                            }
                        }
                    }]
                }, {
                    text: biz_vnc_crm_client.subject,
                    width: 150,
                    dataIndex: 'subjectName'
                }, {
                    text: biz_vnc_crm_client.contactName,
                    width: 150,
                    dataIndex: 'contactName'
                }, {
                    text: biz_vnc_crm_client.email,
                    width: 150,
                    dataIndex: 'email'
                }, {
                    text: biz_vnc_crm_client.phone,
                    width: 130,
                    dataIndex: 'phone'
                }, {
                    text: biz_vnc_crm_client.stage,
                    width: 110,
                    dataIndex: 'stageName'
                }, {
                    text: biz_vnc_crm_client.state,
                    width: 120,
                    dataIndex: 'leadState'
                }]
            }]
        })],
        renderTo: Ext.getBody()
    });
    mailOppGridWindow.show();

    // ------------------------------------------------------------------------------------------------------------
};

// ----------------------------------------------------------------------------------------------------

biz_vnc_crm_client_HandlerObject.prototype._handleToolbarBtnClick = function (controller, app) {
    Ext.require(['Ext.tab.*', 'Ext.window.*', 'Ext.tip.*', 'Ext.layout.container.Border', 'Ext.window.MessageBox', 'Ext.grid.*', 'Ext.data.*', 'Ext.util.*', 'Ext.state.*', 'Ext.form.*', 'Ext.layout.container.Column', 'Ext.tab.Panel', 'Ext.panel.*', 'Ext.toolbar.*', 'Ext.button.*', 'Ext.container.ButtonGroup', 'Ext.layout.container.Table', 'Ext.selection.CheckboxModel', 'Ext.window.Window', 'Ext.toolbar.Spacer', 'Ext.layout.container.Card', 'Ext.chart.*']);
    Ext.MessageBox.buttonText.yes = biz_vnc_crm_client.btnYes;
    Ext.MessageBox.buttonText.no = biz_vnc_crm_client.btnNo;

    var count = appCtxt.getCurrentController().getSelection().length;
    var record;
    var idArray = [];
    for (var i = 0; i < count; i++) {
        record = "'" + (appCtxt.getCurrentController().getSelection())[i].id + "'";
        idArray.push(record);
    }

    // ------------------------------------------------------------------------------------------------------------

    var json = "jsonobj={\"action\":\"CONTACT\",\"object\":\"opp\",\"array\":\"" + idArray + "\"}";
    var reqHeader = {
        "Content-Type": "application/x-www-form-urlencoded"
    };
    var reqJson = AjxStringUtil.urlEncode(json);
    var contactOppResponse = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

    json = "jsonobj={\"action\":\"CONTACT\",\"object\":\"lead\",\"array\":\"" + idArray + "\"}";
    var reqHeader = {
        "Content-Type": "application/x-www-form-urlencoded"
    };
    var reqJson = AjxStringUtil.urlEncode(json);
    var contactLeadResponse = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);


    Ext.define('model_lead', {
        extend: 'Ext.data.Model',

        fields: [{
            name: 'leadId',
            type: 'int'
        }, {
            name: 'subjectName',
            type: 'string'
        }, {
            name: 'leadDescription',
            type: 'string'
        }, {
            name: 'contactName',
            type: 'string'
        }, {
            name: 'companyName',
            mapping: 'companyBean.companyName',
            type: 'string'
        }, {
            name: 'companyId',
            mapping: 'companyBean.companyId',
            type: 'int'
        }, {
            name: 'valuation',
            type: 'string'
        }, {
            name: 'leadState',
            type: 'string'
        }, {
            name: 'phone',
            type: 'string'
        }, {
            name: 'fax',
            type: 'string'
        }, {
            name: 'partnerName',
            type: 'string'
        }, {
            name: 'email',
            type: 'string'
        }, {
            name: 'workPhone',
            type: 'string'
        }, {
            name: 'mobile',
            type: 'string'
        }, {
            name: 'street1',
            type: 'string'
        }, {
            name: 'street2',
            type: 'string'
        }, {
            name: 'city',
            type: 'string'
        }, {
            name: 'zip',
            type: 'string'
        }, {
            name: 'stateName',
            mapping: 'stateBean.stateName',
            type: 'string'
        }, {
            name: 'stateId',
            mapping: 'stateBean.stateId',
            type: 'int'
        }, {
            name: 'leadClassName',
            mapping: 'leadClassBean.leadClassName',
            type: 'string'
        }, {
            name: 'leadClassId',
            mapping: 'leadClassBean.leadClassId',
            type: 'int'
        }, {
            name: 'countryName',
            mapping: 'countryBean.countryName',
            type: 'string'
        }, {
            name: 'countryId',
            mapping: 'countryBean.countryId',
            type: 'int'
        }, {
            name: 'type',
            type: 'string'
        }, {
            name: 'dateOpen',
            type: 'date'
        }, {
            name: 'dateClose',
            type: 'date'
        }, {
            name: 'expectedDateClose',
            type: 'date'
        }, {
            name: 'stageName',
            mapping: 'stageBean.stageName',
            type: 'string'
        }, {
            name: 'stageId',
            mapping: 'stageBean.stageId',
            type: 'int'
        }, {
            name: 'stageProbability',
            mapping: 'stageBean.stageProbability',
            type: 'float'
        }, {
            name: 'probability',
            type: 'float'
        }, {
            name: 'channelName',
            mapping: 'channelBean.channelName',
            type: 'string'
        }, {
            name: 'channelId',
            mapping: 'channelBean.channelId',
            type: 'int'
        }, {
            name: 'sectionId',
            mapping: 'sectionBean.sectionId',
            type: 'int'
        }, {
            name: 'sectionName',
            mapping: 'sectionBean.sectionName',
            type: 'string'
        }, {
            name: 'categoryName',
            mapping: 'categoryBean.categoryName',
            type: 'string'
        }, {
            name: 'categoryId',
            mapping: 'categoryBean.categoryId',
            type: 'int'
        }, {
            name: 'dayClose',
            type: 'float'
        }, {
            name: 'dayOpen',
            type: 'float'
        }, {
            name: 'referredBy',
            type: 'string'
        }, {
            name: 'userId',
            type: 'string'
        }, {
            name: 'priorityId',
            mapping: 'priorityBean.priorityId',
            type: 'int'
        }, {
            name: 'priorityName',
            mapping: 'priorityBean.priorityName',
            type: 'string'
        }, {
            name: 'nextActionDate',
            type: 'date'
        }, {
            name: 'nextAction',
            type: 'string'
        }, {
            name: 'status',
            type: 'bool'
        }, {
            name: 'createBy',
            type: 'string'
        }, {
            name: 'createDate',
            type: 'date'
        }, {
            name: 'writeBy',
            type: 'string'
        }, {
            name: 'writeDate',
            type: 'date'
        }]
    });
    var ContactOppPanel, ContactLeadPanel;
    var contactOppGridWindow = Ext.create('widget.window', {
        maxWidth: 725,
        maxHeight: 400,
        minWidth: 725,
        minHeight: 400,

        shrinkWrap: true,
        titleCollapse: true,
        toFrontOnShow: true,
        title: null,
        closable: true,
        modal: true,
        collapsible: true,

        items: [ContactOppPanel = Ext.create('Ext.form.Panel', {
            width: '100%',
            height: 200,
            title: biz_vnc_crm_client.lblOpportunities,
            id: 'contactOppPanel1',
            bodyBorder: true,
            items: [{
                xtype: 'grid',
                id: 'contactOpportunityGrid',
                height: 170,
                defaults: {
                    autoRender: true,
                    overflowY: 'auto'
                },
                store: Ext.create('Ext.data.Store', {
                    model: 'model_lead',
                    proxy: {
                        type: 'memory',
                        data: jsonParse(contactOppResponse.text)
                    },
                    autoLoad: true,
                    actionMethods: {
                        read: 'POST'
                    }

                }),
                viewConfig: {
                    stripeRows: true
                },
                columns: [{
                    sortable: false,
                    xtype: 'actioncolumn',
                    width: 25,
                    items: [{
                        icon: "/service/zimlet/biz_vnc_crm_client/default/btn/pencil.gif", // Use a URL in the icon config
                        tooltip: biz_vnc_crm_client.btnEdit,
                        handler: function (grid, rowIndex, colIndex) {

                            var rec = grid.getStore().getAt(rowIndex);
                            var content = AjxTemplate.expand("biz_vnc_crm_client.templates.OpportunityForm#OpportunityFormMain");
                            var app = biz_vnc_crm_client._app;
                            contactOppGridWindow.hide();
                            app.setContent(content);
                            biz_vnc_crm_client_HandlerObject.prototype.settoolbar(app);
                            ZmOpportunityListView.prototype.getContacts(0, [], rec, app);
                            app.pushView(app.getName());
                        }
                    }]
                }, {
                    header: biz_vnc_crm_client.opportunity,
                    width: 120,
                    dataIndex: 'subjectName',
                    sortable: true
                }, {
                    header: biz_vnc_crm_client.customer,
                    width: 120,
                    dataIndex: 'contactName',
                    sortable: true
                }, {
                    header: biz_vnc_crm_client.stage,
                    width: 120,
                    dataIndex: 'stageName',
                    sortable: true
                }, {
                    header: biz_vnc_crm_client.expectedRevenue,
                    width: 120,
                    dataIndex: 'valuation',
                    sortable: true
                }, {
                    header: biz_vnc_crm_client.probability,
                    width: 75,
                    dataIndex: 'probability',
                    sortable: true
                }, {
                    header: biz_vnc_crm_client.state,
                    width: 100,
                    dataIndex: 'leadState',
                    sortable: true
                }, {
                    sortable: false,
                    xtype: 'actioncolumn',
                    width: 25,
                    items: [{
                        icon: '/service/zimlet/biz_vnc_crm_client/default/btn/cancel.png',
                        tooltip: biz_vnc_crm_client.btnDelete,
                        handler: function (grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            Ext.MessageBox.confirm(biz_vnc_crm_client.msgConfirmHeader, biz_vnc_crm_client.msgConfirm, showResult);

                            function showResult(btn) {
                                if (btn == "yes") {
                                    var name = appCtxt.getUsername();
                                    var idArray = rec.get('leadId');
                                    var json = "jsonobj={\"action\":\"DELETEBYID\",\"object\":\"lead\",\"array\":\"" + idArray + "\",\"writeBy\":\"" + name + "\"}";
                                    var reqHeader = {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    };
                                    var reqJson = AjxStringUtil.urlEncode(json);
                                    var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                                    Ext.example.msg('', biz_vnc_crm_client.msgDelete);
                                    biz_vnc_crm_client.initOpportunityGrid(app);
                                }
                            };
                        }
                    }]
                }],
                listeners: {
                    dblclick: {}
                }
            }]
        }),
        ContactLeadPanel = Ext.create('Ext.form.Panel', {
            width: '100%',
            id: 'contactLeadPanel1',
            height: 200,
            title: biz_vnc_crm_client.lblLeads,
            bodyBorder: true,
            items: [{
                xtype: 'grid',
                id: 'contactLeadGrid',
                height: 140,
                defaults: {
                    autoRender: true,
                    overflowY: 'auto'
                },
                store: Ext.create('Ext.data.Store', {
                    model: 'model_lead',
                    proxy: {
                        type: 'memory',
                        data: jsonParse(contactLeadResponse.text)
                    },
                    autoLoad: true,
                    actionMethods: {
                        read: 'POST'
                    }

                }),
                viewConfig: {
                    stripeRows: true
                },
                columns: [{
                    sortable: false,
                    xtype: 'actioncolumn',
                    width: 25,
                    icon: "/service/zimlet/biz_vnc_crm_client/default/btn/pencil.gif",

                    items: [{
                        icon: "/service/zimlet/biz_vnc_crm_client/default/btn/pencil.gif", // Use a URL in the icon config
                        tooltip: biz_vnc_crm_client.btnEdit,
                        handler: function (grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            var content = AjxTemplate.expand("biz_vnc_crm_client.templates.LeadForm#LeadFormMain");
                            var app = biz_vnc_crm_client._app;
                            contactOppGridWindow.hide();
                            biz_vnc_crm_client_HandlerObject.prototype.settoolbar(app);
                            app.setContent(content);
                            ZmLeadListView.prototype.getContacts(0, [], rec, app);
                            app.pushView(app.getName());
                        }
                    }]
                }, {
                    text: biz_vnc_crm_client.subject,
                    width: 140,
                    dataIndex: 'subjectName'
                }, {
                    text: biz_vnc_crm_client.contactName,
                    width: 140,
                    dataIndex: 'contactName'
                }, {
                    text: biz_vnc_crm_client.email,
                    width: 140,
                    dataIndex: 'email'
                }, {
                    text: biz_vnc_crm_client.phone,
                    width: 75,
                    dataIndex: 'phone'
                }, {
                    text: biz_vnc_crm_client.stage,
                    width: 75,
                    dataIndex: 'stageName'
                }, {
                    text: biz_vnc_crm_client.state,
                    width: 75,
                    dataIndex: 'leadState'
                }, {
                    sortable: false,
                    xtype: 'actioncolumn',
                    width: 25,

                    items: [{
                        icon: '/service/zimlet/biz_vnc_crm_client/default/btn/cancel.png',
                        tooltip: biz_vnc_crm_client.btnDelete,
                        handler: function (grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            Ext.MessageBox.confirm(biz_vnc_crm_client.msgConfirmHeader, biz_vnc_crm_client.msgConfirm, showResult);
                            function showResult(btn) {
                                if (btn == "yes") {
                                    var name = appCtxt.getUsername();
                                    var idArray = rec.get('leadId');
                                    var json = "jsonobj={\"action\":\"DELETEBYID\",\"object\":\"lead\",\"array\":\"" + idArray + "\",\"writeBy\":\"" + name + "\"}";
                                    var reqHeader = {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    };
                                    var reqJson = AjxStringUtil.urlEncode(json);
                                    var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                                    Ext.example.msg('', biz_vnc_crm_client.msgDelete);
                                    biz_vnc_crm_client.initLeadGrid(app);
                                }
                            };
                        }
                    }]
                }],
                listeners: {
                    dblclick: {
                        element: 'body', //bind to the underlying body property on the panel
                        fn: function (grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            var content = AjxTemplate.expand("biz_vnc_crm_client.templates.OpportunityForm#OpportunityFormMain");
                            var app = biz_vnc_crm_client._app;
                            contactOppGridWindow.hide();
                            app.setContent(content);
                            ZmLeadListView.prototype.getContacts(0, [], rec, app);
                            app.pushView(app.getName());
                        }
                    }
                }
            }]
        })],
        renderTo: Ext.getBody()
    });
    contactOppGridWindow.show();

    // ------------------------------------------------------------------------------------------------------------

};

// Toolbar function ends here....



// Email attachment START here...

biz_vnc_crm_client.leadId = null;

biz_vnc_crm_client_HandlerObject.prototype.showAttachMailDialog = function (leadId, flag) {
    /*..... Generates main Dialogbox......*/
    var view = new DwtComposite(appCtxt.getShell());
    this.attachMailTabView = new DwtTabView(view, "AttachMailTabView1");

    this.attachMailTabPage = new AttachMailTabView1(this.attachMailTabView, this);
    view.setSize("485", "255");
    this.attachMailTabView.setSize("485", "230");
    this.attachMailTabPage.setSize("485", "230");

    tabKeys = [];
    tabKeys.push(this.attachMailTabView.addTab(biz_vnc_crm_client.attach_mail_dialog_tab, this.attachMailTabPage));

    canvas = new OpenDialog(appCtxt.getShell(), biz_vnc_crm_client.attach_mail_dialog_title, view, leadId, flag, new AjxListener(this, biz_vnc_crm_client.okMailAttach, [this]));
    canvas.popup();
}

biz_vnc_crm_client_HandlerObject.prototype.showAttachAppointmentDialog = function (leadId, flag) {
    /*..... Generates main Dialogbox......*/
    var view = new DwtComposite(appCtxt.getShell());
    this.attachApptTabView = new DwtTabView(view, "AttachAppointmentTabView");

    this.attachApptTabPage = new AttachAppointmentTabView(this.attachApptTabView, this);
    view.setSize("500", "325");
    this.attachApptTabView.setSize("500", "300");
    this.attachApptTabPage.setSize("500", "300");

    tabKeys = [];
    tabKeys.push(this.attachApptTabView.addTab(biz_vnc_crm_client.attach_appt_dialog_tab, this.attachApptTabPage));

    this.attachApptDialog = new OpenDialog(appCtxt.getShell(), biz_vnc_crm_client.attach_appt_dialog_title, view, leadId, flag, new AjxListener(this, biz_vnc_crm_client.okAppointmentAttach, [this]));
    this.attachApptDialog.popup();
}
/*..... Task Attachment Dialogbox......*/

biz_vnc_crm_client_HandlerObject.prototype.showAttachTaskDialog = function (leadId, flag) {
    /*..... Generates main Dialogbox......*/
    var view = new DwtComposite(appCtxt.getShell());
    this.attachTaskTabView = new DwtTabView(view, "AttachTask");

    this.attachTaskTabPage = new AttachTask(this.attachTaskTabView, this);
    view.setSize("485", "255");
    this.attachTaskTabView.setSize("485", "230");
    this.attachTaskTabPage.setSize("485", "230");

    tabKeys = [];
    tabKeys.push(this.attachTaskTabView.addTab(biz_vnc_crm_client.attach_task_dialog_tab, this.attachTaskTabPage));
    this.attachTaskDialog = new OpenDialog(appCtxt.getShell(), biz_vnc_crm_client.attach_task_dialog_title, view, leadId, flag, new AjxListener(this, biz_vnc_crm_client.okTaskAttach, [this]));
    this.attachTaskDialog.popup();
}

biz_vnc_crm_client.okTaskAttach = function () {

    if (0 == AttachTask._tabAttachTaskView.getSelectionCount()) {
        appCtxt.setStatusMsg(biz_vnc_crm_client.select_atleast_one_record_msg);
        return;
    }
    var item, count;
    var array = [];
    var bcView = AttachTask._tabAttachTaskView;
    count = bcView.getSelectionCount();
    for (var i = 0; i < count; i++) {
        array.push(bcView.getSelection()[i].invId);
    }
    var json = "jsonobj={\"action\":\"TASKHISTORY\",\"object\":\"opp\",\"array\":\"" + array + "\",\"leadId\":\"" + biz_vnc_crm_client.leadId + "\"}";
    var reqHeader = {
        "Content-Type": "application/x-www-form-urlencoded"
    };
    var reqJson = AjxStringUtil.urlEncode(json);
    var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
    if (response.text == 1) {
        Ext.example.msg('', biz_vnc_crm_client.msgTaskAttach);
    } else {
        Ext.example.msg('', biz_vnc_crm_client.msgTaskNotAttach);
    }
    var query = "";
    var folderAry = appCtxt.getTaskManager().getCheckedCalendarFolderIds(true);
    for (var i in folderAry) {
        if (folderAry.length - 1 != i) {
            query = query + "inid:\"" + folderAry[i] + "\"" + " OR ";
        } else {
            query = query + "inid:\"" + folderAry[i] + "\"";
        }
    }
    this.attachTaskDialog.popdown();
    appCtxt.getTaskManager()._rawTasks = [];
    var searchResponse = appCtxt.getTaskManager()._search({
        offset: 0,
        query: query,
        "types": "task"
    });
    if (response.text == 1) {
        if (biz_vnc_crm_client.flag == 0) {
            var json = "jsonobj={\"action\":\"listTask\",\"object\":\"lead\",\"leadId\":\"" + biz_vnc_crm_client.leadId + "\"}";
            var reqHeader = {
                "Content-Type": "application/x-www-form-urlencoded"
            };
            var reqJson = AjxStringUtil.urlEncode(json);
            var responseTaskList = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
            var newtaskArray = (responseTaskList.text).split(",");
            var allTask = searchResponse.getArray();
            var taskArray = [];
            if (newtaskArray != null) {
                for (var i = 0; i < allTask.length; i++) {
                    for (var j = 0; j < newtaskArray.length; j++) {
                        if (allTask[i].invId == newtaskArray[j]) {
                            taskArray.push(newtaskArray[j]);
                        }
                    }
                }
            }
            if (taskArray.length <= 0) {
                leadTaskListData = "[{'taskId':'','subject':'','status':'','complete':'','dueDate':''}]";
            } else {
                leadTaskListData = "[";
                var flag = 0;
                var isFinished = false;
                for (var i = 0; i < allTask.length; i++) {
                    var temp = allTask[i];
                    for (var j = 0; j < taskArray.length; j++) {
                        if (temp.invId == taskArray[j]) {
                            if (flag == taskArray.length - 1) {
                                leadTaskListData += "{\"taskId\":\"" + temp.invId + "\",\"subject\":\"" + temp.name + "\",\"status\":\"" + ZmCalItem.getLabelForStatus(temp.status) + "\",\"complete\":\"" + temp.pComplete + "\",\"dueDate\":\"" + new Date(temp.endDate) + "\"}]";
                                isFinished = true;
                                break;
                            } else {
                                leadTaskListData += "{\"taskId\":\"" + temp.invId + "\",\"subject\":\"" + temp.name + "\",\"status\":\"" + ZmCalItem.getLabelForStatus(temp.status) + "\",\"complete\":\"" + temp.pComplete + "\",\"dueDate\":\"" + new Date(temp.endDate) + "\"},";
                            }
                            flag++;
                        }
                    }
                    if (isFinished) break;
                }
            }
            Ext.getCmp('leadTaskGrid').getStore().loadData(jsonParse(leadTaskListData), false);
            Ext.getCmp('leadTaskGrid').getView().refresh();
        } else if (biz_vnc_crm_client.flag == 1) {
            var json = "jsonobj={\"action\":\"listTask\",\"object\":\"opp\",\"leadId\":\"" + biz_vnc_crm_client.leadId + "\"}";
            var reqHeader = {
                "Content-Type": "application/x-www-form-urlencoded"
            };
            var reqJson = AjxStringUtil.urlEncode(json);
            var responseTaskList = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
            var newtaskArray = (responseTaskList.text).split(",");
            var allTask = searchResponse.getArray();
            var taskArray = [];
            if (newtaskArray != null) {
                for (var i = 0; i < allTask.length; i++) {
                    for (var j = 0; j < newtaskArray.length; j++) {
                        if (allTask[i].invId == newtaskArray[j]) {
                            taskArray.push(newtaskArray[j]);
                        }
                    }
                }
            }
            if (taskArray.length <= 0) {
                leadTaskListData = "[{'taskId':'','subject':'','status':'','complete':'','dueDate':''}]";
            } else {
                leadTaskListData = "[";
                var flag = 0;
                var isFinished = false;
                for (var i = 0; i < allTask.length; i++) {
                    var temp = allTask[i];
                    for (var j = 0; j < taskArray.length; j++) {
                        if (temp.invId == taskArray[j]) {
                            if (flag == taskArray.length - 1) {
                                leadTaskListData += "{\"taskId\":\"" + temp.invId + "\",\"subject\":\"" + temp.name + "\",\"status\":\"" + ZmCalItem.getLabelForStatus(temp.status) + "\",\"complete\":\"" + temp.pComplete + "\",\"dueDate\":\"" + new Date(temp.endDate) + "\"}]";
                                isFinished = true;
                                break;
                            } else {
                                leadTaskListData += "{\"taskId\":\"" + temp.invId + "\",\"subject\":\"" + temp.name + "\",\"status\":\"" + ZmCalItem.getLabelForStatus(temp.status) + "\",\"complete\":\"" + temp.pComplete + "\",\"dueDate\":\"" + new Date(temp.endDate) + "\"},";
                            }
                            flag++;
                        }
                    }
                    if (isFinished) break;
                }
            }
            Ext.getCmp('oppTaskGrid').getStore().loadData(jsonParse(leadTaskListData), false);
            Ext.getCmp('oppTaskGrid').getView().refresh();
        }
    }
}

function OpenDialog(parent, title, view, leadId, flag, listener) {
    if (arguments.length == 0) return;
    biz_vnc_crm_client.leadId = leadId;
    biz_vnc_crm_client.flag = flag;

    DwtDialog.call(this, {
        parent: parent,
        title: title,
        standardButtons: [DwtDialog.OK_BUTTON, DwtDialog.CANCEL_BUTTON]
    });

    this.setButtonListener(DwtDialog.OK_BUTTON, listener);
    this.setView(view);
};

OpenDialog.prototype = new ZmDialog;
OpenDialog.prototype.constructor = OpenDialog;

biz_vnc_crm_client.okMailAttach = function () {

    if (0 == AttachMailTabView1._tabAttachMailView.getSelectionCount()) {
        appCtxt.setStatusMsg(biz_vnc_crm_client.select_atleast_one_record_msg);
        return;
    }
    var item, count;
    var array = [];
    var bcView = AttachMailTabView1._tabAttachMailView;
    count = bcView.getSelectionCount();
    for (var i = 0; i < count; i++) {
        array.push(bcView.getSelection()[i].id);
    }
    if (i == count) {
        var json = "jsonobj={\"action\":\"HISTORY\",\"object\":\"opp\",\"array\":\"" + array + "\",\"leadId\":\"" + biz_vnc_crm_client.leadId + "\"}";
        var reqHeader = {
            "Content-Type": "application/x-www-form-urlencoded"
        };
        var reqJson = AjxStringUtil.urlEncode(json);
        var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
        if (response.text == 1) {
            Ext.example.msg('', biz_vnc_crm_client.msgEmailAttach);
        } else {
            Ext.example.msg('', biz_vnc_crm_client.msgEmailNotAttach);
        }
    }
    canvas.popdown();
    if (biz_vnc_crm_client.flag == 0) {
        var leadId = biz_vnc_crm_client.leadId;
        var json = "jsonobj={\"action\":\"LISTHISTORY\",\"object\":\"lead\",\"leadId\":\"" + leadId + "\"}";
        var reqHeader = {
            "Content-Type": "application/x-www-form-urlencoded"
        };
        var reqJson = AjxStringUtil.urlEncode(json);
        var responseMailHistory = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
        var msgArray = [];
        var item;
        var msgArray = (responseMailHistory.text).split(",");

        if (msgArray != "null") {
            biz_vnc_crm_client.requestMailList(msgArray);
        } else {
            biz_vnc_crm_client.mailData = "[{'mailId':'','date':'','from':'','subject':'','message':''}]";
        }
        Ext.getCmp('leadMailGrid').getStore().loadData(jsonParse(biz_vnc_crm_client.mailData), false);
        Ext.getCmp('leadMailGrid').getView().refresh();

    } else if (biz_vnc_crm_client.flag == 1) {
        var leadId = biz_vnc_crm_client.leadId;
        var json = "jsonobj={\"action\":\"LISTHISTORY\",\"object\":\"opp\",\"leadId\":\"" + leadId + "\"}";
        var reqHeader = {
            "Content-Type": "application/x-www-form-urlencoded"
        };
        var reqJson = AjxStringUtil.urlEncode(json);
        var responseMailHistory = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
        var msgArray = [];
        var item;
        var msgArray = (responseMailHistory.text).split(",");

        if (msgArray != "null") {
            biz_vnc_crm_client.requestMailList(msgArray);
        } else {
            biz_vnc_crm_client.mailData = "[{'mailId':'','date':'','from':'','subject':'','message':''}]";
        }
        Ext.getCmp('oppMailGrid').getStore().loadData(jsonParse(biz_vnc_crm_client.mailData), false);
        Ext.getCmp('oppMailGrid').getView().refresh();
    }

};

biz_vnc_crm_client.okAppointmentAttach = function () {

    var array = [];
    if (0 == this.attachApptTabPage.getSelectedCounts()) {
        appCtxt.setStatusMsg(biz_vnc_crm_client.select_atleast_one_record_msg);
        return;
    }
    var records = this.attachApptTabPage.getSelectedRecords();
    for (var i = 0; i < this.attachApptTabPage.getSelectedCounts(); i++) {
        array.push(records[i].itemid);
    }
    var json = "jsonobj={\"action\":\"CALHISTORY\",\"object\":\"opp\",\"array\":\"" + array + "\",\"leadId\":\"" + biz_vnc_crm_client.leadId + "\"}";
    var reqHeader = {
        "Content-Type": "application/x-www-form-urlencoded"
    };
    var reqJson = AjxStringUtil.urlEncode(json);
    var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
    if (response.text == 1) {
        Ext.example.msg('', biz_vnc_crm_client.msgApptAttach);
    } else {
        Ext.example.msg('', biz_vnc_crm_client.msgApptNotAttach);
    }
    if (1 == response.text) {
        this.attachApptDialog.popdown();
        if (biz_vnc_crm_client.flag == 0) {
            var leadId = biz_vnc_crm_client.leadId;
            var json = "jsonobj={\"action\":\"LISTAPPTHISTORY\",\"object\":\"lead\",\"leadId\":\"" + leadId + "\"}";
            var reqHeader = {
                "Content-Type": "application/x-www-form-urlencoded"
            };
            var reqJson = AjxStringUtil.urlEncode(json);
            var responseMailHistory = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
            var msgArray = [];
            var item;
            var msgArray = (responseMailHistory.text).split(",");
            if (msgArray != "null") {
                biz_vnc_crm_client.requestApptList(msgArray);
            } else {
                biz_vnc_crm_client.apptData = "[{'subject':'','location1':'','calendar':'','startdate':''}]";
            }
            Ext.getCmp('leadApptGrid').getStore().loadData(jsonParse(biz_vnc_crm_client.apptData), false);
            Ext.getCmp('leadApptGrid').getView().refresh();

        } else if (biz_vnc_crm_client.flag == 1) {
            var leadId = biz_vnc_crm_client.leadId;
            var json = "jsonobj={\"action\":\"LISTAPPTHISTORY\",\"object\":\"opp\",\"leadId\":\"" + leadId + "\"}";
            var reqHeader = {
                "Content-Type": "application/x-www-form-urlencoded"
            };
            var reqJson = AjxStringUtil.urlEncode(json);
            var responseMailHistory = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
            var msgArray = [];
            var item;
            var msgArray = (responseMailHistory.text).split(",");
            if (msgArray != "null") {
                biz_vnc_crm_client.requestApptList(msgArray);
            } else {
                biz_vnc_crm_client.apptData = "[{'subject':'','location1':'','calendar':'','startdate':''}]";
            }
            Ext.getCmp('oppApptGrid').getStore().loadData(jsonParse(biz_vnc_crm_client.apptData), false);
            Ext.getCmp('oppApptGrid').getView().refresh();
        }
    }
};
biz_vnc_crm_client.getContacts = function (offset, contactList, rec) {
    contactBook = "Contacts";
    if (contactBook == null) {
        return;
    }
    var jsonObj = {
        SearchRequest: {
            _jsns: "urn:zimbraMail"
        }
    };
    var request = jsonObj.SearchRequest;
    request.sortBy = ZmSearch.NAME_ASC;
    ZmTimezone.set(request, AjxTimezone.DEFAULT);
    request.locale = {
        _content: AjxEnv.DEFAULT_LOCALE
    };
    request.offset = 0;
    request.types = ZmSearch.TYPE[ZmItem.CONTACT];
    request.query = "in:\"" + contactBook + "\"";
    request.offset = offset;
    request.limit = 500;
    contactList = contactList || [];
    var searchParams = {
        jsonObj: jsonObj,
        asyncMode: true,
        callback: new AjxCallback(this, this.handleGetContactsResponse, [contactList, rec]),
        errorCallback: new AjxCallback(this, this.handleGetContactsError)
    };

    appCtxt.getAppController().sendRequest(searchParams);
};
biz_vnc_crm_client.handleGetContactsResponse = function (contactList, rec, result) {

    if (result) {
        biz_vnc_crm_client.contactList = [];
        var response = result.getResponse().SearchResponse;
        var responseContactList = response[ZmList.NODE[ZmItem.CONTACT]];
        if (responseContactList) {
            var numContacts = responseContactList.length;
            var contarry = [];
            for (var i = 0; i < numContacts; i++) {
                biz_vnc_crm_client.contactList.push(responseContactList[i]);
            }
            biz_vnc_crm_client.temp = "[";
            for (var i = 0; i < biz_vnc_crm_client.contactList.length; i++) {
                var contact = biz_vnc_crm_client.contactList[i];
                if (i == biz_vnc_crm_client.contactList.length - 1) {
                    biz_vnc_crm_client.temp += "{\"value\":\"" + contact.id + "\",\"label\":\"" + ZmLeadListView.CheckField(contact._attrs.company, "<< Blank >>") + "\"}]";
                } else {
                    biz_vnc_crm_client.temp += "{\"value\":\"" + contact.id + "\",\"label\":\"" + ZmLeadListView.CheckField(contact._attrs.company, "<< Blank >>") + "\"},";
                }
            }
        } else {
            biz_vnc_crm_client.temp = "[{'value':'','label':''}]";
        }
        if (rec == null) {} else {}

        if (response.more) {
            this.getContacts(response.offset + 500, biz_vnc_crm_client.contactList);
        } else {}
    }
};


biz_vnc_crm_client.initLeadGrid = function (app) {
    biz_vnc_crm_client.apptData = "[{'subject':'','location1':'','calendar':'','startdate':''}]";
    if (biz_vnc_crm_client.mailData == "") {
        biz_vnc_crm_client.mailData = "[{'date':'','from':'','subject':'','message':''}]";
    }
    var content = AjxTemplate.expand("biz_vnc_crm_client.templates.Simple#MainLead");
    app.setContent(content);
    var toolbar = app.getToolbar();
    toolbar.setVisibility(true);
    biz_vnc_crm_client._flag = 0;
    Ext.require(['Ext.tab.*', 'Ext.window.*', 'Ext.tip.*', 'Ext.layout.container.Border', 'Ext.window.MessageBox', 'Ext.grid.*', 'Ext.data.*', 'Ext.util.*', 'Ext.state.*', 'Ext.form.*', 'Ext.layout.container.Column', 'Ext.tab.Panel', 'Ext.panel.*', 'Ext.toolbar.*', 'Ext.button.*', 'Ext.container.ButtonGroup', 'Ext.layout.container.Table', 'Ext.selection.CheckboxModel', 'Ext.window.MessageBox', 'Ext.tip.*', 'Ext.layout.container.Border']);
    Ext.MessageBox.buttonText.yes = biz_vnc_crm_client.btnYes;
    Ext.MessageBox.buttonText.no = biz_vnc_crm_client.btnNo;

    var toolbar = app.getToolbar();
    var arrOfEle = toolbar.getChildren();
    var idArray = [];
    for (var i = 0; i < 3; i++) {
        if (arrOfEle[i].isToggled()) {
            var str = "'" + arrOfEle[i].getHTMLElId() + "'";
            idArray.push(str);
        }
    }

    var json = "jsonobj={\"action\":\"FILTER\",\"object\":\"lead\",\"array\":\"" + idArray + "\"}";


    var reqHeader = {
        "Content-Type": "application/x-www-form-urlencoded"
    };
    var reqJson = AjxStringUtil.urlEncode(json);
    var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
    Ext.define('model_1', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'leadId',
            type: 'int'
        }, {
            name: 'subjectName',
            type: 'string'
        }, {
            name: 'leadDescription',
            type: 'string'
        }, {
            name: 'contactName',
            type: 'string'
        }, {
            name: 'companyName',
            mapping: 'companyBean.companyName',
            type: 'string'
        }, {
            name: 'companyId',
            mapping: 'companyBean.companyId',
            type: 'int'
        }, {
            name: 'valuation',
            type: 'string'
        }, {
            name: 'leadState',
            type: 'string'
        }, {
            name: 'leadClassName',
            mapping: 'leadClassBean.leadClassName',
            type: 'string'
        }, {
            name: 'leadClassId',
            mapping: 'leadClassBean.leadClassId',
            type: 'int'
        }, {
            name: 'phone',
            type: 'string'
        }, {
            name: 'fax',
            type: 'string'
        }, {
            name: 'partnerName',
            type: 'string'
        }, {
            name: 'email',
            type: 'string'
        }, {
            name: 'workPhone',
            type: 'string'
        }, {
            name: 'mobile',
            type: 'string'
        }, {
            name: 'street1',
            type: 'string'
        }, {
            name: 'street2',
            type: 'string'
        }, {
            name: 'city',
            type: 'string'
        }, {
            name: 'zip',
            type: 'string'
        }, {
            name: 'stateName',
            mapping: 'stateBean.stateName',
            type: 'string'
        }, {
            name: 'stateId',
            mapping: 'stateBean.stateId',
            type: 'int'
        }, {
            name: 'countryName',
            mapping: 'countryBean.countryName',
            type: 'string'
        }, {
            name: 'countryId',
            mapping: 'countryBean.countryId',
            type: 'int'
        }, {
            name: 'type',
            type: 'string'
        }, {
            name: 'dateOpen',
            type: 'string'
        }, {
            name: 'dateClose',
            type: 'string'
        }, {
            name: 'expectedDateClose',
            type: 'string'
        }, {
            name: 'stageName',
            mapping: 'stageBean.stageName',
            type: 'string'
        }, {
            name: 'stageId',
            mapping: 'stageBean.stageId',
            type: 'int'
        }, {
            name: 'stageProbability',
            mapping: 'stageBean.stageProbability',
            type: 'float'
        }, {
            name: 'probability',
            type: 'float'
        }, {
            name: 'channelName',
            mapping: 'channelBean.channelName',
            type: 'string'
        }, {
            name: 'channelId',
            mapping: 'channelBean.channelId',
            type: 'int'
        }, {
            name: 'sectionId',
            mapping: 'sectionBean.sectionId',
            type: 'int'
        }, {
            name: 'sectionName',
            mapping: 'sectionBean.sectionName',
            type: 'string'
        }, {
            name: 'categoryName',
            mapping: 'categoryBean.categoryName',
            type: 'string'
        }, {
            name: 'categoryId',
            mapping: 'categoryBean.categoryId',
            type: 'int'
        }, {
            name: 'dayClose',
            type: 'float'
        }, {
            name: 'dayOpen',
            type: 'float'
        }, {
            name: 'referredBy',
            type: 'string'
        }, {
            name: 'userId',
            type: 'string'
        }, {
            name: 'priorityId',
            mapping: 'priorityBean.priorityId',
            type: 'int'
        }, {
            name: 'priorityName',
            mapping: 'priorityBean.priorityName',
            type: 'string'
        }, {
            name: 'nextActionDate',
            type: 'string'
        }, {
            name: 'nextAction',
            type: 'string'
        }, {
            name: 'status',
            type: 'bool'
        }, {
            name: 'createBy',
            type: 'string'
        }, {
            name: 'createDate',
            type: 'string'
        }, {
            name: 'writeBy',
            type: 'string'
        }, {
            name: 'writeDate',
            type: 'string'
        }]

    });
    var sm = Ext.create('Ext.selection.CheckboxModel', {
        listeners: {


            selectionchange: function (sm, selections) {

                if (selections.length == 1) {
                    Ext.getCmp('btnEditLead').enable();
                } else {
                    Ext.getCmp('btnEditLead').disable();
                }
                if (selections.length > 0) {
                    Ext.getCmp('btnDeleteLead').enable();
                } else {
                    Ext.getCmp('btnEditLead').disable();
                    Ext.getCmp('btnDeleteLead').disable();
                }
            }
        }
    });
    Ext.define('leadApptModel', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'appointmentId',
            type: 'string'
        }, {
            name: 'subject',
            type: 'string'
        }, {
            name: 'location1',
            type: 'string'
        }, {
            name: 'status',
            type: 'string'
        }, {
            name: 'calendar',
            type: 'string'
        }, {
            name: 'startdate',
            type: 'string'
        }]
    });

    var leadSMAppt = Ext.create('Ext.selection.CheckboxModel', {
        listeners: {
            selectionchange: function (leadSMAppt, selections) {}
        }
    });
    var leadTaskListData = "[{'subject':'','status':'','complete':'','dueDate':''}]";
    var smleadTask = Ext.create('Ext.selection.CheckboxModel', {
        listeners: {
            selectionchange: function (smleadTask, selections) {}
        }
    });
    var json, responsePriority, responseCategory, responseStage, responseChannel, responseState, responseCountry, responseSection, responseUser, responseCompany;
    var reqHeader = {
        "Content-Type": "application/x-www-form-urlencoded"
    };
    var reqJson;
    Ext.define('priority', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'priorityId',
            type: 'int'
        }, {
            name: 'priorityName',
            type: 'string'
        }]
    });

    Ext.define('category', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'categoryId',
            type: 'int'
        }, {
            name: 'categoryName',
            type: 'string'
        }]
    });

    Ext.define('stage', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'stageId',
            type: 'int'
        }, {
            name: 'stageName',
            type: 'string'
        }, {
            name: 'stageState',
            type: 'string'
        }]
    });

    Ext.define('channel', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'channelId',
            type: 'int'
        }, {
            name: 'channelName',
            type: 'string'
        }]
    });

    Ext.define('state', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'stateId',
            type: 'int'
        }, {
            name: 'stateName',
            type: 'string'
        }]
    });

    Ext.define('country', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'countryId',
            type: 'int'
        }, {
            name: 'countryName',
            type: 'string'
        }]
    });

    Ext.define('company', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'companyId',
            type: 'int'
        }, {
            name: 'companyName',
            type: 'string'
        }]
    });

    Ext.define('section', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'sectionId',
            type: 'int'
        }, {
            name: 'sectionName',
            type: 'string'
        }]
    });

    Ext.define('leadClass', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'leadClassId',
            type: 'int'
        }, {
            name: 'leadClassName',
            type: 'string'
        }]
    });

    Ext.define('user', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'value',
            type: 'string'
        }, {
            name: 'label',
            type: 'string'
        }]
    });

    function onEnter(elem, e) {
        if (e.getKey() === e.ENTER) {}
    }

    //**********************************************************************************************************

    Ext.define('leadMailModel', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'mailId',
            type: 'string'
        }, {
            name: 'date',
            type: 'string'
        }, {
            name: 'from',
            type: 'string'
        }, {
            name: 'subject',
            type: 'string'
        }, {
            name: 'message',
            type: 'string'
        }]
    });

    var leadSMMail = Ext.create('Ext.selection.CheckboxModel', {
        listeners: {
            selectionchange: function (leadSMMail, selections) {}
        }
    });

    Ext.define('leadTaskModel', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'taskId',
            type: 'string'
        }, {
            name: 'subject',
            type: 'string'
        }, {
            name: 'status',
            type: 'string'
        }, {
            name: 'complete',
            type: 'string'
        }, {
            name: 'dueDate',
            type: 'date'
        }

        ]
    });
    var leadSMTask = Ext.create('Ext.selection.CheckboxModel', {
        listeners: {


            selectionchange: function (leadSMTask, selections) {}
        }
    });

    Ext.define('contact1', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'value',
            type: 'string'
        }, {
            name: 'label',
            type: 'string'
        }]
    });

    var LeadFooterPanel = Ext.create('Ext.form.Panel', {
        title: null,
        id: 'formLead',
        bodyStyle: 'padding:5px',
        width: '100%',
        height: '100%',
        fieldDefaults: {
            msgTarget: 'side'
        },
        defaults: {
            anchor: '100%',
            background: '#DADADA'
        },

        items: [{
            layout: 'column',
            border: false,
            defaults: {
                anchor: '100%',
                background: '#DADADA'
            },
            items: [{
                columnWidth: .25,
                border: false,
                layout: 'anchor',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: biz_vnc_crm_client.subject,
                    id: 'txtleadsubjectName',
                    allowBlank: false,
                    tabIndex: 1,
                    anchor: '95%'
                }, {
                    xtype: 'combo',
                    mode: 'local',
                    value: 'section',
                    triggerAction: 'all',
                    forceSelection: true,
                    tabIndex: 2,
                    fieldLabel: biz_vnc_crm_client.section,
                    id: 'cmbsection',
                    name: 'title',
                    displayField: 'sectionName',
                    valueField: 'sectionId',
                    queryMode: 'local',
                    store: Ext.create('Ext.data.Store', {
                        model: 'section',
                        proxy: {
                            type: 'memory',
                            data: jsonParse(biz_vnc_crm_client.responseSection.text)
                        },
                        autoLoad: true,
                        actionMethods: {
                            read: 'POST'
                        }
                    }),
                    listeners: {
                        change: function (combo, ewVal, oldVal) {}
                    },
                    anchor: '95%'
                }, {
                    xtype: 'combo',
                    mode: 'local',
                    value: 'leadClass',
                    triggerAction: 'all',
                    forceSelection: true,
                    tabIndex: 2,
                    fieldLabel: biz_vnc_crm_client.leadClass,
                    id: 'cmbleadClass',
                    name: 'title',
                    displayField: 'leadClassName',
                    valueField: 'leadClassId',
                    queryMode: 'local',
                    store: Ext.create('Ext.data.Store', {
                        model: 'leadClass',
                        proxy: {
                            type: 'memory',
                            data: jsonParse(biz_vnc_crm_client.responseLeadClass.text)
                        },
                        autoLoad: true,
                        actionMethods: {
                            read: 'POST'
                        }
                    }),
                    listeners: {
                        change: function (combo, ewVal, oldVal) {}
                    },
                    anchor: '95%'
                }]
            }, {
                columnWidth: .25,
                border: false,
                layout: 'anchor',
                items: [{
                    xtype: 'combo',
                    mode: 'local',
                    value: 'priority',
                    triggerAction: 'all',
                    forceSelection: true,
                    fieldLabel: biz_vnc_crm_client.priority,
                    tabIndex: 3,
                    id: 'cmbpriority',
                    name: 'title',
                    displayField: 'priorityName',
                    valueField: 'priorityId',
                    queryMode: 'local',
                    autoSelect: true,
                    store: Ext.create('Ext.data.Store', {
                        model: 'priority',
                        proxy: {
                            type: 'memory',
                            data: jsonParse(biz_vnc_crm_client.responsePriority.text)
                        },
                        autoLoad: true,
                        actionMethods: {
                            read: 'POST'
                        }
                    }),
                    anchor: '95%'
                }, {
                    xtype: 'combo',
                    mode: 'local',
                    value: 'stage',
                    triggerAction: 'all',
                    forceSelection: true,
                    fieldLabel: biz_vnc_crm_client.stage,
                    id: 'cmbstage',
                    name: 'title',
                    displayField: 'stageName',
                    valueField: 'stageId',
                    queryMode: 'local',
                    store: Ext.create('Ext.data.Store', {
                        model: 'stage',
                        proxy: {
                            type: 'memory',
                            data: jsonParse(biz_vnc_crm_client.responseStage.text)
                        },
                        autoLoad: true,
                        actionMethods: {
                            read: 'POST'
                        }
                    }),
                    listeners: {
                        change: function (combo, ewVal, oldVal) {
                            var oldState = Ext.getCmp('txtleadState').getValue();
                            var val = Ext.getCmp('cmbstage').getRawValue();
                            var rec1 = Ext.getCmp('cmbstage').getStore().findRecord("stageName", val);
                            if (rec1 != null) {
                                Ext.getCmp('txtleadState').setValue(rec1.get('stageState'));

                            }
                            var dateOpen = Ext.getCmp('dateopened').getValue();
                            var state = Ext.getCmp('txtleadState').getValue();

                            if (dateOpen == null && state != "New") {
                                Ext.getCmp('dateopened').setValue(new Date());
                                if (state == "Close") {
                                    Ext.getCmp('dateopened').setValue(new Date());
                                    Ext.getCmp('dateclosed').setValue(new Date());
                                }
                            } else if (dateOpen != null && state == "Close") {
                                Ext.getCmp('dateclosed').setValue(new Date());
                            }
                            if (oldState == "Close" && state != "Close") {
                                Ext.getCmp('dateopened').setValue(new Date());
                                Ext.getCmp('dateclosed').setValue('');
                            }
                            if (Ext.getCmp('dateopened').getValue() != null) {
                                var dayopen = Math.ceil(((new Date().getTime()) - (Ext.getCmp('dateopened').getValue())) / (1000 * 60 * 60 * 24));
                                Ext.getCmp('txtleadday2open').setValue(dayopen);
                            } else { 
                                Ext.getCmp('txtleadday2open').setValue(0);
                            }
                            if (Ext.getCmp('dateclosed').getValue() != null) {
                                var dayclose = Math.ceil(((Ext.getCmp('dateclosed').getValue()) - (Ext.getCmp('dateopened').getValue())) / (1000 * 60 * 60 * 24));
                                Ext.getCmp('txtleadday2close').setValue(dayclose);
                            } else { 
                                Ext.getCmp('txtleadday2close').setValue(0);
                            }
                        }
                    },
                    anchor: '95%'
                }, {
                    xtype: 'textfield',
                    id: 'txtleadState',
                    fieldLabel: biz_vnc_crm_client.leadState,
                    value: 'New',
                    disabled: true
                }]
            }, {
                columnWidth: .25,
                border: false,
                layout: 'anchor',
                defaultType: 'textfield',

                items: [{
                    xtype: 'combo',
                    mode: 'local',
                    value: 'category',
                    triggerAction: 'all',
                    forceSelection: true,
                    fieldLabel: biz_vnc_crm_client.category,
                    id: 'cmbcategory',
                    name: 'title',
                    displayField: 'categoryName',
                    valueField: 'categoryId',
                    queryMode: 'local',
                    store: Ext.create('Ext.data.Store', {
                        model: 'category',
                        proxy: {
                            type: 'memory',
                            data: jsonParse(biz_vnc_crm_client.responseCategory.text)
                        },
                        autoLoad: true,
                        actionMethods: {
                            read: 'POST'
                        }
                    }),
                    anchor: '95%'
                }, {
                    xtype: 'combo',
                    mode: 'local',
                    value: 'salesman',
                    triggerAction: 'all',
                    forceSelection: true,
                    fieldLabel: biz_vnc_crm_client.salesman,
                    id: 'cmbsalesman',
                    name: 'title',
                    displayField: 'label',
                    valueField: 'value',
                    queryMode: 'local',
                    store: Ext.create('Ext.data.Store', {
                        model: 'user',
                        proxy: {
                            type: 'memory',
                            data: jsonParse(biz_vnc_crm_client.responseUser.text)
                        },
                        autoLoad: true,
                        actionMethods: {
                            read: 'POST'
                        }
                    }),
                    queryMode: 'local',
                    listConfig: {
                        getInnerTpl: function () {
                            return '<div data-qtip="{label}. {name}">{label}</div>';
                        }
                    },
                    anchor: '95%'
                }]
            }, {
                columnWidth: .25,
                border: false,
                layout: 'anchor',
                defaultType: 'textfield',

                items: [{
                    xtype: 'button',
                    text: biz_vnc_crm_client.btnLeadToOpp,
                    disabled: true,
                    id: 'btnConvertToOpp',
                    width: 250,
                    height: 25,
                    iconCls: 'convert',
                    anchor: '95%',
                    handler: function () {
                        var json = "jsonobj={\"action\":\"COUNT\",\"object\":\"opp\"}";
                        var reqHeader = {
                            "Content-Type": "application/x-www-form-urlencoded"
                        };
                        var reqJson = AjxStringUtil.urlEncode(json);
                        var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

                        if (response.text == 2){
                            Ext.Msg.alert(biz_vnc_crm_client.notification, biz_vnc_crm_client.usageLimitMessage);
                            return;
                        }

                        if (Ext.getCmp('txtleadsubjectName').getValue() == "") {
                            Ext.getCmp('txtleadsubjectName').validate(false);
                            Ext.getCmp('txtleadsubjectName').focus(true);
                            Ext.example.msg('', biz_vnc_crm_client.msgEmptyField);
                        } else {
                            var subjectName = Ext.getCmp('txtleadsubjectName').getValue();
                            var leadDescription = Ext.getCmp('txtleadleadDescription').getValue();
                            var contactName = Ext.getCmp('txtleadcontactName').getValue();
                            var phone = Ext.getCmp('txtleadphone').getValue();
                            var fax = Ext.getCmp('txtleadfax').getValue();
                            var email = Ext.getCmp('txtleademail').getValue();
                            var workPhone = Ext.getCmp('txtleadworkPhone').getValue();
                            var mobile = Ext.getCmp('txtleadmobile').getValue();
                            var street1 = Ext.getCmp('txtleadstreet1').getValue();
                            var street2 = Ext.getCmp('txtleadstreet2').getValue();
                            var city = Ext.getCmp('txtleadcity').getValue();
                            var zip = Ext.getCmp('txtleadzip').getValue();
                            var stateId = Ext.getCmp('cmbstate').getValue();
                            var countryId = Ext.getCmp('cmbcountry').getValue();
                            var type = 1;
                            var dateOpen = Ext.getCmp('dateopened').getSubmitValue();
                            if (dateOpen == '') {
                                dateOpen = '0000-00-00 00:00:00';
                            }


                            var dateClose = Ext.getCmp('dateclosed').getSubmitValue();
                            if (dateClose == '') {
                                dateClose = '0000-00-00 00:00:00';
                            }
                            var expectedDateClose = Ext.getCmp('dateupdatedate').getSubmitValue();
                            if (expectedDateClose == '') {
                                expectedDateClose = '0000-00-00 00:00:00';
                            }
                            var stageId = Ext.getCmp('cmbstage').getValue();
                            var channelId = Ext.getCmp('cmbchannel').getValue();
                            var leadClassId = Ext.getCmp('cmbleadClass').getValue();
                            var sectionId = Ext.getCmp('cmbsection').getValue();
                            var categoryId = Ext.getCmp('cmbcategory').getValue();
                            var partnerName = Ext.getCmp('cmbpartner').getValue();
                            var dayopen = Ext.getCmp('txtleadday2open').getValue();
                            var dayclose = Ext.getCmp('txtleadday2close').getValue();
                            var referredBy = Ext.getCmp('txtleadreferredby').getValue();
                            var userId = Ext.getCmp('cmbsalesman').getValue();
                            if (userId == null) {
                                userId = appCtxt.getUsername();
                            }
                            var priorityId = Ext.getCmp('cmbpriority').getValue();
                            var nextActionDate = '0000-00-00 00:00:00';
                            var nextAction = "";
                            var status = true;
                            var createBy = appCtxt.getUsername();
                            var createDate = Ext.getCmp('datecreationdate').getSubmitValue();
                            if (createDate == '') {
                                createDate = '0000-00-00 00:00:00';
                            }
                            var writeBy = appCtxt.getUsername();
                            var writeDate = Ext.getCmp('dateupdatedate').getSubmitValue();
                            if (writeDate == '') {
                                writeDate = '0000-00-00 00:00:00';
                            }
                            var valuation = "000";
                            var companyId = Ext.getCmp('cmbcompanyName').getValue();
                            var leadState = Ext.getCmp('txtleadState').getValue();
                            var probability = 0;

                            var leadId = biz_vnc_crm_client.leadId;
                            var j = JSON.stringify({
                                action: "UPDATE",
                                object: "lead",
                                leadId: leadId,
                                subjectName: subjectName,
                                stageId: stageId,
                                priorityId: priorityId,
                                channelId: channelId,
                                categoryId: categoryId,
                                contactName: contactName,
                                email: email,
                                street1: street1,
                                city: city,
                                stateId: stateId,
                                countryId: countryId,
                                type: type,
                                writeDate: writeDate,
                                writeBy: writeBy,
                                createDate: createDate,
                                createBy: createBy,
                                status: status,
                                nextAction: nextAction,
                                nextActionDate: nextActionDate,
                                userId: userId,
                                referredBy: referredBy,
                                dayClose: dayclose,
                                dayOpen: dayopen,
                                sectionId: sectionId,
                                expectedDateClose: expectedDateClose,
                                dateClose: dateClose,
                                dateOpen: dateOpen,
                                zip: zip,
                                street2: street2,
                                mobile: mobile,
                                workPhone: workPhone,
                                fax: fax,
                                phone: phone,
                                leadDescription: leadDescription,
                                valuation: valuation,
                                companyId: companyId,
                                leadState: leadState,
                                leadClassId: leadClassId,
                                probability: probability,
                                partnerName: partnerName
                            });
                            var json = "jsonobj=" + j;
                            var reqHeader = {
                                "Content-Type": "application/x-www-form-urlencoded"
                            };
                            var reqJson = AjxStringUtil.urlEncode(json);
                            var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

                            Ext.example.msg('', biz_vnc_crm_client.msgLeadToOpp);
                            var rec = Ext.getCmp('leadGrid').getSelectionModel().getSelection();
                            Ext.each(rec, function (item) {
                                rec = item;
                            });
                            var content = AjxTemplate.expand("biz_vnc_crm_client.templates.OpportunityForm#OpportunityFormMain");
                            app.setContent(content);
                            ZmOpportunityListView.prototype.getContacts(0, [], rec, app);
                        }
                    }
                }]
            }]
        }, {
            xtype: 'tabpanel',
            id: 'leadTabPanel',
            plain: true,
            activeTab: 0,
            height: '80%',
            layoutOnTabChange: true,
            defaults: {
                bodyStyle: 'padding:10px',
                background: '#DADADA'
            },
            items: [{
                title: biz_vnc_crm_client.tabContactInfo,
                height: 220,
                layout: 'column',
                items: [{
                    columnWidth: .32,
                    border: false,
                    layout: 'anchor',
                    border: false,
                    items: [{
                        xtype: 'combo',
                        mode: 'local',
                        value: 'Partner',
                        triggerAction: 'all',
                        forceSelection: true,
                        fieldLabel: biz_vnc_crm_client.partner,
                        id: 'cmbpartner',
                        name: 'title',
                        displayField: 'label',
                        valueField: 'value',
                        queryMode: 'local',
                        store: Ext.create('Ext.data.Store', {
                            model: 'contact1',
                            proxy: {
                                type: 'memory',
                                data: jsonParse(biz_vnc_crm_client.temp)
                            },
                            autoLoad: true,
                            actionMethods: {
                                read: 'POST'
                            }
                        }),
                        listeners: {
                            change: function (combo, ewVal, oldVal) {
                                var selname = Ext.getCmp('cmbpartner').getValue();
                                for (var i = 0; i < biz_vnc_crm_client.contactList.length; i++) {
                                    if (biz_vnc_crm_client.contactList[i].id == selname) {
                                        var contactName = ZmLeadListView.CheckField(biz_vnc_crm_client.contactList[i]._attrs.firstName) + " " + ZmLeadListView.CheckField(biz_vnc_crm_client.contactList[i]._attrs.lastName);
                                        var workState = biz_vnc_crm_client.contactList[i]._attrs.workState;
                                        var workCountry = biz_vnc_crm_client.contactList[i]._attrs.workCountry;
                                        var state = Ext.getCmp('cmbstate').getStore().findRecord("stateName", workState);
                                        var country = Ext.getCmp('cmbcountry').getStore().findRecord("countryName", workCountry);
                                        if (state != null)
                                        {
                                            Ext.getCmp('cmbstate').getStore().load({
                                                callback: function () {
                                                    Ext.getCmp('cmbstate').setValue(state.data.stateId);
                                                }
                                            });
                                        } else {
                                            Ext.getCmp('cmbstate').setValue();
                                        }
                                        if (country != null)
                                        {
                                            Ext.getCmp('cmbcountry').getStore().load({
                                                callback: function () {
                                                    Ext.getCmp('cmbcountry').setValue(country.data.countryId);
                                                }
                                            });
                                        } else {
                                            Ext.getCmp('cmbcountry').setValue();
                                        }

                                        Ext.getCmp('txtleadmobile').setValue(ZmLeadListView.CheckField(biz_vnc_crm_client.contactList[i]._attrs.mobilePhone));
                                        Ext.getCmp('txtleadcontactName').setValue(contactName);
                                        Ext.getCmp('txtleadzip').setValue(ZmLeadListView.CheckField(biz_vnc_crm_client.contactList[i]._attrs.workPostalCode));
                                        Ext.getCmp('txtleademail').setValue(ZmLeadListView.CheckField(biz_vnc_crm_client.contactList[i]._attrs.email));
                                        Ext.getCmp('txtleadstreet1').setValue(ZmLeadListView.CheckField(biz_vnc_crm_client.contactList[i]._attrs.workStreet));
                                        Ext.getCmp('txtleadcity').setValue(ZmLeadListView.CheckField(biz_vnc_crm_client.contactList[i]._attrs.workCity));
                                        Ext.getCmp('txtleadphone').setValue(ZmLeadListView.CheckField(biz_vnc_crm_client.contactList[i]._attrs.mobilePhone2));
                                        Ext.getCmp('txtleadfax').setValue(ZmLeadListView.CheckField(biz_vnc_crm_client.contactList[i]._attrs.workFax));
                                    }
                                }

                            }
                        },
                        anchor: '100%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: biz_vnc_crm_client.contactName,
                        id: 'txtleadcontactName',
                        anchor: '100%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: biz_vnc_crm_client.email,
                        id: 'txtleademail',
                        vtype: 'email',
                        anchor: '100%'
                    }, {
                        xtype: 'textareafield',
                        grow: false,
                        fieldLabel: biz_vnc_crm_client.description,
                        id: 'txtleadleadDescription',
                        anchor: '100%'
                    }]

                }, {
                    columnWidth: .04,
                    border: false,
                    layout: 'anchor',
                    items: [{

                        xtype: 'button',
                        text: null,
                        disabled: true,
                        id: 'btnLeadAddContact',
                        height: 25,
                        iconCls: 'add_contact',
                        anchor: '40%',
                        handler: function () {
                            biz_vnc_crm_client.contactFlag = 0;
                            var contact = new ZmContact(null, null, null);
                            var contactApp = appCtxt.getApp(ZmApp.CONTACTS);
                            var contactController = new ZmContactController(contactApp._container, contactApp);
                            contactController.show(contact);
                            contactController.getCurrentToolbar().getButton(ZmOperation.SAVE).removeSelectionListeners();
                            contactController.getCurrentToolbar().addSelectionListener(ZmOperation.CANCEL, new AjxListener(this, ZmLeadListView._myCancelListener, [app]));
                            contactController.getCurrentToolbar().addSelectionListener(ZmOperation.SAVE, new AjxListener(this, ZmLeadListView._mySaveListener, [app]));

                        }
                    }]
                }, {
                    columnWidth: .32,
                    border: false,
                    layout: 'anchor',

                    items: [{
                        xtype: 'textfield',
                        fieldLabel: biz_vnc_crm_client.street1,
                        id: 'txtleadstreet1',
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: biz_vnc_crm_client.street2,
                        id: 'txtleadstreet2',
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: biz_vnc_crm_client.city,
                        id: 'txtleadcity',
                        anchor: '95%'
                    }, {
                        xtype: 'combo',
                        mode: 'local',
                        value: 'state',
                        triggerAction: 'all',
                        forceSelection: true,
                        fieldLabel: biz_vnc_crm_client.state,
                        id: 'cmbstate',
                        name: 'title',
                        displayField: 'stateName',
                        valueField: 'stateId',
                        queryMode: 'local',
                        autoSelect: true,
                        store: Ext.create('Ext.data.Store', {
                            model: 'state',
                            proxy: {
                                type: 'memory',
                                data: jsonParse(biz_vnc_crm_client.responseState.text)
                            },
                            autoLoad: true,
                            actionMethods: {
                                read: 'POST'
                            }

                        }),
                        anchor: '95%'
                    }, {
                        xtype: 'combo',
                        mode: 'local',
                        value: 'country',
                        triggerAction: 'all',
                        forceSelection: true,
                        fieldLabel: biz_vnc_crm_client.country,
                        id: 'cmbcountry',
                        name: 'title',
                        displayField: 'countryName',
                        valueField: 'countryId',
                        queryMode: 'local',
                        autoSelect: true,
                        store: Ext.create('Ext.data.Store', {
                            model: 'country',
                            proxy: {
                                type: 'memory',
                                data: jsonParse(biz_vnc_crm_client.responseCountry.text)
                            },
                            autoLoad: true,
                            actionMethods: {
                                read: 'POST'
                            }

                        }),
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: biz_vnc_crm_client.zipCode,
                        id: 'txtleadzip',
                        anchor: '95%'
                    }]
                }, {
                    columnWidth: .32,
                    border: false,
                    layout: 'anchor',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: biz_vnc_crm_client.phone,
                        id: 'txtleadphone',
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: biz_vnc_crm_client.workPhone,
                        id: 'txtleadworkPhone',
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: biz_vnc_crm_client.mobile,
                        id: 'txtleadmobile',
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: biz_vnc_crm_client.fax,
                        id: 'txtleadfax',
                        anchor: '95%'
                    }]
                }]

            }, {
                title: biz_vnc_crm_client.tabAppointment,
                id: 'leadAppointment',
                disabled: true,
                layout: 'column',
                width: '100%',
                height: 220,
                dockedItems: [{
                    xtype: 'toolbar',
                    items: [{
                        iconCls: 'attachment',
                        text: biz_vnc_crm_client.btnAttach,
                        handler: function () {
                            var leadId = biz_vnc_crm_client.leadId;
                            var flag = 0;
                            biz_vnc_crm_client_HandlerObject.prototype.showAttachAppointmentDialog(leadId, flag);
                        }
                    }, {
                        iconCls: 'cancel',
                        text: biz_vnc_crm_client.btnDelete,
                        itemId: 'delete',
                        handler: function () {
                            Ext.MessageBox.confirm(biz_vnc_crm_client.msgConfirmHeader, biz_vnc_crm_client.msgConfirm, showResult);

                            function showResult(btn) {
                                if (btn == "yes") {
                                    var rec1 = Ext.getCmp('leadApptGrid').getSelectionModel().getSelection();
                                    var idArray = [];
                                    Ext.each(rec1, function (item) {

                                        idArray.push("'" + item.data.appointmentId + "'");
                                    });
                                    var leadId = biz_vnc_crm_client.leadId;
                                    var json = "jsonobj={\"action\":\"DELETEAPPT\",\"object\":\"lead\",\"array\":\"" + idArray + "\",\"leadId\":\"" + leadId + "\"}";
                                    var reqHeader = {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    };
                                    var reqJson = AjxStringUtil.urlEncode(json);
                                    var responseUser = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                                    var json = "jsonobj={\"action\":\"LISTAPPTHISTORY\",\"object\":\"lead\",\"leadId\":\"" + leadId + "\"}";
                                    var reqHeader = {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    };
                                    var reqJson = AjxStringUtil.urlEncode(json);
                                    var responseMailHistory = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                                    var msgArray = [];
                                    var item;
                                    var msgArray = (responseMailHistory.text).split(",");
                                    if (msgArray != "null") {
                                        biz_vnc_crm_client.requestApptList(msgArray);
                                    } else {
                                        biz_vnc_crm_client.apptData = "[{'subject':'','location1':'','calendar':'','startdate':''}]";
                                    }
                                    Ext.getCmp('leadApptGrid').getStore().loadData(jsonParse(biz_vnc_crm_client.apptData), false);
                                    Ext.getCmp('leadApptGrid').getView().refresh();
                                }
                            };
                        }
                    }, {
                        iconCls: 'appointment',
                        text: biz_vnc_crm_client.btnNew,
                        itemId: 'newappoint',
                        handler: function () {
                            biz_vnc_crm_client.flag = 0;
                            new ZmCRMCalViewController(appCtxt.getApp(ZmApp.CALENDAR)).newAppointmentHelper(new Date(), null, 10, null);
                        }
                    }, {
                        iconCls: 'refresh',
                        text: biz_vnc_crm_client.btnRefresh,
                        itemId: 'refresh',
                        handler: function () {
                            var leadId = biz_vnc_crm_client.leadId;
                            var json = "jsonobj={\"action\":\"LISTAPPTHISTORY\",\"object\":\"lead\",\"leadId\":\"" + leadId + "\"}";
                            var reqHeader = {
                                "Content-Type": "application/x-www-form-urlencoded"
                            };
                            var reqJson = AjxStringUtil.urlEncode(json);
                            var responseMailHistory = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                            var msgArray = [];
                            var item;
                            var msgArray = (responseMailHistory.text).split(",");
                            if (msgArray != "null") {
                                biz_vnc_crm_client.requestApptList(msgArray);
                            } else {
                                biz_vnc_crm_client.apptData = "[{'subject':'','location1':'','calendar':'','startdate':''}]";
                            }
                            Ext.getCmp('leadApptGrid').getStore().loadData(jsonParse(biz_vnc_crm_client.apptData), false);
                            Ext.getCmp('leadApptGrid').getView().refresh();

                        }
                    }]
                }, {
                    xtype: 'grid',
                    selModel: leadSMAppt,
                    id: 'leadApptGrid',
                    height: 195,
                    defaults: {
                        autoRender: true,
                        autoScroll: true
                    },
                    store: Ext.create('Ext.data.Store', {
                        model: 'leadApptModel',
                        proxy: {
                            type: 'memory',
                            data: jsonParse(biz_vnc_crm_client.apptData)
                        },
                        autoLoad: true,
                        actionMethods: {
                            read: 'POST'
                        }
                    }),
                    columnLines: true,
                    columns: [{
                        text: biz_vnc_crm_client.subject,
                        sortable: false,
                        width: 400,
                        dataIndex: 'subject'
                    }, {
                        text: biz_vnc_crm_client.locations,
                        sortable: false,
                        width: 250,
                        dataIndex: 'location1'
                    }, {
                        text: biz_vnc_crm_client.calendar,
                        width: 100,
                        sortable: true,
                        dataIndex: 'calendar'
                    }, {
                        text: biz_vnc_crm_client.start_date,
                        sortable: false,
                        width: 200,
                        dataIndex: 'startdate',
                        renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                    }],
                    title: null,
                    viewConfig: {
                        stripeRows: true
                    },
                    listeners: {
                        el: {
                            dblclick: function(){
                                var rec = Ext.getCmp('leadApptGrid').getSelectionModel().selected;
                                var apptId = rec.items[0].data.appointmentId;
                                biz_vnc_crm_client.viewApptDetails(apptId);
                            }
                        }
                    }
                }]
            }, {
                title: biz_vnc_crm_client.tabTask,
                id: 'leadTask',
                disabled: true,
                layout: 'column',
                width: '100%',
                height: 220,
                defaults: {
                    autoRender: true,
                    autoScroll: true
                },
                dockedItems: [{
                    xtype: 'toolbar',
                    items: [{
                        iconCls: 'attachment',
                        text: biz_vnc_crm_client.btnAttach,
                        handler: function () {
                            var leadId = biz_vnc_crm_client.leadId;
                            var flag = 0;
                            biz_vnc_crm_client_HandlerObject.prototype.showAttachTaskDialog(leadId, flag);
                        }
                    }, {
                        iconCls: 'cancel',
                        text: biz_vnc_crm_client.btnDelete,
                        itemId: 'delete',
                        handler: function () {
                            Ext.MessageBox.confirm(biz_vnc_crm_client.msgConfirmHeader, biz_vnc_crm_client.msgConfirm, showResult);
                            function showResult(btn) {
                                if (btn == "yes") {
                                    var rec1 = Ext.getCmp('leadTaskGrid').getSelectionModel().getSelection();
                                    var idArray = [];
                                    Ext.each(rec1, function (item) {
                                        idArray.push("'" + item.data.taskId + "'");
                                    });
                                    var leadId = biz_vnc_crm_client.leadId;
                                    var json = "jsonobj={\"action\":\"DELETETASK\",\"object\":\"lead\",\"array\":\"" + idArray + "\",\"leadId\":\"" + leadId + "\"}";
                                    var reqHeader = {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    };
                                    var reqJson = AjxStringUtil.urlEncode(json);
                                    var responseUser = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

                                    var leadId = biz_vnc_crm_client.leadId;
                                    var json = "jsonobj={\"action\":\"listTask\",\"object\":\"lead\",\"leadId\":\"" + leadId + "\"}";
                                    var reqHeader = {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    };
                                    var reqJson = AjxStringUtil.urlEncode(json);
                                    var responseTaskList = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                                    var newtaskArray = (responseTaskList.text).split(",");
                                    var allTask = appCtxt.getTaskManager()._rawTasks;
                                    var taskArray = [];
                                    if (newtaskArray != null) {
                                        var k = 0;
                                        for (var i = 0; i < allTask.length; i++) {
                                            for (var j = 0; j < newtaskArray.length; j++) {
                                                if (allTask[i].invId == newtaskArray[j]) {
                                                    taskArray[k++] = newtaskArray[j];
                                                }
                                            }
                                        }
                                    }
                                    if (taskArray.length <= 0) {
                                        leadTaskListData = "[{'taskId':'','subject':'','status':'','complete':'','dueDate':''}]";
                                    } else {
                                        leadTaskListData = "[";
                                        var flag = 0;
                                        for (var i = 0; i < allTask.length; i++) {
                                            var temp = allTask[i];
                                            for (var j = 0; j < taskArray.length; j++) {
                                                if (temp.invId == taskArray[j]) {
                                                    if (flag == taskArray.length - 1) {
                                                        leadTaskListData += "{\"taskId\":\"" + temp.invId + "\",\"subject\":\"" + temp.name + "\",\"status\":\"" + ZmCalItem.getLabelForStatus(temp.status) + "\",\"complete\":\"" + temp.percentComplete + "\",\"dueDate\":\"" + new Date(temp.d) + "\"}]";
                                                    } else {
                                                        leadTaskListData += "{\"taskId\":\"" + temp.invId + "\",\"subject\":\"" + temp.name + "\",\"status\":\"" + ZmCalItem.getLabelForStatus(temp.status) + "\",\"complete\":\"" + temp.percentComplete + "\",\"dueDate\":\"" + new Date(temp.d) + "\"},";
                                                        flag++;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    Ext.getCmp('leadTaskGrid').getStore().loadData(jsonParse(leadTaskListData), false);
                                    Ext.getCmp('leadTaskGrid').getView().refresh();

                                }
                            };
                        }
                    }, {
                        iconCls: 'task',
                        text: biz_vnc_crm_client.btnNew,
                        itemId: 'newappoint',
                        handler: function () {
                            biz_vnc_crm_client.flag = 0;
                            var leadId = biz_vnc_crm_client.leadId;
                            var taskController = new ZmCRMTaskController(appCtxt.getApp(ZmApp.TASKS)._container, appCtxt.getApp(ZmApp.TASKS), appCtxt.getCurrentViewId(), leadId);
                            taskController.initComposeView();
                            taskController.show(new ZmTask(null, null, 15), ZmCalItem.MODE_NEW, true);
                        }
                    }, {
                        iconCls: 'refresh',
                        text: biz_vnc_crm_client.btnRefresh,
                        itemId: 'refresh',
                        handler: function () {
                            var leadId = biz_vnc_crm_client.leadId;
                            var json = "jsonobj={\"action\":\"listTask\",\"object\":\"lead\",\"leadId\":\"" + leadId + "\"}";
                            var reqHeader = {
                                "Content-Type": "application/x-www-form-urlencoded"
                            };
                            var reqJson = AjxStringUtil.urlEncode(json);
                            var responseTaskList = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                            var newtaskArray = (responseTaskList.text).split(",");
                            var allTask = appCtxt.getTaskManager()._rawTasks;
                            var taskArray = [];
                            if (newtaskArray != null) {
                                var k = 0;
                                for (var i = 0; i < allTask.length; i++) {
                                    for (var j = 0; j < newtaskArray.length; j++) {
                                        if (allTask[i].invId == newtaskArray[j]) {
                                            taskArray[k++] = newtaskArray[j];
                                        }
                                    }
                                }
                            }
                            if (taskArray.length <= 0) {
                                leadTaskListData = "[{'taskId':'','subject':'','status':'','complete':'','dueDate':''}]";
                            } else {
                                leadTaskListData = "[";
                                var flag = 0;
                                for (var i = 0; i < allTask.length; i++) {
                                    var temp = allTask[i];
                                    for (var j = 0; j < taskArray.length; j++) {
                                        if (temp.invId == taskArray[j]) {
                                            if (flag == taskArray.length - 1) {
                                                leadTaskListData += "{\"taskId\":\"" + temp.invId + "\",\"subject\":\"" + temp.name + "\",\"status\":\"" + ZmCalItem.getLabelForStatus(temp.status) + "\",\"complete\":\"" + temp.percentComplete + "\",\"dueDate\":\"" + new Date(temp.d) + "\"}]";
                                            } else {
                                                leadTaskListData += "{\"taskId\":\"" + temp.invId + "\",\"subject\":\"" + temp.name + "\",\"status\":\"" + ZmCalItem.getLabelForStatus(temp.status) + "\",\"complete\":\"" + temp.percentComplete + "\",\"dueDate\":\"" + new Date(temp.d) + "\"},";
                                                flag++;
                                            }
                                        }
                                    }
                                }
                            }
                            Ext.getCmp('leadTaskGrid').getStore().loadData(jsonParse(leadTaskListData), false);
                            Ext.getCmp('leadTaskGrid').getView().refresh();
                        }
                    }]
                }, {
                    xtype: 'grid',
                    selModel: leadSMTask,
                    id: 'leadTaskGrid',
                    height: 195,
                    defaults: {
                        autoRender: true,
                        autoScroll: true
                    },
                    store: Ext.create('Ext.data.Store', {
                        model: 'leadTaskModel',
                        proxy: {
                            type: 'memory',
                            data: jsonParse(leadTaskListData)
                        },
                        autoLoad: true,
                        actionMethods: {
                            read: 'POST'
                        }
                    }),
                    columnLines: true,
                    columns: [{
                        text: biz_vnc_crm_client.subject,
                        sortable: false,
                        width: 500,
                        dataIndex: 'subject'
                    }, {
                        text: biz_vnc_crm_client.status,
                        width: 200,
                        sortable: true,
                        dataIndex: 'status'
                    }, {
                        text: biz_vnc_crm_client.complete,
                        width: 100,
                        sortable: true,
                        dataIndex: 'complete'
                    }, {
                        text: biz_vnc_crm_client.dueDate,
                        sortable: false,
                        width: 170,
                        dataIndex: 'dueDate',
                        renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                    }],
                    title: null,
                    viewConfig: {
                        stripeRows: true
                    },
                    listeners: {
                        el: {
                            dblclick: function(){
                                var rec = Ext.getCmp('leadTaskGrid').getSelectionModel().selected;
                                var taskId = rec.items[0].data.taskId;
                                biz_vnc_crm_client.viewTaskDetails(taskId);
                            }
                        }
                    }
                }]
            }, {
                title: biz_vnc_crm_client.tabComm_History,
                id: 'leadComm',
                disabled: true,
                layout: 'column',
                width: '100%',
                   height: 220,
                dockedItems: [{
                    xtype: 'toolbar',
                    items: [{
                        iconCls: 'attachment',
                        text: biz_vnc_crm_client.btnAttach,
                        handler: function () {
                            var flag = 0;
                            var leadId = biz_vnc_crm_client.leadId;
                            biz_vnc_crm_client_HandlerObject.prototype.showAttachMailDialog(leadId, flag);
                        }
                    }, {
                        iconCls: 'cancel',
                        text: biz_vnc_crm_client.btnDelete,
                        itemId: 'delete',
                        handler: function () {
                            Ext.MessageBox.confirm(biz_vnc_crm_client.msgConfirmHeader, biz_vnc_crm_client.msgConfirm, showResult);

                            function showResult(btn) {
                                if (btn == "yes") {
                                    var rec1 = Ext.getCmp('leadMailGrid').getSelectionModel().getSelection();
                                    var idArray = [];
                                    Ext.each(rec1, function (item) {
                                        idArray.push(item.data.mailId);
                                    });

                                    var leadId = biz_vnc_crm_client.leadId;
                                    var json = "jsonobj={\"action\":\"DELETEHISTORY\",\"object\":\"lead\",\"array\":\"" + idArray + "\",\"leadId\":\"" + leadId + "\"}";
                                    var reqHeader = {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    };
                                    var reqJson = AjxStringUtil.urlEncode(json);
                                    var responseUser = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

                                    var json = "jsonobj={\"action\":\"LISTHISTORY\",\"object\":\"lead\",\"leadId\":\"" + leadId + "\"}";
                                    var reqHeader = {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    };
                                    var reqJson = AjxStringUtil.urlEncode(json);
                                    var responseMailHistory = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                                    var msgArray = [];
                                    var item;
                                    var msgArray = (responseMailHistory.text).split(",");


                                    if (msgArray != "null") {
                                        biz_vnc_crm_client.requestMailList(msgArray);
                                    } else {
                                        biz_vnc_crm_client.mailData = "[{'mailId':'','date':'','from':'','subject':'','message':''}]";
                                    }
                                    Ext.getCmp('leadMailGrid').getStore().loadData(jsonParse(biz_vnc_crm_client.mailData), false);
                                    Ext.getCmp('leadMailGrid').getView().refresh();
                                }
                            };
                        }
                    }, {
                        iconCls: 'refresh',
                        text: biz_vnc_crm_client.btnRefresh,
                        itemId: 'refresh',
                        handler: function () {
                            var leadId = biz_vnc_crm_client.leadId;
                            var json = "jsonobj={\"action\":\"LISTHISTORY\",\"object\":\"lead\",\"leadId\":\"" + leadId + "\"}";
                            var reqHeader = {
                                "Content-Type": "application/x-www-form-urlencoded"
                            };
                            var reqJson = AjxStringUtil.urlEncode(json);
                            var responseMailHistory = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                            var msgArray = [];
                            var item;
                            var msgArray = (responseMailHistory.text).split(",");

                            if (msgArray != "null") {
                                biz_vnc_crm_client.requestMailList(msgArray);
                            } else {
                                biz_vnc_crm_client.mailData = "[{'mailId':'','date':'','from':'','subject':'','message':''}]";
                            }
                            Ext.getCmp('leadMailGrid').getStore().loadData(jsonParse(biz_vnc_crm_client.mailData), false);
                            Ext.getCmp('leadMailGrid').getView().refresh();
                        }
                    }]
                }, {
                    xtype: 'grid',
                    selModel: leadSMMail,
                    id: 'leadMailGrid',
                    height: 195,
                    defaults: {
                        autoRender: true,
                        autoScroll: true
                    },
                    store: Ext.create('Ext.data.Store', {
                        model: 'leadMailModel',
                        proxy: {
                            type: 'memory',
                            data: jsonParse(biz_vnc_crm_client.mailData)
                        },
                        autoLoad: true,
                        actionMethods: {
                            read: 'POST'
                        }
                    }),
                    columnLines: true,
                    columns: [{
                        text: biz_vnc_crm_client.date,
                        sortable: false,
                        width: 120,
                        dataIndex: 'date',
                        renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                    }, {
                        text: biz_vnc_crm_client.from,
                        sortable: false,
                        width: 180,
                        dataIndex: 'from'
                    }, {
                        text: biz_vnc_crm_client.subject,
                        width: 250,
                        sortable: true,
                        dataIndex: 'subject'
                    }, {
                        text: biz_vnc_crm_client.message,
                        width: 500,
                        sortable: true,
                        dataIndex: 'message'
                    }],
                    title: null,
                    viewConfig: {
                        stripeRows: true
                    },
                    listeners: {
                        el:{
                                dblclick: function(){
                                    var rec = Ext.getCmp('leadMailGrid').getSelectionModel().selected;
                                    var mailID = rec.items[0].data.mailId;
                                    ZmMailMsgView.rfc822Callback(mailID, null, ZmId.VIEW_CONV);
                                }
                        }
                    }
                }]
            }, {
                title: biz_vnc_crm_client.tabExtraInfo,
                height: 220,
                layout: 'column',
                items: [{
                    columnWidth: .50,
                    border: false,
                    layout: 'anchor',

                    items: [{
                        xtype: 'combo',
                        mode: 'local',
                        value: 'companyName',
                        triggerAction: 'all',
                        forceSelection: true,
                        fieldLabel: biz_vnc_crm_client.company,
                        id: 'cmbcompanyName',
                        name: 'CompanyName',
                        displayField: 'companyName',
                        valueField: 'companyId',
                        queryMode: 'local',
                        store: Ext.create('Ext.data.Store', {
                            model: 'company',
                            proxy: {
                                type: 'memory',
                                data: jsonParse(biz_vnc_crm_client.responseCompany.text)
                            },
                            autoLoad: true,
                            actionMethods: {
                                read: 'POST'
                            }
                        }),
                        anchor: '60%'
                    }, {
                        xtype: 'combo',
                        mode: 'local',
                        value: 'channel',
                        triggerAction: 'all',
                        forceSelection: true,
                        fieldLabel: biz_vnc_crm_client.channel,
                        id: 'cmbchannel',
                        name: 'channel',
                        displayField: 'channelName',
                        valueField: 'channelId',
                        queryMode: 'local',
                        store: Ext.create('Ext.data.Store', {
                            model: 'channel',
                            proxy: {
                                type: 'memory',
                                data: jsonParse(biz_vnc_crm_client.responseChannel.text)
                            },
                            autoLoad: true,
                            actionMethods: {
                                read: 'POST'
                            }
                        }),
                        anchor: '60%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: biz_vnc_crm_client.referredBy,
                        id: 'txtleadreferredby',
                        name: 'last',
                        anchor: '60%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: biz_vnc_crm_client.daystoOpen,
                        id: 'txtleadday2open',
                        name: 'days2open',
                        disabled: true,
                        value: '0.00',
                        anchor: '60%'
                    }]
                }, {
                    columnWidth: .50,
                    border: false,
                    layout: 'anchor',
                    items: [{
                        xtype: 'datefield',
                        format: 'Y-m-d H:i:s.0',
                        fieldLabel: biz_vnc_crm_client.creationDate,
                        id: 'datecreationdate',
                        disabled: true,
                        anchor: '60%'
                    }, {
                        xtype: 'datefield',
                        format: 'Y-m-d H:i:s.0',
                        fieldLabel: biz_vnc_crm_client.updateDate,
                        id: 'dateupdatedate',
                        disabled: true,
                        anchor: '60%'
                    }, {
                        xtype: 'datefield',
                        format: 'Y-m-d H:i:s.0',
                        fieldLabel: biz_vnc_crm_client.opened,
                        id: 'dateopened',
                        disabled: true,
                        anchor: '60%'
                    }, {
                        xtype: 'datefield',
                        format: 'Y-m-d H:i:s.0',
                        fieldLabel: biz_vnc_crm_client.closed,
                        id: 'dateclosed',
                        disabled: true,
                        anchor: '60%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: biz_vnc_crm_client.daystoClose,
                        name: 'day2Close',
                        id: 'txtleadday2close',
                        disabled: true,
                        value: '0.00',
                        anchor: '60%'
                    }]
                }]
            }],
            listeners: {
                'tabchange': function (tabPanel, tab) {
                    if (tab.id == 'leadAppointment') {
                        Ext.getCmp('leadApptGrid').getStore().removeAll();
                        var leadId = biz_vnc_crm_client.leadId;
                        var json = "jsonobj={\"action\":\"LISTAPPTHISTORY\",\"object\":\"lead\",\"leadId\":\"" + leadId + "\"}";
                        var reqHeader = {
                            "Content-Type": "application/x-www-form-urlencoded"
                        };
                        var reqJson = AjxStringUtil.urlEncode(json);
                        var responseMailHistory = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                        var msgArray = [];
                        var item;
                        var msgArray = (responseMailHistory.text).split(",");
                        if (msgArray != "null") {
                            biz_vnc_crm_client.requestApptList(msgArray);

                            Ext.getCmp('leadApptGrid').getStore().loadData(jsonParse(biz_vnc_crm_client.apptData), false);
                            Ext.getCmp('leadApptGrid').getView().refresh();
                        } else {
                            biz_vnc_crm_client.apptData = "[{'subject':'','location1':'','calendar':'','startdate':''}]";
                        }
                    } else if (tab.id == 'leadTask') {
                        Ext.getCmp('leadTaskGrid').getStore().removeAll();
                        var leadId = biz_vnc_crm_client.leadId;
                        var json = "jsonobj={\"action\":\"listTask\",\"object\":\"lead\",\"leadId\":\"" + leadId + "\"}";
                        var reqHeader = {
                            "Content-Type": "application/x-www-form-urlencoded"
                        };
                        var reqJson = AjxStringUtil.urlEncode(json);
                        var responseTaskList = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                        var newtaskArray = (responseTaskList.text).split(",");
                        var allTask = appCtxt.getTaskManager()._rawTasks;
                        var taskArray = [];
                        if (newtaskArray != null) {
                            var k = 0;
                            for (var i = 0; i < allTask.length; i++) {
                                for (var j = 0; j < newtaskArray.length; j++) {
                                    if (allTask[i].invId == newtaskArray[j]) {
                                        taskArray[k++] = newtaskArray[j];
                                    }
                                }
                            }
                        }
                        if (taskArray.length <= 0) {
                            leadTaskListData = "[{'taskId':'','subject':'','status':'','complete':'','dueDate':''}]";
                        } else {
                            leadTaskListData = "[";
                            var flag = 0;
                            for (var i = 0; i < allTask.length; i++) {
                                var temp = allTask[i];
                                for (var j = 0; j < taskArray.length; j++) {
                                    if (temp.invId == taskArray[j]) {
                                        if (flag == taskArray.length - 1) {
                                            leadTaskListData += "{\"taskId\":\"" + temp.invId + "\",\"subject\":\"" + temp.name + "\",\"status\":\"" + ZmCalItem.getLabelForStatus(temp.status) + "\",\"complete\":\"" + temp.percentComplete + "\",\"dueDate\":\"" + new Date(temp.d) + "\"}]";
                                        } else {
                                            leadTaskListData += "{\"taskId\":\"" + temp.invId + "\",\"subject\":\"" + temp.name + "\",\"status\":\"" + ZmCalItem.getLabelForStatus(temp.status) + "\",\"complete\":\"" + temp.percentComplete + "\",\"dueDate\":\"" + new Date(temp.d) + "\"},";
                                            flag++;
                                        }
                                    }
                                }
                            }
                        }
                        Ext.getCmp('leadTaskGrid').getStore().loadData(jsonParse(leadTaskListData), false);
                        Ext.getCmp('leadTaskGrid').getView().refresh();

                    } else if (tab.id == 'leadComm') {
                        Ext.getCmp('leadMailGrid').getStore().removeAll();
                        var leadId = biz_vnc_crm_client.leadId;
                        var json = "jsonobj={\"action\":\"LISTHISTORY\",\"object\":\"lead\",\"leadId\":\"" + leadId + "\"}";
                        var reqHeader = {
                            "Content-Type": "application/x-www-form-urlencoded"
                        };
                        var reqJson = AjxStringUtil.urlEncode(json);
                        var responseMailHistory = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                        var msgArray = [];
                        var item;
                        var msgArray = (responseMailHistory.text).split(",");

                        if (msgArray != "null") {
                            biz_vnc_crm_client.requestMailList(msgArray);

                            Ext.getCmp('leadMailGrid').getStore().loadData(jsonParse(biz_vnc_crm_client.mailData), false);
                            Ext.getCmp('leadMailGrid').getView().refresh();
                        } else {
                            biz_vnc_crm_client.mailData = "[{'mailId':'','date':'','from':'','subject':'','message':''}]";
                        }
                    }
                }
            }
        }],
        buttons: [{
            text: biz_vnc_crm_client.btnSave,
            id: 'btnleadsave',
            disabled: true,
            width: 150,
            height: 25,
            iconCls: 'save',
            handler: function () {
                if (Ext.getCmp('txtleadsubjectName').getValue() == "") {
                    Ext.getCmp('txtleadsubjectName').validate(false);
                    Ext.getCmp('txtleadsubjectName').focus(true);
                    Ext.example.msg('', biz_vnc_crm_client.msgEmptyField);

                } else {

                    var subjectName = Ext.getCmp('txtleadsubjectName').getValue();
                    var leadDescription = Ext.getCmp('txtleadleadDescription').getValue();
                    var contactName = Ext.getCmp('txtleadcontactName').getValue();
                    var phone = Ext.getCmp('txtleadphone').getValue();
                    var fax = Ext.getCmp('txtleadfax').getValue();
                    var email = Ext.getCmp('txtleademail').getValue();
                    var workPhone = Ext.getCmp('txtleadworkPhone').getValue();
                    var mobile = Ext.getCmp('txtleadmobile').getValue();
                    var street1 = Ext.getCmp('txtleadstreet1').getValue();
                    var street2 = Ext.getCmp('txtleadstreet2').getValue();
                    var city = Ext.getCmp('txtleadcity').getValue();
                    var zip = Ext.getCmp('txtleadzip').getValue();
                    var stateId = Ext.getCmp('cmbstate').getValue();
                    var countryId = Ext.getCmp('cmbcountry').getValue();
                    var type = 0;
                    var dateOpen = Ext.getCmp('dateopened').getSubmitValue();
                    if (dateOpen == '') {
                        dateOpen = '0000-00-00 00:00:00';
                    }


                    var dateClose = Ext.getCmp('dateclosed').getSubmitValue();
                    if (dateClose == '') {
                        dateClose = '0000-00-00 00:00:00';
                    }
                    var expectedDateClose = Ext.getCmp('dateupdatedate').getSubmitValue();
                    if (expectedDateClose == '') {
                        expectedDateClose = '0000-00-00 00:00:00';
                    }
                    var stageId = Ext.getCmp('cmbstage').getValue();
                    var channelId = Ext.getCmp('cmbchannel').getValue();
                    var leadClassId = Ext.getCmp('cmbleadClass').getValue();
                    var sectionId = Ext.getCmp('cmbsection').getValue();
                    var categoryId = Ext.getCmp('cmbcategory').getValue();
                    var partnerName = Ext.getCmp('cmbpartner').getValue();
                    var dayopen = Ext.getCmp('txtleadday2open').getValue();
                    var dayclose = Ext.getCmp('txtleadday2close').getValue();
                    var referredBy = Ext.getCmp('txtleadreferredby').getValue();
                    var userId = Ext.getCmp('cmbsalesman').getValue();
                    if (userId == null) {
                        userId = appCtxt.getUsername();
                    }
                    var priorityId = Ext.getCmp('cmbpriority').getValue();
                    var nextActionDate = '0000-00-00 00:00:00';
                    var nextAction = "";
                    var status = true;
                    var createBy = appCtxt.getUsername();
                    var createDate = Ext.getCmp('datecreationdate').getSubmitValue();
                    if (createDate == '') {
                        createDate = '0000-00-00 00:00:00';
                    }
                    var writeBy = appCtxt.getUsername();
                    var writeDate = Ext.getCmp('dateupdatedate').getSubmitValue();
                    if (writeDate == '') {
                        writeDate = '0000-00-00 00:00:00';
                    }
                    var valuation = "000";
                    var companyId = Ext.getCmp('cmbcompanyName').getValue();
                    var leadState = Ext.getCmp('txtleadState').getValue();
                    var probability = 0;
                    var leadId = biz_vnc_crm_client.leadId;

                    var j = JSON.stringify({
                        action: "UPDATE",
                        object: "lead",
                        leadId: leadId,
                        subjectName: subjectName,
                        stageId: stageId,
                        priorityId: priorityId,
                        channelId: channelId,
                        categoryId: categoryId,
                        contactName: contactName,
                        email: email,
                        street1: street1,
                        city: city,
                        stateId: stateId,
                        countryId: countryId,
                        type: type,
                        writeDate: writeDate,
                        writeBy: writeBy,
                        createDate: createDate,
                        createBy: createBy,
                        status: status,
                        nextAction: nextAction,
                        nextActionDate: nextActionDate,
                        userId: userId,
                        referredBy: referredBy,
                        dayClose: dayclose,
                        dayOpen: dayopen,
                        sectionId: sectionId,
                        expectedDateClose: expectedDateClose,
                        dateClose: dateClose,
                        dateOpen: dateOpen,
                        zip: zip,
                        street2: street2,
                        mobile: mobile,
                        workPhone: workPhone,
                        fax: fax,
                        phone: phone,
                        leadDescription: leadDescription,
                        valuation: valuation,
                        companyId: companyId,
                        leadState: leadState,
                        leadClassId: leadClassId,
                        probability: probability,
                        partnerName: partnerName
                    });
                    var json = "jsonobj=" + j;
                    var reqHeader = {
                        "Content-Type": "application/x-www-form-urlencoded"
                    };
                    var reqJson = AjxStringUtil.urlEncode(json);
                    var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                    if (response.text == 1) {
                        Ext.example.msg('', biz_vnc_crm_client.msgEdit);
                        biz_vnc_crm_client.initLeadGrid(app);
                    } else {
                        Ext.example.msg('', biz_vnc_crm_client.msgEdit);
                        biz_vnc_crm_client.initLeadGrid(app);
                    }
                }
            }
        }]
    });


    var LeadPanel = Ext.create('Ext.panel.Panel', {
        width: '100%',
        id: 'leadPanel',
        height: 650,
        layout: 'border',
        bodyBorder: true,
        defaults: {
            collapsible: true,
            split: true,
            animFloat: false,
            autoHide: false,
            useSplitTips: true
        },
        tbar: [{
            xtype: 'buttongroup',
            items: [{

                tooltip: 'Create new lead.',
                id: 'btnCreateLead',
                text: biz_vnc_crm_client.btnCreate,
                iconCls: 'add24',
                scale: 'medium',
                handler: function () {
                    var json = "jsonobj={\"action\":\"COUNT\",\"object\":\"lead\"}";
                    var reqHeader = {
                        "Content-Type": "application/x-www-form-urlencoded"
                    };
                    var reqJson = AjxStringUtil.urlEncode(json);
                    var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

                    if (response.text == 2){
                        Ext.Msg.alert(biz_vnc_crm_client.notification, biz_vnc_crm_client.usageLimitMessage);
                        return;
                    }

                    biz_vnc_crm_client.mailData = "";
                    var content = AjxTemplate.expand("biz_vnc_crm_client.templates.LeadForm#LeadFormMain");
                    app.setContent(content);
                    var toolbar = app.getToolbar();
                    toolbar.visible = false;
                    var rec;
                    ZmLeadListView.prototype.getContacts(0, [], rec, app);
                }
            }, {
                id: 'btnEditLead',
                tooltip: 'Edit selected lead.',
                disabled: true,
                text: biz_vnc_crm_client.btnEdit,
                iconCls: 'add16',
                scale: 'medium',
                handler: function () {
                    var rec = Ext.getCmp('leadGrid').getSelectionModel().getSelection();
                    Ext.each(rec, function (item) {
                        rec = item;
                    });
                    var content = AjxTemplate.expand("biz_vnc_crm_client.templates.LeadForm#LeadFormMain");
                    app.setContent(content);
                    ZmLeadListView.prototype.getContacts(0, [], rec, app);
                }
            }, {
                tooltip: 'Delete selected lead.',
                id: 'btnDeleteLead',
                disabled: true,
                text: biz_vnc_crm_client.btnDelete,
                iconCls: 'delete',
                scale: 'medium',
                handler: function () {
                    var rec = Ext.getCmp('leadGrid').getSelectionModel().getSelection();
                    var idArray = [];
                    Ext.each(rec, function (item) {
                        idArray.push(item.data.leadId);
                    });
                    Ext.MessageBox.confirm(biz_vnc_crm_client.msgConfirmHeader, biz_vnc_crm_client.msgConfirm, showResult);

                    function showResult(btn) {
                        if (btn == "yes") {
                            var name = appCtxt.getUsername();
                            var json = "jsonobj={\"action\":\"DELETEBYID\",\"object\":\"lead\",\"array\":\"" + idArray + "\",\"writeBy\":\"" + name + "\"}";
                            var reqHeader = {
                                "Content-Type": "application/x-www-form-urlencoded"
                            };
                            var reqJson = AjxStringUtil.urlEncode(json);
                            var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                            Ext.example.msg('', biz_vnc_crm_client.msgDelete);
                            biz_vnc_crm_client.initLeadGrid(app);
                        }
                    };
                }
            }]
        }],
        items: [{
            title: biz_vnc_crm_client.lblLeadForm,
            id: 'footerPanel',
            hidden: true,
            region: 'south',
            collapsible: false,
            height: 400,
            maxSize: 450,
            layout: 'fit',
            defaults: {
                autoRender: true,
                autoScroll: true
            },
            xtype: 'panel',
            cmargins: '5 0 0 0',
            items: [LeadFooterPanel]
        }, {
            title: biz_vnc_crm_client.lblLeadsRecords,
            collapsible: false,
            region: 'center',
            xtype: 'grid',
            id: 'leadGrid',
            selModel: sm,
            layout: 'fit',
            defaults: {
                autoRender: true,
                autoScroll: true
            },
            store: Ext.create('Ext.data.Store', {
                model: 'model_1',
                proxy: {
                    type: 'memory',
                    data: jsonParse(response.text)
                },
                autoLoad: true,
                actionMethods: {
                    read: 'POST'
                }
            }),
            viewConfig: {
                stripeRows: true
            },
            columns: [{
                sortable: false,
                xtype: 'actioncolumn',
                width: 25,
                icon: "/service/zimlet/biz_vnc_crm_client/default/btn/pencil.gif",

                items: [{
                    icon: "/service/zimlet/biz_vnc_crm_client/default/btn/pencil.gif", // Use a URL in the icon config
                    tooltip: biz_vnc_crm_client.btnEdit,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        var content = AjxTemplate.expand("biz_vnc_crm_client.templates.LeadForm#LeadFormMain");
                        app.setContent(content);
                        ZmLeadListView.prototype.getContacts(0, [], rec, app);
                    }
                }]
            }, {
                text: biz_vnc_crm_client.creationDate,
                width: 160,
                dataIndex: 'createDate'
            }, {
                text: biz_vnc_crm_client.subject,
                width: 160,
                dataIndex: 'subjectName'
            }, {
                text: biz_vnc_crm_client.leadClass,
                width: 160,
                dataIndex: 'leadClassName'
            }, {
                text: biz_vnc_crm_client.contactName,
                width: 160,
                dataIndex: 'contactName'
            }, {
                text: biz_vnc_crm_client.email,
                width: 160,
                dataIndex: 'email'
            }, {
                text: biz_vnc_crm_client.phone,
                width: 160,
                dataIndex: 'phone'
            }, {
                text: biz_vnc_crm_client.stage,
                width: 160,
                dataIndex: 'stageName'
            }, {
                text: biz_vnc_crm_client.salesman,
                width: 160,
                dataIndex: 'userId'
            }, {
                text: biz_vnc_crm_client.state,
                width: 160,
                dataIndex: 'leadState'
            }, {

                sortable: false,
                xtype: 'actioncolumn',
                width: 25,

                items: [{
                    icon: '/service/zimlet/biz_vnc_crm_client/default/btn/cancel.png',
                    tooltip: biz_vnc_crm_client.btnDelete,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        Ext.MessageBox.confirm(biz_vnc_crm_client.msgConfirmHeader, biz_vnc_crm_client.msgConfirm, showResult);
                        function showResult(btn) {
                            if (btn == "yes") {
                                var name = appCtxt.getUsername();
                                var idArray = rec.get('leadId');
                                var json = "jsonobj={\"action\":\"DELETEBYID\",\"object\":\"lead\",\"array\":\"" + idArray + "\",\"writeBy\":\"" + name + "\"}";
                                var reqHeader = {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                };
                                var reqJson = AjxStringUtil.urlEncode(json);
                                var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                                Ext.example.msg('', biz_vnc_crm_client.msgDelete);
                                biz_vnc_crm_client.initLeadGrid(app);
                            }

                        };
                    }
                }]
            }]

        }],
        renderTo: 'datagrid'


    });

    var grid = Ext.getCmp('leadGrid');
    grid.getSelectionModel().on('selectionchange', function (sm, selectedRecord) {

        if (selectedRecord.length) {
            Ext.getCmp('footerPanel').show();
            Ext.getCmp('btnleadsave').enable();
            Ext.getCmp('btnConvertToOpp').enable();
            Ext.getCmp('btnLeadAddContact').enable();
            Ext.getCmp('leadTask').setDisabled(false);
            Ext.getCmp('leadAppointment').setDisabled(false);
            Ext.getCmp('leadComm').setDisabled(false);
            var rec = selectedRecord[0];
            Ext.getCmp('leadTabPanel').setActiveTab(0);
            if (rec != null) {
                biz_vnc_crm_client.leadId = rec.get('leadId');
                Ext.getCmp('cmbpartner').getStore().load({
                    callback: function () {
                        Ext.getCmp('cmbpartner').setValue(rec.get('partnerName'));
                    }
                });
                Ext.getCmp('cmbstage').getStore().load({
                    callback: function () {
                        Ext.getCmp('cmbstage').setValue(rec.get('stageId'));
                    }
                });
                Ext.getCmp('cmbpriority').getStore().load({
                    callback: function () {
                        Ext.getCmp('cmbpriority').setValue(rec.get('priorityId'));
                    }
                });
                Ext.getCmp('cmbchannel').getStore().load({
                    callback: function () {
                        Ext.getCmp('cmbchannel').setValue(rec.get('channelId'));
                    }
                });
                Ext.getCmp('cmbsection').getStore().load({
                    callback: function () {
                        Ext.getCmp('cmbsection').setValue(rec.get('sectionId'));
                    }
                });
                Ext.getCmp('cmbstate').getStore().load({
                    callback: function () {
                        Ext.getCmp('cmbstate').setValue(rec.get('stateId'));
                    }
                });
                Ext.getCmp('cmbcountry').getStore().load({
                    callback: function () {
                        Ext.getCmp('cmbcountry').setValue(rec.get('countryId'));
                    }
                });
                Ext.getCmp('cmbsalesman').getStore().load({
                    callback: function () {
                        Ext.getCmp('cmbsalesman').setValue(rec.get('userId'));
                    }
                });
                Ext.getCmp('cmbcategory').getStore().load({
                    callback: function () {
                        Ext.getCmp('cmbcategory').setValue(rec.get('categoryId'));
                    }
                });
                Ext.getCmp('cmbcompanyName').getStore().load({
                    callback: function () {
                        Ext.getCmp('cmbcompanyName').setValue(rec.get('companyId'));
                    }
                });
                Ext.getCmp('cmbleadClass').getStore().load({
                    callback: function () {
                        Ext.getCmp('cmbleadClass').setValue(rec.get('leadClassId'));
                    }
                });
                Ext.getCmp('txtleadsubjectName').setValue(rec.get('subjectName'));
                Ext.getCmp('txtleadcontactName').setValue(rec.get('contactName'));
                Ext.getCmp('txtleadleadDescription').setValue(rec.get('leadDescription'));
                Ext.getCmp('txtleadreferredby').setValue(rec.get('referredBy'));
                Ext.getCmp('txtleadworkPhone').setValue(rec.get('workPhone'));
                Ext.getCmp('txtleadzip').setValue(rec.get('zip'));
                Ext.getCmp('txtleademail').setValue(rec.get('email'));
                Ext.getCmp('txtleadstreet1').setValue(rec.get('street1'));
                Ext.getCmp('txtleadstreet2').setValue(rec.get('street2'));
                Ext.getCmp('txtleadcity').setValue(rec.get('city'));
                Ext.getCmp('txtleadmobile').setValue(rec.get('mobile'));
                Ext.getCmp('txtleadfax').setValue(rec.get('fax'));
                Ext.getCmp('txtleadphone').setValue(rec.get('phone'));
                Ext.getCmp('datecreationdate').setValue(rec.get('createDate'));
                Ext.getCmp('dateupdatedate').setValue(rec.get('writeDate'));
                Ext.getCmp('dateopened').setValue(rec.get('dateOpen'));
                Ext.getCmp('dateclosed').setValue(rec.get('dateClose'));
            }
        } else {
            Ext.getCmp('footerPanel').hide();
            Ext.getCmp('btnleadsave').disable();
            Ext.getCmp('btnConvertToOpp').disable();
            Ext.getCmp('btnLeadAddContact').disable();
            Ext.getCmp('leadTask').setDisabled(true);
            Ext.getCmp('leadAppointment').setDisabled(true);
            Ext.getCmp('leadComm').setDisabled(true);
        }
    });
};
biz_vnc_crm_client.initReports = function (app) {
    var content = AjxTemplate.expand("biz_vnc_crm_client.templates.SimpleOpportunity#MainOpportunity");
    app.setContent(content);
    var toolbar = app.getToolbar();
    toolbar.setVisibility(false);
    biz_vnc_crm_client._flag = 3;
}
biz_vnc_crm_client.initOpportunityGrid = function (app) {
    biz_vnc_crm_client.apptData = "[{'subject':'','location1':'','calendar':'','startdate':''}]";
    if (biz_vnc_crm_client.mailData == "") {
        biz_vnc_crm_client.mailData = "[{'date':'','from':'','subject':'','message':''}]";
    }
    var content = AjxTemplate.expand("biz_vnc_crm_client.templates.SimpleOpportunity#MainOpportunity");
    app.setContent(content);
    var toolbar = app.getToolbar();
    toolbar.setVisibility(true);
    biz_vnc_crm_client._flag = 1;
    Ext.Loader.setConfig({
        enabled: true
    });
    Ext.Loader.setPath('Ext.ux', '../ux');
    Ext.require(['Ext.tab.*', 'Ext.window.*', 'Ext.tip.*', 'Ext.layout.container.Border', 'Ext.window.MessageBox', 'Ext.grid.*', 'Ext.data.*', 'Ext.util.*', 'Ext.state.*', 'Ext.form.*', 'Ext.layout.container.Column', 'Ext.tab.Panel', 'Ext.panel.*', 'Ext.toolbar.*', 'Ext.button.*', 'Ext.container.ButtonGroup', 'Ext.layout.container.Table', 'Ext.selection.CheckboxModel', 'Ext.window.MessageBox', 'Ext.tip.*', 'Ext.layout.container.Border', 'Ext.tip.QuickTipManager']);
    Ext.MessageBox.buttonText.yes = biz_vnc_crm_client.btnYes;
    Ext.MessageBox.buttonText.no = biz_vnc_crm_client.btnNo;


    var toolbar = app.getToolbar();
    var arrOfEle = toolbar.getChildren();
    var idArray = [];
    for (var i = 0; i < 3; i++) {
        if (arrOfEle[i].isToggled()) {
            var str = "'" + arrOfEle[i].getHTMLElId() + "'";
            idArray.push(str);
        }
    }

    var json = "jsonobj={\"action\":\"FILTER\",\"object\":\"opp\",\"array\":\"" + idArray + "\"}";
    var reqHeader = {
        "Content-Type": "application/x-www-form-urlencoded"
    };
    var reqJson = AjxStringUtil.urlEncode(json);
    var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
    Ext.define('model_1', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'leadId',
            type: 'int'
        }, {
            name: 'subjectName',
            type: 'string'
        }, {
            name: 'leadDescription',
            type: 'string'
        }, {
            name: 'contactName',
            type: 'string'
        }, {
            name: 'companyName',
            mapping: 'companyBean.companyName',
            type: 'string'
        }, {
            name: 'companyId',
            mapping: 'companyBean.companyId',
            type: 'int'
        }, {
            name: 'valuation',
            type: 'string'
        }, {
            name: 'leadState',
            type: 'string'
        }, {
            name: 'leadClassName',
            mapping: 'leadClassBean.leadClassName',
            type: 'string'
        }, {
            name: 'leadClassId',
            mapping: 'leadClassBean.leadClassId',
            type: 'int'
        }, {
            name: 'phone',
            type: 'string'
        }, {
            name: 'fax',
            type: 'string'
        }, {
            name: 'partnerName',
            type: 'string'
        }, {
            name: 'email',
            type: 'string'
        }, {
            name: 'workPhone',
            type: 'string'
        }, {
            name: 'mobile',
            type: 'string'
        }, {
            name: 'street1',
            type: 'string'
        }, {
            name: 'street2',
            type: 'string'
        }, {
            name: 'city',
            type: 'string'
        }, {
            name: 'zip',
            type: 'string'
        }, {
            name: 'stateName',
            mapping: 'stateBean.stateName',
            type: 'string'
        }, {
            name: 'stateId',
            mapping: 'stateBean.stateId',
            type: 'int'
        }, {
            name: 'countryName',
            mapping: 'countryBean.countryName',
            type: 'string'
        }, {
            name: 'countryId',
            mapping: 'countryBean.countryId',
            type: 'int'
        }, {
            name: 'type',
            type: 'string'
        }, {
            name: 'dateOpen',
            type: 'string'
        }, {
            name: 'dateClose',
            type: 'string'
        }, {
            name: 'expectedDateClose',
            type: 'string'
        }, {
            name: 'stageName',
            mapping: 'stageBean.stageName',
            type: 'string'
        }, {
            name: 'stageId',
            mapping: 'stageBean.stageId',
            type: 'int'
        }, {
            name: 'stageProbability',
            mapping: 'stageBean.stageProbability',
            type: 'float'
        }, {
            name: 'probability',
            type: 'float'
        }, {
            name: 'channelName',
            mapping: 'channelBean.channelName',
            type: 'string'
        }, {
            name: 'channelId',
            mapping: 'channelBean.channelId',
            type: 'int'
        }, {
            name: 'sectionId',
            mapping: 'sectionBean.sectionId',
            type: 'int'
        }, {
            name: 'sectionName',
            mapping: 'sectionBean.sectionName',
            type: 'string'
        }, {
            name: 'categoryName',
            mapping: 'categoryBean.categoryName',
            type: 'string'
        }, {
            name: 'categoryId',
            mapping: 'categoryBean.categoryId',
            type: 'int'
        }, {
            name: 'dayClose',
            type: 'float'
        }, {
            name: 'dayOpen',
            type: 'float'
        }, {
            name: 'referredBy',
            type: 'string'
        }, {
            name: 'userId',
            type: 'string'
        }, {
            name: 'priorityId',
            mapping: 'priorityBean.priorityId',
            type: 'int'
        }, {
            name: 'priorityName',
            mapping: 'priorityBean.priorityName',
            type: 'string'
        }, {
            name: 'nextActionDate',
            type: 'string'
        }, {
            name: 'nextAction',
            type: 'string'
        }, {
            name: 'status',
            type: 'bool'
        }, {
            name: 'createBy',
            type: 'string'
        }, {
            name: 'createDate',
            type: 'string'
        }, {
            name: 'writeBy',
            type: 'string'
        }, {
            name: 'writeDate',
            type: 'string'
        }]
    });

    var sm1 = Ext.create('Ext.selection.CheckboxModel', {
        listeners: {
            selectionchange: function (sm1, selections) {
                if (selections.length == 1) {
                    Ext.getCmp('btnEditOpportunity').enable();
                } else {
                    Ext.getCmp('btnEditOpportunity').disable();
                }
                if (selections.length > 0) {
                    Ext.getCmp('btnDeleteOpportunity').enable();
                } else {
                    Ext.getCmp('btnEditOpportunity').disable();
                    Ext.getCmp('btnDeleteOpportunity').disable();
                }
            }
        }
    });
    
    Ext.define('priority', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'priorityId',
            type: 'int'
        }, {
            name: 'priorityName',
            type: 'string'
        }]
    });

    Ext.define('section', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'sectionId',
            type: 'int'
        }, {
            name: 'sectionName',
            type: 'string'
        }]
    });
    
    Ext.define('section', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'sectionId',
            type: 'int'
        }, {
            name: 'sectionName',
            type: 'string'
        }]
    });

    Ext.define('customer', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'leadId',
            type: 'int'
        }, {
            name: 'companyName',
            type: 'string'
        }

        ]
    });
    Ext.define('contact', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'leadId',
            type: 'int'
        }, {
            name: 'contactName',
            type: 'string'
        }

        ]
    });

    Ext.define('category', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'categoryId',
            type: 'int'
        }, {
            name: 'categoryName',
            type: 'string'
        }]
    });

    Ext.define('company', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'companyId',
            type: 'int'
        }, {
            name: 'companyName',
            type: 'string'
        }]
    });
    Ext.define('stage', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'stageId',
            type: 'int'
        }, {
            name: 'stageName',
            type: 'string'
        }, {
            name: 'stageState',
            type: 'string'
        }, {
            name: 'stageProbability',
            type: 'float'
        }, {
            name: 'stageAuto',
            type: 'bool'
        }

        ]
    });

    Ext.define('channel', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'channelId',
            type: 'int'
        }, {
            name: 'channelName',
            type: 'string'
        }]
    });

    Ext.define('state', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'stateId',
            type: 'int'
        }, {
            name: 'stateName',
            type: 'string'
        }]
    });

    Ext.define('country', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'countryId',
            type: 'int'
        }, {
            name: 'countryName',
            type: 'string'
        }]
    });

    Ext.define('contact1', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'value',
            type: 'string'
        }, {
            name: 'label',
            type: 'string'
        }]
    });

    Ext.define('user', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'value',
            type: 'string'
        }, {
            name: 'label',
            type: 'string'
        }]
    });

    var sm = Ext.create('Ext.selection.CheckboxModel', {
        listeners: {
            selectionchange: function (sm, selections) {}
        }
    });

    var smappoint = Ext.create('Ext.selection.CheckboxModel', {
        listeners: {
            selectionchange: function (sm, selections) {}
        }
    });
    var oppTaskListData = "[{'subject':'','status':'','complete':'','dueDate':''}]";

    var oppSMTask = Ext.create('Ext.selection.CheckboxModel', {
        listeners: {
            selectionchange: function (oppSMTask, selections) {}
        }
    });

    Ext.define('oppTaskModel', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'taskId',
            type: 'string'
        }, {
            name: 'subject',
            type: 'string'
        }, {
            name: 'status',
            type: 'string'
        }, {
            name: 'complete',
            type: 'string'
        }, {
            name: 'dueDate',
            type: 'date'
        }

        ]
    });


    var oppSMMail = Ext.create('Ext.selection.CheckboxModel', {
        listeners: {
            selectionchange: function (oppSMMail, selections) {}
        }
    });

    Ext.define('oppMailModel', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'mailId',
            type: 'string'
        }, {
            name: 'date',
            type: 'string'
        }, {
            name: 'from',
            type: 'string'
        }, {
            name: 'subject',
            type: 'string'
        }, {
            name: 'message',
            type: 'string'
        }]
    });


    Ext.define('oppApptModel', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'appointmentId',
            type: 'string'
        }, {
            name: 'subject',
            type: 'string'
        }, {
            name: 'location1',
            type: 'string'
        }, {
            name: 'status',
            type: 'string'
        }, {
            name: 'calendar',
            type: 'string'
        }, {
            name: 'startdate',
            type: 'string'
        }]
    });

    var smAppoint = Ext.create('Ext.selection.CheckboxModel', {
        listeners: {


            selectionchange: function (sm, selections) {}
        }
    });


    var OpportunityFooterPanel = Ext.create('Ext.form.Panel', {
        title: null,
        bodyStyle: 'padding:5px',
        width: '100%',
        height: '100%',
        fieldDefaults: {
            msgTarget: 'side'
        },
        defaults: {
            anchor: '100%'
        },

        items: [{
            layout: 'column',
            border: false,
            items: [{
                columnWidth: .30,
                border: false,
                layout: 'anchor',
                items: [{
                    xtype: 'textfield',
                    id: 'txtOppOpportunity',
                    fieldLabel: biz_vnc_crm_client.opportunity,
                    allowBlank: false,
                    anchor: '95%'
                }, {
                    xtype: 'textfield',
                    id: 'txtOppExpectedRevenue',
                    fieldLabel: biz_vnc_crm_client.expectedRevenue,
                    anchor: '95%'
                }, {
                    xtype: 'datefield',
                    id: 'dateOppNextActionDate',
                    format: 'Y-m-d H:i:s.0',
                    fieldLabel: biz_vnc_crm_client.nextActionDate,
                    anchor: '95%'
                }, {
                    xtype: 'combo',
                    mode: 'local',
                    value: 'leadClass',
                    triggerAction: 'all',
                    forceSelection: true,
                    tabIndex: 2,
                    fieldLabel: biz_vnc_crm_client.leadClass,
                    id: 'cmbOppleadClass',
                    name: 'title',
                    displayField: 'leadClassName',
                    valueField: 'leadClassId',
                    queryMode: 'local',
                    store: Ext.create('Ext.data.Store', {
                        model: 'leadClass',
                        proxy: {
                            type: 'memory',
                            data: jsonParse(biz_vnc_crm_client.responseLeadClass.text)
                        },
                        autoLoad: true,
                        actionMethods: {
                            read: 'POST'
                        }
                    }),
                    listeners: {
                        change: function (combo, ewVal, oldVal) {}
                    },
                    anchor: '95%'
                }]
            }, {
                columnWidth: .25,
                border: false,
                layout: 'anchor',
                items: [{
                    xtype: 'combo',
                    mode: 'local',
                    value: 'oppstage',
                    triggerAction: 'all',
                    forceSelection: true,
                    fieldLabel: biz_vnc_crm_client.stage,
                    id: 'cmbOppstage',
                    name: 'title',
                    displayField: 'stageName',
                    valueField: 'stageId',
                    queryMode: 'local',
                    store: Ext.create('Ext.data.Store', {
                        model: 'stage',
                        proxy: {
                            type: 'memory',
                            data: jsonParse(biz_vnc_crm_client.responseStage.text)
                        },
                        autoLoad: true,
                        actionMethods: {
                            read: 'POST'
                        }
                    }),
                    listeners: {
                        change: function (combo, ewVal, oldVal) {
                            var oldState = Ext.getCmp('txtOppState').getValue();
                            var val = Ext.getCmp('cmbOppstage').getRawValue();
                            var rec1 = Ext.getCmp('cmbOppstage').getStore().findRecord("stageName", val);
                            if (rec1 != null) {
                                Ext.getCmp('txtOppState').setValue(rec1.get('stageState'));
                                if (rec1.get('stageAuto') == true) {
                                    Ext.getCmp('txtOppProbability').setValue(rec1.get('stageProbability'));
                                } else {
                                    Ext.getCmp('txtOppProbability').setValue('0');
                                }
                            }
                            var dateOpen = Ext.getCmp('dateOppOpened').getValue();
                            var state = Ext.getCmp('txtOppState').getValue();

                            if (dateOpen == null && state != "New") {
                                Ext.getCmp('dateOppOpened').setValue(new Date());
                                if (state == "Close") {
                                    Ext.getCmp('dateOppOpened').setValue(new Date());
                                    Ext.getCmp('dateOppClosed').setValue(new Date());
                                }
                            } else if (dateOpen != null && state == "Close") {
                                Ext.getCmp('dateOppClosed').setValue(new Date());
                            }
                            if (oldState == "Close" && state != "Close") {
                                Ext.getCmp('dateOppOpened').setValue(new Date());
                                Ext.getCmp('dateOppClosed').setValue('');
                            }
                            if (Ext.getCmp('dateOppOpened').getValue() != null) {
                                var dayopen = Math.ceil(((new Date().getTime()) - (Ext.getCmp('dateOppOpened').getValue())) / (1000 * 60 * 60 * 24));
                                Ext.getCmp('txtOppDaysToOpen').setValue(dayopen);
                            } else { 
                                Ext.getCmp('txtOppDaysToOpen').setValue(0);
                            }
                            if (Ext.getCmp('dateOppClosed').getValue() != null) {
                                var dayclose = Math.ceil(((Ext.getCmp('dateOppClosed').getValue()) - (Ext.getCmp('dateOppOpened').getValue())) / (1000 * 60 * 60 * 24));
                                Ext.getCmp('txtOppDaysToClose').setValue(dayclose);
                            } else { 
                                Ext.getCmp('txtOppDaysToClose').setValue(0);
                            }
                        }
                    },
                    anchor: '95%'
                }, {
                    xtype: 'textfield',
                    id: 'txtOppProbability',
                    fieldLabel: biz_vnc_crm_client.probability,
                    value: '0',
                    anchor: '95%'
                }, {
                    xtype: 'textfield',
                    id: 'txtOppNextAction',
                    fieldLabel: biz_vnc_crm_client.nextAction,
                    anchor: '95%'
                }, {
                    xtype: 'textfield',
                    id: 'txtOppState',
                    fieldLabel: biz_vnc_crm_client.opportunityState,
                    value: 'New',
                    disabled: true
                }]
            }, {
                columnWidth: .25,
                border: false,
                layout: 'anchor',
                items: [{
                    xtype: 'combo',
                    mode: 'local',
                    value: 'oppsalesman',
                    triggerAction: 'all',
                    forceSelection: true,
                    fieldLabel: biz_vnc_crm_client.salesman,
                    id: 'cmbOppsalesman',
                    name: 'title',
                    displayField: 'label',
                    valueField: 'value',
                    queryMode: 'local',
                    store: Ext.create('Ext.data.Store', {
                        model: 'user',
                        proxy: {
                            type: 'memory',
                            data: jsonParse(biz_vnc_crm_client.responseUser.text)
                        },
                        autoLoad: true,
                        actionMethods: {
                            read: 'POST'
                        }
                    }),
                    queryMode: 'local',
                    listConfig: {
                        getInnerTpl: function () {
                            return '<div data-qtip="{label}. {name}">{label}</div>';
                        }
                    },
                    anchor: '95%'
                }, {
                    xtype: 'datefield',
                    id: 'dateOppExpectedClosing',
                    format: 'Y-m-d H:i:s.0',
                    fieldLabel: biz_vnc_crm_client.expectedClosing,
                    anchor: '95%'
                }, {
                    xtype: 'combo',
                    mode: 'local',
                    value: 'opppriority',
                    triggerAction: 'all',
                    forceSelection: true,
                    fieldLabel: biz_vnc_crm_client.priority,
                    id: 'cmbOpppriority',
                    name: 'title',
                    displayField: 'priorityName',
                    valueField: 'priorityId',
                    queryMode: 'local',
                    autoSelect: true,
                    store: Ext.create('Ext.data.Store', {
                        model: 'priority',
                        proxy: {
                            type: 'memory',
                            data: jsonParse(biz_vnc_crm_client.responsePriority.text)
                        },
                        autoLoad: true,
                        actionMethods: {
                            read: 'POST'
                        }
                    }),
                    anchor: '95%'
                }]
            }, {
                columnWidth: .20,
                border: false,
                layout: 'anchor',
                items: [{
                    xtype: 'button',
                    text: biz_vnc_crm_client.btnScheduleLogCall,
                    width: 200,
                    height: 25,
                    iconCls: 'phone',
                    margin: '3 0 3 0',
                    handler: function () {
                        AjxDispatcher.run("GetCalController").newAppointment(null, null, null, null);
                    }
                }, {
                    xtype: 'button',
                    text: biz_vnc_crm_client.btnScheduleMeeting,
                    width: 200,
                    height: 25,
                    margin: '3 0 3 0',
                    iconCls: 'meeting',
                    handler: function () {
                        AjxDispatcher.run("GetCalController").newAppointment(null, null, null, null);
                    }
                }]
            }]
        }, {
            xtype: 'tabpanel',
            id: 'oppTabPanel',
            plain: true,
            activeTab: 0,
            height: '80%',
            defaults: {
                bodyStyle: 'padding:10px'
            },
            items: [{
                title: biz_vnc_crm_client.tabOpportunity,
                height: 220,
                layout: 'column',
                items: [{
                    columnWidth: .33,
                    border: false,
                    layout: 'anchor',
                    items: [{
                        xtype: 'combo',
                        mode: 'local',
                        value: 'Partner',
                        triggerAction: 'all',
                        forceSelection: true,
                        fieldLabel: biz_vnc_crm_client.partner,
                        id: 'cmbOpppartner',
                        name: 'title',
                        displayField: 'label',
                        valueField: 'value',
                        queryMode: 'local',
                        store: Ext.create('Ext.data.Store', {
                            model: 'contact1',
                            proxy: {
                                type: 'memory',
                                data: jsonParse(biz_vnc_crm_client.temp)
                            },
                            autoLoad: true,
                            actionMethods: {
                                read: 'POST'
                            }
                        }),
                        listeners: {
                            change: function (combo, ewVal, oldVal) {
                                var selname = Ext.getCmp('cmbOpppartner').getValue();
                                for (var i = 0; i < biz_vnc_crm_client.contactList.length; i++) {
                                    if (biz_vnc_crm_client.contactList[i].id == selname) {
                                        var contactName = ZmLeadListView.CheckField(biz_vnc_crm_client.contactList[i]._attrs.firstName) + " " + ZmLeadListView.CheckField(biz_vnc_crm_client.contactList[i]._attrs.lastName);
                                        var workState = biz_vnc_crm_client.contactList[i]._attrs.workState;
                                        var workCountry = biz_vnc_crm_client.contactList[i]._attrs.workCountry;
                                        var state = Ext.getCmp('cmbOppstate').getStore().findRecord("stateName", workState);
                                        var country = Ext.getCmp('cmbOppcountry').getStore().findRecord("countryName", workCountry);
                                        if (state != null)
                                        {
                                            Ext.getCmp('cmbOppstate').getStore().load({
                                                callback: function () {
                                                    Ext.getCmp('cmbOppstate').setValue(state.data.stateId);
                                                }
                                            });
                                        } else {
                                            Ext.getCmp('cmbOppstate').setValue();
                                        }
                                        if (country != null)
                                        {
                                            Ext.getCmp('cmbOppcountry').getStore().load({
                                                callback: function () {
                                                    Ext.getCmp('cmbOppcountry').setValue(country.data.countryId);
                                                }
                                            });
                                        } else {
                                            Ext.getCmp('cmbOppcountry').setValue();
                                        }

                                        Ext.getCmp('txtOppMobile').setValue(ZmLeadListView.CheckField(biz_vnc_crm_client.contactList[i]._attrs.mobilePhone));
                                        Ext.getCmp('txtOppContact').setValue(contactName);
                                        Ext.getCmp('txtOppZip').setValue(ZmLeadListView.CheckField(biz_vnc_crm_client.contactList[i]._attrs.workPostalCode));
                                        Ext.getCmp('txtOppEmail').setValue(ZmLeadListView.CheckField(biz_vnc_crm_client.contactList[i]._attrs.email));
                                        Ext.getCmp('txtOppStreet1').setValue(ZmLeadListView.CheckField(biz_vnc_crm_client.contactList[i]._attrs.workStreet));
                                        Ext.getCmp('txtOppCity').setValue(ZmLeadListView.CheckField(biz_vnc_crm_client.contactList[i]._attrs.workCity));
                                        Ext.getCmp('txtOppPhone').setValue(ZmLeadListView.CheckField(biz_vnc_crm_client.contactList[i]._attrs.mobilePhone2));
                                        Ext.getCmp('txtOppFax').setValue(ZmLeadListView.CheckField(biz_vnc_crm_client.contactList[i]._attrs.workFax));
                                    }
                                }

                            }
                        },
                        anchor: '100%'

                    }, {
                        xtype: 'combo',
                        mode: 'local',
                        value: 'companyName',
                        triggerAction: 'all',
                        forceSelection: true,
                        fieldLabel: biz_vnc_crm_client.company,
                        id: 'cmbOppcompanyName',
                        name: 'CompanyName',
                        displayField: 'companyName',
                        valueField: 'companyId',
                        queryMode: 'local',
                        store: Ext.create('Ext.data.Store', {
                            model: 'company',
                            proxy: {
                                type: 'memory',
                                data: jsonParse(biz_vnc_crm_client.responseCompany.text)
                            },
                            autoLoad: true,
                            actionMethods: {
                                read: 'POST'
                            }
                        }),
                        anchor: '100%'
                    }, {
                        xtype: 'textfield',
                        id: 'txtOppContact',
                        fieldLabel: biz_vnc_crm_client.contactName,
                        anchor: '100%'
                    }, {
                        xtype: 'textfield',
                        id: 'txtOppEmail',
                        fieldLabel: biz_vnc_crm_client.email,
                        anchor: '100%'
                    }, {
                        xtype: 'textfield',
                        id: 'txtOppPhone',
                        fieldLabel: biz_vnc_crm_client.phone,
                        anchor: '100%'
                    }]

                }, {
                    columnWidth: .10,
                    border: false,
                    layout: 'anchor',
                    items: [{

                        xtype: 'button',
                        text: null,
                        disabled: true,
                        id: 'btnOppAddContact',
                        height: 25,
                        iconCls: 'add_contact',
                        anchor: '17%',
                        handler: function () {
                            biz_vnc_crm_client.contactFlag = 1;
                            var contact = new ZmContact(null, null, null);
                            var contactApp = appCtxt.getApp(ZmApp.CONTACTS);
                            var contactController = new ZmContactController(contactApp._container, contactApp);
                            contactController.show(contact);
                            contactController.getCurrentToolbar().getButton(ZmOperation.SAVE).removeSelectionListeners();
                            contactController.getCurrentToolbar().addSelectionListener(ZmOperation.CANCEL, new AjxListener(this, ZmLeadListView._myCancelListener, [app]));
                            contactController.getCurrentToolbar().addSelectionListener(ZmOperation.SAVE, new AjxListener(this, ZmLeadListView._mySaveListener, [app]));

                        }
                    }]
                }, {
                    columnWidth: .33,
                    border: false,
                    layout: 'anchor',
                    items: [{
                        xtype: 'combo',
                        mode: 'local',
                        value: 'oppsection',
                        triggerAction: 'all',
                        forceSelection: true,
                        fieldLabel: biz_vnc_crm_client.section,
                        id: 'cmbOppsection',
                        name: 'title',
                        displayField: 'sectionName',
                        valueField: 'sectionId',
                        queryMode: 'local',
                        store: Ext.create('Ext.data.Store', {
                            model: 'section',
                            proxy: {
                                type: 'memory',
                                data: jsonParse(biz_vnc_crm_client.responseSection.text)
                            },
                            autoLoad: true,
                            actionMethods: {
                                read: 'POST'
                            }
                        }),
                        anchor: '95%'
                    }, {
                        xtype: 'combo',
                        mode: 'local',
                        value: 'oppcategory',
                        triggerAction: 'all',
                        forceSelection: true,
                        fieldLabel: biz_vnc_crm_client.category,
                        id: 'cmbOppcategory',
                        name: 'title',
                        displayField: 'categoryName',
                        valueField: 'categoryId',
                        queryMode: 'local',
                        store: Ext.create('Ext.data.Store', {
                            model: 'category',
                            proxy: {
                                type: 'memory',
                                data: jsonParse(biz_vnc_crm_client.responseCategory.text)
                            },
                            autoLoad: true,
                            actionMethods: {
                                read: 'POST'
                            }
                        }),
                        anchor: '95%'
                    }, {
                        xtype: 'textareafield',
                        grow: false,
                        id: 'txtOppDetails',
                        name: 'Details',
                        fieldLabel: biz_vnc_crm_client.description,
                        anchor: '95%'
                    }]
                }]
            }, {
                title: biz_vnc_crm_client.tabLead,
                height: 220,
                layout: 'column',
                items: [{
                    columnWidth: .33,
                    layout: 'anchor',
                    border: false,
                    items: [{
                        xtype: 'textfield',
                        id: 'txtOppStreet1',
                        fieldLabel: biz_vnc_crm_client.street1,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        id: 'txtOppStreet2',
                        fieldLabel: biz_vnc_crm_client.street2,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        id: 'txtOppCity',
                        fieldLabel: biz_vnc_crm_client.city,
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        id: 'txtOppZip',
                        fieldLabel: 'Zip',
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: biz_vnc_crm_client.workPhone,
                        id: 'txtOppWorkPhone',
                        anchor: '95%'
                    }]

                }, {
                    columnWidth: .33,
                    border: false,
                    layout: 'anchor',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: biz_vnc_crm_client.mobile,
                        id: 'txtOppMobile',
                        anchor: '95%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: biz_vnc_crm_client.fax,
                        id: 'txtOppFax',
                        anchor: '95%'
                    }, {
                        xtype: 'combo',
                        mode: 'local',
                        value: 'oppchannel',
                        triggerAction: 'all',
                        forceSelection: true,
                        fieldLabel: biz_vnc_crm_client.channel,
                        id: 'cmbOppchannel',
                        name: 'channel',
                        displayField: 'channelName',
                        valueField: 'channelId',
                        queryMode: 'local',
                        store: Ext.create('Ext.data.Store', {
                            model: 'channel',
                            proxy: {
                                type: 'memory',
                                data: jsonParse(biz_vnc_crm_client.responseChannel.text)
                            },
                            autoLoad: true,
                            actionMethods: {
                                read: 'POST'
                            }
                        }),
                        anchor: '95%'
                    }, {
                        xtype: 'combo',
                        mode: 'local',
                        value: 'oppstate',
                        triggerAction: 'all',
                        forceSelection: true,
                        fieldLabel: biz_vnc_crm_client.state,
                        id: 'cmbOppstate',
                        name: 'title',
                        displayField: 'stateName',
                        valueField: 'stateId',
                        queryMode: 'local',
                        autoSelect: true,
                        store: Ext.create('Ext.data.Store', {
                            model: 'state',
                            proxy: {
                                type: 'memory',
                                data: jsonParse(biz_vnc_crm_client.responseState.text)
                            },
                            autoLoad: true,
                            actionMethods: {
                                read: 'POST'
                            }
                        }),
                        anchor: '95%'
                    }, {
                        xtype: 'combo',
                        mode: 'local',
                        value: 'oppcountry',
                        triggerAction: 'all',
                        forceSelection: true,
                        fieldLabel: biz_vnc_crm_client.country,
                        id: 'cmbOppcountry',
                        name: 'title',
                        displayField: 'countryName',
                        valueField: 'countryId',
                        queryMode: 'local',
                        autoSelect: true,
                        store: Ext.create('Ext.data.Store', {
                            model: 'country',
                            proxy: {
                                type: 'memory',
                                data: jsonParse(biz_vnc_crm_client.responseCountry.text)
                            },
                            autoLoad: true,
                            actionMethods: {
                                read: 'POST'
                            }

                        }),
                        anchor: '95%'
                    }]
                }]
            }, {
                title: biz_vnc_crm_client.tabComm_History,
                id: 'oppComm',
                disabled: true,
                layout: 'column',
                width: '100%',
                height: 220,
                dockedItems: [{
                    xtype: 'toolbar',
                    items: [{
                        iconCls: 'attachment',
                        text: biz_vnc_crm_client.btnAttach,
                        handler: function () {
                            var flag = 1;
                            var leadId = biz_vnc_crm_client.leadId;
                            biz_vnc_crm_client_HandlerObject.prototype.showAttachMailDialog(leadId, flag);
                        }
                    }, {
                        iconCls: 'cancel',
                        text: biz_vnc_crm_client.btnDelete,
                        itemId: 'delete',
                        handler: function () {
                            Ext.MessageBox.confirm(biz_vnc_crm_client.msgConfirmHeader, biz_vnc_crm_client.msgConfirm, showResult);

                            function showResult(btn) {
                                if (btn == "yes") {
                                    var rec1 = Ext.getCmp('oppMailGrid').getSelectionModel().getSelection();
                                    var idArray = [];
                                    Ext.each(rec1, function (item) {
                                        idArray.push(item.data.mailId);
                                    });

                                    var leadId = biz_vnc_crm_client.leadId;
                                    var json = "jsonobj={\"action\":\"DELETEHISTORY\",\"object\":\"opp\",\"array\":\"" + idArray + "\",\"leadId\":\"" + leadId + "\"}";
                                    var reqHeader = {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    };
                                    var reqJson = AjxStringUtil.urlEncode(json);
                                    var responseUser = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                                    var json = "jsonobj={\"action\":\"LISTHISTORY\",\"object\":\"opp\",\"leadId\":\"" + leadId + "\"}";
                                    var reqHeader = {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    };
                                    var reqJson = AjxStringUtil.urlEncode(json);
                                    var responseMailHistory = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                                    var msgArray = [];
                                    var item;
                                    var msgArray = (responseMailHistory.text).split(",");
                                    if (msgArray != "null") {
                                        biz_vnc_crm_client.requestMailList(msgArray);
                                    } else {
                                        biz_vnc_crm_client.mailData = "[{'mailId':'','date':'','from':'','subject':'','message':''}]";
                                    }
                                    Ext.getCmp('oppMailGrid').getStore().loadData(jsonParse(biz_vnc_crm_client.mailData), false);
                                    Ext.getCmp('oppMailGrid').getView().refresh();
                                }
                            };
                        }
                    }, {
                        iconCls: 'refresh',
                        text: biz_vnc_crm_client.btnRefresh,
                        itemId: 'refresh',
                        handler: function () {
                            var leadId = biz_vnc_crm_client.leadId;
                            var json = "jsonobj={\"action\":\"LISTHISTORY\",\"object\":\"opp\",\"leadId\":\"" + leadId + "\"}";
                            var reqHeader = {
                                "Content-Type": "application/x-www-form-urlencoded"
                            };
                            var reqJson = AjxStringUtil.urlEncode(json);
                            var responseMailHistory = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                            var msgArray = [];
                            var item;
                            var msgArray = (responseMailHistory.text).split(",");
                            if (msgArray != "null") {
                                biz_vnc_crm_client.requestMailList(msgArray);
                            } else {
                                biz_vnc_crm_client.mailData = "[{'mailId':'','date':'','from':'','subject':'','message':''}]";
                            }
                            Ext.getCmp('oppMailGrid').getStore().loadData(jsonParse(biz_vnc_crm_client.mailData), false);
                            Ext.getCmp('oppMailGrid').getView().refresh();
                        }
                    }]
                }, {
                    xtype: 'grid',
                    selModel: oppSMMail,
                    id: 'oppMailGrid',
                    height: 195,
                    defaults: {
                        autoRender: true,
                        autoScroll: true
                    },
                    store: Ext.create('Ext.data.Store', {
                        model: 'oppMailModel',
                        proxy: {
                            type: 'memory',
                            data: jsonParse(biz_vnc_crm_client.mailData)
                        },
                        autoLoad: true,
                        actionMethods: {
                            read: 'POST'
                        }
                    }),
                    columnLines: true,
                    columns: [{
                        text: biz_vnc_crm_client.date,
                        sortable: false,
                        width: 120,
                        dataIndex: 'date',
                        renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                    }, {
                        text: biz_vnc_crm_client.from,
                        sortable: false,
                        width: 180,
                        dataIndex: 'from'
                    }, {
                        text: biz_vnc_crm_client.subject,
                        width: 250,
                        sortable: true,
                        dataIndex: 'subject'
                    }, {
                        text: biz_vnc_crm_client.message,
                        width: 500,
                        sortable: true,
                        dataIndex: 'message'
                    }],
                    title: null,
                    viewConfig: {
                        stripeRows: true
                    },
                    listeners: {
                        el:{
                                dblclick: function(){
                                    var rec = Ext.getCmp('oppMailGrid').getSelectionModel().selected;
                                    var mailID = rec.items[0].data.mailId;
                                    ZmMailMsgView.rfc822Callback(mailID, null, ZmId.VIEW_CONV);
                                }
                        }
                    },
                }]
            }, {
                title: biz_vnc_crm_client.tabAppointment,
                id: 'oppAppointment',
                disabled: true,
                layout: 'column',
                width: '100%',
                height: 220,
                dockedItems: [{
                    xtype: 'toolbar',
                    items: [{
                        iconCls: 'attachment',
                        text: biz_vnc_crm_client.btnAttach,
                        handler: function () {
                            var flag = 1;
                            var leadId = biz_vnc_crm_client.leadId;
                            biz_vnc_crm_client_HandlerObject.prototype.showAttachAppointmentDialog(leadId, flag);
                        }
                    }, {
                        iconCls: 'cancel',
                        text: biz_vnc_crm_client.btnDelete,
                        itemId: 'delete',
                        handler: function () {
                            Ext.MessageBox.confirm(biz_vnc_crm_client.msgConfirmHeader, biz_vnc_crm_client.msgConfirm, showResult);

                            function showResult(btn) {
                                if (btn == "yes") {
                                    var rec1 = Ext.getCmp('oppApptGrid').getSelectionModel().getSelection();
                                    var idArray = [];
                                    Ext.each(rec1, function (item) {
                                        idArray.push("'" + item.data.appointmentId + "'");
                                    });


                                    var leadId = biz_vnc_crm_client.leadId;
                                    var json = "jsonobj={\"action\":\"DELETEAPPT\",\"object\":\"opp\",\"array\":\"" + idArray + "\",\"leadId\":\"" + leadId + "\"}";
                                    var reqHeader = {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    };
                                    var reqJson = AjxStringUtil.urlEncode(json);
                                    var responseUser = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                                    var json = "jsonobj={\"action\":\"LISTAPPTHISTORY\",\"object\":\"opp\",\"leadId\":\"" + leadId + "\"}";
                                    var reqHeader = {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    };
                                    var reqJson = AjxStringUtil.urlEncode(json);
                                    var responseMailHistory = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                                    var msgArray = [];
                                    var item;
                                    var msgArray = (responseMailHistory.text).split(",");
                                    if (msgArray != "null") {
                                        biz_vnc_crm_client.requestApptList(msgArray);
                                    } else {
                                        biz_vnc_crm_client.apptData = "[{'subject':'','location1':'','calendar':'','startdate':''}]";
                                    }
                                    Ext.getCmp('oppApptGrid').getStore().loadData(jsonParse(biz_vnc_crm_client.apptData), false);
                                    Ext.getCmp('oppApptGrid').getView().refresh();
                                }
                            };
                        }
                    }, {
                        iconCls: 'appointment',
                        text: biz_vnc_crm_client.btnNew,
                        itemId: 'newappoint',
                        handler: function () {
                            biz_vnc_crm_client.flag = 1;
                            new ZmCRMCalViewController(appCtxt.getApp(ZmApp.CALENDAR)).newAppointmentHelper(new Date(), null, 10, null);
                        }
                    }, {
                        iconCls: 'refresh',
                        text: biz_vnc_crm_client.btnRefresh,
                        itemId: 'refresh',
                        handler: function () {
                            var leadId = biz_vnc_crm_client.leadId;
                            var json = "jsonobj={\"action\":\"LISTAPPTHISTORY\",\"object\":\"opp\",\"leadId\":\"" + leadId + "\"}";
                            var reqHeader = {
                                "Content-Type": "application/x-www-form-urlencoded"
                            };
                            var reqJson = AjxStringUtil.urlEncode(json);
                            var responseMailHistory = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                            var msgArray = [];
                            var item;
                            var msgArray = (responseMailHistory.text).split(",");
                            if (msgArray != "null") {
                                biz_vnc_crm_client.requestApptList(msgArray);
                            } else {
                                biz_vnc_crm_client.apptData = "[{'subject':'','location1':'','calendar':'','startdate':''}]";
                            }
                            Ext.getCmp('oppApptGrid').getStore().loadData(jsonParse(biz_vnc_crm_client.apptData), false);
                            Ext.getCmp('oppApptGrid').getView().refresh();

                        }
                    }]
                }, {
                    xtype: 'grid',
                    selModel: smAppoint,
                    id: 'oppApptGrid',
                    height: 195,
                    defaults: {
                        autoRender: true,
                        autoScroll: true
                    },
                    store: Ext.create('Ext.data.Store', {
                        model: 'oppApptModel',
                        proxy: {
                            type: 'memory',
                            data: jsonParse(biz_vnc_crm_client.apptData)
                        },
                        autoLoad: true,
                        actionMethods: {
                            read: 'POST'
                        }
                    }),
                    columnLines: true,
                    columns: [{
                        text: biz_vnc_crm_client.subject,
                        sortable: false,
                        width: 500,
                        dataIndex: 'subject'
                    }, {
                        text: biz_vnc_crm_client.locations,
                        sortable: false,
                        width: 250,
                        dataIndex: 'location1'
                    }, {
                        text: biz_vnc_crm_client.calendar,
                        width: 100,
                        sortable: true,
                        dataIndex: 'calendar'
                    }, {
                        text: biz_vnc_crm_client.start_date,
                        sortable: false,
                        width: 200,
                        dataIndex: 'startdate',
                        renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                    }],
                    title: null,
                    viewConfig: {
                        stripeRows: true
                    },
                    listeners: {
                        el: {
                            dblclick: function(){
                                var rec = Ext.getCmp('oppApptGrid').getSelectionModel().selected;
                                var apptId = rec.items[0].data.appointmentId;
                                biz_vnc_crm_client.viewApptDetails(apptId);
                            }
                        }
                    }
                }]
            }, {
                title: biz_vnc_crm_client.tabTask,
                id: 'oppTask',
                disabled: true,
                layout: 'column',
                width: '100%',
                height: 220,
                defaults: {
                    autoRender: true,
                    autoScroll: true
                },
                dockedItems: [{
                    xtype: 'toolbar',
                    items: [{
                        iconCls: 'attachment',
                        text: biz_vnc_crm_client.btnAttach,
                        handler: function () {
                            var leadId = biz_vnc_crm_client.leadId;
                            var flag = 1;
                            biz_vnc_crm_client_HandlerObject.prototype.showAttachTaskDialog(leadId, flag);
                        }
                    }, {
                        iconCls: 'cancel',
                        text: biz_vnc_crm_client.btnDelete,
                        itemId: 'delete',
                        handler: function () {
                            Ext.MessageBox.confirm(biz_vnc_crm_client.msgConfirmHeader, biz_vnc_crm_client.msgConfirm, showResult);

                            function showResult(btn) {
                                if (btn == "yes") {
                                    var rec1 = Ext.getCmp('oppTaskGrid').getSelectionModel().getSelection();
                                    var idArray = [];
                                    Ext.each(rec1, function (item) {
                                        idArray.push("'" + item.data.taskId + "'");
                                    });

                                    var leadId = biz_vnc_crm_client.leadId;
                                    var json = "jsonobj={\"action\":\"DELETETASK\",\"object\":\"opp\",\"array\":\"" + idArray + "\",\"leadId\":\"" + leadId + "\"}";
                                    var reqHeader = {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    };
                                    var reqJson = AjxStringUtil.urlEncode(json);
                                    var responseUser = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

                                    var leadId = biz_vnc_crm_client.leadId;
                                    var json = "jsonobj={\"action\":\"listTask\",\"object\":\"opp\",\"leadId\":\"" + leadId + "\"}";
                                    var reqHeader = {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    };
                                    var reqJson = AjxStringUtil.urlEncode(json);
                                    var responseTaskList = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

                                    var newtaskArray = (responseTaskList.text).split(",");

                                    var allTask = appCtxt.getTaskManager()._rawTasks;

                                    var taskArray = [];
                                    if (newtaskArray != null) {

                                        var k = 0;
                                        for (var i = 0; i < allTask.length; i++) {
                                            for (var j = 0; j < newtaskArray.length; j++) {
                                                if (allTask[i].invId == newtaskArray[j]) {
                                                    taskArray[k++] = newtaskArray[j];
                                                }
                                            }
                                        }
                                    }
                                    if (taskArray.length <= 0) {
                                        oppTaskListData = "[{'taskId':'','subject':'','status':'','complete':'','dueDate':''}]";
                                    } else {
                                        oppTaskListData = "[";
                                        var flag = 0;
                                        for (var i = 0; i < allTask.length; i++) {
                                            var temp = allTask[i];
                                            for (var j = 0; j < taskArray.length; j++) {
                                                if (temp.invId == taskArray[j]) {
                                                    if (flag == taskArray.length - 1) {
                                                        oppTaskListData += "{\"taskId\":\"" + temp.invId + "\",\"subject\":\"" + temp.name + "\",\"status\":\"" + ZmCalItem.getLabelForStatus(temp.status) + "\",\"complete\":\"" + temp.percentComplete + "\",\"dueDate\":\"" + new Date(temp.d) + "\"}]";
                                                    } else {
                                                        oppTaskListData += "{\"taskId\":\"" + temp.invId + "\",\"subject\":\"" + temp.name + "\",\"status\":\"" + ZmCalItem.getLabelForStatus(temp.status) + "\",\"complete\":\"" + temp.percentComplete + "\",\"dueDate\":\"" + new Date(temp.d) + "\"},";
                                                        flag++;
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    Ext.getCmp('oppTaskGrid').getStore().loadData(jsonParse(oppTaskListData), false);
                                    Ext.getCmp('oppTaskGrid').getView().refresh();
                                }
                            };
                        }
                    }, {
                        iconCls: 'task',
                        text: biz_vnc_crm_client.btnNew,
                        itemId: 'newappoint',
                        handler: function () {
                            biz_vnc_crm_client.flag = 1;
                            var leadId = biz_vnc_crm_client.leadId;
                            var taskController = new ZmCRMTaskController(appCtxt.getApp(ZmApp.TASKS)._container, appCtxt.getApp(ZmApp.TASKS), appCtxt.getCurrentViewId(), leadId);
                            taskController.initComposeView();
                            taskController.show(new ZmTask(null, null, 15), ZmCalItem.MODE_NEW, true);
                        }
                    }, {
                        iconCls: 'refresh',
                        text: biz_vnc_crm_client.btnRefresh,
                        itemId: 'refresh',
                        handler: function () {
                            var leadId = biz_vnc_crm_client.leadId;
                            var json = "jsonobj={\"action\":\"listTask\",\"object\":\"opp\",\"leadId\":\"" + leadId + "\"}";
                            var reqHeader = {
                                "Content-Type": "application/x-www-form-urlencoded"
                            };
                            var reqJson = AjxStringUtil.urlEncode(json);
                            var responseTaskList = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                            var newtaskArray = (responseTaskList.text).split(",");
                            var allTask = appCtxt.getTaskManager()._rawTasks;
                            var taskArray = [];
                            if (newtaskArray != null) {

                                var k = 0;
                                for (var i = 0; i < allTask.length; i++) {
                                    for (var j = 0; j < newtaskArray.length; j++) {
                                        if (allTask[i].invId == newtaskArray[j]) {
                                            taskArray[k++] = newtaskArray[j];
                                        }
                                    }
                                }
                            }
                            if (taskArray.length <= 0) {
                                oppTaskListData = "[{'taskId':'','subject':'','status':'','complete':'','dueDate':''}]";
                            } else {
                                oppTaskListData = "[";
                                var flag = 0;
                                for (var i = 0; i < allTask.length; i++) {
                                    var temp = allTask[i];
                                    for (var j = 0; j < taskArray.length; j++) {
                                        if (temp.invId == taskArray[j]) {
                                            if (flag == taskArray.length - 1) {
                                                oppTaskListData += "{\"taskId\":\"" + temp.invId + "\",\"subject\":\"" + temp.name + "\",\"status\":\"" + ZmCalItem.getLabelForStatus(temp.status) + "\",\"complete\":\"" + temp.percentComplete + "\",\"dueDate\":\"" + new Date(temp.d) + "\"}]";
                                            } else {
                                                oppTaskListData += "{\"taskId\":\"" + temp.invId + "\",\"subject\":\"" + temp.name + "\",\"status\":\"" + ZmCalItem.getLabelForStatus(temp.status) + "\",\"complete\":\"" + temp.percentComplete + "\",\"dueDate\":\"" + new Date(temp.d) + "\"},";
                                                flag++;
                                            }
                                        }
                                    }
                                }
                            }
                            Ext.getCmp('oppTaskGrid').getStore().loadData(jsonParse(oppTaskListData), false);
                            Ext.getCmp('oppTaskGrid').getView().refresh();
                    
                        }
                    }]
                }, {
                    xtype: 'grid',
                    selModel: oppSMTask,
                    id: 'oppTaskGrid',
                    height: 195,
                    
                    defaults: {
                        autoRender: true,
                        autoScroll: true
                    },
                    store: Ext.create('Ext.data.Store', {
                        model: 'oppTaskModel',
                        proxy: {
                            type: 'memory',
                            data: jsonParse(oppTaskListData)
                        },
                        autoLoad: true,
                        actionMethods: {
                            read: 'POST'
                        }
                    }),
                    columnLines: true,
                    columns: [{
                        text: biz_vnc_crm_client.subject,
                        sortable: false,
                        width: 500,
                        dataIndex: 'subject'
                    }, {
                        text: biz_vnc_crm_client.status,
                        width: 200,
                        sortable: true,
                        dataIndex: 'status'
                    }, {
                        text: biz_vnc_crm_client.complete,
                        width: 100,
                        sortable: true,
                        dataIndex: 'complete'
                    }, {
                        text: biz_vnc_crm_client.dueDate,
                        sortable: false,
                        width: 170,
                        dataIndex: 'dueDate',
                        renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                    }],
                    title: null,
                    viewConfig: {
                        stripeRows: true
                    },
                    listeners: {
                        el: {
                            dblclick: function(){
                                var rec = Ext.getCmp('oppTaskGrid').getSelectionModel().selected;
                                var taskId = rec.items[0].data.taskId;
                                biz_vnc_crm_client.viewTaskDetails(taskId);
                            }
                        }
                    }
                }]
            }, {
                title: biz_vnc_crm_client.tabExtraInfo,
                layout: 'column',
                height: 220,
                items: [{
                    columnWidth: .50,
                    border: false,
                    layout: 'anchor',
                    items: [{
                        xtype: 'datefield',
                        fieldLabel: biz_vnc_crm_client.creationDate,
                        format: 'Y-m-d H:i:s.0',
                        id: 'dateOppCreationdate',
                        disabled: true,
                        anchor: '60%'
                    }, {
                        xtype: 'datefield',
                        id: 'dateOppUpdateDate',
                        format: 'Y-m-d H:i:s.0',
                        disabled: true,
                        fieldLabel: biz_vnc_crm_client.updateDate,
                        anchor: '60%'
                    }, {
                        xtype: 'datefield',
                        id: 'dateOppOpened',
                        format: 'Y-m-d H:i:s.0',
                        disabled: true,
                        fieldLabel: biz_vnc_crm_client.opened,
                        anchor: '60%'
                    }, {
                        xtype: 'datefield',
                        id: 'dateOppClosed',
                        format: 'Y-m-d H:i:s.0',
                        disabled: true,
                        fieldLabel: biz_vnc_crm_client.closed,
                        anchor: '60%'
                    }]
                }, {
                    columnWidth: .50,
                    border: false,
                    layout: 'anchor',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: biz_vnc_crm_client.daystoOpen,
                        id: 'txtOppDaysToOpen',
                        name: 'days2open',
                        disabled: true,
                        value: '0.00',
                        anchor: '60%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: biz_vnc_crm_client.daystoClose,
                        id: 'txtOppDaysToClose',
                        disabled: true,
                        name: 'days2close',
                        value: '0.00',
                        anchor: '60%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: biz_vnc_crm_client.referredBy,
                        id: 'txtOppReferredBy',
                        name: 'last',
                        anchor: '60%'
                    }]
                }]
            }],
            listeners: {
                'tabchange': function (tabPanel, tab) {
                    if (tab.id == 'oppAppointment') {
                        Ext.getCmp('oppApptGrid').getStore().removeAll();
                        var leadId = biz_vnc_crm_client.leadId;
                        var json = "jsonobj={\"action\":\"LISTAPPTHISTORY\",\"object\":\"opp\",\"leadId\":\"" + leadId + "\"}";
                        var reqHeader = {
                            "Content-Type": "application/x-www-form-urlencoded"
                        };
                        var reqJson = AjxStringUtil.urlEncode(json);
                        var responseMailHistory = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                        var msgArray = [];
                        var item;
                        var msgArray = (responseMailHistory.text).split(",");
                        if (msgArray != "null") {
                            biz_vnc_crm_client.requestApptList(msgArray);

                            Ext.getCmp('oppApptGrid').getStore().loadData(jsonParse(biz_vnc_crm_client.apptData), false);
                            Ext.getCmp('oppApptGrid').getView().refresh();
                        } else {
                            biz_vnc_crm_client.apptData = "[{'subject':'','location1':'','calendar':'','startdate':''}]";
                        }
                    } else if (tab.id == 'oppTask') {
                        Ext.getCmp('oppTaskGrid').getStore().removeAll();
                        var leadId = biz_vnc_crm_client.leadId;
                        var json = "jsonobj={\"action\":\"listTask\",\"object\":\"opp\",\"leadId\":\"" + leadId + "\"}";
                        var reqHeader = {
                            "Content-Type": "application/x-www-form-urlencoded"
                        };
                        var reqJson = AjxStringUtil.urlEncode(json);
                        var responseOppTaskList = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                        var newtaskArray = (responseOppTaskList.text).split(",");
                        var allTask = appCtxt.getTaskManager()._rawTasks;
                        var taskArray = [];
                        if (newtaskArray != null) {
                            var k = 0;
                            for (var i = 0; i < allTask.length; i++) {
                                for (var j = 0; j < newtaskArray.length; j++) {
                                    if (allTask[i].invId == newtaskArray[j]) {
                                        taskArray[k++] = newtaskArray[j];
                                    }
                                }
                            }
                        }
                        if (taskArray.length <= 0) {
                            oppTaskListData = "[{'taskId':'','subject':'','status':'','complete':'','dueDate':''}]";
                        } else {
                            oppTaskListData = "[";
                            var flag = 0;
                            for (var i = 0; i < allTask.length; i++) {
                                var temp = allTask[i];
                                for (var j = 0; j < taskArray.length; j++) {
                                    if (temp.invId == taskArray[j]) {
                                        if (flag == taskArray.length - 1) {
                                            oppTaskListData += "{\"taskId\":\"" + temp.invId + "\",\"subject\":\"" + temp.name + "\",\"status\":\"" + ZmCalItem.getLabelForStatus(temp.status) + "\",\"complete\":\"" + temp.percentComplete + "\",\"dueDate\":\"" + new Date(temp.d) + "\"}]";
                                        } else {
                                            oppTaskListData += "{\"taskId\":\"" + temp.invId + "\",\"subject\":\"" + temp.name + "\",\"status\":\"" + ZmCalItem.getLabelForStatus(temp.status) + "\",\"complete\":\"" + temp.percentComplete + "\",\"dueDate\":\"" + new Date(temp.d) + "\"},";
                                            flag++;
                                        }
                                    }
                                }
                            }
                        }
                        Ext.getCmp('oppTaskGrid').getStore().loadData(jsonParse(oppTaskListData), false);
                        Ext.getCmp('oppTaskGrid').getView().refresh();
                    } else if (tab.id == 'oppComm') {
                        Ext.getCmp('oppMailGrid').getStore().removeAll();
                        var leadId = biz_vnc_crm_client.leadId;
                        var json = "jsonobj={\"action\":\"LISTHISTORY\",\"object\":\"opp\",\"leadId\":\"" + leadId + "\"}";
                        var reqHeader = {
                            "Content-Type": "application/x-www-form-urlencoded"
                        };
                        var reqJson = AjxStringUtil.urlEncode(json);
                        var responseMailHistory = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                        var msgArray = [];
                        var item;
                        var msgArray = (responseMailHistory.text).split(",");

                        if (msgArray != "null") {
                            biz_vnc_crm_client.requestMailList(msgArray);

                            Ext.getCmp('oppMailGrid').getStore().loadData(jsonParse(biz_vnc_crm_client.mailData), false);
                            Ext.getCmp('oppMailGrid').getView().refresh();
                        } else {
                            biz_vnc_crm_client.mailData = "[{'mailId':'','date':'','from':'','subject':'','message':''}]";
                        }
                    }
                }
            }
        }],
        buttons: [{
            text: biz_vnc_crm_client.btnSave,
            id: 'btnOppsave',
            disabled: true,
            width: 150,
            height: 25,
            iconCls: 'save',
            handler: function () {

                if (Ext.getCmp('txtOppOpportunity').getValue() == "") {
                    Ext.getCmp('txtOppOpportunity').validate(false);
                    Ext.getCmp('txtOppOpportunity').focus(true);
                    Ext.example.msg('', biz_vnc_crm_client.msgEmptyField);

                } else {

                    var subjectName = Ext.getCmp('txtOppOpportunity').getValue();
                    var stageId = Ext.getCmp('cmbOppstage').getValue();
                    var probability = Ext.getCmp('txtOppProbability').getValue();
                    var nextAction = Ext.getCmp('txtOppNextAction').getValue();
                    var sectionId = Ext.getCmp('cmbOppsection').getValue();
                    var categoryId = Ext.getCmp('cmbOppcategory').getValue();
                    var partnerName = Ext.getCmp('cmbOpppartner').getValue();
                    var leadDescription = Ext.getCmp('txtOppDetails').getValue();
                    var contactName = Ext.getCmp('txtOppContact').getValue();
                    var email = Ext.getCmp('txtOppEmail').getValue();
                    var fax = Ext.getCmp('txtOppFax').getValue();

                    var phone = Ext.getCmp('txtOppPhone').getValue();
                    var mobile = Ext.getCmp('txtOppMobile').getValue();
                    var street1 = Ext.getCmp('txtOppStreet1').getValue();
                    var street2 = Ext.getCmp('txtOppStreet2').getValue();
                    var city = Ext.getCmp('txtOppCity').getValue();

                    var zip = Ext.getCmp('txtOppZip').getValue();
                    var stateId = Ext.getCmp('cmbOppstate').getValue();

                    var countryId = Ext.getCmp('cmbOppcountry').getValue();
                    var channelId = Ext.getCmp('cmbOppchannel').getValue();
                    var leadClassId = Ext.getCmp('cmbOppleadClass').getValue();
                    var companyId = Ext.getCmp('cmbOppcompanyName').getValue();

                    var status = true;
                    var createBy = appCtxt.getUsername();

                    var expectedDateClose = Ext.getCmp('dateOppExpectedClosing').getSubmitValue();
                    if (expectedDateClose == '') {
                        expectedDateClose = '0000-00-00 00:00:00';
                    }

                    var nextActionDate = Ext.getCmp('dateOppNextActionDate').getSubmitValue();
                    if (nextActionDate == '') {
                        nextActionDate = '0000-00-00 00:00:00';
                    }

                    var createDate = Ext.getCmp('dateOppCreationdate').getSubmitValue();
                    if (createDate == '') {
                        createDate = '0000-00-00 00:00:00';
                    }

                    var writeBy = appCtxt.getUsername();
                    var writeDate = Ext.getCmp('dateOppUpdateDate').getSubmitValue();
                    if (writeDate == '') {
                        writeDate = '0000-00-00 00:00:00';
                    }
                    var dateOpen = Ext.getCmp('dateOppOpened').getSubmitValue();
                    if (dateOpen == '') {
                        dateOpen = '0000-00-00 00:00:00';
                    }

                    var dateClose = Ext.getCmp('dateOppClosed').getSubmitValue();
                    if (dateClose == '') {
                        dateClose = '0000-00-00 00:00:00';
                    }
                    var dayopen = Ext.getCmp('txtOppDaysToOpen').getValue();
                    var dayclose = Ext.getCmp('txtOppDaysToClose').getValue();
                    var referredBy = Ext.getCmp('txtOppReferredBy').getValue();

                    var userId = Ext.getCmp('cmbOppsalesman').getValue();
                    if (userId == null) {
                        userId = appCtxt.getUsername();
                    }
                    var leadState = Ext.getCmp('txtOppState').getValue();
                    var priorityId = Ext.getCmp('cmbOpppriority').getValue();
                    var type = 1;

                    var valuation = Ext.getCmp('txtOppExpectedRevenue').getValue();

                    var workPhone = Ext.getCmp('txtOppWorkPhone').getValue();
                    var leadId = biz_vnc_crm_client.leadId;
                    var j = JSON.stringify({
                        action: "UPDATE",
                        object: "opp",
                        leadId: leadId,
                        subjectName: subjectName,
                        stageId: stageId,
                        priorityId: priorityId,
                        channelId: channelId,
                        categoryId: categoryId,
                        contactName: contactName,
                        email: email,
                        street1: street1,
                        city: city,
                        stateId: stateId,
                        countryId: countryId,
                        type: type,
                        writeDate: writeDate,
                        writeBy: writeBy,
                        createDate: createDate,
                        createBy: createBy,
                        status: status,
                        nextAction: nextAction,
                        nextActionDate: nextActionDate,
                        userId: userId,
                        referredBy: referredBy,
                        dayClose: dayclose,
                        dayOpen: dayopen,
                        sectionId: sectionId,
                        expectedDateClose: expectedDateClose,
                        dateClose: dateClose,
                        dateOpen: dateOpen,
                        zip: zip,
                        street2: street2,
                        mobile: mobile,
                        workPhone: workPhone,
                        fax: fax,
                        phone: phone,
                        leadDescription: leadDescription,
                        valuation: valuation,
                        companyId: companyId,
                        leadState: leadState,
                        leadClassId: leadClassId,
                        probability: probability,
                        partnerName: partnerName
                    });
                    var json = "jsonobj=" + j;
                    var reqHeader = {
                        "Content-Type": "application/x-www-form-urlencoded"
                    };
                    var reqJson = AjxStringUtil.urlEncode(json);
                    var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                    if (response.text == 1) {
                         Ext.example.msg('', biz_vnc_crm_client.msgEdit);
                        biz_vnc_crm_client.initOpportunityGrid(app);
                    } else {
                        Ext.example.msg('', biz_vnc_crm_client.msgNotEdit);
                        biz_vnc_crm_client.initOpportunityGrid(app);
                    }
                }
            }
        }]
    });

    var OpportunityPanel = Ext.create('Ext.panel.Panel', {
        width: '100%',
        id: 'opportunityPanel',
        height: 650,
        layout: 'border',
        bodyBorder: true,
        defaults: {
            collapsible: true,
            split: true,
            animFloat: false,
            autoHide: false,
            useSplitTips: true
        },
        tbar: [{
            xtype: 'buttongroup',
            items: [{
                tooltip: 'Create new opportunity.',
                id: 'btnCreateOpportunity',
                text: biz_vnc_crm_client.btnCreate,
                iconCls: 'add24',
                scale: 'medium',
                handler: function () {
                    var json = "jsonobj={\"action\":\"COUNT\",\"object\":\"opp\"}";
                    var reqHeader = {
                        "Content-Type": "application/x-www-form-urlencoded"
                    };
                    var reqJson = AjxStringUtil.urlEncode(json);
                    var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

                    if (response.text == 2){
                        Ext.Msg.alert(biz_vnc_crm_client.notification, biz_vnc_crm_client.usageLimitMessage);
                        return;
                    }

                    biz_vnc_crm_client.mailData = "";
                    var toolbar = app.getToolbar();
                    toolbar.visible = true;
                    var content = AjxTemplate.expand("biz_vnc_crm_client.templates.OpportunityForm#OpportunityFormMain");
                    app.setContent(content);
                    var rec;
                    ZmOpportunityListView.prototype.getContacts(0, [], rec, app);
                }
            }, {
                id: 'btnEditOpportunity',
                tooltip: 'Edit selected lead.',
                disabled: true,
                text: biz_vnc_crm_client.btnEdit,
                iconCls: 'add16',
                scale: 'medium',
                handler: function () {

                    var rec = Ext.getCmp('opportunityGrid').getSelectionModel().getSelection();
                    Ext.each(rec, function (item) {
                        rec = item;
                    });
                    var content = AjxTemplate.expand("biz_vnc_crm_client.templates.OpportunityForm#OpportunityFormMain");
                    app.setContent(content);
                    ZmOpportunityListView.prototype.getContacts(0, [], rec, app);

                }
            }, {

                tooltip: 'Delete selected lead.',
                id: 'btnDeleteOpportunity',
                disabled: true,
                text: biz_vnc_crm_client.btnDelete,
                iconCls: 'delete',
                scale: 'medium',
                handler: function () {
                    var rec = Ext.getCmp('opportunityGrid').getSelectionModel().getSelection();
                    var idArray = [];
                    Ext.each(rec, function (item) {
                        idArray.push(item.data.leadId);
                    });

                    Ext.MessageBox.confirm(biz_vnc_crm_client.msgConfirmHeader, biz_vnc_crm_client.msgConfirm, showResult);

                    function showResult(btn) {
                        if (btn == "yes") {
                            var name = appCtxt.getUsername();
                            var json = "jsonobj={\"action\":\"DELETEBYID\",\"object\":\"lead\",\"array\":\"" + idArray + "\",\"writeBy\":\"" + name + "\"}";
                            var reqHeader = {
                                "Content-Type": "application/x-www-form-urlencoded"
                            };
                            var reqJson = AjxStringUtil.urlEncode(json);
                            var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                            Ext.example.msg('', biz_vnc_crm_client.msgDelete);
                            biz_vnc_crm_client.initOpportunityGrid(app);
                        }

                    };


                }
            }]
        }],
        items: [{
            title: biz_vnc_crm_client.lblOpportunityForm,
            region: 'south',
            layout: 'fit',
            defaults: {
                autoRender: true,
                autoScroll: true
            },
            id: 'footerOppPanel',
            hidden: true,
            items: [OpportunityFooterPanel]
        }, {
            title: biz_vnc_crm_client.lblMyOpportunities,
            collapsible: false,
            region: 'center',
            xtype: 'grid',
            id: 'opportunityGrid',
            selModel: sm1,
            layout: 'fit',
            defaults: {
                autoRender: true,
                autoScroll: true
            },
            store: Ext.create('Ext.data.Store', {
                model: 'model_1',
                proxy: {
                    type: 'memory',
                    data: jsonParse(response.text)
                },
                autoLoad: true,
                actionMethods: {
                    read: 'POST'
                }
            }),
            viewConfig: {
                stripeRows: true
            },
            columns: [{
                sortable: false,
                xtype: 'actioncolumn',
                width: 25,
                items: [{
                    icon: "/service/zimlet/biz_vnc_crm_client/default/btn/pencil.gif", // Use a URL in the icon config
                    tooltip: biz_vnc_crm_client.btnEdit,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);

                        var content = AjxTemplate.expand("biz_vnc_crm_client.templates.OpportunityForm#OpportunityFormMain");
                        app.setContent(content);
                        ZmOpportunityListView.prototype.getContacts(0, [], rec, app);
                    }
                }]
            }, {
                header: biz_vnc_crm_client.creationDate,
                width: 120,
                dataIndex: 'createDate',
                sortable: true
            }, {
                header: biz_vnc_crm_client.opportunity,
                width: 150,
                dataIndex: 'subjectName',
                sortable: true
            }, {
                header: biz_vnc_crm_client.leadClass,
                width: 150,
                dataIndex: 'leadClassName',
                sortable: true
            }, {
                header: biz_vnc_crm_client.customer,
                width: 150,
                dataIndex: 'contactName',
                sortable: true
            }, {
                header: biz_vnc_crm_client.nextActionDate,
                width: 120,
                dataIndex: 'nextActionDate',
                sortable: true
            }, {
                header: biz_vnc_crm_client.nextAction,
                width: 150,
                dataIndex: 'nextAction',
                sortable: true
            }, {
                header: biz_vnc_crm_client.stage,
                width: 150,
                dataIndex: 'stageName',
                sortable: true
            }, {
                header: biz_vnc_crm_client.expectedRevenue,
                width: 150,
                dataIndex: 'valuation',
                sortable: true
            }, {
                header: biz_vnc_crm_client.probability,
                width: 110,
                dataIndex: 'probability',
                sortable: true
            }, {
                header: biz_vnc_crm_client.salesman,
                width: 120,
                dataIndex: 'userId',
                sortable: true
            }, {
                header: biz_vnc_crm_client.state,
                width: 120,
                dataIndex: 'leadState',
                sortable: true
            }, {
                sortable: false,
                xtype: 'actioncolumn',
                width: 25,
                items: [{
                    icon: '/service/zimlet/biz_vnc_crm_client/default/btn/cancel.png',
                    tooltip: biz_vnc_crm_client.btnDelete,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        Ext.MessageBox.confirm(biz_vnc_crm_client.msgConfirmHeader, biz_vnc_crm_client.msgConfirm, showResult);

                        function showResult(btn) {
                            if (btn == "yes") {
                                var name = appCtxt.getUsername();
                                var idArray = rec.get('leadId');
                                var json = "jsonobj={\"action\":\"DELETEBYID\",\"object\":\"lead\",\"array\":\"" + idArray + "\",\"writeBy\":\"" + name + "\"}";
                                var reqHeader = {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                };
                                var reqJson = AjxStringUtil.urlEncode(json);
                                var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                                Ext.example.msg('', biz_vnc_crm_client.msgDelete);
                                biz_vnc_crm_client.initOpportunityGrid(app);
                            }
                        };
                    }
                }]
            }]

        }],
        renderTo: 'datagridOpportunity'
    });

    var grid = Ext.getCmp('opportunityGrid');
    grid.getSelectionModel().on('selectionchange', function (sm, selectedRecord) {
        if (selectedRecord.length) {
            Ext.getCmp('footerOppPanel').show();
            Ext.getCmp('btnOppsave').enable();
            Ext.getCmp('btnOppAddContact').enable();
            Ext.getCmp('oppTask').setDisabled(false);
            Ext.getCmp('oppAppointment').setDisabled(false);
            Ext.getCmp('oppComm').setDisabled(false);
            Ext.getCmp('oppTabPanel').setActiveTab(0);
            var rec = selectedRecord[0];
            if (rec != null) {
                biz_vnc_crm_client.leadId = rec.get('leadId');

                Ext.getCmp('cmbOpppartner').getStore().load({
                    callback: function () {
                        Ext.getCmp('cmbOpppartner').setValue(rec.get('partnerName'));
                    }
                });
                Ext.getCmp('cmbOppstage').getStore().load({
                    callback: function () {
                        Ext.getCmp('cmbOppstage').setValue(rec.get('stageId'));
                    }
                });
                Ext.getCmp('cmbOpppriority').getStore().load({
                    callback: function () {
                        Ext.getCmp('cmbOpppriority').setValue(rec.get('priorityId'));
                    }
                });
                Ext.getCmp('cmbOppsection').getStore().load({
                    callback: function () {
                        Ext.getCmp('cmbOppsection').setValue(rec.get('sectionId'));
                    }
                });

                Ext.getCmp('cmbOppchannel').getStore().load({
                    callback: function () {
                        Ext.getCmp('cmbOppchannel').setValue(rec.get('channelId'));
                    }
                });
                Ext.getCmp('cmbOppstate').getStore().load({
                    callback: function () {
                        Ext.getCmp('cmbOppstate').setValue(rec.get('stateId'));
                    }
                });
                Ext.getCmp('cmbOppcountry').getStore().load({
                    callback: function () {
                        Ext.getCmp('cmbOppcountry').setValue(rec.get('countryId'));
                    }
                });
                Ext.getCmp('cmbOppcategory').getStore().load({
                    callback: function () {
                        Ext.getCmp('cmbOppcategory').setValue(rec.get('categoryId'));
                    }
                });
                Ext.getCmp('cmbOppcompanyName').getStore().load({
                    callback: function () {
                        Ext.getCmp('cmbOppcompanyName').setValue(rec.get('companyId'));
                    }
                });
                Ext.getCmp('cmbOppsalesman').getStore().load({
                    callback: function () {
                        Ext.getCmp('cmbOppsalesman').setValue(rec.get('userId'));
                    }
                });
                Ext.getCmp('cmbOppleadClass').getStore().load({
                    callback: function () {
                        Ext.getCmp('cmbOppleadClass').setValue(rec.get('leadClassId'));
                    }
                });

                Ext.getCmp('txtOppContact').setValue(rec.get('contactName'));
                Ext.getCmp('txtOppOpportunity').setValue(rec.get('subjectName'));
                Ext.getCmp('txtOppExpectedRevenue').setValue(rec.get('valuation'));
                Ext.getCmp('txtOppNextAction').setValue(rec.get('nextAction'));
                Ext.getCmp('txtOppProbability').setValue(rec.get('probability'));
                Ext.getCmp('txtOppEmail').setValue(rec.get('email'));
                Ext.getCmp('txtOppPhone').setValue(rec.get('phone'));

                Ext.getCmp('txtOppDetails').setValue(rec.get('leadDescription'));
                Ext.getCmp('txtOppStreet1').setValue(rec.get('street1'));
                Ext.getCmp('txtOppStreet2').setValue(rec.get('street2'));
                Ext.getCmp('txtOppCity').setValue(rec.get('city'));
                Ext.getCmp('txtOppZip').setValue(rec.get('zip'));

                Ext.getCmp('txtOppWorkPhone').setValue(rec.get('workPhone'));
                Ext.getCmp('txtOppMobile').setValue(rec.get('mobile'));
                Ext.getCmp('txtOppFax').setValue(rec.get('fax'));
                Ext.getCmp('txtOppDaysToOpen').setValue(rec.get('dayOpen'));
                Ext.getCmp('txtOppDaysToClose').setValue(rec.get('dayClose'));

                Ext.getCmp('txtOppReferredBy').setValue(rec.get('referredBy'));
                Ext.getCmp('dateOppExpectedClosing').setValue(rec.get('expectedDateClose'));
                Ext.getCmp('dateOppOpened').setValue(rec.get('dateOpen'));
                Ext.getCmp('dateOppClosed').setValue(rec.get('dateClose'));

                Ext.getCmp('dateOppCreationdate').setValue(rec.get('createDate'));

                Ext.getCmp('dateOppUpdateDate').setValue(rec.get('writeDate'));
                Ext.getCmp('dateOppNextActionDate').setValue(rec.get('nextActionDate'));
            }
        } else {
            Ext.getCmp('footerOppPanel').hide();
            Ext.getCmp('btnOppsave').disable();
            Ext.getCmp('btnOppAddContact').disable();
            Ext.getCmp('oppTask').setDisabled(true);
            Ext.getCmp('oppAppointment').setDisabled(true);
            Ext.getCmp('oppComm').setDisabled(true);
        }
    });

};

biz_vnc_crm_client.requestMailList = function (msgArray) {

    biz_vnc_crm_client.mailData = "[";
    var soapDoc = AjxSoapDoc.create("BatchRequest", "urn:zimbra");
    soapDoc.setMethodAttribute("onerror", "continue");
    for (var j = 0; j < msgArray.length; j++) {
        var getMsgRequest = soapDoc.set("GetMsgRequest", null, null, "urn:zimbraMail");
        var action = soapDoc.set("m");
        action.setAttribute("html", 0);
        action.setAttribute("needExp", 1);
        action.setAttribute("id", msgArray[j]);
        getMsgRequest.appendChild(action);
    }
    var bc = appCtxt.getAppController().sendRequest({
        soapDoc: soapDoc,
        asyncMode: false
    });
    var msgResp = bc.BatchResponse.GetMsgResponse;
    var respLen = msgResp.length;
    for (var i = 0; i < respLen; i++) {
        var resp = msgResp[i].m[0];
        if (i == respLen - 1) {
            biz_vnc_crm_client.mailData += "{\"mailId\":\"" + msgArray[i] + "\",\"date\":\"" + new Date(resp.d) + "\",\"from\":\"" + resp.e[0].a + "\",\"subject\":\"" + resp.su + "\",\"message\":\"" + resp.fr + "\"}]";
        } else {
            biz_vnc_crm_client.mailData += "{\"mailId\":\"" + msgArray[i] + "\",\"date\":\"" + new Date(resp.d) + "\",\"from\":\"" + resp.e[0].a + "\",\"subject\":\"" + resp.su + "\",\"message\":\"" + resp.fr + "\"},";
        }
    }

}

biz_vnc_crm_client.requestApptList = function (msgArray) {

    biz_vnc_crm_client.apptData = "[";
    var soapDoc = AjxSoapDoc.create("BatchRequest", "urn:zimbra");
    soapDoc.setMethodAttribute("onerror", "continue");
    for (var j = 0; j < msgArray.length; j++) {
        var getMsgRequest = soapDoc.set("GetMsgRequest", null, null, "urn:zimbraMail");
        var action = soapDoc.set("m");
        action.setAttribute("html", 0);
        action.setAttribute("needExp", 1);
        action.setAttribute("id", msgArray[j]);
        getMsgRequest.appendChild(action);
    }
    var bc = appCtxt.getAppController().sendRequest({
        soapDoc: soapDoc,
        asyncMode: false
    });
    var msgResp = bc.BatchResponse.GetMsgResponse;
    var respLen = msgResp.length;
    for (var i = 0; i < respLen; i++) {
        var resp = msgResp[i].m[0].inv[0].comp[0];
        if (i == respLen - 1) {
            biz_vnc_crm_client.apptData += "{\"appointmentId\":\"" + msgArray[i] + "\",\"subject\":\"" + resp.name + "\",\"location1\":\"" + resp.loc + "\",\"calendar\":\"" + appCtxt.getFolderTree().getById(resp.ciFolder).name + "\",\"startdate\":\"" + new Date(resp.d) + "\"}]";
        } else {
            biz_vnc_crm_client.apptData += "{\"appointmentId\":\"" + msgArray[i] + "\",\"subject\":\"" + resp.name + "\",\"location1\":\"" + resp.loc + "\",\"calendar\":\"" + appCtxt.getFolderTree().getById(resp.ciFolder).name + "\",\"startdate\":\"" + new Date(resp.d) + "\"},";
        }
    }
}

/**
 * This method gets called by the Zimlet framework each time the application is opened or closed.
 *  
 * @param    {String}    appName        the application name
 * @param    {Boolean}    active        if <code>true</code>, the application status is open; otherwise, <code>false</code>
 */

biz_vnc_crm_client_HandlerObject.prototype.appActive = function (appName, active) {
    switch (appName) {
    case this._tabAppName:
        {
            var buttonIndex = 0;
            if (active) {
                var app = appCtxt.getApp(this._tabAppName);
                var overview = app.getOverview(); // returns ZmOverview
                overview.setContent("<b>" + biz_vnc_crm_client.sales + "</b>");

                var controller = appCtxt.getAppController();
                var appChooser = controller.getAppChooser();

                var app = appCtxt.getApp(this._tabAppName);
                biz_vnc_crm_client_HandlerObject.prototype.setview(app);

            }
            break;
        }
    }
};


/**
 * This method gets called by the Zimlet framework when the application is opened for the first time.
 *  
 * @param    {String}    appName        the application name        
 */
biz_vnc_crm_client_HandlerObject.prototype.appLaunch = function (appName) {
    switch (appName) {
    case this._tabAppName:
        {
            var app = appCtxt.getApp(this._tabAppName);
            biz_vnc_crm_client_HandlerObject.prototype.settoolbar(app);
            ZmDashboardView.dashboard(app);
            break;
        }
    }
};

biz_vnc_crm_client_HandlerObject.prototype._add = function (new_button, app) {

    if (new_button.isToggled()) {
        new_button.setSelected(false);
    } else {
        new_button.setSelected(true);
    }

    var toolbar = app.getToolbar();
    var arrOfEle = toolbar.getChildren()
    var idArray = [];
    for (var i = 0; i < 3; i++) {
        if (arrOfEle[i].isToggled()) {
            var str = "'" + arrOfEle[i].getHTMLElId() + "'";
            idArray.push(str);
        }
    }



    if (biz_vnc_crm_client._flag == 0) {
        biz_vnc_crm_client.initLeadGrid(app);
    } else if (biz_vnc_crm_client._flag == 1) {
        biz_vnc_crm_client.initOpportunityGrid(app);
    }

};

biz_vnc_crm_client_HandlerObject.prototype.setview = function (app) {


    var overview = app.getOverview();
    var treeview = new ZmTreeView({
        parent: overview,
        overviewId: 'com_egroup_schedule_treeview'
    });

    var tree_item_dashboard = new DwtTreeItem({
        parent: treeview,
        icon: "week",
        text: biz_vnc_crm_client.btndashboard
    });

    var tree_item_lead = new DwtTreeItem({
        parent: treeview,
        icon: "week",
        text: biz_vnc_crm_client.btnleads
    });

    var tree_item_opportunity = new DwtTreeItem({
        parent: treeview,
        text: biz_vnc_crm_client.btnopportunities,
        icon: "zimbraicon"
    });

    var tree_item_reports = new DwtTreeItem({
        parent: treeview,
        text: biz_vnc_crm_client.btnreports,
        icon: "zimbraicon"
    });

    tree_item_dashboard.enableSelection(true);
    tree_item_lead.enableSelection(true);
    tree_item_opportunity.enableSelection(true);
    tree_item_reports.enableSelection(true);
    treeview.addChild(tree_item_dashboard);
    treeview.addChild(tree_item_lead);
    treeview.addChild(tree_item_opportunity);
    treeview.addChild(tree_item_reports);

    var lead_button_listener = new AjxListener(this, this._eventTreeViewSelected, app);
    treeview.addSelectionListener(lead_button_listener);
};

biz_vnc_crm_client_HandlerObject.prototype.settoolbar = function (app) {

    var idindex = 0;
    var toolbar = app.getToolbar();
    if (toolbar.getItemCount() == 0) {
        var new_button_params = {
            id: 'New',
            text: biz_vnc_crm_client.btnNew,
            image: "new",
            tooltip: 'New button',
            index: idindex++
        }
        var open_button_params = {
            id: 'In Progress',
            text: biz_vnc_crm_client.btnopen,
            image: "open",
            tooltip: 'Open button',
            index: idindex++
        }

        var pending_button_params = {
            parent: 'toolbar',
            id: 'Pending',
            text: biz_vnc_crm_client.btnpending,
            image: "pending",
            tooltip: 'Pending button',
            index: idindex++
        }

        var new_button = toolbar.createButton(new_button_params, new_button_params);
        new_button.addSelectionListener(new AjxListener(this, this._add, [new_button, app]));

        var open_button = toolbar.createButton(open_button_params, open_button_params);
        open_button.addSelectionListener(new AjxListener(this, this._add, [open_button, app]));

        var pending_button = toolbar.createButton(pending_button_params, pending_button_params);
        pending_button.addSelectionListener(new AjxListener(this, this._add, [pending_button, app]));

        var toolbar = app.getToolbar();
        toolbar.setVisibility(false);
    }

};

biz_vnc_crm_client_HandlerObject.prototype._eventTreeViewSelected = function (app, ev) {
    if (ev.items.length == 1 && ev.detail == DwtTree.ITEM_SELECTED) {
        var tree_item = DwtControl.getTargetControl(ev, false);
        if (tree_item.getText() == biz_vnc_crm_client.btndashboard) {
            ZmDashboardView.dashboard(app);
        } else if (tree_item.getText() == biz_vnc_crm_client.btnleads) {
            var toolbar = app.getToolbar();
            toolbar.setVisibility(true);
            var arrOfEle = toolbar.getChildren();
            for (var i = 0; i < arrOfEle.length ; i++) {
                arrOfEle[i].setSelected(false);
            }
            biz_vnc_crm_client.initLeadGrid(app);
        } else if (tree_item.getText() == biz_vnc_crm_client.btnopportunities) {
            var toolbar = app.getToolbar();
            toolbar.setVisibility(true);
            var arrOfEle = toolbar.getChildren();
            for (var i = 0; i < arrOfEle.length ; i++) {
                arrOfEle[i].setSelected(false);
            }
            biz_vnc_crm_client.initOpportunityGrid(app);
        } else if (tree_item.getText() == biz_vnc_crm_client.btnreports) {
            ZmReportView.createForm(app);
        }
    }
};

biz_vnc_crm_client.isDefine = function(field) {
    if(field) {
        return field;
    } else {
        return "---";
    }
}

biz_vnc_crm_client.viewApptDetails = function(apptId){
    var soapDoc = AjxSoapDoc.create("GetMsgRequest", "urn:zimbraMail");
    var action = soapDoc.set("m");
    action.setAttribute("id", apptId);
    action.setAttribute("html", 1);
    action.setAttribute("needExp", 1);
    var bc = appCtxt.getAppController().sendRequest({
        soapDoc: soapDoc,
        asyncMode: false
    });
    var msgResp = bc.GetMsgResponse;
    console.log(msgResp);
    var ans = msgResp.m[0].inv[0].comp[0];

    var attend = msgResp.m[0].inv[0].comp[0].at;
    var attendees = [];
    if(attend) {
        for (var j=0;j<attend.length ;j++ )
        {    
            attendees.push(attend[j].a);
        }
    }
    if(attendees.length < 1)
        attendees.push("---");

    var subject = biz_vnc_crm_client.isDefine(ans.name);
    var id = ans.apptId;
    var apptLocation = biz_vnc_crm_client.isDefine(ans.loc);
    var fragment = biz_vnc_crm_client.isDefine(ans.fr);
    if(ans.s[0]) {
        if (ans.s[0].u) {
            var startDate = new Date(ans.s[0].u);
        } else {
            var startDate = ans.s[0].d;
            var year = startDate.substring(0,4);
            var month = startDate.substring(4,6);
            var day = startDate.substring(6,8);
            startDate = month + "/" + day + "/" + year;
        }
    }
    if(ans.e[0]) {
        if (ans.e[0].u) {
            var endDate = new Date(ans.e[0].u);
        } else {
            var endDate = ans.e[0].d;
            var year = endDate.substring(0,4);
            var month = endDate.substring(4,6);
            var day = endDate.substring(6,8);
            endDate = month + "/" + day + "/" + year;
        }
    }
    var displayFreeBusy = biz_vnc_crm_client.isDefine(ans.fba);
    var organizer = biz_vnc_crm_client.isDefine(ans.or.a);
                                                
    var leadApptDetailsWindow = Ext.create('widget.window', {
        height: 300,
        width: 600,
        title: biz_vnc_crm_client.windowApptDetails,
        shrinkWrap: true,
        titleCollapse: true,
        toFrontOnShow: true,
        closable: true,
        collapsible: true,
        modal: true,
        layout: 'fit',
        items: [ApptPanel = Ext.create('Ext.form.Panel', {
            title: subject,
            width: 400,
            bodyPadding: 10,

             items: [{
                layout: 'column',
                border: false,
                defaults: {
                    anchor: '100%',
                    background: '#DADADA'
                },
                items: [{
                    columnWidth: .3,
                    border: false,
                    layout: 'vbox',
                    items: [{
                        xtype: 'label',
                        text: biz_vnc_crm_client.windowOrganizer,
                        forId: 'lblApptDetailsOrganizerLabel',
                        anchor: '100%'
                    },{
                        xtype: 'label',
                        text: biz_vnc_crm_client.windowLocation,
                        forId: 'lblApptDetailsLocationLabel',
                        anchor: '100%'
                    },{
                        xtype: 'label',
                        text: biz_vnc_crm_client.windowStartDate,
                        forId: 'lblApptDetailsStartDateLabel',
                        anchor: '100%'
                    },{
                        xtype: 'label',
                        text: biz_vnc_crm_client.windowEndDate,
                        forId: 'lblApptDetailsEndDateLabel',
                        anchor: '100%'
                    },{
                        xtype: 'label',
                        text: biz_vnc_crm_client.windowFreeBusy,
                        forId: 'lblApptDetailsFreeBusyLabel',
                        anchor: '100%'
                    },{
                        xtype: 'label',
                        text: biz_vnc_crm_client.windowAttendees,
                        forId: 'lblApptDetailsAttendeesLabel',
                        anchor: '100%'
                    },{
                        xtype: 'label',
                        text: biz_vnc_crm_client.windowDescription,
                        forId: 'lblApptDetailsFragmentLabel',
                        anchor: '100%'
                    }]
                }, {
                    columnWidth: .7,
                    border: false,
                    layout: 'vbox',
                    items: [{
                        xtype: 'label',
                        text: organizer,
                        forId: 'lblApptDetailsOrganizerValue',
                        anchor: '100%'
                    }, {
                        xtype: 'label',
                        text: apptLocation,
                        forId: 'lblApptDetailsLocationValue',
                        anchor: '100%'
                    },{
                        xtype: 'label',
                        text: startDate,
                        forId: 'lblApptDetailsStartDateValue',
                        anchor: '100%'
                    },{
                        xtype: 'label',
                        text: endDate,
                        forId: 'lblApptDetailsEndDateValue',
                        anchor: '100%'
                    },{
                        xtype: 'label',
                        text: displayFreeBusy,
                        forId: 'lblApptDetailsFreeBusyValue',
                        anchor: '100%'
                    },{
                        xtype: 'label',
                        text: attendees,
                        forId: 'lblApptDetailsAttendeesValue',
                        anchor: '100%'
                    },{
                        xtype: 'label',
                        text: fragment,
                        forId: 'lblApptDetailsFragmentValue',
                        anchor: '100%'
                    }]
                }]
             }]
        })],
        renderTo: Ext.getBody()
    });
    leadApptDetailsWindow.show();
};

biz_vnc_crm_client.viewTaskDetails = function(taskId){
    var soapDoc = AjxSoapDoc.create("GetMsgRequest", "urn:zimbraMail");
    var action = soapDoc.set("m");
    action.setAttribute("id", taskId);
    action.setAttribute("html", 1);
    action.setAttribute("needExp", 1);
    var bc = appCtxt.getAppController().sendRequest({
        soapDoc: soapDoc,
        asyncMode: false
    });
    var msgResp = bc.GetMsgResponse;
    console.log(msgResp);
    var ans = msgResp.m[0].inv[0].comp[0];
    var subject = biz_vnc_crm_client.isDefine(ans.name);
    var taskLocation = biz_vnc_crm_client.isDefine(ans.loc);
    var fragment = biz_vnc_crm_client.isDefine(ans.desc[0]._content);

    var organizer = biz_vnc_crm_client.isDefine(ans.or.a);
    var status = biz_vnc_crm_client.isDefine(ans.status);
    var percentComplete = biz_vnc_crm_client.isDefine(ans.percentComplete);
    var priority = biz_vnc_crm_client.isDefine(ans.priority);
    var leadTaskDetailsWindow = Ext.create('widget.window', {
        height: 300,
        width: 600,
        title: biz_vnc_crm_client.windowApptDetails,
        shrinkWrap: true,
        titleCollapse: true,
        toFrontOnShow: true,
        closable: true,
        collapsible: true,
        modal: true,
        layout: 'fit',
        items: [TaskPanel = Ext.create('Ext.form.Panel', {
            title: subject,
            width: 400,
            bodyPadding: 10,
            items: [{
                layout: 'column',
                border: false,
                defaults: {
                    anchor: '100%',
                    background: '#DADADA'
                },
                items: [{
                    columnWidth: .3,
                    border: false,
                    layout: 'vbox',
                    items: [{
                        xtype: 'label',
                        text: biz_vnc_crm_client.windowOrganizer,
                        forId: 'lblTaskDetailsOrganizerLabel',
                        anchor: '100%'
                    },{
                        xtype: 'label',
                        text: biz_vnc_crm_client.windowLocation,
                        forId: 'lblTaskDetailsLocationLabel',
                        anchor: '100%'
                    },{
                        xtype: 'label',
                        text: biz_vnc_crm_client.windowDescription,
                        forId: 'lblTaskDetailsFragmentLabel',
                        anchor: '100%'
                    },{
                        xtype: 'label',
                        text: biz_vnc_crm_client.windowStatus,
                        forId: 'lblTaskDetailsStatusLabel',
                        anchor: '100%'
                    },{
                        xtype: 'label',
                        text: biz_vnc_crm_client.windowPercentComplete,
                        forId: 'lblTaskDetailsPercentCompleteLabel',
                        anchor: '100%'
                    },{
                        xtype: 'label',
                        text: biz_vnc_crm_client.windowPriority,
                        forId: 'lblTaskDetailsPriorityLabel',
                        anchor: '100%'
                    }]
                }, {
                    columnWidth: .7,
                    border: false,
                    layout: 'vbox',
                    items: [{
                        xtype: 'label',
                        text: organizer,
                        forId: 'lblTaskDetailsOrganizerValue',
                        anchor: '100%'
                    }, {
                        xtype: 'label',
                        text: taskLocation,
                        forId: 'lblTaskDetailsLocationValue',
                        anchor: '100%'
                    },{
                        xtype: 'label',
                        text: fragment,
                        forId: 'lblTaskDetailsFragmentValue',
                        anchor: '100%'
                    },{
                        xtype: 'label',
                        text: status,
                        forId: 'lblTaskDetailsStatusValue',
                        anchor: '100%'
                    },{
                        xtype: 'label',
                        text: percentComplete,
                        forId: 'lblTaskDetailsPercentCompleteValue',
                        anchor: '100%'
                    },{
                        xtype: 'label',
                        text: priority,
                        forId: 'lblTaskDetailsPriorityValue',
                        anchor: '100%'
                    }]
                }]
             }]
        })],
        renderTo: Ext.getBody()
    });
    leadTaskDetailsWindow.show();
};