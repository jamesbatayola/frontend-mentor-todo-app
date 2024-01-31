const background = document.querySelector(".background");

const themeIcon = document.querySelector(".theme-icon");

const boxTheme = document.querySelectorAll(".box-theme");

const input = document.querySelector(".todo-input");

const form = document.querySelector("form");

const todoContainer = document.querySelector(".todo-container");

const todoList = document.querySelector(".todo-list");

const todos = document.querySelectorAll(".todo");

const checkboxes = document.querySelectorAll(".checkbox");

const removes = document.querySelectorAll(".remove-icon");

const allButton = document.querySelector(".all-preview");

const activeButton = document.querySelector(".active-preview");

const itemsCount = document.querySelector(".items-left");

let itemsLeft = 2;

// window size function

let isMobile;
let isDesktop;

const changeEachBox = (colors) => {
	boxTheme.forEach((each) => {
		each.style.backgroundColor = `${colors}`;
	});
};

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

const changeTheme = () => {
	if (isMobile) {
		if (isLight) {
			changeEachBox(`--Very-very-Dark-Grayish-Blue`);
			background.src = "/images/bg-mobile-dark.jpg";
			document.body.style.backgroundColor = "var(--Very-Dark-Blue)";
			isLight = false;
		} else {
			background.src = "/images/bg-mobile-light.jpg";
			document.body.style.backgroundColor = "var(--Very-Light-Gray)";
			isLight = true;
		}
	} else if (isDesktop) {
		if (isLight) {
			background.src = "/images/bg-desktop-dark.jpg";
			document.body.style.backgroundColor = "var(--Very-Dark-Blue)";
			isLight = false;
		} else {
			background.src = "/images/bg-desktop-light.jpg";
			document.body.style.backgroundColor = "var(--Very-Light-Gray)";
			isLight = true;
		}
	}
};

themeIcon.addEventListener("click", changeTheme);

// Uncomplete items checker func

// const itemsChecker = () => {
// 	if (itemsCount.textContent !== "0") {
// 		todoContainer.forEach((eachTodo) => {
// 			let activeItems = 0;
// 			if (eachTodo.dataset.status === "active") {
// 				activeItems++;
// 				itemsLeft = activeItems;
// 			}
// 		});
// 	} else {
// 		itemsCount.textContent = "0";
// 	}
// };

// Creating ToDo func

const createTodo = (e) => {
	e.preventDefault();
	if (input.value !== "") {
		const newDiv = document.createElement("div");
		newDiv.classList.add("todo", "box");
		newDiv.setAttribute("draggable", "true");
		newDiv.setAttribute("data-status", "undone");
		newDiv.innerHTML = `

        <span class="checkbox">
			<svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="11" height="9">
				<path fill="none" stroke="#FFF" stroke-width="2.5" d="M1 4.304L3.696 7l6-6" />
			</svg>
		</span>
		<p class="todo-name"><span class="line-mark"></span>${input.value}</p>
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

		const newCheckbox = newDiv.firstElementChild;
		const newRemove = newDiv.lastElementChild;
		newCheckbox.onclick = checked;
		newRemove.onclick = removed;
	} else {
		input.classList.add("input-empty");
	}
};

form.addEventListener("submit", createTodo);

// checked func

const checked = async (e) => {
	const target = e.target;
	const parent = await e.target.closest(".box");
	target.parentElement.classList.toggle("active");
	parent.classList.toggle("active");

	if (parent.classList.length === 3) {
		parent.dataset.status = "done";
	} else {
		parent.dataset.status = "undone";
	}
};

checkboxes.forEach((checkbox) => {
	checkbox.addEventListener("click", checked);
});

// remove todo func

const removed = async (e) => {
	e.preventDefault();
	const toRemove = e.target.closest(".todo");
	await toRemove.classList.add("remove");
	console.log(toRemove);
	setTimeout(function () {
		// toRemove.style.display = "none";
		todoList.removeChild(toRemove);
	}, 200);
};

removes.forEach((each) => {
	each.addEventListener("click", removed);
});

// footer toggle buttons

const footer = (e) => {
	const target = e.target.textContent;

	switch (target) {
		case "All":
			for (const todo of todoList) {
				todo.style.display = "block";
			}
			break;
		case "Active":
			for (const todo of todoList) {
				if (todo.dataset.status === "Active") {
					todo.style.display = "block";
				} else {
					todo.style.display = "none";
				}
			}
			break;
		case "Completed":
			for (const todo of todoList) {
				if (todo.dataset.status === "Completed") {
					todo.style.display = "block";
				} else {
					todo.style.display = "none";
				}
			}
			break;

		default:
			break;
	}
};

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
