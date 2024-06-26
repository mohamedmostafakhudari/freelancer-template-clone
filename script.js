// Nav & Menu Functionality

/* handle menu toggle */
const menuBtn = document.querySelector("#menuBtn");

menuBtn.addEventListener("click", () => {
	if (isMenuActive()) {
		closeMenu();
	} else {
		openMenu();
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
/* handle logo click event */
const logo = document.querySelector("#logo");
logo.addEventListener("click", () => {
	closeMenu();
	navigateToStart();
});

/* handle navItems click event */
const navList = document.querySelector(".navList");
const navItems = document.querySelectorAll(".navItem");
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
	closeMenu();
	target.parentElement.setAttribute("data-selected", "");
	window.location.href = target.getAttribute("href");
});
/* active nav items according to the current section on the viewport */
const observer = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				console.log(entry.target);
				selectVisibleSection(entry.target.id);
			}
		});
	},
	{
		rootMargin: "0px",
		threshold: 0.5,
	}
);
const sections = document.querySelectorAll("section[id]:not(#hero)");
sections.forEach((section) => {
	observer.observe(section);
});
function selectVisibleSection(id) {
	clearNavItemsSelection(navItems);
	navItems.forEach((item) => {
		if (item.firstElementChild.getAttribute("href").slice(1) === id) {
			item.setAttribute("data-selected", "");
		}
	});
}
function clearNavItemsSelection(navItems) {
	navItems.forEach((item) => {
		item.removeAttribute("data-selected");
	});
}
function navigateToStart() {
	window.scrollTo(0, 0);
	clearNavItemsSelection(navItems);
	clearNavItemsSelection(menuItems);
}
function isMenuActive() {
	const menu = document.querySelector("#menu");
	return menu.hasAttribute("data-active");
}
function openMenu() {
	const menu = document.querySelector("#menu");
	menu.setAttribute("data-active", "");
}
function closeMenu() {
	const menu = document.querySelector("#menu");
	menu.removeAttribute("data-active");
}

// render portfolio gallery
const portfolioCards = [
	{
		imgSrc: "./assets/cabin.png",
		title: "log cabin",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam.",
	},
	{
		imgSrc: "./assets/cake.png",
		title: "tasty cake",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam.",
	},
	{
		imgSrc: "./assets/circus.png",
		title: "circus tent",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam.",
	},
	{
		imgSrc: "./assets/game.png",
		title: "controller",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam.",
	},
	{
		imgSrc: "./assets/safe.png",
		title: "locked safe",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam.",
	},
	{
		imgSrc: "./assets/submarine.png",
		title: "submarine",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam.",
	},
];

renderPortfolioCards(portfolioCards);

/* render portfolio cards */
function renderPortfolioCards(cards) {
	const portfolioGallery = document.querySelector("#portfolio__gallery");
	portfolioGallery.innerHTML = "";
	for (const card of cards) {
		const elem = galleryCard(card);
		portfolioGallery.appendChild(elem);
	}
}
/* build card */
function galleryCard({ imgSrc, title, content }) {
	const elem = document.createElement("div");
	elem.className = "relative rounded-lg overflow-hidden cursor-pointer group";
	elem.innerHTML = `
		<div class="absolute inset-0 grid place-items-center bg-primary/80 opacity-0 transition duration-300 pointer-events-none group-hover:opacity-100">
			<span class="material-symbols-outlined text-8xl text-white">
			add
			</span>
		</div>
		<img src=${imgSrc} alt=${title} />
	`;
	elem.addEventListener("click", (e) => {
		openDialog({ imgSrc, title, content });
	});
	return elem;
}
/* handle card info dialog */
const dialog = document.querySelector("#portfolioDialog");

/** handle open dialog */
function openDialog({ imgSrc, title, content }) {
	updateDialogContent({ imgSrc, title, content });
	dialog.showModal();
	dialog.removeAttribute("data-closed");
	dialog.setAttribute("data-opened", "");
	document.body.style.overflowY = "hidden";
}
/** handle update dialog content */
function updateDialogContent({ imgSrc, title, content }) {
	const dialogTitle = dialog.querySelector(".portfolioDialog__title");
	const dialogImage = dialog.querySelector(".portfolioDialog__image");
	const dialogContent = dialog.querySelector(".portfolioDialog__content");

	const img = new Image();
	img.src = imgSrc;
	img.alt = title;

	dialogTitle.textContent = title;
	dialogContent.textContent = content;
	dialogImage.innerHTML = "";
	dialogImage.appendChild(img);
}
/** handle close dialog */
const dialogCloseBtns = document.querySelectorAll(".closeBtn");
dialogCloseBtns.forEach((btn) => {
	btn.addEventListener("click", closeDialog);
});

function closeDialog() {
	dialog.removeAttribute("data-opened");
	dialog.setAttribute("data-closed", "");
	document.body.style.overflowY = "auto";
	setTimeout(() => {
		dialog.close();
	}, 200);
}

// Contact Form
/* Validation */
const inputs = document.querySelectorAll(".input");

inputs.forEach((input) => {
	const inputWrapper = input.closest(".inputWrapper");
	inputWrapper.addEventListener("click", (e) => {
		if (document.hasFocus()) return;
		input.focus();
	});
	input.addEventListener("click", (e) => {
		e.stopPropagation();
		e.preventDefault();
	});
	input.addEventListener("input", () => {
		const errorBox = inputWrapper.querySelector(".errorBox");
		if (input.validity.valid) {
			inputWrapper.removeAttribute("data-invalid");
			inputWrapper.setAttribute("data-valid", "");
			errorBox.innerHTML = "";
		} else {
			inputWrapper.removeAttribute("data-valid");
			inputWrapper.setAttribute("data-invalid", "");

			errorBox.innerHTML = "";
			showError(input, errorBox);
		}
	});
});
function showError(input, errorBox) {
	if (input.validity.valueMissing) {
		const errorElem = createErrorElement(`${sentanceArticle(input.name)} ${input.name} is required`);
		errorBox.appendChild(errorElem);
		if (input.type === "email") {
			const extraErrorElem = createErrorElement(`${input.name.charAt(0).toUpperCase()}${input.name.slice(1)} is not valid`);
			errorBox.appendChild(extraErrorElem);
		}
	}
	if (input.validity.typeMismatch) {
		const errorElem = createErrorElement(`${input.name.charAt(0).toUpperCase()}${input.name.slice(1)} is not valid`);
		errorBox.appendChild(errorElem);
	}
}
function createErrorElement(message) {
	const p = document.createElement("p");
	p.textContent = message;
	p.className = "text-red-500 text-sm mt-1";
	return p;
}
function sentanceArticle(string) {
	if (string[0].match(/[aeiou]/i)) {
		return "An";
	} else {
		return "A";
	}
}
