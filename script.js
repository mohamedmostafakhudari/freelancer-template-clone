// Nav & Menu Functionality

/* handle menu toggle */
const menuBtn = document.querySelector("#menuBtn");

menuBtn.addEventListener("click", () => {
	const menu = document.querySelector("#menu");
	if (menu.hasAttribute("data-active")) {
		menu.removeAttribute("data-active");
	} else {
		menu.setAttribute("data-active", "");
	}
});

/* handle nav size change */
document.addEventListener("scroll", (e) => {
	updateNavSizing();
});

function updateNavSizing() {
	const nav = document.querySelector("#nav");
	const logo = nav.querySelector("#logo");

	if (window.scrollY === 0) {
		logo.classList.remove("lg:text-2xl");
		logo.classList.remove("lg:py-6");
		logo.classList.add("lg:text-3xl");
		logo.classList.add("lg:py-10");
	} else {
		logo.classList.remove("lg:text-3xl");
		logo.classList.remove("lg:py-10");
		logo.classList.add("lg:text-2xl");
		logo.classList.add("lg:py-6");
	}
}
/* handle navItems click event */
const navList = document.querySelector(".navList");
const navItems = document.querySelectorAll(".navItem");
console.log(navItems);
navList.addEventListener("click", (e) => {
	clearNavItemsSelection(navItems);
	const target = e.target.closest(".navItem");
	if (!target) return;
	target.setAttribute("data-selected", "");
});
/* handle menuItems click event */
const menu = document.querySelector("#menu");
const menuItems = document.querySelectorAll(".menuItem");

menu.addEventListener("click", (e) => {
	const target = e.target.closest("a");
	if (!target) return;
	e.preventDefault();
	clearNavItemsSelection(menuItems);
	target.parentElement.setAttribute("data-selected", "");
	window.location.href = target.getAttribute("href");
});

function clearNavItemsSelection(navItems) {
	navItems.forEach((item) => {
		item.removeAttribute("data-selected");
	});
}
