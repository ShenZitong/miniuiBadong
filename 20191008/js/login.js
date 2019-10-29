$(function() {
	var pageLoad,projectId;
	$(".login-btn").click(function() {
		Login();
	})
	//回车提交
	$(window).on('keyup', function (e) {
	    if (e.keyCode == "13") {
	        Login();
	    }
	});
	function Login() {
		pageLoad = layer.load(1);
		var userName = $('.name-inp').val();
		var passWord = $('.psd-inp').val();
		if(!userName) {
			layer.close(pageLoad);
			layer.tips('用户名不能为空', '.name-inp');
		} else if(!passWord) {
			layer.close(pageLoad);
			layer.tips('密码不能为空', '.psd-inp');
		} else {
			$.ajax({
				url: PublicUrlCloud + 'Login/LoginCheck',
				type: 'post',
				data: {
					Account: userName,
					Password: passWord
				},
				success: function(data) {
					if(!!data) {
						if(!data.Status){
							layer.close(pageLoad);
							layer.tips('用户或密码错误', '.login-btn');
							return false;
						}
						//判断登录状态
						var status = data.Status;
						if(!status) {
							layer.tips(data.Msg, '#submit', {
								tips: 3
							})
							
						} else {
							//保存用户信息和登录状态
							var userData = data.Data;
							var type = data.Msg;
							var isLogin = true;
							if(type === '内置超级管理员') {
								sessionStorage.setItem('userType', type);
								sessionStorage.setItem('userData', userData);
								sessionStorage.setItem('pageName', "");
								sessionStorage.setItem('loginStatus', isLogin);
								layer.close(pageLoad);
								layer.tips('请用项目账号登录!', '.login-btn');
//								location.href = 'home.html';
							} else {
								if(type !== "财务管理员") {
									if(type !== "商户管理员") {
										var role = JSON.parse(userData).role;
										if(!role) {
											layer.msg("该用户信息有误", {
												time: 1500
											})
											return false;
										}
										var value = role.Value;
										localStorage.setItem('getRole', value)
									}
								}
								sessionStorage.setItem('userType', type)
								sessionStorage.setItem('userData', userData);
								sessionStorage.setItem('loginStatus', isLogin);
								if(!!userData) {
									var userDataParse = JSON.parse(userData);
									if(type === '商户管理员') {
										sessionStorage.setItem('pageName', userDataParse.BussinessName);
									} else if(type === '城市管理员') {
										sessionStorage.setItem('pageName', userDataParse.CityName);
									} else if(type === '项目管理员') {
										sessionStorage.setItem('pageName', userDataParse.ProjectName);
										projectId = userDataParse.parkingAdmin.ProjectID;
										sessionStorage.setItem('projectid', projectId);
									} else if(type === '集团管理员') {
										sessionStorage.setItem('pageName', userDataParse.GroupName);
									} else if(type === '财务管理员') {
										sessionStorage.setItem('pageName', userDataParse.financeOperator.Name);
									}
								}
								sessionStorage.setItem('RemindList', JSON.stringify(JSON.parse(userData).remindList));
								layer.close(pageLoad);
								if(projectId){
									location.href = 'html/home.html';
								}else{
									layer.tips('请用项目账号登录!', '.login-btn');
								}
							}
						}
					} else {
						alert('获取的data数据不正确');
						layer.close(pageLoad);
					}
				}
			})
		}
	}
})