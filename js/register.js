$(function () {

	var input = $("input[type=text], input[type=email], input[type=password]"),
		check = $("input[type=checkbox]"),
		success = $(".has-success"),
		subButton = $("button[type=submit]"), //??
		form = $("#register");


	//Валидация полей, требующих ввода символов (type=text, type=email, type=password)
	input.on("input", function () {
		let elem = $(this),
			id = elem.attr("id");

		switch (id) {
		case "inputName":
			validateStr(elem,
				/[A-ZА-ЯЁ][a-zа-яё]{2,}/g,
				"Имя должно содержать более 3 символов, включать только буквы русского и/или английского алфавита, первая буква заглавная, остальные строчные.");
			break;

		case "inputLogin":
			validateStr(elem,
				/[a-z][a-z0-9-_]{3,}[a-z0-9]/g,
				'Логин должен содержать более 5 символов, только строчные буквы английского алфавита, цифры и символы "-" и "_". Начинаться логин должен с буквы, заканчиваться на букву или цифру. Не допускается пробел');
			break;

		case "inputEmail":
			validateStr(elem,
				/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
				'Электронная почта указывается в формате: my_mail@mail.com. Пробелы не допускаются.');
			break;

		case "inputPassword1":
			validateStr(elem,
				/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g,
				'Пароль должен содержать строчные и прописные латинские буквы, цифры, спецсимволы. Минимум 8 символов.');
			break;

		case "inputPassword2":
			validPass2(elem);
			break;

		default:
			console.log("Error. Elemrnt not found");
		}

		sibmitOn();
	});

	//Валидация чекбокса
	check.click(function () {
		if ($(this).is(":checked")) {
			toggleErrClass($(this), true);
		} else {
			toggleErrClass($(this), false);
		}

		sibmitOn();
	});


	//Валидация полей
	function validateStr(el, pattern, errorMessege) {
		let str = el.val();

		if (str.match(pattern) !== null && str.match(pattern)[0] == str) {
			//if (str.match(pattern) == str)
			toggleErrClass(el, true);
		} else {
			toggleErrClass(el, false);
		}

		addErrorMessege(el, errorMessege);
	}

	//Валидация второго пароля
	//Должен полностью совпадать с первым
	function validPass2(el) {
		let pass = $("#inputPassword1").val();

		if (el.val() === pass) {
			toggleErrClass(el, true);
		} else {
			toggleErrClass(el, false);
		}

		addErrorMessege(el, "Пароли не совпадают. Попробуйте еще раз.");
	}


	//Включение и выключение кнопки sibmit
	function sibmitOn() {
		//усди все поля заполнены прваильно
		if ($(".has-success").length === $("input").length) {
			subButton.attr("disabled", false);
			$("#text-end").hide();
		} else {
			subButton.attr("disabled", true);
			$("#text-end").show();
		}
	}

	//Добавить параграф с текстом об ошибке
	function addErrorMessege(el, text) {
		let div = el.parents("div.form-group");

		//если на div'е висит класс с ошибкой
		if (div.hasClass("has-error")) {

			if (div.children().is("p.error-text") === false)
				div.append("<p class='error-text text-danger'>" + text + "</p>");

		} else {
			//удаляем сообщение об ошибке
			$("p.error-text").remove();
		}
	}

	//Переключение классов, показывающих пользователю, правильно или нет заполнено поле
	function toggleErrClass(el, notError) {
		if (notError === true) {
			el.parents("div.form-group").removeClass("has-error").addClass("has-success");
		} else {
			el.parents("div.form-group").removeClass("has-success").addClass("has-error");
		}
	}


	//ОТПРАВКА ДАННЫХ НА СЕРВЕР
	form.submit(function (event) {
		console.log($(this).serialize());

		let mess = $(this).serialize();

		$.ajax({
			type: "POST",
			url: "./php/res.php",
			data: mess,

			success: function (data) {
				console.log(data);
				subButton.attr("disabled", true);
				window.location.replace("singin.html");
			},

			error: function (xhr, srt) {
				console.log("Ошибка: " + xhr.responseCode);
				alert("Извините, произошла ошибка " + xhr.responseCode + ". Попробуйте чуть позже.");
			}
		});

		//отключаем действие по умолчанию
		return false;
	});
});