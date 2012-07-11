function ZmReportView () {}
ZmReportView.prototype.constructor = ZmReportView;

ZmReportView.prototype.toString = function() {
		return "ZmReportView";
}

ZmReportView.createForm = function(app){
	var content = AjxTemplate.expand("biz_vnc_crm_client.templates.SimpleOpportunity#MainOpportunity");
	app.setContent(content);
	
	var toolbar = app.getToolbar();
	toolbar.setVisibility(false);
	biz_vnc_crm_client._flag = 3;

	Ext.Loader.setConfig({enabled: true}); 
	Ext.require([
			'Ext.tab.*'
			,'Ext.window.*'
			,'Ext.tip.*'
			,'Ext.layout.container.Border'
			,'Ext.window.MessageBox'    
			,'Ext.grid.*'
			,'Ext.data.*'
			,'Ext.util.*'
			,'Ext.state.*'
			,'Ext.form.*'
			,'Ext.layout.container.Column'
			,'Ext.tab.Panel'
			,'Ext.panel.*'
			,'Ext.toolbar.*'
			,'Ext.button.*'
			,'Ext.container.ButtonGroup'
			,'Ext.layout.container.Table'
			,'Ext.selection.CheckboxModel'
			,'Ext.window.Window'
			,'Ext.toolbar.Spacer'
			,'Ext.layout.container.Card'
			,'Ext.chart.*'
			,'Ext.EventManager'
			,'Ext.ux.grid.Printer'
		]);

// -------------data load-----------------------------------------------------------------	

		Ext.define('model_1',{
      extend:'Ext.data.Model',
	   
    fields:[
		{name: 'leadId', type: 'int'},
		{name: 'subjectName', type: 'string'},           	
		{name: 'leadDescription', type: 'string'},           
		{name: 'contactName', type: 'string'},
		{name: 'companyName', mapping: 'companyBean.companyName',type: 'string'},
		{name: 'companyId', mapping: 'companyBean.companyId',type: 'int'},
		{name: 'valuation', type: 'string'},
		{name: 'leadState', type: 'string'},
		{name: 'phone', type: 'string'},
		{name: 'fax', type: 'string'},
		{name: 'partnerName', type: 'string'},
		{name: 'email', type: 'string'},
		{name: 'workPhone', type: 'string'},
		{name: 'mobile', type: 'string'},
		{name: 'street1', type: 'string'},
		{name: 'street2', type: 'string'},
		{name: 'city', type: 'string'},
	  	{name: 'zip', type: 'string'},
		{name: 'stateName',mapping: 'stateBean.stateName',type: 'string'},
  		{name: 'stateId',mapping: 'stateBean.stateId',type: 'int'},
	    {name: 'countryName',mapping: 'countryBean.countryName',type: 'string'},
		{name: 'countryId',mapping: 'countryBean.countryId',type: 'int'},
  		{name: 'type', type: 'string'},
		{name: 'dateOpen', type: 'date'},
		{name: 'dateClose', type: 'date'},
		{name: 'expectedDateClose', type: 'date'},
		{name: 'stageName',mapping: 'stageBean.stageName',type: 'string'},
  		{name: 'stageId',mapping: 'stageBean.stageId',type: 'int'},
  		{name: 'stageProbability',mapping: 'stageBean.stageProbability',type: 'float'},
		{name: 'probability', type: 'float'},
		{name: 'channelName',mapping: 'channelBean.channelName',type: 'string'},
  		{name: 'channelId',mapping: 'channelBean.channelId',type: 'int'},
		{name: 'sectionId',mapping: 'sectionBean.sectionId',type: 'int'},
		{name: 'sectionName',mapping: 'sectionBean.sectionName',type: 'string'},
		{name: 'categoryName',mapping: 'categoryBean.categoryName',type: 'string'},
  		{name: 'categoryId',mapping: 'categoryBean.categoryId',type: 'int'},
		{name: 'dayClose', type: 'float'},
		{name: 'dayOpen', type: 'float'},
		{name: 'referredBy', type: 'string'},
		{name: 'userId', type: 'string'}, //userId
		{name: 'priorityId',mapping: 'priorityBean.priorityId',type: 'int'},
		{name: 'priorityName',mapping: 'priorityBean.priorityName',type: 'string'},
  		{name: 'nextActionDate', type: 'date'},
  		{name: 'nextAction', type: 'string'},
		{name: 'status', type: 'bool'},
		{name: 'createBy', type: 'string'},
		{name: 'createDate', type: 'date'},
		{name: 'writeBy', type: 'string'},
  		{name: 'writeDate', type: 'date'}
        ]
   });	

		Ext.define('model_2',{
      extend:'Ext.data.Model',
	   
    fields:[
		{name: 'leadId', type: 'int'},
		{name: 'valuation', type: 'string'},
		{name: 'stageName',mapping: 'stageBean.stageName',type: 'string'},
  		{name: 'stageId',mapping: 'stageBean.stageId',type: 'int'},
  		]
   });	

		var json = "jsonobj={\"action\":\"LIST\",\"object\":\"lead\"}";
		var reqHeader = {"Content-Type":"application/x-www-form-urlencoded"};
		var reqJson = AjxStringUtil.urlEncode(json);
		var responseLead = AjxRpc.invoke(reqJson,"/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);
	//	console.log(responseLead.length);
	


		var json = "jsonobj={\"action\":\"LIST\",\"object\":\"opp\"}";
		var reqHeader = {"Content-Type":"application/x-www-form-urlencoded"};
		var reqJson = AjxStringUtil.urlEncode(json);
		var responseOpportunity = AjxRpc.invoke(reqJson,"/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

		var json = "jsonobj={\"action\":\"LIST\",\"object\":\"stage\"}";
		var reqJson = AjxStringUtil.urlEncode(json);
		var responseStage = AjxRpc.invoke(reqJson,"/service/zimlet/biz_vnc_crm_client/client.jsp", reqHeader, null, false);

//---------------------------combo panel start --------------------------------
var typeData = Ext.create('Ext.data.Store', {
		fields: ['name', 'value'],
		data : [
			{'name':'Lead', 'value': 'lead'},
			{'name':'Opportunity', 'value': 'opp'}
		]
	});
var reportData = Ext.create('Ext.data.Store', {
		fields: ['name', 'value'],
		data : [
			{'name':'By State', 'value': 'By State'},
			{'name':'By month vise revenue', 'value': 'By month vise revenue'},
			{'name':'By Stage', 'value': 'By Stage '},
			{'name':'By year vise revenue', 'value': 'By year vise revenue'}

		]
	});

Ext.create('Ext.panel.Panel', {
		title: 'Report',
		width: '100%',
		height: 100,
		layout: 'column',
		defaults:{
			autoScroll: true,
			autoRender: true
		},
		items:[{
				columnWidth: .5,
				border: false,
				anchor: '100%',
				items:[{	
					xtype: 'combo',
					id: 'cmbChooseType',
					fieldLabel: 'Choose Type',
					
					store: typeData, 
					queryMode: 'local',
					displayField: 'name',
					valueField: 'value'
				}]
				
			},{
				columnWidth: .5,
				border: false,
				anchor: '100%',
				width: 200,
				items:[{	
					xtype: 'combo',
					id: 'cmbChooseReport',
					fieldLabel: 'Choose Report Type',
					store: reportData, 
					queryMode: 'local',
					displayField: 'name',
					labelWidth:130,
					valueField: 'value'
					
				}]
				}],
				
			
		
		//html: '<p>World!</p>',
		renderTo: 'datagridOpportunity'
});
//--------------------------- combo panel end --------------------------------

// ------------------------ all lead grid window start ------------------------------------------------------
	
	var leadGridWindow = Ext.create('widget.window', {
        height: 500,
        width: 600,
        x: 10,
        y: 110,
        title: 'My Leads',
        closable: true,
		collapsible: true,
	/*	defaults: {
			autoRender: true,	
			autoScroll: true
		},*/
	//	draggable: false,
        //plain: true,
        layout: 'fit',
        items: [LeadPanel = Ext.create('Ext.panel.Panel', {
        width: '100%',
        id:'leadPanel',
		layout: 'border',
        bodyBorder: true,
		items: [{
			xtype: 'grid',
			id: 'leadGrid',
			layout: 'fit',
			defaults: {
				autoRender: true,	
				autoScroll: true
			},
			store: Ext.create('Ext.data.Store', {
				model:'model_1',
				proxy:{
				type:'memory',
				data:jsonParse(responseLead.text)
				},
			   autoLoad:true,
			   actionMethods:{read:'POST'}

			}), 
			viewConfig: {
			   stripeRows: true
			},
			columns: [
				{text: biz_vnc_crm_client.creationDate, width: 160, renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'), dataIndex: 'createDate'},
				{text: biz_vnc_crm_client.subject, width: 160, dataIndex: 'subjectName'},
		//		{text: biz_vnc_crm_client.contactName, width: 160, dataIndex: 'contactName'},
		//		{text: biz_vnc_crm_client.email, width: 160, dataIndex: 'email'},
		//		{text: biz_vnc_crm_client.phone, width: 160, dataIndex: 'phone'},
				{text: biz_vnc_crm_client.stage, width:160, dataIndex: 'stageName'},
		//		{text: biz_vnc_crm_client.salesman, width:160, dataIndex: 'userId'},
				{text: biz_vnc_crm_client.leadstate, width:160, dataIndex: 'leadState'}
			]
			
		}],
		tbar: [{
			text: 'Print',
			iconCls: 'print',
			handler : function(){
				//Ext.ux.panel.Printer.printAutomatically = false;
				//Ext.ux.panel.Printer.print(LeadPanel);
			}
		}]
	})],
	renderTo : 'datagridOpportunity'
	});
   leadGridWindow.show();

//--------------------------all lead grid window end ---------------------------------------------------------
//--------------------------all opportunity grid window start ---------------------------------------------------------
var oppGridWindow = Ext.create('widget.window', {
        height: 500,
        width: 600,
        x: 10,
        y: 110,
        title: 'My Opportunities',
        closable: true,
		collapsible: true,
	//	draggable: false,
        //plain: true,
        layout: 'fit',
	/*	defaults: {
			autoRender: true,	
			autoScroll: true
		},*/
        items: [OppPanel = Ext.create('Ext.form.Panel', {
        width: '100%',
        id:'oppPanel',
		layout: 'border',
        bodyBorder: true,
		items: [{
		xtype: 'grid',
		id: 'opportunityGrid',
		layout: 'fit',
	/*	defaults: {
			autoRender: true,	
			autoScroll: true
		},*/
		store: Ext.create('Ext.data.Store', {
			model:'model_1',
			proxy:{
			type:'memory',
			data:jsonParse(responseOpportunity.text)
			},
		   autoLoad:true,
		   actionMethods:{read:'POST'}

		}), 
		viewConfig: {
		   stripeRows: true
		},
		columns: [
			{header: biz_vnc_crm_client.creationDate, width: 120, dataIndex: 'createDate', renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'), sortable: true},
			{header: biz_vnc_crm_client.opportunity, width: 150, dataIndex: 'subjectName', sortable: true},
		//	{header: biz_vnc_crm_client.customer, width: 150, dataIndex: 'contactName', sortable: true},
		//	{header: biz_vnc_crm_client.nextActionDate, width: 120, dataIndex: 'nextActionDate', renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'), sortable: true},
		//	{header: biz_vnc_crm_client.nextAction, width: 150, dataIndex: 'nextAction', sortable: true},
			{header: biz_vnc_crm_client.stage, width:150, dataIndex: 'stageName', sortable: true},
		//	{header: biz_vnc_crm_client.expectedRevenue, width:150, dataIndex: 'valuation', sortable: true},
		//	{header: biz_vnc_crm_client.probability, width:110, dataIndex: 'probability', sortable: true},
		//	{header: biz_vnc_crm_client.salesman, width:120, dataIndex: 'userId', sortable: true},
			{header: biz_vnc_crm_client.state, width:120, dataIndex: 'leadState', sortable: true}
		]

		}],
		tbar: [{
			text: 'Print',
			iconCls: 'print',
			handler : function(){
				//Ext.ux.panel.Printer.printAutomatically = false;
				//Ext.ux.panel.Printer.print(LeadPanel);
			}
		}]
	})],
	renderTo : 'datagridOpportunity'
	});
    oppGridWindow.show();


//--------------------------all opportunity grid window end ---------------------------------------------------------
//-------------------------- all lead pie chart stage wise window start ---------------------------------------------------------


	function foo(arr) {
		var a = [], b = [], prev;
		arr.sort();
		for ( var i = 0; i < arr.length; i++ ) {
			if ( arr[i] !== prev ) {
				a.push(arr[i]);
				b.push(1);
			} else {
				b[b.length-1]++;
			}
			prev = arr[i];
		}
		return [a, b];
	}
/*var alldata =  Ext.create('Ext.data.Store', {
			model:'model_2',
			id  : 'alldataId',
			proxy:{
			type:'memory',
			data:jsonParse(responseLead.text)
			},
		   autoLoad:true,
		   actionMethods:{read:'POST'}

		}); 
*/		

	//var sectionData = jsonParse(responseStage.text);
	var len = jsonParse(responseLead.text).length;
	var stages = [];
	for(var i =0; i< len;i++)
	{	
		if(!((jsonParse(responseLead.text))[i].stageBean.stageName)) {
			stages.push("Undefined");
		} else {
			stages.push((jsonParse(responseLead.text))[i].stageBean.stageName);
		}
	}
	console.log(stages);
	var fooArr = foo(stages);
	var stage = fooArr[0];
	var stagecnt = fooArr[1];

	var total = 0;
	var leadStageChartStore = Ext.create('Ext.data.JsonStore', {
		fields: [{name:'name', type:'string'},{name:'data', type:'int'}]
	});
	for(var i=0;i<stage.length;i++){
		leadStageChartStore.add({ 'name': stage[i], 'data': stagecnt[i]});
		total +=  stagecnt[i];
	}
	var donut = false,
	leadStageChart = Ext.create('Ext.chart.Chart', {
			xtype: 'chart',
			id: 'chartCmpStage',
			animate: true,
			store: leadStageChartStore,
			height: 200,
			width: 350,
			shadow: true,
			legend: {
				position: 'right'
			},
			theme: 'Base:gradients',
			series: [{
				type: 'pie',
				angleField: 'data',
				showInLegend: true,
				donut: donut,
				tips: {
				  trackMouse: true,
				  width: 140,
				  height: 28,
				  renderer: function(storeItem, item) {
					this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data') / total * 100) + '%');
				  }
				},
				highlight: {
				  segment: {
					margin: 20
				  }
				},
				label: {
					field: 'name',
					display: 'rotate',
					contrast: true,
					font: '10px Arial'
				}
			}]
	});


	var leadStageChartPanel = Ext.create('widget.panel', {
		width: 700,
		height: 450,
		title: null,
		renderTo: Ext.getBody(),
		layout: 'fit',
		tbar: [{
			text: 'Save Chart',
			handler: function() {
				Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice){
					if(choice == 'yes'){
						leadStageChart.save({
							type: 'image/png'
						});
					}
				});
			}
		},{
			enableToggle: true,
			pressed: false,
			text: 'Donut',
			toggleHandler: function(btn, pressed) {
				var chart = Ext.getCmp('chartCmpStage');
				chart.series.first().donut = pressed ? 35 : false;
				chart.refresh();
			}
		}],
		items: leadStageChart
	});
		
	var leadStagePieChartWindow = new Ext.Window({
         title: 'Number of leads by Stage'
        ,renderTo: 'datagridOpportunity'
        ,maxWidth:700
        ,maxHeight:500
		,minWidth:700
        ,minHeight:500
		,x:620
		,y:110
		,collapsible: true
        ,closable:true
        ,border:false
        ,layoutConfig:{animate:true}
        ,items:[{
             stateId:'first'
            ,title: null
            ,collapsed:false
			,items: leadStageChartPanel
        }]
    });
    leadStagePieChartWindow.show();



//-------------------------- all lead pie chart stage wise window end ---------------------------------------------------------

//-------------------------- all Opp pie chart stage wise window start ---------------------------------------------------------

	
/*var alldata =  Ext.create('Ext.data.Store', {
			model:'model_2',
			id  : 'alldataId',
			proxy:{
			type:'memory',
			data:jsonParse(responseLead.text)
			},
		   autoLoad:true,
		   actionMethods:{read:'POST'}

		}); 
*/		
	var len = jsonParse(responseOpportunity.text).length;
	var stages = [];
	for(var i =0; i< len;i++)
	{	
		if(!((jsonParse(responseOpportunity.text))[i].stageBean.stageName)) {
			stages.push("Undefined");
		} else {
			stages.push((jsonParse(responseOpportunity.text))[i].stageBean.stageName);
		}
	}

	var fooArr = foo(stages);
	var stage = fooArr[0];
	var stagecnt = fooArr[1];
	
	var total = len;
	var oppStageChartStore = Ext.create('Ext.data.JsonStore', {
		fields: [{name:'name', type:'string'},{name:'data', type:'int'}]
	});

	for(var i=0;i<stage.length;i++){
		oppStageChartStore.add({ 'name': stage[i], 'data': stagecnt[i]});
		//total +=  stagecnt[i];
	}

	var donut = false,
	oppStageChart = Ext.create('Ext.chart.Chart', {
			xtype: 'chart',
			id: 'chartCmpOppStage',
			animate: true,
			store: oppStageChartStore,
			height: 200,
			width: 350,
			shadow: true,
			legend: {
				position: 'right'
			},
			theme: 'Base:gradients',
			series: [{
				type: 'pie',
				angleField: 'data',
				showInLegend: true,
				donut: donut,
				tips: {
				  trackMouse: true,
				  width: 140,
				  height: 28,
				  renderer: function(storeItem, item) {
					this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data') / total * 100) + '%');
				  }
				},
				highlight: {
				  segment: {
					margin: 20
				  }
				},
				label: {
					field: 'name',
					display: 'rotate',
					contrast: true,
					font: '10px Arial'
				}
			}]
		});


	var oppStageChartPanel = Ext.create('widget.panel', {
		width: 700,
		height: 450,
		title: null,
		renderTo: Ext.getBody(),
		layout: 'fit',
		tbar: [{
			text: 'Save Chart',
			handler: function() {
				Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice){
					if(choice == 'yes'){
						oppStageChart.save({
							type: 'image/png'
						});
					}
				});
			}
		},{
			enableToggle: true,
			pressed: false,
			text: 'Donut',
			toggleHandler: function(btn, pressed) {
				var chart = Ext.getCmp('chartCmpOppStage');
				chart.series.first().donut = pressed ? 35 : false;
				chart.refresh();
			}
		}],
		items: oppStageChart
	});
		
	var oppStagePieChartWindow = new Ext.Window({
         title: 'Number of Opportunity by Stage'
        ,renderTo: 'datagridOpportunity'
        ,maxWidth:700
        ,maxHeight:500
		,minWidth:700
        ,minHeight:500
		,x:620
		,y:110
		,collapsible: true
        ,closable:true
        ,border:false
        ,layoutConfig:{animate:true}
        ,items:[{
             stateId:'first'
            ,title: null
            ,collapsed:false
			,items: oppStageChartPanel
        }]
    });
    oppStagePieChartWindow.show();



//-------------------------- all Opportunity pie chart stage wise window end ---------------------------------------------------------
//-------------------------- all Opportunity column chart stage wise window start ---------------------------------------------------------
/*

function foo(arr) {
		var a = [], b = [], prev;
		arr.sort();
		for ( var i = 0; i < arr.length; i++ ) {
			if ( arr[i] !== prev ) {
				a.push(arr[i]);
				b.push(1);
			} else {
				b[b.length-1]++;
			}
			prev = arr[i];
		}
		return [a, b];
	}

*/
	var len = jsonParse(responseOpportunity.text).length;
	var allyear = [];
	for(var i =0; i< len;i++)
	{	
		allyear.push(new Date((jsonParse(responseOpportunity.text))[i].createDate).getFullYear());
	}

	var fooArr = foo(allyear);
	var year = fooArr[0];
	var val = new Array(year.length);
	var item = jsonParse(responseOpportunity.text);
	for(var i =0; i<year.length;i++)
	{	
		val[i] = 0;	
		for(var j =0; j< len;j++)
		{	
			if(year[i] == new Date(item[j].createDate).getFullYear()) {
				val[i] += parseInt(item[j].valuation); 
			}
		}
	}
	var total = len;
	var oppValuationChartStore = Ext.create('Ext.data.JsonStore', {
		fields: [{name:'name', type:'string'},{name:'data', type:'int'}]
	});
	

	for(var i=0;i<year.length;i++){
		
		oppValuationChartStore.add({ 'name': year[i], 'data': val[i]});
		//total +=  stagecnt[i];
	}


var oppRevenueChart = Ext.create('Ext.chart.Chart', {
			id: 'chartCmpRevenue',
			xtype: 'chart',
			style: 'background:#fff',
			animate: true,
			shadow: true,

			store: oppValuationChartStore,
			axes: [{
				type: 'Numeric',
				position: 'left',
				fields: ['data'],
				label: {
					renderer: Ext.util.Format.numberRenderer('0,0')
				},
				title: 'Expected Revenue',
				grid: true,
				minimum: 0
			}, {
				type: 'Category',
				position: 'bottom',
				fields: ['name'],
				title: 'YEARS'
			}],
			series: [{
				type: 'column',
				axis: 'left',
				highlight: true,
				tips: {
				  trackMouse: true,
				  width: 140,
				  height: 28,
				  renderer: function(storeItem, item) {
					this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data'));
				  }
				},
				label: {
				  display: 'insideEnd',
				  'text-anchor': 'middle',
					field: 'data',
					renderer: Ext.util.Format.numberRenderer('0'),
					orientation: 'vertical',
					color: '#333'
				},
				xField: 'name',
				yField: 'data'
			}]
		});

	var oppRevenueChartPanel = Ext.create('widget.panel', {
		width: 700,
		height: 450,
		title: null,
		renderTo: Ext.getBody(),
		layout: 'fit',
		 tbar: [{
			text: 'Save Chart',
			handler: function() {
				Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice){
					if(choice == 'yes'){
						oppRevenueChart.save({
							type: 'image/png'
						});
					}
				});
			}
		}],
		items: oppRevenueChart
		
	});
	
	var oppRevenueChartWindow = new Ext.Window({
         title: 'Year vise Revenue'
        ,renderTo: 'datagridOpportunity'
        ,maxWidth:700
        ,maxHeight:500
		,minWidth:700
        ,minHeight:500
		,x:620
		,y:110
		,collapsible: true
        ,closable:true
        ,border:false
        ,layoutConfig:{animate:true}
        ,items:[{
             stateId:'first'
            ,title: null
            ,collapsed:false
			,items: oppRevenueChartPanel
			//DJ,items: oppChartPanel
        }]
    });
    oppRevenueChartWindow.show();
    


