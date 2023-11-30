const desc_width = document.querySelector(
  "#add_event #description"
).clientWidth;
document.querySelector("#add_event #description").style.maxWidth =
  desc_width + "px";
let currentlyAddedEvents = [];
function addEvent() {
  const title = document.querySelector("#add_event #title").value;
  const date = document.querySelector("#add_event #date").value;
  const duration = parseInt(
    document.querySelector("#add_event #duration").value
  );
  const location = document.querySelector("#add_event #location").value;
  const description = document.querySelector(
    "#add_event #description"
  ).textContent;

  //VALIDATION
  const title_err = document.querySelector("#add_event #title_err");
  const date_err = document.querySelector("#add_event #date_err");
  const duration_err = document.querySelector("#add_event #duration_err");

  //SENDING EVENT
  if (
    validation(
      title,
      title_err,
      date,
      date_err,
      duration,
      duration_err,
      location,
      description
    )
  ) {
    fetch("./events/save_event.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "action=add" +
        "&title=" +
        title +
        "&date=" +
        date +
        "&duration=" +
        duration +
        "&location=" +
        location +
        "&description=" +
        description,
    })
      .then((res) => res.json())
      .then((data) => {
        currentlyAddedEvents.push(data.Object);
        calendar.fetchData();
      })
      .catch((error) => console.log("Błąd:", error));
  }
}
function validation(
  ftitle,
  ftitle_err,
  fdate,
  fdate_err,
  fduration,
  fduration_err,
  flocation,
  fdescription
) {
  const initialDate = new Date(fdate);
  const initialTimeInMinutes =
    initialDate.getHours() * 60 + initialDate.getMinutes();

  if (
    ftitle == "" ||
    fdate == "" ||
    isNaN(fduration) ||
    fduration <= 0 ||
    initialTimeInMinutes + fduration > 1440
  ) {
    if (ftitle == "") {
      ftitle_err.textContent = "Błędny tytuł";
    } else {
      ftitle_err.textContent = "";
    }
    if (fdate == "") {
      fdate_err.textContent = "Błędna data";
    } else {
      fdate_err.textContent = "";
    }
    if (fduration == "" || fduration <= 0 || isNaN(fduration)) {
      fduration_err.textContent = "Błędny czas trwania";
    } else if (parseInt(initialTimeInMinutes) + parseInt(fduration) > 1440) {
      fduration_err.innerHTML =
        "Czas trwania nie może wykraczać<br> poza konkretny dzień";
    } else {
      fduration_err.textContent = "";
    }
    return false;
  } else {
    ftitle_err.textContent = "";
    fdate_err.textContent = "";
    fduration_err.textContent = "";
  }
  return true;
}

class Calendar {
  constructor() {
    this.dataFromAPI;
    this.itemsPerPage = 7;
    this.offset = 0;
    this.currentDate = new Date();
    this.datesContainer = document.querySelector(
      "#calendar > .dates_container"
    );
    this.dateSearchedContainer = document.querySelector(
      "#calendar .date_searched"
    );
    this.datesEventContainer = document.querySelector(
      "#calendar > .events_container"
    );
    this.month = [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ];
    this.weekday = ["Nie", "Pn", "Wt", "Śr", "Cz", "Pt", "So"];
    this.searchedDates = [];

    this.getEvent();
    this.initDates();
    this.transformDateSection(this.searchedDates);

    document
      .getElementById("todayButton")
      .addEventListener("click", () => this.changeCalendarPage("today"));
    document
      .getElementById("leftButton")
      .addEventListener("click", () => this.changeCalendarPage("left"));
    document
      .getElementById("rightButton")
      .addEventListener("click", () => this.changeCalendarPage("right"));
  }

  initDates() {
    for (let i = 0; i < this.itemsPerPage; i++) {
      let futureDate = new Date();
      futureDate.setDate(this.currentDate.getDate() + i);
      this.searchedDates.push(futureDate);

      const node = document.createElement("div");
      const textNode = document.createTextNode(
        this.transformDateToDay(futureDate)
      );
      node.appendChild(textNode);
      this.datesContainer.appendChild(node);

      const node2 = document.createElement("div");
      node2.setAttribute("data-date", this.formatDate(futureDate));
      for (let x = 0; x < 24; x++) {
        const background = document.createElement("div");
        background.classList.add("bg");
        node2.appendChild(background);
      }
      this.datesEventContainer.appendChild(node2);
    }
  }

  changeCalendarPage(way) {
    this.searchedDates = [];
    if (way === "today" && this.offset === 0) {
      return;
    }

    if (way === "left") {
      this.offset -= 1;
    } else if (way === "right") {
      this.offset += 1;
    } else {
      this.offset = 0;
    }

    for (let i = 0; i < this.itemsPerPage; i++) {
      let futureDate = new Date();
      futureDate.setDate(
        this.currentDate.getDate() + (i + this.offset * this.itemsPerPage)
      );
      this.searchedDates.push(futureDate);

      this.datesContainer.childNodes[i + 3].textContent =
        this.transformDateToDay(futureDate);
      const node = document.createElement("div");
      node.setAttribute("data-date", this.formatDate(futureDate));
      this.datesEventContainer.childNodes[i + 3].setAttribute(
        "data-date",
        this.formatDate(futureDate)
      );
    }

    this.fetchData();
    this.transformDateSection(this.searchedDates);
  }

