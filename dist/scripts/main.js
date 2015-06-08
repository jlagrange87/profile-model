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

	updateUser(user);

	user.on("change",updateUser)

	function updateUser(userModel){
		$("#nameShow").html(user.get("name"));
		$("#jobShow").html(user.get("role"));
		$("#emailShow").html(user.get("email"));
	}
	$("#user-save").submit(function(e){
		e.preventDefault();
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
			name: $("#name").val(),
			email: $("#inputEmail3").val(),
			role: $("#role").val(),
			password: $("#inputPassword3").val()
			});
		}	
	});
});