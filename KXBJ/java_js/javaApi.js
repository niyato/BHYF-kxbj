//java 接口
var url="192.168.1.153:8081/BflMark/";
//var url=truelove.youjiaoyun.net/

//查询区角配置信息
function queryAreaAngleInfo(page){
	var tbody = "";
	var pageCount = "";
	var gardenId=localStorage.getItem('gid');
	
  $.ajax({
	
	url : "http://"+url+"areaAngle/queryAreaAngleInfo?jsoncallback=?",
	dataType : 'jsonp',
	data : {page:page,pageSize:10,gardenId:2139},
	jsonp : 'jsoncallback',
	async: false,
	
	success : function(result) {
		console.log(result);
		
		var resultData = result.areaAngle;

		
		//列表数据总数
		var pageCount = result.allCount;
		
		//每页显示数据数
		var pageSize = resultData.length;
		
		//页数
		var page_Count = result.pageCount;
			
			$("#areaAngle_info tbody").empty();
			
			for(var i in resultData){

				var areaType=resultData[i].areaType;
				var typeName;
				if(areaType==1){
					typeName='班级区角-'+resultData[i].className;
				}else{
					typeName='公共区角-'+resultData[i].commonArea;
				}
				var baseName=resultData[i].baseName;
				if(baseName==null){
					baseName='--';
				}
				
				
				$("#areaAngle_info").append("<tr>"+             
								"<td>"+resultData[i].areaName+"</td>"+
								"<td>"+typeName+"</td>"+
								"<td>"+resultData[i].angleType+"</td>"+
								"<td>"+baseName+"</td>"+
							   
							   "<td>"+"<a id='edit_a' class='ca' onclick='store("+resultData[i].areaId+")' href='#'><span class='edit_opt'>编辑</span></a>"+"&nbsp;&nbsp;&nbsp;"+
					"<a class='ca' onclick='removeAreaAngleRecord("+resultData[i].areaId+")' href='#'><span class='edit_opt'>删除</span></a>"+"&nbsp;&nbsp;&nbsp;"+
					"<a class='ca'onclick='turnRecord("+resultData[i].areaId+",\""+resultData[i].areaName+"\",\""+typeName+"\")'  href='#'><span class='edit_opt'>查看配置历史</span></a>"+"</td>"+
								"</tr>" );
			}
	
	
		  
		 if(page_Count==1){
				$("#divpage").empty();
			  }else{
				if(page < page_Count-1)
				{
					$("#divpage").pagination(pageCount, {
						callback:pageselectCallback,
						prev_text: '<< 上一页',
						next_text: '下一页 >>',
						items_per_page: pageSize,
						num_display_entries: 10,
						current_page: page,
						num_edge_entries: 0
				  });
				}

			  }
		
				  
	},
	error: function (XMLHttpReuqest, textStautus, errothrown) {
		console.log(XMLHttpRequest.status);
		console.log(XMLHttpReuqest.readyState);
		console.log(XMLHttpRequest.responseText);
		console.log(textStautus);
		console.log(errothrown);
	},
	statusCode: {
		404: function() {
			 alert("page not found");
			}
	 }

   });
};

//查询区角配置条件信息
function queryConfigCondition(){

	var gardenId=localStorage.getItem('gid');

	$.ajax({
		url : "http://"+url+"areaAngle/queryConfigCondition?jsoncallback=?",
		dataType : 'jsonp',
		data : {gardenId:2139},
		jsonp : 'jsoncallback',
		async: false,

		success : function(result) {
			console.log(result);

			var classInfo = result.classInfo;
			var areaAngleType = result.areaAngleType;
			var base = result.baseStation;

			//根据id查找对象，班级
			var obj1=document.getElementById('classInfoSelect');
			for(var i in classInfo){

				//添加一个选项
				obj1.add(new Option(classInfo[i].className,classInfo[i].classId));
			}
			//根据id查找对象，区角类型
			var obj2=document.getElementById('angleTypeSelect');
			for(var i in areaAngleType){

				//添加一个选项
				obj2.add(new Option(areaAngleType[i].angleType,areaAngleType[i].angleTypeId));
			}
			//根据id查找对象，监控设备
			var obj3=document.getElementById('baseStationSelect');

			for(var i in base){

				//添加一个选项
				obj3.add(new Option(base[i].baseName,base[i].monitorId));
			}


		},
		error: function (XMLHttpReuqest, textStautus, errothrown) {
			console.log(XMLHttpRequest.status);
			console.log(XMLHttpReuqest.readyState);
			console.log(XMLHttpRequest.responseText);
			console.log(textStautus);
			console.log(errothrown);
		},
		statusCode: {
			404: function() {
				alert("page not found");
			}
		}

	});
}

