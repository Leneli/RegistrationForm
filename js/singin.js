$(function () {

	var logBtn = $("#login"),
		input = $("input"),
		email,
		user,
		password;


	//Включить/отключить кнопку "Войти" в зависимости от того, завполнены поля или нет
	input.on("input", function () {
		let nocontent = 0;

		$.each(input, function () {
			if ($(this).val() !== "") {
				nocontent++;
			}
		});

		if (nocontent === input.length) {
			logBtn.attr("disabled", false);
		} else {
			logBtn.attr("disabled", true);
		}
	});

	//Получение данных из JSON
	$.getJSON("./php/data.json", function (data) {
		$.each(data, function (key, val) {
			switch (key) {
			case "inputEmail":
				email = val;
				break;
			case "inputLogin":
				user = val;
				break;
			case "inputPassword1":
				password = val;
				break;
			}
		});
	});

	//Проверка совпадения логина/пароля
	logBtn.click(function () {
		let log = $("#log").val(),
			pas = $("#pas").val(),
			errMess = $(".error-text");

		if (log === user || log === email) {
			if (pas === password) {
				window.location.replace("welcome.html");
			} else {
				errMess.text("Неверный пароль.");
			}
		} else {
			errMess.text("Неверный логин или email.");
		}
	});

});