const background = document.querySelector(".background");

const input = document.querySelector(".todo-input");

const todoContainer = document.querySelector(".todo-container");

const checkboxes = document.querySelectorAll(".checkbox");

const remove = document.querySelector(".remove-icon");

const allButton = document.querySelector(".all-preview");

const activeButton = document.querySelector(".active-preview");

const itemsCount = document.querySelector(".items-left");

let itemsLeft = 2;

// change theme func

const changeTheme = () => {
	background.src = "";
};

// Uncomplete items checker func

const itemsChecker = () => {
	if (itemsCount.textContent !== "0") {
		todoContainer.forEach((eachTodo) => {
			let activeItems = 0;
			if (eachTodo.dataset.status === "active") {
				activeItems++;
				itemsLeft = activeItems;
			}
		});
	} else {
		itemsCount.textContent = "0";
	}
};

// Creating ToDo func

const createTodo = () => {
	if (input.value !== "") {
		const newTodo = document.createElement("div");
		newTodo.classList.add("todo");
		todoContainer.append(newTodo);
	} else {
		input.classList.add("input-empty");
	}
};

// checked func

const checked = (e) => {
	const target = e.target;
	target.classList.toggle("checked");
	target.nextSibling.classList.toggle("marked-color");
	target.nextSibling.lastChild.classList.toggle("marked-line");
};

// remove todo func

const removed = (e) => {
	const target = e.target;
	setTimeout(() => {
		const toRemove = target.parentElement;
		toRemove.classList.add("remove");
		todoContainer.removeChild(toRemove);
	}, 500);
};

// footer toggle buttons

const footer = (e) => {
	const target = e.target.textContent;

	switch (target) {
		case "All":
			for (const todo of todoContainer) {
				todo.style.display = "block";
			}
			break;
		case "Active":
			for (const todo of todoContainer) {
				if (todo.dataset.status === "Active") {
					todo.style.display = "block";
				} else {
					todo.style.display = "none";
				}
			}
			break;
		case "Completed":
			for (const todo of todoContainer) {
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

todoContainer.addEventListener("dragover", (e) => {
	e.preventDefault();
});

todoContainer.addEventListener("drop", (e) => {});

const giveDrag = (arg) => {
	arg.addEventLIstener("dragstart", (e) => {});
};

checkboxes.forEach((checkbox) => {
	checkbox.addEventListener("click", () => {
		checkbox.classList.toggle("active");
	});
});
