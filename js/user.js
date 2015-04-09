$(document).ready(function() {
	
});
function validAuthForm() {
	var userName = $("#userName").val();
	var type = $("#type").val();
	if (userName === "" || type === "") {
		$("#errorMsg").text("所有项均为必填项，请填写！");
	} else {
		$('#authenticateUserForm').submit();
	}
}

function validModifyForm() {
	var userName = $("#userName").val();
	var name = $("#name").val();
	var idCard = $("#idCard").val();
	var phoneNumber = $("#phoneNumber").val();
	var msgValidCode = $("#msgValidCode").val();
	var email = $("#email").val();
	if (userName === "" || phoneNumber === "" || msgValidCode === "") {
		$("#errorMsg").text("所有项均为必填项，请填写！");
	} else {
		$('#modifyUserForm').submit();
	}
}

var wait = 60;
function sendmsg() {
	var o = $('#btnSendmsg');
	if (wait == 0) {
		o.attr("disabled", false);			
		o.val("获取验证码");
		wait = 60;
	} else {
		o.attr("disabled", true);
		o.val("(" + wait + ")秒后重新发送");
		wait--;
		setTimeout(function() {
			sendmsg();
		},
		1000)
	}
}

function sendMsgValidCode() {
	var phoneNum = $("#phoneNumber").val();
	var urlPath = "user/sendMsg?phoneNum=" + phoneNum;
	if ("" !== phoneNum) {
		$("#msgBtn").prop("disabled", "disabled");
		$.ajax({
			type : 'GET',
			url : urlPath,
			dataType : 'json',
			success : function(data) {
				console.log(data);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
		sendmsg();
	} else {
		$("#errorMsg").val("请填写手机号！");
	}
}

function modifyUserCheck(){
	var emailreg =/^[\w-\.]+@(?:[A-Za-z0-9-]+\.)+[a-z]+$/;
	var phonereg = /^1\d{10}$/;
	var name = $("#name").val();
	var nameNotice = $('#nameNotice');
	var emerName = $("#emerName").val();
	var emerNameNotice = $('#emerNameNotice');
	var emerTel = $("#emerTel").val();
	var emerTelNotice = $('#emerTelNotice');
	var address = $("#address").val();
	var addressNotice = $('#addressNotice');
	var education = $("#education").val();
	var educationNotice = $('#educationNotice');
	var schoolName = $("#schoolName").val();
	var schoolNameNotice = $('#schoolNameNotice');
	var position = $("#position").val();
	var positionNotice = $('#positionNotice');
	var userCorp = $("#userCorp").val();
	var userCorpNotice = $('#userCorpNotice');
	
	//联系人手机号
	if (emerTel != "") {
		if (!phonereg.test(emerTel)) {
			emerTelNotice.text('手机格式不正确');
			return false;
		}else{
			emerTelNotice.text("");
		}
	};
	
	//有资料修改，才提交表单
	if(name != "${userInfo.name}" 
		|| emerName != "${userInfo.emerName}" 
			|| emerTel != "${userInfo.emerTel}" 
				|| address != "${userInfo.address}" 
					|| education != "${userInfo.education}" 
						|| schoolName != "${userInfo.schoolName}" 
							|| position != "${userInfo.position}" 
								|| userCorp != "${userInfo.userCorp}"){
		return true;
	}
	return false;
}

function updateUserNameCheck(){
	var namereg =/^\w*[a-zA-Z]+\w*$/;
	var userNameNew = $("#userNameNew").val();
	var userNameNewNotice = $("#userNameNewNotice");
	if (userNameNew != '') {
		if(userNameNew.length < 6 || userNameNew.length > 15 ){
			userNameNewNotice.text("用户名长度必须在6至15个字符之间");
			userNameNewNotice.addClass("error");
			return false;
		} else if (!namereg.test(userNameNew)) {
			userNameNewNotice.text("用户名可由字母，数字和下划线组成，且必须包含字母");
			userNameNewNotice.addClass("error");
			return false;
		} else if (checkUseName(userNameNew)==false) {
			userNameNewNotice.text("用户名已存在");
			userNameNewNotice.addClass("error");
			return false;		
		} else {
			userNameNewNotice.text("");
			userNameNewNotice.removeClass("error");	
		}
	} else if (userNameNew == '') {
		userNameNewNotice.text("用户名不能为空");
		userNameNewNotice.addClass("error");
		return false;
	}
	
	return true;
}

function submitProblem(){
	var phoneNumber = $('#phoneNumber').val();
	phoneNumber = phoneNumber.replace(/(^\s*)|(\s*$)/g, "");
	var emailAddr = $('#emailAddr').val();
	emailAddr = emailAddr.replace(/(^\s*)|(\s*$)/g, "");
	var content = $('#problemContent').val();
	content = content.replace(/(^\s*)|(\s*$)/g, "");
	var contactWay="";
	if(phoneNumber=='手机号码' && emailAddr=='电子邮箱'){
		alert("请至少填写一种联系方式！");
		return;
	}
	if(phoneNumber!='手机号码'){
		var phonereg = /^1\d{10}$/;
		if (!phonereg.test(phoneNumber)) {
			alert("请填写正确的手机号码！");
			return;
		}else{
			contactWay = phoneNumber;
		}
	}
	if(emailAddr!='电子邮箱'){
		var mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
		if (!mailReg.test(emailAddr)) {
			alert("请填写正确的邮箱地址！");
			return;
		}else{
			if(contactWay==""){
				contactWay = emailAddr;
			}else{
				contactWay = contactWay+"/"+emailAddr;
			}
		}
	}
	if(content=='还有疑问？您可以在这里编辑您的问题......（限300个字）'){
		alert("请填写您的问题！");
		return;
	}
	var ctx = $('#ctx').val();
	$.ajax({
		url: ctx+"/submitProblem",
		type: "POST",
		data: 'contactWay='+contactWay+'&content='+content,
		async:false,
		dataType: "json",
		success: function (data) {
			if(data.rst){
				alert("问题提交成功！");
				window.location.href=ctx+"/faq";
			}
		},
		error: function (data) {
			ret = false;
		}
	});
	
}