//区角配置插入
function recordAreaAngleInfo(){

	var gardenId=localStorage.getItem('gid');

	var areaName=document.getElementById("areaAngleName").value;
	//alert(areaName);
	var areaType=document.getElementById("areaTypeSelect").value;
	//alert(areaType);
	var classId=document.getElementById("classInfoSelect").value;
	//alert(classId);
	var commonArea=document.getElementById("commonAreaAngle").value;
	//alert(commonArea);
	var angleType=document.getElementById("angleTypeSelect").value;
	//alert(angleType);
	var monitorId=document.getElementById("baseStationSelect").value;
	//alert(monitorId);
	var baseName="";
	if(monitorId!=''){
		var obj=document.getElementById('baseStationSelect');
		var index=obj.selectedIndex; //序号，取当前选中选项的序号
		baseName = obj.options[index].text;
	}


	//var baseName=document.getElementById("baseStationSelect").text;
	//alert(baseName);
	$.ajax({
		url : "http://"+url+"areaAngle/recordAreaAngleConfig?jsoncallback=?",
		dataType : 'jsonp',
		data : {gardenId:2139,areaName:areaName,areaType:areaType,classId:classId,commonArea:commonArea,angleTypeId:angleType,monitorId:monitorId,baseName:baseName},
		jsonp : 'jsoncallback',
		async: false,

		success : function(result) {
			console.log(result);
			if(result.flag=="success"){
				easyDialog.open({
                    container: {
                        content: '插入成功！',
                    },
                    autoClose: 2000,
					callback:function(){
						   window.location.href = 'areaAnalysis.html';
						}
                });
                return false;

		    }
		},
		error: function (XMLHttpReuqest, textStautus, errothrown) {
			console.log(XMLHttpRequest.status);
			console.log(XMLHttpReuqest.readyState);
			console.log(XMLHttpRequest.responseText);
			console.log(textStautus);
			console.log(errothrown);
		},
		statusCode: {
			404: function() {
				alert("page not found");
			}
		}
	   

	});
}

//查询区角编辑信息
function queryConfigEditInfo(){
	var areaId=localStorage.getItem("areaId");
	//alert(areaId);
	var gardenId=localStorage.getItem('gid');
	document.getElementById("areaId_edit").value=areaId;
	//window.location.href = 'areaAngleEdit.html';
	$.ajax({
		url : "http://"+url+"areaAngle/querySingleAreaAngleInfo?jsoncallback=?",
		dataType : 'jsonp',
		data : {gardenId:2139,areaId:areaId},
		jsonp : 'jsoncallback',
		async: false,

		success : function(result) {
			//alert(1);
			console.log(result);
			var areaAngleInfo=result.areaAngleInfo;
			var classInfo = result.classInfo;
			var areaAngleType = result.areaAngleType;
			var base = result.baseStation;



			document.getElementById('areaId_edit').value=areaAngleInfo.areaId;
			document.getElementById('areaAngleName_edit').value=areaAngleInfo.areaName;
			document.getElementById('commonAreaAngle_edit').value=areaAngleInfo.commonArea;
			var areaType=areaAngleInfo.areaType;
			var obj_area=document.getElementById('areaTypeSelect_edit');
			obj_area.length=0;
			if(areaType==1){
				obj_area.add(new Option('教室区角',1));
				obj_area.add(new Option('公共区角',2));
			}else{
				obj_area.add(new Option('公共区角',2));
				obj_area.add(new Option('教室区角',1));
			}
			//根据id查找对象，班级
			var obj1=document.getElementById('classInfoSelect_edit');
			obj1.length=0;
			for(var i in classInfo){

				//添加一个选项
				obj1.add(new Option(classInfo[i].className,classInfo[i].classId));
			}
			//根据id查找对象，区角类型
			var obj2=document.getElementById('angleTypeSelect_edit');
			obj2.length=0;
			for(var i in areaAngleType){

				//添加一个选项
				obj2.add(new Option(areaAngleType[i].angleType,areaAngleType[i].angleTypeId));
			}
			//根据id查找对象，监控设备
			var obj3=document.getElementById('baseStationSelect_edit');
			obj3.length=0;

			for(var i in base){

				//添加一个选项
				obj3.add(new Option(base[i].baseName,base[i].monitorId));
			}


		},
		error: function (XMLHttpReuqest, textStautus, errothrown) {
			console.log(XMLHttpRequest.status);
			console.log(XMLHttpReuqest.readyState);
			console.log(XMLHttpRequest.responseText);
			console.log(textStautus);
			console.log(errothrown);
		},
		statusCode: {
			404: function() {
				alert("page not found");
			}
		}

	});
};

