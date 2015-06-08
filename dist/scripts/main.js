var user = new UserModel();
$(document).ready(function(){
	// var user = new UserModel();
	var App = Backbone.Router.extend({
		routes: {
			'': 'profile',
			'edit': 'edit'
		},
		profile: function() {
			$('.page').hide();
			$('#profile').show();
		},
		edit: function() {
			$('.page').hide();
			$('#edit').show();
		}
	});
	var app = new App();
	Backbone.history.start();

	$.get("https://tiny-pizza-server.herokuapp.com/collections/josh-profile-model",retrieveUser)

	updateUser(user);
	user.on("change",updateUser)

	function updateUser(userModel){
		$("#nameShow").html(user.get("name"));
		$("#jobShow").html(user.get("role"));
		$("#emailShow").html(user.get("email"));
	}
	$("#user-save").submit(function(e){
		e.preventDefault();
		var newName = $("#name").val();
		var newEmail = $("#inputEmail3").val();
		var newJob = $("#role").val();
		var newPassword = $("#inputPassword3").val();
		if($("#name").val() == ""){
			alert("Please input a name!")
		}
		else if($("#inputEmail3").val() == ""){
			alert("Please input an email!")
		}
		else if($("#role").val() == ""){
			alert("Please input a Job!")
		}
		else if($("#inputPassword3").val() == ""){
			alert("Please input a valid password!")
		}
		else{
			user.set({
			name: newName,
			email: newEmail,
			role: newJob,
			password: newPassword
			});
			$.post("https://tiny-pizza-server.herokuapp.com/collections/josh-profile-model",
				{
					name: user.get("name"),
					role: user.get("role"),
					email: user.get("email"),
					password: user.get("password")
				},
				alert("Your info has been saved!"),
				app.navigate("", {trigger: true})
			);
		}
		$("#name").val("");
		$("#inputEmail3").val();
		$("#role").val("");
		$("#inputPassword3").val("");
	});
	function retrieveUser(UserInfo){
		user.set({
			name: UserInfo[0].name,
			email: UserInfo[0].email,
			role: UserInfo[0].role,
			password: UserInfo[0].password
			});
	}
});