//-------------------------- all Opportunity column chart stage wise window end ---------------------------------------------------------

//-------------------------- all lead pie chart window start ---------------------------------------------------------
/*
function foo(arr) {
    var a = [], b = [], prev;

    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }

    return [a, b];
}

*/


	var leadData = jsonParse(responseLead.text); 
	var closelead=inProgresslead=newlead=pendinglead=total=0;
//	var fooarr = [];

	for(var i =0; i< leadData.length;i++)
	{	//fooarr.push(leadData[i].leadState);
		if (leadData[i].leadState == "New"){
			newlead++;
		} else if (leadData[i].leadState == "In Progress"){
			inProgresslead++;
		} else if (leadData[i].leadState == "Pending"){
			pendinglead++;
		} else if (leadData[i].leadState == "Close"){
			closelead++;
		}
	}
	//alert("fooarr====>"+foo(fooarr));
	
	total = closelead+inProgresslead+newlead+pendinglead;
	var leadChartStore = Ext.create('Ext.data.JsonStore', {
	fields: [{name:'name', type:'string'},{name:'data', type:'int'}],
	data: [{ 'name': 'New', 'data': newlead},
			{ 'name': 'In Progress', 'data': inProgresslead},
			{ 'name': 'Close', 'data': closelead},
			{ 'name': 'Pending', 'data': pendinglead}
		]});

	var donut = false,
	leadChart = Ext.create('Ext.chart.Chart', {
			xtype: 'chart',
			id: 'chartCmp',
			animate: true,
			store: leadChartStore,
			height: 200,
			width: 350,
			shadow: true,
			legend: {
				position: 'right'
			},
			theme: 'Base:gradients',
			series: [{
				type: 'pie',
				angleField: 'data',
				showInLegend: true,
				donut: donut,
				tips: {
				  trackMouse: true,
				  width: 140,
				  height: 28,
				  renderer: function(storeItem, item) {
					this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data') / total * 100) + '%');
				  }
				},
				highlight: {
				  segment: {
					margin: 20
				  }
				},
				label: {
					field: 'name',
					display: 'rotate',
					contrast: true,
					font: '10px Arial'
				}
			}]
		});


	var leadChartPanel = Ext.create('widget.panel', {
		width: 700,
		height: 450,
		title: null,
		renderTo: Ext.getBody(),
		layout: 'fit',
		tbar: [{
			text: 'Save Chart',
			handler: function() {
				Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice){
					if(choice == 'yes'){
						leadChart.save({
							type: 'image/png'
						});
					}
				});
			}
		},{
			enableToggle: true,
			pressed: false,
			text: 'Donut',
			toggleHandler: function(btn, pressed) {
				var chart = Ext.getCmp('chartCmp');
				chart.series.first().donut = pressed ? 35 : false;
				chart.refresh();
			}
		}],
		items: leadChart
	});
		
	var leadPieChartWindow = new Ext.Window({
         title: 'Number of leads by state'
        ,renderTo: 'datagridOpportunity'
        ,maxWidth:700
        ,maxHeight:500
		,minWidth:700
        ,minHeight:500
		,x:620
		,y:110
		,collapsible: true
        ,closable:true
        ,border:false
        ,layoutConfig:{animate:true}
        ,items:[{
             stateId:'first'
            ,title: null
            ,collapsed:false
			,items: leadChartPanel
        }]
    });
    leadPieChartWindow.show();