//区角配置修改
function updateAreaAngleInfo(){

	var gardenId=localStorage.getItem('gid');

	var areaId=document.getElementById("areaId_edit").value;
	var areaName=document.getElementById("areaAngleName_edit").value;
	//alert(areaName);
	var areaType=document.getElementById("areaTypeSelect_edit").value;
	//alert(areaType);
	var classId=document.getElementById("classInfoSelect_edit").value;
	//alert(classId);
	var commonArea=document.getElementById("commonAreaAngle_edit").value;
	//alert(commonArea);
	var angleType=document.getElementById("angleTypeSelect_edit").value;
	//alert(angleType);
	var monitorId=document.getElementById("baseStationSelect_edit").value;
	//alert(monitorId);
	var baseName="";
	if(monitorId!=''){
		var obj=document.getElementById('baseStationSelect_edit');
		var index=obj.selectedIndex; //序号，取当前选中选项的序号
		baseName = obj.options[index].text;
	}
   
    
	
	//var baseName=document.getElementById("baseStationSelect").text;
	//alert(baseName);
	$.ajax({
		url : "http://"+url+"areaAngle/updateAreaAngleConfig?jsoncallback=?",
		dataType : 'jsonp',
		data : {gardenId:2139,areaId:areaId,areaName:areaName,areaType:areaType,classId:classId,commonArea:commonArea,angleTypeId:angleType,monitorId:monitorId,baseName:baseName},
		jsonp : 'jsoncallback',
		async: false,

		success : function(result) {
			console.log(result);
		  
			if(result.flag=="success"){
/*				alert("更新成功！");
				window.location.href = 'areaAnalysis.html';*/
				easyDialog.open({
                    container: {
                        content: '更新成功！',
                    },
                    autoClose: 2000,
					callback:function(){
						   window.location.href = 'areaAnalysis.html';
						}
                });
				return false;
			}else{
				easyDialog.open({
                    container: {
                        content: '更新失败！',
                    },
                    autoClose: 2000
                });
				return false;
			}

		},
		error: function (XMLHttpReuqest, textStautus, errothrown) {
			console.log(XMLHttpRequest.status);
			console.log(XMLHttpReuqest.readyState);
			console.log(XMLHttpRequest.responseText);
			console.log(textStautus);
			console.log(errothrown);
		},
		statusCode: {
			404: function() {
				alert("page not found");
			}
		}

	});
};

//查询区角配置历史
function queryAreaAngleRecord(page){
	var tbody = "";
	var pageCount = "";
	var areaId=localStorage.getItem('areaId');
	var areaAngleType=localStorage.getItem('areaAngleType');
	var areaAngleName=localStorage.getItem('areaAngleName');
	document.getElementById("areaAngleType_record").innerHTML=areaAngleType;
	document.getElementById("areaAngleName_record").innerHTML=areaAngleName;
	$.ajax({

		url : "http://"+url+"areaAngle/queryAreaAngleRecord?jsoncallback=?",
		dataType : 'jsonp',
		data : {page:page,pageSize:10,areaId:areaId,order:'desc'},
		jsonp : 'jsoncallback',
		async: false,

		success : function(result) {
			console.log(result);

			var resultData = result.areaAngleRecord;


			//列表数据总数
			var pageCount = result.allCount;

			//每页显示数据数
			var pageSize = resultData.length;

			//页数
			var page_Count = result.pageCount;

			$("#areaAngle_info tbody").empty();

			for(var i in resultData){

				var endTime=resultData[i].endTime;

				if(endTime==null){
					endTime='--';
				}
				var monitorName=resultData[i].monitorName;

				if(monitorName==null){
					monitorName='--';
				}

				$("#tblist_record").append("<tr>"+
					"<td>"+resultData[i].startTime+"</td>"+
					"<td>"+endTime+"</td>"+

					"<td>"+monitorName+"</td>"+

					"</tr>" );
			}



			if(page_Count==1){
				$("#divpage").empty();
			}else{
				if(page < page_Count-1)
				{
					$("#divpage").pagination(pageCount, {
						callback:pageselectCallback,
						prev_text: '<< 上一页',
						next_text: '下一页 >>',
						items_per_page: pageSize,
						num_display_entries: 10,
						current_page: page,
						num_edge_entries: 0
					});
				}

			}


		},
		error: function (XMLHttpReuqest, textStautus, errothrown) {
			console.log(XMLHttpRequest.status);
			console.log(XMLHttpReuqest.readyState);
			console.log(XMLHttpRequest.responseText);
			console.log(textStautus);
			console.log(errothrown);
		},
		statusCode: {
			404: function() {
				alert("page not found");
			}
		}

	});
};

//删除区角配置信息
function removeAreaAngleRecord(areaId){

	$.ajax({

		url : "http://"+url+"areaAngle/removeAreaAngleInfo?jsoncallback=?",
		dataType : 'jsonp',
		data : {areaId:areaId},
		jsonp : 'jsoncallback',
		async: false,

		success : function(result) {
			console.log(result);
			if(result.flag=="success"){
				var btnFn = function(){
					  window.location.href = 'areaAnalysis.html';
					  
					}
				easyDialog.open({
					  container:{
						     header:'',
						     content:'确定要删除此项吗？',
							 yesFn:btnFn,
							 noFn:true
						  },
					  //autoClose: 2000
					});
				 return false;
			}else{
				easyDialog.open({
					  container:{
						     content:'删除失败！'
						  },
					  autoClose:2000
					});
				return false;	
			}
		},
		error: function (XMLHttpReuqest, textStautus, errothrown) {
			console.log(XMLHttpRequest.status);
			console.log(XMLHttpReuqest.readyState);
			console.log(XMLHttpRequest.responseText);
			console.log(textStautus);
			console.log(errothrown);
		},
		statusCode: {
			404: function() {
				alert("page not found");
			}
		}

	});
};
