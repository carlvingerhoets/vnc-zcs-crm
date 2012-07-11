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
             text: "ZimbraCRM",
             tooltip: "View Info",
             index: buttonIndex, // position of the button
             image: "tabIcon" // icon
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
             index: buttonIndex, // position of the button
             image: "tabIcon" // icon
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
         }, //userId
         {
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
         height: 300,
         width: 900,
         //x: '20%',
         //y: '20%',
         shrinkWrap: true,
         titleCollapse: true,
         toFrontOnShow: true,
         title: null,
         closable: true,
         modal: true,
         collapsible: true,
         items: [MailOppPanel = Ext.create('Ext.form.Panel', {
             width: '100%',
             title: 'Opportunities',
             id: 'mailOppPanel',
             bodyBorder: true,
             items: [{
                 xtype: 'grid',
                 id: 'contactOpportunityGrid',
                 defaults: {
                     autoRender: true,
                     autoScroll: true
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
                                     Ext.example.msg('Added Successfully', '');
                                 } else {
                                     Ext.example.msg('Save Error', 'Not Successfully Edit...');
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
                                     Ext.example.msg('Added Successfully', '');
                                 } else {
                                     Ext.example.msg('Save Error', 'Not Successfully Edit...');
                                 }
                                 mailOppGridWindow.hide();
                             } else if (view == "TKL") {
                                 var rec = grid.getStore().getAt(rowIndex);
                                 var leadId = rec.get('leadId');
                                 var selmsg = appCtxt.getCurrentController().getSelection();
                                 var len = selmsg.length
                                 var taskids = [];
                                 for (var i = 0; i < len; i++) {
                                     taskids[i] = selmsg[i].id;
                                 }

                                 var json = "jsonobj={\"action\":\"TASKHISTORY\",\"object\":\"opp\",\"array\":\"" + taskids + "\",\"leadId\":\"" + leadId + "\"}";
                                 var reqHeader = {
                                     "Content-Type": "application/x-www-form-urlencoded"
                                 };
                                 var reqJson = AjxStringUtil.urlEncode(json);
                                 var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                                 if (response.text == 1) {
                                     Ext.example.msg('Added Successfully', '');

                                 } else {
                                     Ext.example.msg('Save Error', 'Not Successfully Edit...');

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
                     width: 150,
                     dataIndex: 'valuation',
                     sortable: true
                 }, {
                     header: biz_vnc_crm_client.probability,
                     width: 110,
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
             id: 'mailLeadPanel',
             title: 'Leads',
             bodyBorder: true,
             items: [{
                 xtype: 'grid',
                 id: 'mailLeadGrid',
                 defaults: {
                     autoRender: true,
                     autoScroll: true
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
                                     Ext.example.msg('Added Successfully', '');
                                 } else {
                                     Ext.example.msg('Save Error', 'Not Successfully Edit...');
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
                                     Ext.example.msg('Added Successfully', '');
                                 } else {
                                     Ext.example.msg('Save Error', 'Not Successfully Edit...');
                                 }
                                 mailOppGridWindow.hide();
                             } else if (view == "TKL") {
                                 var rec = grid.getStore().getAt(rowIndex);
                                 var leadId = rec.get('leadId');
                                 var selmsg = appCtxt.getCurrentController().getSelection();
                                 var len = selmsg.length
                                 var taskids = [];
                                 for (var i = 0; i < len; i++) {
                                     taskids[i] = selmsg[i].id;
                                 }

                                 var json = "jsonobj={\"action\":\"TASKHISTORY\",\"object\":\"lead\",\"array\":\"" + taskids + "\",\"leadId\":\"" + leadId + "\"}";
                                 var reqHeader = {
                                     "Content-Type": "application/x-www-form-urlencoded"
                                 };
                                 var reqJson = AjxStringUtil.urlEncode(json);
                                 var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                                 if (response.text == 1) {
                                     Ext.example.msg('Added Successfully', '');

                                 } else {
                                     Ext.example.msg('Save Error', 'Not Successfully Edit...');
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
                     width: 150,
                     dataIndex: 'phone'
                 }, {
                     text: biz_vnc_crm_client.stage,
                     width: 110,
                     dataIndex: 'stageName'
                 }, {
                     text: biz_vnc_crm_client.leadstate,
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
         }, //userId
         {
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
         height: 300,
         width: 900,
         //x: '20%',
         //y: '20%',
         shrinkWrap: true,
         titleCollapse: true,
         toFrontOnShow: true,
         title: null,
         closable: true,
         modal: true,
         collapsible: true,
         items: [ContactOppPanel = Ext.create('Ext.form.Panel', {
             width: '100%',
             title: 'Opportunities',
             id: 'contactOppPanel',
             bodyBorder: true,
             items: [{
                 xtype: 'grid',
                 id: 'contactOpportunityGrid',
                 defaults: {
                     autoRender: true,
                     autoScroll: true
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
                     width: 150,
                     dataIndex: 'valuation',
                     sortable: true
                 }, {
                     header: biz_vnc_crm_client.probability,
                     width: 110,
                     dataIndex: 'probability',
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
                             Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', showResult);

                             function showResult(btn) {
                                 if (btn == "no") {
                                     Ext.example.msg('No', 'You cancelled the deletion of opportunities');
                                 } else {
                                     var name = appCtxt.getUsername();
                                     var idArray = rec.get('leadId');
                                     var json = "jsonobj={\"action\":\"DELETEBYID\",\"object\":\"lead\",\"array\":\"" + idArray + "\",\"writeBy\":\"" + name + "\"}";
                                     var reqHeader = {
                                         "Content-Type": "application/x-www-form-urlencoded"
                                     };
                                     var reqJson = AjxStringUtil.urlEncode(json);
                                     var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                                     Ext.example.msg('Yes', 'Records deleted successfully.');
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
             id: 'contactLeadPanel',
             title: 'Leads',
             bodyBorder: true,
             items: [{
                 xtype: 'grid',
                 id: 'contactLeadGrid',
                 defaults: {
                     autoRender: true,
                     autoScroll: true
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
                     width: 150,
                     dataIndex: 'phone'
                 }, {
                     text: biz_vnc_crm_client.stage,
                     width: 110,
                     dataIndex: 'stageName'
                 }, {
                     text: biz_vnc_crm_client.leadstate,
                     width: 120,
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

                             Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', showResult);

                             function showResult(btn) {
                                 if (btn == "no") {
                                     Ext.example.msg('No', 'You cancelled the deletion of leads');
                                 } else {
                                     var name = appCtxt.getUsername();
                                     var idArray = rec.get('leadId');
                                     var json = "jsonobj={\"action\":\"DELETEBYID\",\"object\":\"lead\",\"array\":\"" + idArray + "\",\"writeBy\":\"" + name + "\"}";
                                     var reqHeader = {
                                         "Content-Type": "application/x-www-form-urlencoded"
                                     };
                                     var reqJson = AjxStringUtil.urlEncode(json);
                                     var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                                     Ext.example.msg('Yes', 'Records deleted successfully.');
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
     tabKeys.push(this.attachMailTabView.addTab("Mails", this.attachMailTabPage));

     canvas = new OpenDialog(appCtxt.getShell(), "Mails", view, leadId, flag, new AjxListener(this, biz_vnc_crm_client.okMailAttach, [this]));
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
     tabKeys.push(this.attachApptTabView.addTab("Appointments", this.attachApptTabPage));

     this.attachApptDialog = new OpenDialog(appCtxt.getShell(), "Appointments", view, leadId, flag, new AjxListener(this, biz_vnc_crm_client.okAppointmentAttach, [this]));
     this.attachApptDialog.popup();
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
             Ext.example.msg('Added Successfully', '');
         } else {
             Ext.example.msg('Save Error', 'Not Successfully Edit...');
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
                 biz_vnc_crm_client.apptData = "[{'subject':'','location1':'','status':'','calendar':'','startdate':''}]";
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
                 biz_vnc_crm_client.apptData = "[{'subject':'','location1':'','status':'','calendar':'','startdate':''}]";
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
         }
         biz_vnc_crm_client.temp = "[";
         for (var i = 0; i < biz_vnc_crm_client.contactList.length; i++) {
             var contact = biz_vnc_crm_client.contactList[i];
             if (i == biz_vnc_crm_client.contactList.length - 1) {
                 biz_vnc_crm_client.temp += "{\"value\":\"" + contact.id + "\",\"label\":\"" + contact._attrs.firstName + "\"}]";
             } else {
                 biz_vnc_crm_client.temp += "{\"value\":\"" + contact.id + "\",\"label\":\"" + contact._attrs.firstName + "\"},";
             }
         }
         if (rec == null) {} else {}

         if (response.more) {
             this.getContacts(response.offset + 500, biz_vnc_crm_client.contactList);
         } else {}
     }
 };


 biz_vnc_crm_client.initLeadGrid = function (app) {


     biz_vnc_crm_client.apptData = "[{'subject':'','location1':'','status':'','calendar':'','startdate':''}]";
     if (biz_vnc_crm_client.mailData == "") {
         biz_vnc_crm_client.mailData = "[{'date':'','from':'','subject':'','message':''}]";
     }
     var content = AjxTemplate.expand("biz_vnc_crm_client.templates.Simple#MainLead");
     app.setContent(content);
     var toolbar = app.getToolbar();
     toolbar.setVisibility(true);
     biz_vnc_crm_client._flag = 0;

     Ext.require(['Ext.tab.*', 'Ext.window.*', 'Ext.tip.*', 'Ext.layout.container.Border', 'Ext.window.MessageBox', 'Ext.grid.*', 'Ext.data.*', 'Ext.util.*', 'Ext.state.*', 'Ext.form.*', 'Ext.layout.container.Column', 'Ext.tab.Panel', 'Ext.panel.*', 'Ext.toolbar.*', 'Ext.button.*', 'Ext.container.ButtonGroup', 'Ext.layout.container.Table', 'Ext.selection.CheckboxModel', 'Ext.window.MessageBox', 'Ext.tip.*', 'Ext.layout.container.Border'


     ]);
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
         }, //userId
         {
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
             type: 'string'
         }, {
             name: 'writeBy',
             type: 'string'
         }, {
             name: 'writeDate',
             type: 'date'
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
     var sm = Ext.create('Ext.selection.CheckboxModel', {
         listeners: {


             selectionchange: function (sm, selections) {}
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
             selectionchange: function (sm, selections) {}
         }
     });
     var leadTaskListData = "[{'subject':'','status':'','complete':'','dueDate':''}]";
     var smleadTask = Ext.create('Ext.selection.CheckboxModel', {
         listeners: {


             selectionchange: function (sm, selections) {}
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
     json = "jsonobj={\"action\":\"LIST\",\"object\":\"priority\"}";
     reqJson = AjxStringUtil.urlEncode(json);
     responsePriority = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

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
     json = "jsonobj={\"action\":\"LIST\",\"object\":\"category\"}";
     reqJson = AjxStringUtil.urlEncode(json);
     responseCategory = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

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
     json = "jsonobj={\"action\":\"LIST\",\"object\":\"stage\"}";
     reqJson = AjxStringUtil.urlEncode(json);
     responseStage = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

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
     json = "jsonobj={\"action\":\"LIST\",\"object\":\"channel\"}";
     reqJson = AjxStringUtil.urlEncode(json);
     responseChannel = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

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
     json = "jsonobj={\"action\":\"LIST\",\"object\":\"state\"}";
     reqJson = AjxStringUtil.urlEncode(json);
     responseState = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

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
     json = "jsonobj={\"action\":\"LIST\",\"object\":\"country\"}";
     reqJson = AjxStringUtil.urlEncode(json);
     responseCountry = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

     json = "jsonobj={\"action\":\"LIST\",\"object\":\"company\"}";
     reqJson = AjxStringUtil.urlEncode(json);
     responseCompany = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

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

     json = "jsonobj={\"action\":\"LIST\",\"object\":\"section\"}";
     reqJson = AjxStringUtil.urlEncode(json);
     responseSection = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);


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

     json = "jsonobj={\"action\":\"USER\",\"object\":\"section\"}";
     reqHeader = {
         "Content-Type": "application/x-www-form-urlencoded"
     };
     reqJson = AjxStringUtil.urlEncode(json);
     responseUser = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

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
                     fieldLabel: 'Subject',
                     id: 'txtleadsubjectName',
                     allowBlank: false,
                     tabIndex: 1,
                     anchor: '95%'
                 }, {
                     xtype: 'combo',
                     mode: 'local',
                     value: 'mrs',
                     triggerAction: 'all',
                     forceSelection: true,
                     editable: false,
                     tabIndex: 2,
                     fieldLabel: 'Section',
                     id: 'cmbsection',
                     name: 'title',
                     displayField: 'sectionName',
                     valueField: 'sectionId',
                     queryMode: 'local',
                     store: Ext.create('Ext.data.Store', {
                         model: 'section',
                         proxy: {
                             type: 'memory',
                             data: jsonParse(responseSection.text)
                         },
                         autoLoad: true,
                         actionMethods: {
                             read: 'POST'
                         }
                     }),
                     listeners: {
                         change: function (combo, ewVal, oldVal) {
                             // do something
                         }
                     },
                     anchor: '95%'
                 }]
             }, {
                 columnWidth: .25,
                 border: false,
                 layout: 'anchor',
                 //defaultType: 'textfield',
                 items: [{
                     xtype: 'combo',
                     mode: 'local',
                     value: 'mrs',
                     triggerAction: 'all',
                     forceSelection: true,
                     editable: false,
                     fieldLabel: 'Priority',
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
                             data: jsonParse(responsePriority.text)
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
                     value: 'mrs',
                     triggerAction: 'all',
                     forceSelection: true,
                     editable: false,
                     fieldLabel: 'Stage',
                     id: 'cmbstage',
                     name: 'title',
                     displayField: 'stageName',
                     valueField: 'stageId',
                     queryMode: 'local',
                     store: Ext.create('Ext.data.Store', {
                         model: 'stage',
                         proxy: {
                             type: 'memory',
                             data: jsonParse(responseStage.text)
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
                             var dateOpen = Ext.getCmp('dateopened').getSubmitValue();
                             var state = Ext.getCmp('txtleadState').getValue();

                             if (dateOpen == '' && state != "New") {
                                 Ext.getCmp('dateopened').setValue(new Date());
                                 if (state == "Close") {
                                     Ext.getCmp('dateopened').setValue(new Date());
                                     Ext.getCmp('dateclosed').setValue(new Date());
                                 }
                             } else if (dateOpen != '' && state == "Close") {
                                 Ext.getCmp('dateclosed').setValue(new Date());
                             }
                             if (oldState == "Close" && state != "Close") {
                                 Ext.getCmp('dateopened').setValue(new Date());
                                 Ext.getCmp('dateclosed').setValue('');
                             }

                             var dayopen = Math.ceil(((new Date().getTime()) - (Ext.getCmp('dateopened').getValue())) / (1000 * 60 * 60 * 24));
                             if (Ext.getCmp('dateclosed').getValue() != null) {
                                 var dayclose = Math.ceil(((Ext.getCmp('dateclosed').getValue()) - (Ext.getCmp('dateopened').getValue())) / (1000 * 60 * 60 * 24));
                                 Ext.getCmp('txtleadday2close').setValue(dayclose);
                             }
                             Ext.getCmp('txtleadday2open').setValue(dayopen);

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
                     xtype: 'combo',
                     mode: 'local',
                     value: 'mrs',
                     triggerAction: 'all',
                     forceSelection: true,
                     editable: false,
                     fieldLabel: 'Category',
                     id: 'cmbcategory',
                     name: 'title',
                     displayField: 'categoryName',
                     valueField: 'categoryId',
                     queryMode: 'local',
                     store: Ext.create('Ext.data.Store', {
                         model: 'category',
                         proxy: {
                             type: 'memory',
                             data: jsonParse(responseCategory.text)
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
                     value: 'mrs',
                     triggerAction: 'all',
                     forceSelection: true,
                     editable: false,
                     fieldLabel: 'SalesMan',
                     id: 'cmbsalesman',
                     name: 'title',
                     displayField: 'label',
                     valueField: 'value',
                     queryMode: 'local',
                     store: Ext.create('Ext.data.Store', {
                         model: 'user',
                         proxy: {
                             type: 'memory',
                             data: jsonParse(responseUser.text)
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
                     xtype: 'textfield',
                     id: 'txtleadState',
                     fieldLabel: 'Lead State',
                     value: 'New',
                     disabled: true
                 }]
             }, {
                 columnWidth: .25,
                 border: false,
                 layout: 'anchor',
                 defaultType: 'textfield',

                 items: [{
                     xtype: 'button',
                     text: 'Convert to Opportunity',
                     disabled: true,
                     id: 'btnConvertToOpp',
                     width: 250,
                     height: 25,
                     iconCls: 'convert',
                     anchor: '95%',
                     handler: function () {
                         if (Ext.getCmp('txtleadsubjectName').getValue() == "") {
                             Ext.getCmp('txtleadsubjectName').validate(false);
                             Ext.getCmp('txtleadsubjectName').focus(true);
                             Ext.example.msg('Empty Field', 'Please enter subject.');

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
                             var nextAction = "Null";
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
                                 probability: probability,
                                 partnerName: partnerName
                             });
                             var json = "jsonobj=" + j;
                             var reqHeader = {
                                 "Content-Type": "application/x-www-form-urlencoded"
                             };
                             var reqJson = AjxStringUtil.urlEncode(json);
                             var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

                             Ext.example.msg('Convert to Opportunity', 'Lead successfully converted into Opportunity.');
                             biz_vnc_crm_client.initOpportunityGrid(app);
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
                 title: 'Contact Info',
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
                         editable: false,
                         fieldLabel: 'Partner',
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
                                         var contactName = biz_vnc_crm_client.contactList[i]._attrs.firstName + " " + biz_vnc_crm_client.contactList[i]._attrs.lastName;
                                         biz_vnc_crm_client.contactList[i]._attrs.company;

                                         Ext.getCmp('txtleadmobile').setValue(biz_vnc_crm_client.contactList[i]._attrs.mobilePhone);
                                         Ext.getCmp('txtleadcontactName').setValue(contactName);
                                         Ext.getCmp('txtleadzip').setValue(biz_vnc_crm_client.contactList[i]._attrs.homePostalCode);
                                         Ext.getCmp('txtleademail').setValue(biz_vnc_crm_client.contactList[i]._attrs.email);
                                         Ext.getCmp('txtleadstreet1').setValue(biz_vnc_crm_client.contactList[i]._attrs.homeStreet);
                                         Ext.getCmp('txtleadcity').setValue(biz_vnc_crm_client.contactList[i]._attrs.homeCity);
                                         Ext.getCmp('txtleadphone').setValue(biz_vnc_crm_client.contactList[i]._attrs.mobilePhone2);
                                     }
                                 }

                             }
                         },
                         anchor: '100%'
                     }, {
                         xtype: 'textfield',
                         fieldLabel: 'Contact Name',
                         id: 'txtleadcontactName',
                         anchor: '100%'
                     }, {
                         xtype: 'textfield',
                         fieldLabel: 'Email',
                         id: 'txtleademail',
                         vtype: 'email',
                         anchor: '100%'
                     }, {
                         xtype: 'textareafield',
                         grow: false,
                         fieldLabel: 'Description',
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
                         fieldLabel: 'Street1',
                         id: 'txtleadstreet1',
                         anchor: '95%'
                     }, {
                         xtype: 'textfield',
                         fieldLabel: 'Street2',
                         id: 'txtleadstreet2',
                         anchor: '95%'
                     }, {
                         xtype: 'textfield',
                         fieldLabel: 'City',
                         id: 'txtleadcity',
                         anchor: '95%'
                     }, {
                         xtype: 'combo',
                         mode: 'local',
                         value: 'mrs',
                         triggerAction: 'all',
                         forceSelection: true,
                         editable: false,
                         fieldLabel: 'State',
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
                                 data: jsonParse(responseState.text)
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
                         value: 'mrs',
                         triggerAction: 'all',
                         forceSelection: true,
                         editable: false,
                         fieldLabel: 'Country',
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
                                 data: jsonParse(responseCountry.text)
                             },
                             autoLoad: true,
                             actionMethods: {
                                 read: 'POST'
                             }

                         }),
                         anchor: '95%'
                     }, {
                         xtype: 'textfield',
                         fieldLabel: 'Zip Code',
                         id: 'txtleadzip',
                         anchor: '95%'
                     }]
                 }, {
                     columnWidth: .32,
                     border: false,
                     layout: 'anchor',
                     items: [{
                         xtype: 'textfield',
                         fieldLabel: 'Phone',
                         id: 'txtleadphone',
                         anchor: '95%'
                     }, {
                         xtype: 'textfield',
                         fieldLabel: 'Work Phone',
                         id: 'txtleadworkPhone',
                         anchor: '95%'
                     }, {
                         xtype: 'textfield',
                         fieldLabel: 'Mobile',
                         id: 'txtleadmobile',
                         anchor: '95%'
                     }, {
                         xtype: 'textfield',
                         fieldLabel: 'Fax',
                         id: 'txtleadfax',
                         anchor: '95%'
                     }]
                 }]

             }, {
                 title: 'Appointments',
                 id: 'leadAppointment',
                 layout: 'column',
                 width: '100%',
                 height: 250,
                 dockedItems: [{
                     xtype: 'toolbar',
                     items: [{
                         iconCls: 'attachment',
                         text: 'Attach',
                         handler: function () {
                             var leadId = biz_vnc_crm_client.leadId;
                             var flag = 0;

                             biz_vnc_crm_client_HandlerObject.prototype.showAttachAppointmentDialog(leadId, flag);
                         }
                     }, {
                         iconCls: 'cancel',
                         text: 'Delete',
                         itemId: 'delete',
                         handler: function () {
                             Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', showResult);

                             function showResult(btn) {
                                 if (btn == "no") {} else {
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
                                         biz_vnc_crm_client.apptData = "[{'subject':'','location1':'','status':'','calendar':'','startdate':''}]";
                                     }
                                     Ext.getCmp('leadApptGrid').getStore().loadData(jsonParse(biz_vnc_crm_client.apptData), false);
                                     Ext.getCmp('leadApptGrid').getView().refresh();
                                 }
                             };
                         }
                     }, {
                         iconCls: 'appointment',
                         text: 'New',
                         itemId: 'newappoint',
                         handler: function () {
                             biz_vnc_crm_client.flag = 0;
                             new ZmCRMCalViewController(appCtxt.getApp(ZmApp.CALENDAR)).newAppointmentHelper(new Date(), null, 10, null);
                         }
                     }, {
                         iconCls: 'refresh',
                         text: 'Refresh',
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
                                 biz_vnc_crm_client.apptData = "[{'subject':'','location1':'','status':'','calendar':'','startdate':''}]";
                             }
                             Ext.getCmp('leadApptGrid').getStore().loadData(jsonParse(biz_vnc_crm_client.apptData), false);
                             Ext.getCmp('leadApptGrid').getView().refresh();

                         }
                     }]
                 }, {
                     xtype: 'grid',
                     selModel: leadSMAppt,
                     id: 'leadApptGrid',
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
                         text: 'Subject',
                         sortable: false,
                         width: 400,
                         dataIndex: 'subject'
                     }, {
                         text: 'Location',
                         sortable: false,
                         width: 250,
                         dataIndex: 'location1'
                     }, {
                         text: 'Status',
                         width: 100,
                         sortable: true,
                         dataIndex: 'status'
                     }, {
                         text: 'Calendar',
                         width: 100,
                         sortable: true,
                         dataIndex: 'calendar'
                     }, {
                         text: 'Start Date',
                         sortable: false,
                         width: 200,
                         dataIndex: 'startdate',
                         renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                     }],
                     title: null,
                     viewConfig: {
                         stripeRows: true
                     }
                 }]
             }, {
                 title: 'Tasks',
                 id: 'leadTask',
                 layout: 'column',
                 width: '100%',
                 height: 250,
                 defaults: {
                     autoRender: true,
                     autoScroll: true
                 },
                 dockedItems: [{
                     xtype: 'toolbar',
                     items: [{
                         iconCls: 'attachment',
                         text: 'Attach',
                         handler: function () {}
                     }, {
                         iconCls: 'cancel',
                         text: 'Delete',
                         itemId: 'delete',
                         handler: function () {
                             Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', showResult);

                             function showResult(btn) {
                                 if (btn == "no") {
                                     Ext.example.msg('No', 'You cancelled the deletion..');
                                 } else {
                                     var rec1 = Ext.getCmp('leadTaskGrid').getSelectionModel().getSelection();
                                     var idArray = [];
                                     Ext.each(rec1, function (item) {
                                         idArray.push(item.data.taskId);
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
                                                 if (allTask[i].id == newtaskArray[j]) {
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
                                                 if (temp.id == taskArray[j]) {
                                                     if (flag == taskArray.length - 1) {
                                                         leadTaskListData += "{\"taskId\":\"" + temp.id + "\",\"subject\":\"" + temp.name + "\",\"status\":\"" + temp.status + "\",\"complete\":\"" + temp.percentComplete + "\",\"dueDate\":\"" + new Date(temp.d) + "\"}]";
                                                     } else {
                                                         leadTaskListData += "{\"taskId\":\"" + temp.id + "\",\"subject\":\"" + temp.name + "\",\"status\":\"" + temp.status + "\",\"complete\":\"" + temp.percentComplete + "\",\"dueDate\":\"" + new Date(temp.d) + "\"},";
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
                         text: 'New',
                         itemId: 'newappoint',
                         handler: function () {
                             var taskApp = appCtxt.getApp(ZmApp.TASKS);
                             taskApp._handleLoadNewTask();
                             var taskController = appCtxt.getCurrentController();
                             taskController.getToolbar().getButton(ZmOperation.SAVE).removeSelectionListeners();
                             taskController.getToolbar().addSelectionListener(ZmOperation.CANCEL, new AjxListener(this, biz_vnc_crm_client._leadTaskCancelListener, [app]));
                             taskController.getToolbar().addSelectionListener(ZmOperation.SAVE, new AjxListener(this, biz_vnc_crm_client._leadTaskSaveListener, [app]));
                         }
                     }, {
                         iconCls: 'refresh',
                         text: 'Refresh',
                         itemId: 'refresh',
                         handler: function () {}
                     }]
                 }, {
                     xtype: 'grid',
                     selModel: leadSMTask,
                     id: 'leadTaskGrid',
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
                         text: 'Subject',
                         sortable: false,
                         width: 600,
                         dataIndex: 'subject'
                     }, {
                         text: 'Status',
                         width: 200,
                         sortable: true,
                         dataIndex: 'status'
                     }, {
                         text: '% Complete',
                         width: 100,
                         sortable: true,
                         dataIndex: 'complete'
                     }, {
                         text: 'Due Date',
                         sortable: false,
                         width: 200,
                         dataIndex: 'dueDate',
                         renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                     }],
                     title: null,
                     viewConfig: {
                         stripeRows: true
                     }
                 }]
             }, {
                 title: 'Communication & History',
                 id: 'comm',
                 layout: 'column',
                 width: '100%',
                 height: 250,
                 dockedItems: [{
                     xtype: 'toolbar',
                     items: [{
                         iconCls: 'attachment',
                         text: 'Attach',
                         handler: function () {
                             var flag = 0;
                             var leadId = biz_vnc_crm_client.leadId;
                             biz_vnc_crm_client_HandlerObject.prototype.showAttachMailDialog(leadId, flag);
                         }
                     }, {
                         iconCls: 'cancel',
                         text: 'Delete',
                         itemId: 'delete',
                         handler: function () {
                             Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', showResult);

                             function showResult(btn) {
                                 if (btn == "no") {
                                     Ext.example.msg('No', 'You cancelled the deletion..');
                                 } else {
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
                         text: 'Refresh',
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
                         text: 'Date',
                         sortable: false,
                         width: 200,
                         dataIndex: 'date',
                         renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                     }, {
                         text: 'From',
                         sortable: false,
                         width: 200,
                         dataIndex: 'from'
                     }, {
                         text: 'Subject',
                         width: 300,
                         sortable: true,
                         dataIndex: 'subject'
                     }, {
                         text: 'Message',
                         width: 600,
                         sortable: true,
                         dataIndex: 'message'
                     }],
                     title: 'History',
                     viewConfig: {
                         stripeRows: true
                     }
                 }]
             }, {
                 title: 'Extra Info',
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
                         editable: false,
                         fieldLabel: 'Company',
                         id: 'cmbcompanyName',
                         name: 'CompanyName',
                         displayField: 'companyName',
                         valueField: 'companyId',
                         queryMode: 'local',
                         store: Ext.create('Ext.data.Store', {
                             model: 'company',
                             proxy: {
                                 type: 'memory',
                                 data: jsonParse(responseCompany.text)
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
                         editable: false,
                         fieldLabel: 'Channel',
                         id: 'cmbchannel',
                         name: 'channel',
                         displayField: 'channelName',
                         valueField: 'channelId',
                         queryMode: 'local',
                         store: Ext.create('Ext.data.Store', {
                             model: 'channel',
                             proxy: {
                                 type: 'memory',
                                 data: jsonParse(responseChannel.text)
                             },
                             autoLoad: true,
                             actionMethods: {
                                 read: 'POST'
                             }
                         }),
                         anchor: '60%'
                     }, {
                         xtype: 'textfield',
                         fieldLabel: 'Referred By',
                         id: 'txtleadreferredby',
                         name: 'last',
                         anchor: '60%'
                     }, {
                         xtype: 'textfield',
                         fieldLabel: 'Days to Open',
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
                         format: 'Y-m-d H:i:s.00',
                         fieldLabel: 'Creation Date',
                         id: 'datecreationdate',
                         disabled: true,
                         anchor: '60%'
                     }, {
                         xtype: 'datefield',
                         format: 'Y-m-d H:i:s',
                         fieldLabel: 'Update Date',
                         id: 'dateupdatedate',
                         disabled: true,
                         anchor: '60%'
                     }, {
                         xtype: 'datefield',
                         format: 'Y-m-d H:i:s',
                         fieldLabel: 'Opened',
                         id: 'dateopened',
                         disabled: true,
                         anchor: '60%'
                     }, {
                         xtype: 'datefield',
                         format: 'Y-m-d H:i:s',
                         fieldLabel: 'Closed',
                         id: 'dateclosed',
                         disabled: true,
                         anchor: '60%'
                     }, {
                         xtype: 'textfield',
                         fieldLabel: 'Days to Close',
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
                             biz_vnc_crm_client.apptData = "[{'subject':'','location1':'','status':'','calendar':'','startdate':''}]";
                         }
                     } else if (tab.id == 'leadTask') {
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
                                     if (allTask[i].id == newtaskArray[j]) {
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
                                     if (temp.id == taskArray[j]) {
                                         if (flag == taskArray.length - 1) {
                                             leadTaskListData += "{\"taskId\":\"" + temp.id + "\",\"subject\":\"" + temp.name + "\",\"status\":\"" + temp.status + "\",\"complete\":\"" + temp.percentComplete + "\",\"dueDate\":\"" + new Date(temp.d) + "\"}]";
                                         } else {
                                             leadTaskListData += "{\"taskId\":\"" + temp.id + "\",\"subject\":\"" + temp.name + "\",\"status\":\"" + temp.status + "\",\"complete\":\"" + temp.percentComplete + "\",\"dueDate\":\"" + new Date(temp.d) + "\"},";
                                             flag++;
                                         }
                                     }
                                 }
                             }
                         }
                         Ext.getCmp('leadTaskGrid').getStore().loadData(jsonParse(leadTaskListData), false);
                         Ext.getCmp('leadTaskGrid').getView().refresh();

                     } else if (tab.id == 'comm') {
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
             text: 'Save',
             id: 'btnleadsave',
             disabled: true,
             width: 150,
             height: 25,
             iconCls: 'save',
             handler: function () {
                 if (Ext.getCmp('txtleadsubjectName').getValue() == "") {
                     Ext.getCmp('txtleadsubjectName').validate(false);
                     Ext.getCmp('txtleadsubjectName').focus(true);
                     Ext.example.msg('Empty Field', 'Please enter subject.');

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
                     var nextAction = "Null";
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
                         Ext.example.msg('Save', 'Successfully Edit...');
                         biz_vnc_crm_client.initLeadGrid(app);
                     } else {
                         Ext.example.msg('Save Error', 'Not Successfully Edit...');
                         biz_vnc_crm_client.initLeadGrid(app);
                     }
                 }
             }
         }, {
             text: 'Cancel',
             width: 150,
             id: 'btncancel',
             height: 25,
             iconCls: 'cancel',
             handler: function () {
                 Ext.example.msg('Cancel', 'Successfully Canceled...');
                 biz_vnc_crm_client.initLeadGrid(app);
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
                     Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', showResult);

                     function showResult(btn) {
                         if (btn == "no") {
                             Ext.example.msg('No', 'You cancelled the deletion of leads');
                         } else {
                             var name = appCtxt.getUsername();
                             var json = "jsonobj={\"action\":\"DELETEBYID\",\"object\":\"lead\",\"array\":\"" + idArray + "\",\"writeBy\":\"" + name + "\"}";
                             var reqHeader = {
                                 "Content-Type": "application/x-www-form-urlencoded"
                             };
                             var reqJson = AjxStringUtil.urlEncode(json);
                             var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                             Ext.example.msg('Yes', 'Records deleted successfully.');
                             biz_vnc_crm_client.initLeadGrid(app);
                         }
                     };
                 }
             }]
         }],
         items: [{
             title: biz_vnc_crm_client.lblLeadForm,
             id: 'footerPanel',
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
                 text: biz_vnc_crm_client.leadstate,
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

                         Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', showResult);

                         function showResult(btn) {
                             if (btn == "no") {
                                 Ext.example.msg('No', 'You cancelled the deletion of leads');
                             } else {
                                 var name = appCtxt.getUsername();
                                 var idArray = rec.get('leadId');
                                 var json = "jsonobj={\"action\":\"DELETEBYID\",\"object\":\"lead\",\"array\":\"" + idArray + "\",\"writeBy\":\"" + name + "\"}";
                                 var reqHeader = {
                                     "Content-Type": "application/x-www-form-urlencoded"
                                 };
                                 var reqJson = AjxStringUtil.urlEncode(json);
                                 var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                                 Ext.example.msg('Yes', 'Records deleted successfully.');
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

             Ext.getCmp('btnleadsave').enable();
             Ext.getCmp('btnConvertToOpp').enable();
             Ext.getCmp('btnLeadAddContact').enable();
             var rec = selectedRecord[0];

             if (rec != null) {
                 Ext.getCmp('leadTabPanel').setActiveTab(0);
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
                 Ext.getCmp('txtleadsubjectName').setValue(rec.get('subjectName'));
                 Ext.getCmp('txtleadcontactName').setValue(rec.get('contactName'));
                 Ext.getCmp('txtleadleadDescription').setValue(rec.get('leadDescription'));
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
             Ext.getCmp('btnleadsave').disable();
             Ext.getCmp('btnConvertToOpp').disable();
             Ext.getCmp('btnLeadAddContact').disable();
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
     biz_vnc_crm_client.apptData = "[{'subject':'','location1':'','status':'','calendar':'','startdate':''}]";
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
         }, //userId
         {
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
             type: 'string'
         }, {
             name: 'writeBy',
             type: 'string'
         }, {
             name: 'writeDate',
             type: 'date'
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

     var json, responsePriority, responseCategory, responseStage, responseChannel, responseState, responseCountry, responseSection, responseCompany, responseContactName, responseUser;
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
     json = "jsonobj={\"action\":\"LIST\",\"object\":\"priority\"}";
     reqJson = AjxStringUtil.urlEncode(json);
     responsePriority = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

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
     json = "jsonobj={\"action\":\"LIST\",\"object\":\"section\"}";
     reqJson = AjxStringUtil.urlEncode(json);
     responseSection = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);


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
     json = "jsonobj={\"action\":\"LIST\",\"object\":\"lead\"}";
     reqJson = AjxStringUtil.urlEncode(json);
     responseContactName = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

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
     json = "jsonobj={\"action\":\"LIST\",\"object\":\"category\"}";
     reqJson = AjxStringUtil.urlEncode(json);
     responseCategory = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

     json = "jsonobj={\"action\":\"LIST\",\"object\":\"company\"}";
     reqJson = AjxStringUtil.urlEncode(json);
     responseCompany = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

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
     json = "jsonobj={\"action\":\"LIST\",\"object\":\"stage\"}";
     reqJson = AjxStringUtil.urlEncode(json);
     responseStage = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

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
     json = "jsonobj={\"action\":\"LIST\",\"object\":\"channel\"}";
     reqJson = AjxStringUtil.urlEncode(json);
     responseChannel = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

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
     json = "jsonobj={\"action\":\"LIST\",\"object\":\"state\"}";
     reqJson = AjxStringUtil.urlEncode(json);
     responseState = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

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
     json = "jsonobj={\"action\":\"LIST\",\"object\":\"country\"}";
     reqJson = AjxStringUtil.urlEncode(json);
     responseCountry = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

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

     json = "jsonobj={\"action\":\"USER\",\"object\":\"section\"}";
     reqHeader = {
         "Content-Type": "application/x-www-form-urlencoded"
     };
     reqJson = AjxStringUtil.urlEncode(json);
     responseUser = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);


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
                     fieldLabel: 'Opportunity',
                     allowBlank: false,
                     anchor: '95%'
                 }, {
                     xtype: 'textfield',
                     id: 'txtOppExpectedRevenue',
                     fieldLabel: 'Expected Revenue',
                     anchor: '95%'
                 }, {
                     xtype: 'datefield',
                     id: 'dateOppNextActionDate',
                     format: 'Y-m-d H:i:s',
                     fieldLabel: 'Next Action Date',
                     anchor: '95%'
                 }]
             }, {
                 columnWidth: .25,
                 border: false,
                 layout: 'anchor',
                 items: [{
                     xtype: 'combo',
                     mode: 'local',
                     value: 'mrs',
                     triggerAction: 'all',
                     forceSelection: true,
                     editable: false,
                     fieldLabel: 'Stage',
                     id: 'cmbOppstage',
                     name: 'title',
                     displayField: 'stageName',
                     valueField: 'stageId',
                     queryMode: 'local',
                     store: Ext.create('Ext.data.Store', {
                         model: 'stage',
                         proxy: {
                             type: 'memory',
                             data: jsonParse(responseStage.text)
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
                             var dateOpen = Ext.getCmp('dateOppOpened').getSubmitValue();
                             var state = Ext.getCmp('txtOppState').getValue();

                             if (dateOpen == '' && state != "New") {
                                 Ext.getCmp('dateOppOpened').setValue(new Date());
                                 if (state == "Close") {
                                     Ext.getCmp('dateOppOpened').setValue(new Date());
                                     Ext.getCmp('dateOppClosed').setValue(new Date());
                                 }
                             } else if (dateOpen != '' && state == "Close") {
                                 Ext.getCmp('dateOppClosed').setValue(new Date());
                             }
                             if (oldState == "Close" && state != "Close") {
                                 Ext.getCmp('dateOppOpened').setValue(new Date());
                                 Ext.getCmp('dateOppClosed').setValue('');
                             }

                             var dayopen = Math.ceil(((new Date().getTime()) - (Ext.getCmp('dateOppOpened').getValue())) / (1000 * 60 * 60 * 24));
                             if (Ext.getCmp('dateOppClosed').getValue() != null) {
                                 var dayclose = Math.ceil(((Ext.getCmp('dateOppClosed').getValue()) - (Ext.getCmp('dateOppOpened').getValue())) / (1000 * 60 * 60 * 24));
                                 Ext.getCmp('txtOppDaysToClose').setValue(dayclose);
                             }
                             Ext.getCmp('txtOppDaysToOpen').setValue(dayopen);

                         }
                     },
                     anchor: '95%'
                 }, {
                     xtype: 'textfield',
                     id: 'txtOppProbability',
                     fieldLabel: 'Probability',
                     value: '0',
                     anchor: '95%'
                 }, {
                     xtype: 'textfield',
                     id: 'txtOppNextAction',
                     fieldLabel: 'Next Action',
                     anchor: '95%'
                 }]
             }, {
                 columnWidth: .25,
                 border: false,
                 layout: 'anchor',
                 items: [{
                     xtype: 'combo',
                     mode: 'local',
                     value: 'mrs',
                     triggerAction: 'all',
                     forceSelection: true,
                     editable: false,
                     fieldLabel: 'SalesMan',
                     id: 'cmbOppsalesman',
                     name: 'title',
                     displayField: 'label',
                     valueField: 'value',
                     queryMode: 'local',
                     store: Ext.create('Ext.data.Store', {
                         model: 'user',
                         proxy: {
                             type: 'memory',
                             data: jsonParse(responseUser.text)
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
                     format: 'Y-m-d H:i:s',
                     fieldLabel: 'Expected closing',
                     anchor: '95%'
                 }, {
                     xtype: 'combo',
                     mode: 'local',
                     value: 'mrs',
                     triggerAction: 'all',
                     forceSelection: true,
                     editable: false,
                     fieldLabel: 'Priority',
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
                             data: jsonParse(responsePriority.text)
                         },
                         autoLoad: true,
                         actionMethods: {
                             read: 'POST'
                         }
                     }),
                     anchor: '95%'
                 }, {
                     xtype: 'textfield',
                     id: 'txtOppState',
                     fieldLabel: 'Opportunity State',
                     value: 'New',
                     disabled: true
                 }]
             }, {
                 columnWidth: .20,
                 border: false,
                 layout: 'anchor',
                 items: [{
                     xtype: 'button',
                     text: 'Schedule/Log Call',
                     width: 250,
                     height: 25,
                     iconCls: 'phone',
                     margin: '3 0 3 0',
                     handler: function () {
                         AjxDispatcher.run("GetCalController").newAppointment(null, null, null, null);
                     }
                 }, {
                     xtype: 'button',
                     text: 'Schedule Meeting',
                     width: 250,
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
                 title: 'Opportunity',
                 height: 175,
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
                         editable: false,
                         fieldLabel: 'Partner',
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
                                         var contactName = biz_vnc_crm_client.contactList[i]._attrs.firstName + " " + biz_vnc_crm_client.contactList[i]._attrs.lastName;
                                         biz_vnc_crm_client.contactList[i]._attrs.company;

                                         Ext.getCmp('txtOppMobile').setValue(biz_vnc_crm_client.contactList[i]._attrs.mobilePhone);
                                         Ext.getCmp('txtOppContact').setValue(contactName);
                                         Ext.getCmp('txtOppZip').setValue(biz_vnc_crm_client.contactList[i]._attrs.homePostalCode);
                                         Ext.getCmp('txtOppEmail').setValue(biz_vnc_crm_client.contactList[i]._attrs.email);
                                         Ext.getCmp('txtOppStreet1').setValue(biz_vnc_crm_client.contactList[i]._attrs.homeStreet);
                                         Ext.getCmp('txtOppCity').setValue(biz_vnc_crm_client.contactList[i]._attrs.homeCity);
                                         Ext.getCmp('txtOppPhone').setValue(biz_vnc_crm_client.contactList[i]._attrs.mobilePhone2);
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
                         editable: false,
                         fieldLabel: 'Company',
                         id: 'cmbOppcompanyName',
                         name: 'CompanyName',
                         displayField: 'companyName',
                         valueField: 'companyId',
                         queryMode: 'local',
                         store: Ext.create('Ext.data.Store', {
                             model: 'company',
                             proxy: {
                                 type: 'memory',
                                 data: jsonParse(responseCompany.text)
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
                         fieldLabel: 'Contact',
                         anchor: '100%'
                     }, {
                         xtype: 'textfield',
                         id: 'txtOppEmail',
                         fieldLabel: 'Email',
                         anchor: '100%'
                     }, {
                         xtype: 'textfield',
                         id: 'txtOppPhone',
                         fieldLabel: 'Phone',
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
                         value: 'mrs',
                         triggerAction: 'all',
                         forceSelection: true,
                         editable: false,
                         fieldLabel: 'Section',
                         id: 'cmbOppsection',
                         name: 'title',
                         displayField: 'sectionName',
                         valueField: 'sectionId',
                         queryMode: 'local',
                         store: Ext.create('Ext.data.Store', {
                             model: 'section',
                             proxy: {
                                 type: 'memory',
                                 data: jsonParse(responseSection.text)
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
                         value: 'mrs',
                         triggerAction: 'all',
                         forceSelection: true,
                         editable: false,
                         fieldLabel: 'Category',
                         id: 'cmbOppcategory',
                         name: 'title',
                         displayField: 'categoryName',
                         valueField: 'categoryId',
                         queryMode: 'local',
                         store: Ext.create('Ext.data.Store', {
                             model: 'category',
                             proxy: {
                                 type: 'memory',
                                 data: jsonParse(responseCategory.text)
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
                         fieldLabel: 'Details',
                         anchor: '95%'
                     }]
                 }]
             }, {
                 title: 'Lead',
                 height: 175,
                 layout: 'column',
                 items: [{
                     columnWidth: .33,
                     layout: 'anchor',
                     border: false,
                     items: [{
                         xtype: 'textfield',
                         id: 'txtOppCustomer',
                         fieldLabel: 'Customer',
                         anchor: '95%'
                     }, {
                         xtype: 'textfield',
                         id: 'txtOppStreet1',
                         fieldLabel: 'Street1',
                         anchor: '95%'
                     }, {
                         xtype: 'textfield',
                         id: 'txtOppStreet2',
                         fieldLabel: 'Street2',
                         anchor: '95%'
                     }, {
                         xtype: 'textfield',
                         id: 'txtOppCity',
                         fieldLabel: 'City',
                         anchor: '95%'
                     }, {
                         xtype: 'textfield',
                         id: 'txtOppZip',
                         fieldLabel: 'Zip',
                         anchor: '95%'
                     }]

                 }, {
                     columnWidth: .33,
                     border: false,
                     layout: 'anchor',
                     items: [{
                         xtype: 'textfield',
                         fieldLabel: 'Mobile',
                         id: 'txtOppMobile',
                         anchor: '95%'
                     }, {
                         xtype: 'textfield',
                         fieldLabel: 'Fax',
                         id: 'txtOppFax',
                         anchor: '95%'
                     }, {
                         xtype: 'combo',
                         mode: 'local',
                         value: 'channel',
                         triggerAction: 'all',
                         forceSelection: true,
                         editable: false,
                         fieldLabel: 'Channel',
                         id: 'cmbOppchannel',
                         name: 'channel',
                         displayField: 'channelName',
                         valueField: 'channelId',
                         queryMode: 'local',
                         store: Ext.create('Ext.data.Store', {
                             model: 'channel',
                             proxy: {
                                 type: 'memory',
                                 data: jsonParse(responseChannel.text)
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
                         value: 'mrs',
                         triggerAction: 'all',
                         forceSelection: true,
                         editable: false,
                         fieldLabel: 'State',
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
                                 data: jsonParse(responseState.text)
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
                         value: 'mrs',
                         triggerAction: 'all',
                         forceSelection: true,
                         editable: false,
                         fieldLabel: 'Country',
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
                                 data: jsonParse(responseCountry.text)
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
                 title: 'Communication & History',
                 id: 'comm',
                 layout: 'column',
                 width: '100%',
                 height: 250,
                 dockedItems: [{
                     xtype: 'toolbar',
                     items: [{
                         iconCls: 'attachment',
                         text: 'Attach',
                         handler: function () {
                             var flag = 1;
                             var leadId = biz_vnc_crm_client.leadId;
                             biz_vnc_crm_client_HandlerObject.prototype.showAttachMailDialog(leadId, flag);
                         }
                     }, {
                         iconCls: 'cancel',
                         text: 'Delete',
                         itemId: 'delete',
                         handler: function () {
                             Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', showResult);

                             function showResult(btn) {
                                 if (btn == "no") {
                                     Ext.example.msg('No', 'You cancelled the deletion..');
                                 } else {
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
                         text: 'Refresh',
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
                         text: 'Date',
                         sortable: false,
                         width: 200,
                         dataIndex: 'date',
                         renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                     }, {
                         text: 'From',
                         sortable: false,
                         width: 200,
                         dataIndex: 'from'
                     }, {
                         text: 'Subject',
                         width: 375,
                         sortable: true,
                         dataIndex: 'subject'
                     }, {
                         text: 'Message',
                         width: 600,
                         sortable: true,
                         dataIndex: 'message'
                     }],
                     title: 'History',
                     viewConfig: {
                         stripeRows: true
                     }
                 }]
             }, {
                 title: 'Appointments',
                 id: 'appointment',
                 layout: 'column',
                 width: '100%',
                 height: 250,
                 dockedItems: [{
                     xtype: 'toolbar',
                     items: [{
                         iconCls: 'attachment',
                         text: 'Attach',
                         handler: function () {
                             var flag = 1;
                             var leadId = biz_vnc_crm_client.leadId;
                             biz_vnc_crm_client_HandlerObject.prototype.showAttachAppointmentDialog(leadId, flag);
                         }
                     }, {
                         iconCls: 'cancel',
                         text: 'Delete',
                         itemId: 'delete',
                         handler: function () {
                             Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', showResult);

                             function showResult(btn) {
                                 if (btn == "no") {
                                     Ext.example.msg('No', 'You cancelled the deletion..');
                                 } else {
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
                                         biz_vnc_crm_client.apptData = "[{'subject':'','location1':'','status':'','calendar':'','startdate':''}]";
                                     }
                                     Ext.getCmp('oppApptGrid').getStore().loadData(jsonParse(biz_vnc_crm_client.apptData), false);
                                     Ext.getCmp('oppApptGrid').getView().refresh();
                                 }
                             };
                         }
                     }, {
                         iconCls: 'appointment',
                         text: 'New',
                         itemId: 'newappoint',
                         handler: function () {
                             biz_vnc_crm_client.flag = 1;
                             new ZmCRMCalViewController(appCtxt.getApp(ZmApp.CALENDAR)).newAppointmentHelper(new Date(), null, 10, null);
                         }
                     }, {
                         iconCls: 'refresh',
                         text: 'Refresh',
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
                                 biz_vnc_crm_client.apptData = "[{'subject':'','location1':'','status':'','calendar':'','startdate':''}]";
                             }
                             Ext.getCmp('oppApptGrid').getStore().loadData(jsonParse(biz_vnc_crm_client.apptData), false);
                             Ext.getCmp('oppApptGrid').getView().refresh();

                         }
                     }]
                 }, {
                     xtype: 'grid',
                     selModel: smAppoint,
                     id: 'oppApptGrid',
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
                         text: 'Subject',
                         sortable: false,
                         width: 400,
                         dataIndex: 'subject'
                     }, {
                         text: 'Location',
                         sortable: false,
                         width: 250,
                         dataIndex: 'location1'
                     }, {
                         text: 'Status',
                         width: 100,
                         sortable: true,
                         dataIndex: 'status'
                     }, {
                         text: 'Calendar',
                         width: 100,
                         sortable: true,
                         dataIndex: 'calendar'
                     }, {
                         text: 'Start Date',
                         sortable: false,
                         width: 200,
                         dataIndex: 'startdate',
                         renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                     }],
                     title: null,
                     viewConfig: {
                         stripeRows: true
                     }
                 }]
             }, {
                 title: 'Tasks',
                 id: 'oppTask',
                 layout: 'column',
                 width: '100%',
                 height: 250,
                 defaults: {
                     autoRender: true,
                     autoScroll: true
                 },
                 dockedItems: [{
                     xtype: 'toolbar',
                     items: [{
                         iconCls: 'attachment',
                         text: 'Attach',
                         handler: function () {}
                     }, {
                         iconCls: 'cancel',
                         text: 'Delete',
                         itemId: 'delete',
                         handler: function () {
                             Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', showResult);

                             function showResult(btn) {
                                 if (btn == "no") {
                                     Ext.example.msg('No', 'You cancelled the deletion..');
                                 } else {
                                     var rec1 = Ext.getCmp('oppTaskGrid').getSelectionModel().getSelection();
                                     var idArray = [];
                                     Ext.each(rec1, function (item) {
                                         idArray.push(item.data.taskId);
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
                                                 if (allTask[i].id == newtaskArray[j]) {
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
                                                 if (temp.id == taskArray[j]) {
                                                     if (flag == taskArray.length - 1) {
                                                         oppTaskListData += "{\"taskId\":\"" + temp.id + "\",\"subject\":\"" + temp.name + "\",\"status\":\"" + temp.status + "\",\"complete\":\"" + temp.percentComplete + "\",\"dueDate\":\"" + new Date(temp.d) + "\"}]";
                                                     } else {
                                                         oppTaskListData += "{\"taskId\":\"" + temp.id + "\",\"subject\":\"" + temp.name + "\",\"status\":\"" + temp.status + "\",\"complete\":\"" + temp.percentComplete + "\",\"dueDate\":\"" + new Date(temp.d) + "\"},";
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
                         text: 'New',
                         itemId: 'newappoint',
                         handler: function () {
                             var taskApp = appCtxt.getApp(ZmApp.TASKS);
                             taskApp._handleLoadNewTask();
                             var taskController = appCtxt.getCurrentController();
                             taskController.getToolbar().getButton(ZmOperation.SAVE).removeSelectionListeners();
                             taskController.getToolbar().addSelectionListener(ZmOperation.CANCEL, new AjxListener(this, biz_vnc_crm_client._oppTaskCancelListener, [app]));
                             taskController.getToolbar().addSelectionListener(ZmOperation.SAVE, new AjxListener(this, biz_vnc_crm_client._oppTaskSaveListener, [app]));

                         }
                     }, {
                         iconCls: 'refresh',
                         text: 'Refresh',
                         itemId: 'refresh',
                         handler: function () {}
                     }]
                 }, {
                     xtype: 'grid',
                     selModel: oppSMTask,
                     id: 'oppTaskGrid',
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
                         text: 'Subject',
                         sortable: false,
                         width: 600,
                         dataIndex: 'subject'
                     }, {
                         text: 'Status',
                         width: 200,
                         sortable: true,
                         dataIndex: 'status'
                     }, {
                         text: '% Complete',
                         width: 100,
                         sortable: true,
                         dataIndex: 'complete'
                     }, {
                         text: 'Due Date',
                         sortable: false,
                         width: 200,
                         dataIndex: 'dueDate',
                         renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                     }],
                     title: null,
                     viewConfig: {
                         stripeRows: true
                     }
                 }]
             }, {
                 title: 'Extra Info',
                 layout: 'column',
                 height: 175,
                 items: [{
                     columnWidth: .50,
                     border: false,
                     layout: 'anchor',
                     items: [{
                         xtype: 'datefield',
                         fieldLabel: 'Creation Date',
                         format: 'Y-m-d H:i:s.00',
                         id: 'dateOppCreationdate',
                         disabled: true,
                         anchor: '60%'
                     }, {
                         xtype: 'datefield',
                         id: 'dateOppUpdateDate',
                         format: 'Y-m-d H:i:s',
                         disabled: true,
                         fieldLabel: 'Update Date',
                         anchor: '60%'
                     }, {
                         xtype: 'datefield',
                         id: 'dateOppOpened',
                         format: 'Y-m-d H:i:s',
                         disabled: true,
                         fieldLabel: 'Opened',
                         anchor: '60%'
                     }, {
                         xtype: 'datefield',
                         id: 'dateOppClosed',
                         format: 'Y-m-d H:i:s',
                         disabled: true,
                         fieldLabel: 'Closed',
                         anchor: '60%'
                     }]
                 }, {
                     columnWidth: .50,
                     border: false,
                     layout: 'anchor',
                     items: [{
                         xtype: 'textfield',
                         fieldLabel: 'Days to Open',
                         id: 'txtOppDaysToOpen',
                         name: 'days2open',
                         disabled: true,
                         value: '0.00',
                         anchor: '60%'
                     }, {
                         xtype: 'textfield',
                         fieldLabel: 'Days to Close',
                         id: 'txtOppDaysToClose',
                         disabled: true,
                         name: 'days2close',
                         value: '0.00',
                         anchor: '60%'
                     }, {
                         xtype: 'textfield',
                         fieldLabel: 'Referred By',
                         id: 'txtOppReferredBy',
                         name: 'last',
                         anchor: '60%'
                     }]
                 }]
             }],
             listeners: {
                 'tabchange': function (tabPanel, tab) {
                     if (tab.id == 'appointment') {
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
                         alert("msgArray===========>" + msgArray);
                         if (msgArray != "null") {
                             biz_vnc_crm_client.requestApptList(msgArray);

                             Ext.getCmp('oppApptGrid').getStore().loadData(jsonParse(biz_vnc_crm_client.apptData), false);
                             Ext.getCmp('oppApptGrid').getView().refresh();
                         } else {
                             biz_vnc_crm_client.apptData = "[{'subject':'','location1':'','status':'','calendar':'','startdate':''}]";
                         }
                     } else if (tab.id == 'oppTask') {
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
                                     if (allTask[i].id == newtaskArray[j]) {
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
                                     if (temp.id == taskArray[j]) {
                                         if (flag == taskArray.length - 1) {
                                             oppTaskListData += "{\"taskId\":\"" + temp.id + "\",\"subject\":\"" + temp.name + "\",\"status\":\"" + temp.status + "\",\"complete\":\"" + temp.percentComplete + "\",\"dueDate\":\"" + new Date(temp.d) + "\"}]";
                                         } else {
                                             oppTaskListData += "{\"taskId\":\"" + temp.id + "\",\"subject\":\"" + temp.name + "\",\"status\":\"" + temp.status + "\",\"complete\":\"" + temp.percentComplete + "\",\"dueDate\":\"" + new Date(temp.d) + "\"},";
                                             flag++;
                                         }
                                     }
                                 }
                             }
                         }
                         Ext.getCmp('oppTaskGrid').getStore().loadData(jsonParse(oppTaskListData), false);
                         Ext.getCmp('oppTaskGrid').getView().refresh();
                     } else if (tab.id == 'comm') {
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
             text: 'Save',
             id: 'btnOppsave',
             disabled: true,
             width: 150,
             height: 25,
             iconCls: 'save',
             handler: function () {

                 if (Ext.getCmp('txtOppOpportunity').getValue() == "") {
                     Ext.getCmp('txtOppOpportunity').validate(false);
                     Ext.getCmp('txtOppOpportunity').focus(true);
                     Ext.example.msg('Empty Field', 'Please enter subject.');

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

                     var workPhone = 123;
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
                         Ext.example.msg('Save', 'Successfully Edit...');
                         biz_vnc_crm_client.initOpportunityGrid(app);
                     } else {
                         Ext.example.msg('Save Error', 'Not Successfully Edit...');
                         biz_vnc_crm_client.initOpportunityGrid(app);
                     }
                 }
             }
         }, {
             id: 'btnOppCancel',
             text: 'Cancel',
             width: 150,
             height: 25,
             iconCls: 'cancel',
             handler: function () {
                 Ext.example.msg('Cancel', 'You clicked the cancel button');
                 biz_vnc_crm_client.initOpportunityGrid(app);
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

                 tooltip: 'Create new lead.',
                 id: 'btnCreateOpportunity',
                 text: biz_vnc_crm_client.btnCreate,
                 iconCls: 'add24',
                 scale: 'medium',
                 handler: function () {
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

                     Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', showResult);

                     function showResult(btn) {
                         if (btn == "no") {
                             Ext.example.msg('No', 'You cancelled the deletion of opportunities.');
                         } else {
                             var name = appCtxt.getUsername();
                             var json = "jsonobj={\"action\":\"DELETEBYID\",\"object\":\"lead\",\"array\":\"" + idArray + "\",\"writeBy\":\"" + name + "\"}";
                             var reqHeader = {
                                 "Content-Type": "application/x-www-form-urlencoded"
                             };
                             var reqJson = AjxStringUtil.urlEncode(json);
                             var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                             Ext.example.msg('Yes', 'Records deleted successfully.');
                             biz_vnc_crm_client.initOpportunityGrid(app);
                         }

                     };


                 }
             }]
         }],
         items: [{
             title: 'Opportunity Form',
             region: 'south',
             layout: 'fit',
             defaults: {
                 autoRender: true,
                 autoScroll: true
             },
             id: 'footerOppPanel',
             items: [OpportunityFooterPanel]
         }, {
             title: 'Opportunities',
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
             }, // renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'), 
             {
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
                 header: biz_vnc_crm_client.customer,
                 width: 150,
                 dataIndex: 'contactName',
                 sortable: true
             }, {
                 header: biz_vnc_crm_client.nextActionDate,
                 width: 120,
                 dataIndex: 'nextActionDate',
                 renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
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
                         Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', showResult);

                         function showResult(btn) {
                             if (btn == "no") {
                                 Ext.example.msg('No', 'You cancelled the deletion of opportunities');
                             } else {
                                 var name = appCtxt.getUsername();
                                 var idArray = rec.get('leadId');
                                 var json = "jsonobj={\"action\":\"DELETEBYID\",\"object\":\"lead\",\"array\":\"" + idArray + "\",\"writeBy\":\"" + name + "\"}";
                                 var reqHeader = {
                                     "Content-Type": "application/x-www-form-urlencoded"
                                 };
                                 var reqJson = AjxStringUtil.urlEncode(json);
                                 var response = AjxRpc.invoke(reqJson, "/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
                                 Ext.example.msg('Yes', 'Records deleted successfully.');
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

             Ext.getCmp('btnOppsave').enable();
             Ext.getCmp('btnOppAddContact').enable();
             var rec = selectedRecord[0];

             if (rec != null) {
                 Ext.getCmp('oppTabPanel').setActiveTab(0);
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
                 Ext.getCmp('txtOppContact').setValue(rec.get('contactName'));
                 Ext.getCmp('txtOppOpportunity').setValue(rec.get('subjectName'));
                 Ext.getCmp('txtOppExpectedRevenue').setValue(rec.get('valuation'));
                 Ext.getCmp('txtOppNextAction').setValue(rec.get('nextAction'));
                 Ext.getCmp('txtOppProbability').setValue(rec.get('probability'));
                 Ext.getCmp('txtOppEmail').setValue(rec.get('email'));
                 Ext.getCmp('txtOppPhone').setValue(rec.get('phone'));

                 Ext.getCmp('txtOppDetails').setValue(rec.get('leadDescription'));
                 Ext.getCmp('txtOppStreet1').setValue(rec.get('street1'));
                 Ext.getCmp('txtOppStreet2').setValue(rec.get('street1'));
                 Ext.getCmp('txtOppCity').setValue(rec.get('city'));
                 Ext.getCmp('txtOppZip').setValue(rec.get('zip'));

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
             Ext.getCmp('btnOppsave').disable();
             Ext.getCmp('btnOppAddContact').disable();
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
             biz_vnc_crm_client.apptData += "{\"appointmentId\":\"" + msgArray[i] + "\",\"subject\":\"" + resp.name + "\",\"location1\":\"" + resp.loc + "\",\"status\":\"" + resp.status + "\",\"calendar\":\"" + appCtxt.getFolderTree().getById(resp.ciFolder).name + "\",\"startdate\":\"" + new Date(resp.d) + "\"}]";
         } else {
             biz_vnc_crm_client.apptData += "{\"appointmentId\":\"" + msgArray[i] + "\",\"subject\":\"" + resp.name + "\",\"location1\":\"" + resp.loc + "\",\"status\":\"" + resp.status + "\",\"calendar\":\"" + appCtxt.getFolderTree().getById(resp.ciFolder).name + "\",\"startdate\":\"" + new Date(resp.d) + "\"},";
         }
     }
 }



 /**
  * This method gets called by the Zimlet framework each time the application is opened or closed.
  *  
  * @param	{String}	appName		the application name
  * @param	{Boolean}	active		if <code>true</code>, the application status is open; otherwise, <code>false</code>
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
  * @param	{String}	appName		the application name		
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
             text: biz_vnc_crm_client.btnnew,
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
             biz_vnc_crm_client.initLeadGrid(app);
         } else if (tree_item.getText() == biz_vnc_crm_client.btnopportunities) {
             biz_vnc_crm_client.initOpportunityGrid(app);
         } else if (tree_item.getText() == biz_vnc_crm_client.btnreports) {
             ZmReportView.createForm(app);
         }

     }
 };

 biz_vnc_crm_client._leadTaskCancelListener = function (app) {
     app.pushView(app.getName());
 }

 biz_vnc_crm_client._leadTaskSaveListener = function (app) {
     alert("Lead Task Save Listener.");
 }


 biz_vnc_crm_client._oppTaskCancelListener = function (app) {
     app.pushView(app.getName());
 }

 biz_vnc_crm_client._oppTaskSaveListener = function (app) {
     alert("Opp Task Save Listener.");
 }