  transformDateSection(array) {
    if (array[0].getMonth() === array[array.length - 1].getMonth()) {
      this.dateSearchedContainer.textContent =
        array[0].getDate() +
        " - " +
        array[array.length - 1].getDate() +
        " " +
        this.month[array[0].getMonth()] +
        " " +
        array[0].getFullYear();
    } else {
      this.dateSearchedContainer.textContent =
        array[0].getDate() +
        " " +
        this.month[array[0].getMonth()] +
        " - " +
        array[array.length - 1].getDate() +
        " " +
        this.month[array[array.length - 1].getMonth()] +
        " " +
        array[0].getFullYear();
    }
  }
  transformDateToDay(d) {
    return this.weekday[d.getDay()] + " " + d.getDate();
  }
  formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    //"YYYY-MM-DD"
    const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
    return formattedDate;
  }
  getEvent() {
    // SEND EVENT
    fetch("./events/get_event.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => res.json())
      .then((data) => this.getEventResponseHandler(data))
      .catch((error) => console.error("Błąd:", error));
  }

  deleteEvent(id) {
    // SEND EVENT
    fetch(`./events/delete_event.php?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Błąd:", error));
  }

  getEventResponseHandler(data) {
    if (data.status === "ok") {
      this.dataFromAPI = data.data;
      this.fetchData();
    } else {
      console.error("Błąd podczas pobierania danych");
    }
  }

  fetchData() {
    for (let i = 0; i < this.itemsPerPage; i++) {
      const children = this.datesEventContainer.childNodes[i + 3].children;
      for (let y = children.length - 1; y >= 0; y--) {
        const child = children[y];
        if (child.classList.contains("event")) {
          child.remove();
        }
      }
      for (let x = 0; x < this.dataFromAPI.length; x++) {
        if (
          this.datesEventContainer.childNodes[i + 3].getAttribute(
            "data-date"
          ) == this.dataFromAPI[x].date_and_time.slice(0, 10)
        ) {
          this.renderEvent(
            this.datesEventContainer.childNodes[i + 3],
            this.dataFromAPI[x]
          );
        }
      }
      for (let x = 0; x < currentlyAddedEvents.length; x++) {
        if (
          this.datesEventContainer.childNodes[i + 3].getAttribute(
            "data-date"
          ) == currentlyAddedEvents[x].date_and_time.slice(0, 10)
        ) {
          this.renderEvent(
            this.datesEventContainer.childNodes[i + 3],
            currentlyAddedEvents[x]
          );
        }
      }
    }
  }
  renderEvent(parent, childObject) {
    const node = document.createElement("div");
    node.classList.add("event");
    node.addEventListener("mouseenter", (e) => {
      let height = 16; //padding
      for (let i = 0; i < node.children.length; i++) {
        height += node.children[i].offsetHeight;
      }
      if (height > node.offsetHeight) {
        node.style.height = "auto";
      }
      node.style.zIndex = "1";
      node.style.width = "150px";

      const parent = e.target.closest(".events_container");
      const parentReact = parent.getBoundingClientRect();
      const child = e.target;
      const childReact = child.getBoundingClientRect();
      //console.log(parentReact);
      //console.log(childReact);
      if (childReact.right + 10 > parentReact.right) {
        child.style.marginLeft = "-90px";
      }
      if (childReact.left - 60 < parentReact.left) {
        child.style.marginLeft = "37px";
      }
    });
    node.addEventListener("mouseleave", (e) => {
      if (childObject.duration < 30) {
        node.style.height = `30px`;
      } else {
        node.style.height = `${childObject.duration}px`;
      }
      node.style.width =
        e.target.parentNode.getBoundingClientRect().width + "px";
      e.target.style.margin = "0";
    });
    node.setAttribute("date-id", childObject.id);
    const hour = parseInt(childObject.date_and_time.slice(11, 13));
    const minute = parseInt(childObject.date_and_time.slice(14, 16));
    const time = hour * 60 + minute;
    node.style.top = `${parent.offsetHeight * (time / 1440)}px`;
    if (childObject.duration < 30) {
      node.style.height = `30px`;
    } else {
      node.style.height = `${childObject.duration}px`;
    }
    node.add;

    const titleInput = document.createElement("span");
    titleInput.classList.add("textarea");
    titleInput.setAttribute("role", "textbox");
    titleInput.setAttribute("name", "title");
    titleInput.setAttribute("id", "title");
    titleInput.setAttribute("required", "");
    titleInput.setAttribute("contenteditable", "");
    titleInput.textContent = childObject.title;

    const date = document.createElement("div");
    date.innerHTML = `<i class="fa-regular fa-clock"></i>`;
    const dateInput = document.createElement("input");
    dateInput.setAttribute("type", "datetime-local");
    dateInput.setAttribute("name", "date");
    dateInput.setAttribute("id", "date");
    dateInput.setAttribute("required", "");
    const formattedDate = new Date(childObject.date_and_time);

    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");
    const hours = String(formattedDate.getHours()).padStart(2, "0");
    const minutes = String(formattedDate.getMinutes()).padStart(2, "0");

    dateInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
    date.appendChild(dateInput);

    const duration = document.createElement("div");
    duration.innerHTML = `<i class="fa-solid fa-hourglass"></i>`;
    const durationInput = document.createElement("input");
    durationInput.setAttribute("type", "number");
    durationInput.setAttribute("name", "duration");
    durationInput.setAttribute("id", "duration");
    durationInput.placeholder = "Dodaj czas trwania (min)";
    durationInput.value = childObject.duration;
    duration.appendChild(durationInput);

    const location = document.createElement("div");
    location.innerHTML = `<i class="fa-regular fa-map"></i>`;
    const locationInput = document.createElement("span");
    locationInput.classList.add("textarea");
    locationInput.setAttribute("role", "textbox");
    locationInput.setAttribute("name", "location");
    locationInput.setAttribute("id", "location");
    locationInput.setAttribute("contenteditable", "");
    locationInput.textContent = childObject.location;
    location.appendChild(locationInput);

    const description = document.createElement("div");
    description.innerHTML = `<i class="fa-solid fa-quote-right"></i>`;
    const descriptionInput = document.createElement("span");
    descriptionInput.classList.add("textarea");
    descriptionInput.setAttribute("role", "textbox");
    descriptionInput.setAttribute("name", "description");
    descriptionInput.setAttribute("id", "description");
    descriptionInput.setAttribute("contenteditable", "");
    descriptionInput.textContent = childObject.description;
    description.appendChild(descriptionInput);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button_container");

    const editButton = document.createElement("button");
    editButton.innerHTML = "Zapisz";
    editButton.setAttribute("disabled", "");
    editButton.classList.add("save");
    editButton.addEventListener("click", this.editEvent);
    buttonContainer.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
    deleteButton.addEventListener("click", () => {
      this.deleteEvent(childObject.id);
      node.remove();
    });
    buttonContainer.appendChild(deleteButton);

    const elementsToApplyListener = [
      titleInput,
      dateInput,
      durationInput,
      locationInput,
      descriptionInput,
    ];
    elementsToApplyListener.forEach((element) => {
      element.addEventListener("input", () => {
        const parent = element.closest(".event");
        const button = parent.querySelector(".save");
        button.removeAttribute("disabled");
      });
    });

    const title_err = document.createElement("span");
    title_err.classList.add("error");
    title_err.id = "title_err";

    const date_err = document.createElement("span");
    date_err.classList.add("error");
    date_err.id = "date_err";

    const duration_err = document.createElement("span");
    duration_err.classList.add("error");
    duration_err.id = "duration_err";

    node.appendChild(titleInput);
    node.appendChild(title_err);
    node.appendChild(date);
    node.appendChild(date_err);
    node.appendChild(duration);
    node.appendChild(duration_err);
    node.appendChild(location);
    node.appendChild(description);
    node.appendChild(buttonContainer);
    parent.appendChild(node);
  }
  editEvent(e) {
    const parent = e.target.closest(".event");
    const id = parent.getAttribute("date-id");

    const title = parent.querySelector("#title").textContent;
    const date = parent.querySelector("#date").value;
    const duration = parseInt(parent.querySelector("#duration").value);
    const location = parent.querySelector("#location").textContent;
    const description = parent.querySelector("#description").textContent;

    const title_err = parent.querySelector("#title_err");
    const date_err = parent.querySelector("#date_err");
    const duration_err = parent.querySelector("#duration_err");
    if (
      validation(
        title,
        title_err,
        date,
        date_err,
        duration,
        duration_err,
        location,
        description
      )
    ) {
      fetch("./events/save_event.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
          "action=update" +
          "&id=" +
          id +
          "&title=" +
          title +
          "&date=" +
          date +
          "&duration=" +
          duration +
          "&location=" +
          location +
          "&description=" +
          description,
      })
        .then((res) => res.json())
        .then((data) => {
          parent.remove();
          console.log(parent);
          calendar.dataFromAPI = removeObjectWithId(calendar.dataFromAPI, id);
          currentlyAddedEvents = removeObjectWithId(
            currentlyAddedEvents,
            String(id)
          );
          currentlyAddedEvents.push(data.Object);
          calendar.fetchData();
        })
        .catch((error) => console.log("Błąd:", error));
    }

    e.target.setAttribute("disabled", "");
  }
}
function removeObjectWithId(arr, id) {
  return arr.filter((obj) => obj.id !== id);
}

// Initialize the EventCalendar
const calendar = new Calendar();
