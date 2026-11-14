//Navigation section selectors
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.getElementById("site-nav");

// Palindrome section selectors
const palindromeForm = document.getElementById("palindrome-form");
const input = document.getElementById("number");
const result = document.getElementById("result");

//Tasks section selectors
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

//Contact section Selectors
const contactBtn = document.getElementById("submit-btn");
const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const telInput = document.getElementById("tel");
const messageInput = document.getElementById("message");
console.log(nameInput, emailInput, telInput, messageInput);

//Footer section selectors
const year = document.getElementById("current-year");

//Toggles the navigation menu when on smaller screens
if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", function () {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute(
      "aria-label",
      isExpanded ? "Open navigation" : "Close navigation",
    );
    siteNav.classList.toggle("is-open", !isExpanded);
  });

  siteNav.addEventListener("click", function (event) {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      siteNav.classList.remove("is-open");
    }
  });
}

// Palindrome functionalities

if (palindromeForm && input && result) {
  // Listen for form submission
  palindromeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const text = input.value.trim();

    // Validate for empty input
    if (!text) {
      result.textContent = "Type a word or number to try it out.";
      input.focus();
      return;
    }

    // Normalizing the text and removing all non-alphnumeric characters
    const normalized = text.toLocaleLowerCase().replace(/[^a-z0-9]/g, "");

    // Validate that at least one digit or letter remains after normalization
    if (!normalized) {
      result.textContent =
        "Try a word or number with at least one letter or digit.";
      input.focus();
      return;
    }

    // Split, reverse and join the normalize string, compare them and return the corresponding message
    const reversed = normalized.split("").reverse().join("");
    result.textContent =
      normalized === reversed
        ? `"${text}" reads the same both ways. Nice!`
        : `"${text}" reads differently backwards.`;
  });
}

//Tasks manager functionalites
//Update visibilty of the empty state message
const checkEmptyState = () => {
  emptyState.style.display = taskList.children.length === 0 ? "block" : "none";
};

// Creating and adding new tasks functionality
const addTask = () => {
  const text = taskInput.value.trim();
  // Checking the user did not enter any value
  if (!text) return;

  //Creating list element
  const li = document.createElement("li");
  li.className = "task-item";

  //Creating left wrapper (checkbox and text)
  const taskLeft = document.createElement("label");
  taskLeft.className = "task-left";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = text;

  //Mark task as completedwhen checkbox changes
  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed", checkbox.checked);
  });
  taskLeft.appendChild(checkbox);
  taskLeft.appendChild(span);

  //Creating delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", () => {
    li.remove();
    checkEmptyState();
  });

  //Assemble and append to list
  li.appendChild(taskLeft);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  //Clear input and reset focus
  taskInput.value = "";
  taskInput.focus();
  checkEmptyState();
};

// Add the functionality to the Add button
addTaskBtn.addEventListener("click", addTask);

// Also adding functionailty if the user presses "Enter" key
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

//Contact section functionalities

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;
    // Check that no field is empty
    if (
      nameInput.value.trim() === "" ||
      emailInput.value.trim() === "" ||
      telInput.value.trim() === "" ||
      messageInput.value.trim() === ""
    ) {
      Toastify({
        text: "Please fill in all fields.",
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
          background: "linear-gradient(to right, #581c00, #1c0000)",
          borderRadius: "8px",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        },
      }).showToast();
      isValid = false;
      return;
    }

    //Validating the email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
      Toastify({
        text: "Please enter a valid email address.",
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
          background: "linear-gradient(to right, #581c00, #1c0000)",
          borderRadius: "8px",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        },
      }).showToast();
      isValid = false;
      return;
    }

    //Validating phone number(contains only digits)
    const digitsOnlyRegex = /^\d+$/;
    if (!digitsOnlyRegex.test(telInput.value)) {
      Toastify({
        text: "Phone number must contain only digits.",
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
          background: "linear-gradient(to right, #581c00, #1c0000)",
          borderRadius: "8px",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        },
      }).showToast();
      isValid = false;
      return;
    }

    // If all validation passed successsfully
    if (isValid) {
      Toastify({
        text: "Form submitted successfully.",
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
          borderRadius: "8px",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        },
      }).showToast();
      contactForm.reset();
      return;
    }
  });
}

//Dynamically addind the current year
if (year) {
  year.textContent = new Date().getFullYear();
}
