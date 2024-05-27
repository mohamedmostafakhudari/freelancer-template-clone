const menuBtn = document.querySelector("#menuBtn");

menuBtn.addEventListener("click", () => {
	const menu = document.querySelector("#menu");
	console.log(menu);
	if (menu.hasAttribute("data-active")) {
		menu.removeAttribute("data-active");
	} else {
		menu.setAttribute("data-active", "");
	}
});
