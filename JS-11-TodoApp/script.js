const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

const taskData = JSON.parse(localStorage.getItem("data")) || [];

let currentTask = {};

// 할일 추가 및 업데이트 함수
const addOrUpdateTask = () => {
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);

  // 할일 입력데이터 객체 저장
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };

  // taskData에서 현재 작업중인 ID와 일치하는 게 없으면 -1을 반환 -> 즉, 새로운 할일을 추가한다는 것
  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
    // 일치하는 ID가 있다 -> 기존 데이터를 업데이트 한다는 것
  } else {
    taskData[dataArrIndex] = taskObj;
  }

  // localStorage에 데이터 저장
  localStorage.setItem("data", JSON.stringify(taskData));
  updateTaskContainer();
  reset();
};

// 할일 리스트 업데이트
const updateTaskContainer = () => {
  tasksContainer.innerHTML = "";

  taskData.forEach(({ id, title, date, description }) => {
    tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button onclick="editTask(this)" type="button" class="btn">Edit</button>
          <button onclick="deleteTask(this)" type="button" class="btn">Delete</button> 
        </div>
      `;
  });
};

// 할일 삭제
const deleteTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  buttonEl.parentElement.remove();
  taskData.splice(dataArrIndex, 1);
  localStorage.setItem("data", JSON.stringify(taskData));
};

// 할일 수정버튼 클릭시, 기존 데이터 불러와주는 함수
// addOrUpdateTask 함수로 실제 데이터를 수정하기 전의 준비 단계
const editTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  currentTask = taskData[dataArrIndex];

  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  addOrUpdateTaskBtn.innerText = "Update Task";

  taskForm.classList.toggle("hidden");
};

// 리셋
const reset = () => {
  addOrUpdateTaskBtn.innerText = "Add Task";
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
};

if (taskData.length) {
  updateTaskContainer();
}

// 일정 작성창 열기 이벤트
openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);

// 일정 작성창 닫기 이벤트
closeTaskFormBtn.addEventListener("click", () => {
  // 어떤 폼에라도 데이터가 있으면 true
  const formInputsContainValues =
    titleInput.value || dateInput.value || descriptionInput.value;

  // 기존에 저장된 값과 현재 작성한 값이 다르면 true
  const formInputValuesUpdated =
    titleInput.value !== currentTask.title ||
    dateInput.value !== currentTask.date ||
    descriptionInput.value !== currentTask.description;

  // 어떤 폼에라도 값이 있으면서, 기존 값과 다른 값이 있으면 모달을 띄움
  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset();
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addOrUpdateTask();
});
