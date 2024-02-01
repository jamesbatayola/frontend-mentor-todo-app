const background = document.querySelector(".background");

const themeIcon = document.querySelector(".theme-icon");

const checkboxez = document.querySelectorAll(".checkbox");

// const footerText = document.querySelectorAll(".footer-text");

const input = document.querySelector(".todo-input");

const form = document.querySelector("form");

const todoContainer = document.querySelector(".todo-container");

const todoList = document.querySelector(".todo-list");

// const todos = document.querySelectorAll(".todo");

const removes = document.querySelectorAll(".remove-icon");

const allButton = document.querySelector(".all-preview");

const activeButton = document.querySelector(".active-preview");

const todoFooter = document.querySelector(".todo-footer");

// window size function

let isMobile;
let isDesktop;

const displayCheck = () => {
	if (window.innerWidth > 726) {
		isDesktop = true;
		isMobile = false;
		if (isLight) {
			background.src = "/images/bg-desktop-light.jpg";
		} else {
			background.src = "/images/bg-desktop-dark.jpg";
		}
	} else {
		isDesktop = false;
		isMobile = true;
		if (isLight) {
			background.src = "/images/bg-mobile-light.jpg";
		} else {
			background.src = "/images/bg-mobile-dark.jpg";
		}
	}
};

window.addEventListener("resize", displayCheck);

// change theme func

let isLight = true;

const changeAllThemes = () => {
	const checkboxes = document.querySelectorAll(".checkbox");
	const boxTheme = document.querySelectorAll(".box-theme");
	const text = document.querySelectorAll(".text");

	boxTheme.forEach((each) => {
		each.classList.toggle("boxColor");
		console.log("hello");
	});
	text.forEach((each) => {
		each.classList.toggle("textColor");
	});
	checkboxes.forEach((each) => {
		console.log("JAKE!");
		each.classList.toggle("checkboxColor");
	});
};

const checked = (e) => {
	const target = e.target;
	const parent = e.target.closest(".box");
	target.parentElement.classList.toggle("active");
	parent.classList.toggle("active");

	const allTodo = document.querySelectorAll(".todo");

	for (const todo of allTodo) {
		for (const classes of todo.classList) {
			if (classes === "active") {
				todo.dataset.status = "done";
			} else {
				todo.dataset.status = "undone";
			}
		}
	}

	itemsChecker();
};

const check_input = document.querySelector(".input-check");

for (eachCheckbox of checkboxez) eachCheckbox.onclick = checked;

check_input.removeEventListener("click", checked);

const changeTheme = () => {
	const allBox = document.querySelectorAll(".box-theme");
	console.log(allBox);
	if (isMobile) {
		if (isLight) {
			changeAllThemes();
			themeIcon.src = "/images/icon-moon.svg";
			background.src = "/images/bg-mobile-dark.jpg";
			document.body.style.backgroundColor = "var(--Very-Dark-Blue)";
			isLight = false;
		} else {
			changeAllThemes();
			themeIcon.src = "/images/icon-sun.svg";
			background.src = "/images/bg-mobile-light.jpg";
			document.body.style.backgroundColor = "var(--Very-Light-Gray)";
			isLight = true;
		}
	} else if (isDesktop) {
		if (isLight) {
			changeAllThemes();
			themeIcon.src = "/images/icon-moon.svg";
			background.src = "/images/bg-desktop-dark.jpg";
			document.body.style.backgroundColor = "var(--Very-Dark-Blue)";
			isLight = false;
		} else {
			changeAllThemes();
			themeIcon.src = "/images/icon-sun.svg";
			background.src = "/images/bg-desktop-light.jpg";
			document.body.style.backgroundColor = "var(--Very-Light-Gray)";
			isLight = true;
		}
	}
};

themeIcon.addEventListener("click", changeTheme);

// Uncomplete items checker func

let itemsCount = document.querySelector(".items-left");

let itemsLeft = 0;

