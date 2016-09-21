$(function () {

	var userName;

	//Получение данных из JSON
	$.getJSON("./php/data.json", function (data) {
		$.each(data, function (key, val) {
			switch (key) {
			case "inputName":
				userName = val;
				break;
			}
		});

		$(".user").text(", " + userName);
	});

});