//-------------------------- all lead pie chart window end ---------------------------------------------------------
/*
 var leadGroupChart = Ext.create('Ext.Window', {
        width: 800,
        height: 600,
        minHeight: 400,
        minWidth: 550,
        hidden: false,
        maximizable: true,
        title: 'Grouped Bar Chart',
        renderTo: Ext.getBody(),
        layout: 'fit',
        tbar: [{
            enableToggle: true,
            pressed: true,
            text: 'Animate',
            toggleHandler: function(btn, pressed) {
                var chart = Ext.getCmp('chartCmp');
                chart.animate = pressed ? { easing: 'ease', duration: 500 } : false;
            }
        }],
        items: {
            id: 'chartCmp',
            xtype: 'chart',
            style: 'background:#fff',
            animate: true,
            shadow: true,
            store: store1,
            legend: {
              position: 'right'  
            },
            axes: [{
                type: 'Numeric',
                position: 'bottom',
                fields: ['data1', 'data2', 'data3'],
                minimum: 0,
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0')
                },
                grid: true,
                title: 'Number of Hits'
            }, {
                type: 'Category',
                position: 'left',
                fields: ['name'],
                title: 'Month of the Year'
            }],
            series: [{
                type: 'bar',
                axis: 'bottom',
                xField: 'name',
                yField: ['data1', 'data2', 'data3']
            }]
        }
    });

*/
//-------------------------- all opp pie chart window start ---------------------------------------------------------

	var oppData = jsonParse(responseOpportunity.text); 
	var closelead=inProgresslead=newlead=pendinglead=total=0;
	for(var i =0; i< oppData.length;i++)
	{
		if (oppData[i].leadState == "New"){
			newlead++;
		} else if (oppData[i].leadState == "In Progress"){
			inProgresslead++;
		} else if (oppData[i].leadState == "Pending"){
			pendinglead++;
		} else if (oppData[i].leadState == "Close"){
			closelead++;
		}
	}
	total = closelead+inProgresslead+newlead+pendinglead;
	var oppPieChartStore = Ext.create('Ext.data.JsonStore', {
	fields: [{name:'name', type:'string'},{name:'data', type:'int'}],
	data: [{ 'name': 'New', 'data': newlead},
			{ 'name': 'In Progress', 'data': inProgresslead},
			{ 'name': 'Close', 'data': closelead},
			{ 'name': 'Pending', 'data': pendinglead}
		]});

	var donut = false,
	oppPieChart = Ext.create('Ext.chart.Chart', {
			xtype: 'chart',
			id: 'oppPieChart',
			animate: true,
			store: oppPieChartStore,
			height: 200,
			width: 350,
			shadow: true,
			legend: {
				position: 'right'
			},
			theme: 'Base:gradients',
			series: [{
				type: 'pie',
				angleField: 'data',
				showInLegend: true,
				donut: donut,
				tips: {
				  trackMouse: true,
				  width: 140,
				  height: 28,
				  renderer: function(storeItem, item) {
					this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data') / total * 100) + '%');
				  }
				},
				highlight: {
				  segment: {
					margin: 20
				  }
				},
				label: {
					field: 'name',
					display: 'rotate',
					contrast: true,
					font: '10px Arial'
				}
			}]
		});


	var oppPieChartPanel = Ext.create('widget.panel', {
		width: 700,
		height: 450,
		title: null,
		renderTo: Ext.getBody(),
		layout: 'fit',
		tbar: [{
			text: 'Save Chart',
			handler: function() {
				Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice){
					if(choice == 'yes'){
						oppPieChart.save({
							type: 'image/png'
						});
					}
				});
			}
		},{
			enableToggle: true,
			pressed: false,
			text: 'Donut',
			toggleHandler: function(btn, pressed) {
				var chart = Ext.getCmp('oppPieChart');
				chart.series.first().donut = pressed ? 35 : false;
				chart.refresh();
			}
		}],
		items: oppPieChart
	});
		
	var oppPieChartWindow = new Ext.Window({
         title: 'Number of opportunity by state'
        ,renderTo: 'datagridOpportunity'
        ,maxWidth:700
        ,maxHeight:500
		,minWidth:700
        ,minHeight:500
		,x:620
		,y:110
		,collapsible: true
        ,closable:true
        ,border:false
        ,layoutConfig:{animate:true}
        ,items:[{
             stateId:'first'
            ,title: null
            ,collapsed:false
			,items: oppPieChartPanel
        }]
    });
    oppPieChartWindow.show();
	// leadStagePieChartWindow.show();