const itemsChecker = () => {
	const allTodo = document.querySelectorAll(".todo");

	let itemsActive = 0;

	for (const todo of allTodo) {
		console.log(todo.dataset.status);
		if (todo.dataset.status === "undone") {
			itemsActive++;
			itemsCount.textContent = itemsActive;
		}
	}
};

// Creating ToDo func

const createTodo = (e) => {
	e.preventDefault();
	if (input.value !== "") {
		const newDiv = document.createElement("div");
		newDiv.classList.add("todo", "box", "box-theme");
		newDiv.setAttribute("draggable", "true");
		newDiv.setAttribute("data-status", "undone");
		newDiv.innerHTML = `

        <span class="checkbox">
			<svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="11" height="9">
				<path fill="none" stroke="#FFF" stroke-width="2.5" d="M1 4.304L3.696 7l6-6" />
			</svg>
		</span>
		<p class="todo-name text"><span class="line-mark"></span>${input.value}</p>
		<svg class="remove-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
			<path
				fill="#494C6B"
				fill-rule="evenodd"
				d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
			/>
		</svg>

        `;

		todoList.append(newDiv);
		input.value = "";

		if (!isLight) {
			newDiv.classList.toggle("boxColor");
			newDiv.children[1].classList.toggle("textColor");
			newDiv.firstElementChild.classList.toggle("checkboxColor");
		}

		const newCheckbox = newDiv.firstElementChild;
		const newRemove = newDiv.lastElementChild;
		newCheckbox.onclick = checked;
		newRemove.onclick = removed;
	} else {
		console.log("input is empty!");
	}

	itemsChecker();
};

const checkTheme = (newText, newBox, newCheck) => {
	if (!isLight) {
		for (const i of newText) i.classList.toggle("textColor");
		for (const i of newBox) i.classList.toggle("boxColor");
		for (const i of newCheck) i.classList.toggle("checkboxColor");
	}
};

form.addEventListener("submit", createTodo);

// checked func

// remove todo func

const removed = (e) => {
	e.preventDefault();
	const toRemove = e.target.closest(".todo");
	toRemove.classList.add("remove");
	console.log(toRemove);
	setTimeout(function () {
		todoList.removeChild(toRemove);
		itemsChecker();
	}, 200);
};

removes.forEach((each) => {
	each.addEventListener("click", removed);
});

// footer toggle buttons

const footer = (e) => {
	const target = e.target.textContent;
	const todos = document.querySelectorAll(".todo");

	switch (target) {
		case "All":
			console.log("ALL!");
			for (const todo of todos) todo.style.display = "flex";
			break;
		case "Active":
			console.log("ACTIVE!");
			for (const todo of todos) {
				if (todo.dataset.status === "done") {
					todo.style.display = "none";
				} else {
					todo.style.display = "flex";
				}
			}
			break;
		case "Completed":
			console.log("COMPLETED!");
			for (const todo of todos) {
				if (todo.dataset.status === "done") {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
			}
			break;

		default:
			break;
	}
};

todoFooter.onclick = footer;

// drag & drop functions

todoList.addEventListener("dragstart", (e) => {
	e.target.classList.add("selected");
});

todoList.addEventListener("dragend", (e) => {
	e.target.classList.remove("selected");
});

todoList.addEventListener("dragover", (e) => {
	e.preventDefault();
});

todoList.addEventListener("drop", (e) => {
	const yCoordinatePercentage = Math.floor(((e.clientY - e.target.getBoundingClientRect().top) / e.target.getBoundingClientRect().height) * 100);
	const currentDragging = document.querySelector(".selected");
	let currentHover = e.target.closest(".box");

	console.log(yCoordinatePercentage);
	console.log(currentHover);

	if (yCoordinatePercentage < 30) {
		todoList.insertBefore(currentDragging, currentHover);
	}

	if (yCoordinatePercentage > 70) {
		currentHover.after(currentDragging);
	}
});

displayCheck();

itemsChecker();
