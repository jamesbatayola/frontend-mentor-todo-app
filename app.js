const background = document.querySelector(".background");

const input = document.querySelector(".todo-input");

const todoContainer = document.querySelector(".todo-container");

const todos = document.querySelectorAll(".todo");

const checkboxes = document.querySelectorAll(".checkbox");

const removes = document.querySelectorAll(".remove-icon");

const allButton = document.querySelector(".all-preview");

const activeButton = document.querySelector(".active-preview");

const itemsCount = document.querySelector(".items-left");

let itemsLeft = 2;

// change theme func

const changeTheme = () => {
	background.src = "";
};

// dragging func

todos.forEach((todo) => {
	todo.addEventListener("dragstart", () => {
		console.log("hello world");
	});
});

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
	const toRemove = await e.target.parentElement;
	await toRemove.classList.add("remove");
	if (toRemove.matches(".remove")) {
		setTimeout(function () {
			toRemove.style.display = "none";
		}, 200);
	}
};

removes.forEach((each) => {
	each.addEventListener("click", removed);
});

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

// todoContainer.addEventListener("dragover", (e) => {
// 	e.preventDefault();
// });

// todoContainer.addEventListener("drop", (e) => {});

// const giveDrag = (arg) => {
// 	arg.addEventLIstener("dragstart", (e) => {});
// };