//-------------------------- all opp pie chart window end ---------------------------------------------------------

//-------------------------- all opportunity column chart window start ---------------------------------------------------------
	var oppData = jsonParse(responseOpportunity.text); 
	var closeopp=inProgressopp=newopp=pendingopp=totalopp=0;
	for(var i =0; i< oppData.length;i++)
	{
	if (oppData[i].leadState == "New")
	{
	newopp++;
	} else if (oppData[i].leadState == "In Progress")
	{
	inProgressopp++;
	} else if (oppData[i].leadState == "Pending")
	{
	pendingopp++;
	} else if (oppData[i].leadState == "Close")
	{
	closeopp++;
	}
	}
	totalopp = closeopp+inProgressopp+newopp+pendingopp;
	var oppChartStore = Ext.create('Ext.data.JsonStore', {
	fields: [{name:'name', type:'string'},{name:'data', type:'int'}],
	data: [
	{ 'name': 'New', 'data': newopp},
	{ 'name': 'In Progress', 'data': inProgressopp},
	{ 'name': 'Close', 'data': closeopp},
	{ 'name': 'Pending', 'data': pendingopp}
	]
	});
	var jan=feb=march=april=may=jun=jul=aug=sep=oct=nov=dec=0;
	for(var i =0; i< oppData.length;i++)
	{
	// alert("oppData[i].createDate--new date-"+new Date(oppData[i].createDate).getMonth());
	 if (new Date(oppData[i].createDate).getMonth() == 0)
	 {
		jan +=parseInt(oppData[i].valuation);
	 } else if (new Date(oppData[i].createDate).getMonth() == 1)
	 {
		feb +=parseInt(oppData[i].valuation);
	 } else if (new Date(oppData[i].createDate).getMonth() == 2)
	 {
		march +=parseInt(oppData[i].valuation);
	 } else if (new Date(oppData[i].createDate).getMonth() == 3)
	 {
		april +=parseInt(oppData[i].valuation);
	 } else if (new Date(oppData[i].createDate).getMonth() == 4)
	 {
		may +=parseInt(oppData[i].valuation);
	 } else if (new Date(oppData[i].createDate).getMonth() == 5)
	 {
		jun +=parseInt(oppData[i].valuation);
	 } else if (new Date(oppData[i].createDate).getMonth() == 6)
	 {
		jul +=parseInt(oppData[i].valuation);
	 } else if (new Date(oppData[i].createDate).getMonth() == 7)
	 {
		aug +=parseInt(oppData[i].valuation);
	 } else if (new Date(oppData[i].createDate).getMonth() == 8)
	 {
		sep +=parseInt(oppData[i].valuation);
	 } else if (new Date(oppData[i].createDate).getMonth() == 9)
	 {
		oct +=parseInt(oppData[i].valuation);
	 } else if (new Date(oppData[i].createDate).getMonth() == 10)
	 {
		nov +=parseInt(oppData[i].valuation);
	 } else if (new Date(oppData[i].createDate).getMonth() == 11)
	 {
		
		dec +=parseInt(oppData[i].valuation);
	 }
	}

	var oppChartStore = Ext.create('Ext.data.JsonStore', {
	fields: [{name:'name', type:'string'},{name:'data', type:'int'}],
	data: [
	{ 'name': 'Jan', 'data': jan },
	{ 'name': 'Feb', 'data': feb},
	{ 'name': 'Mar', 'data': march},
	{ 'name': 'Apr', 'data': april},
	{ 'name': 'May', 'data': may},
	{ 'name': 'Jun', 'data': jun},
	{ 'name': 'Jul', 'data': jul},
	{ 'name': 'Aug', 'data': aug},
	{ 'name': 'Sep', 'data': sep},
	{ 'name': 'Oct', 'data': oct},
	{ 'name': 'Nov', 'data': nov},
	{ 'name': 'Dec', 'data': dec}
	]
	});


	var oppChart = Ext.create('Ext.chart.Chart', {
			id: 'chartCmp12',
			xtype: 'chart',
			style: 'background:#fff',
			animate: true,
			shadow: true,

			store: oppChartStore,
			axes: [{
				type: 'Numeric',
				position: 'left',
				fields: ['data'],
				label: {
					renderer: Ext.util.Format.numberRenderer('0,0')
				},
				title: 'Expected Revenue',
				grid: true,
				minimum: 0
			}, {
				type: 'Category',
				position: 'bottom',
				fields: ['name'],
				title: 'Months of current year'
			}],
			series: [{
				type: 'column',
				axis: 'left',
				highlight: true,
				tips: {
				  trackMouse: true,
				  width: 140,
				  height: 28,
				  renderer: function(storeItem, item) {
					this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data'));
				  }
				},
				label: {
				  display: 'insideEnd',
				  'text-anchor': 'middle',
					field: 'data',
					renderer: Ext.util.Format.numberRenderer('0'),
					orientation: 'vertical',
					color: '#333'
				},
				xField: 'name',
				yField: 'data'
			}]
		});

	var oppChartPanel = Ext.create('widget.panel', {
		width: 700,
		height: 450,
		title: null,
		renderTo: Ext.getBody(),
		layout: 'fit',
		 tbar: [{
			text: 'Save Chart',
			handler: function() {
				Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice){
					if(choice == 'yes'){
						oppChart.save({
							type: 'image/png'
						});
					}
				});
			}
		}],
		items: oppChart
		
	});
	
	var oppChartWindow = new Ext.Window({
         title: 'Monthly Expected Revenue'
        ,renderTo: 'datagridOpportunity'
        ,maxWidth:700
        ,maxHeight:500
		,minWidth:700
        ,minHeight:500
		,x:620
		,y:110
		,collapsible: true
        ,closable:true
        ,border:false
        ,layoutConfig:{animate:true}
        ,items:[{
             stateId:'first'
            ,title: null
            ,collapsed:false
			,items: oppChartPanel
			//DJ,items: oppChartPanel
        }]
    });
    oppChartWindow.show();
    
//-------------------------- all opportunity column chart window end ---------------------------------------------------------
}


