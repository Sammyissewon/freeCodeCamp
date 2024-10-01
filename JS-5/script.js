const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget"); // 칼로리 예산
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");

// 유효성 검사 플래그
let isError = false;

// 문자열에서 +, -, 공백을 제거하는 함수
function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, "");
}

// 입력값 유효성 검사 함수
function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

// 식사 항목이나 운동 항목 입력필드 추가 함수
function addEntry() {
  // 예) ID "lunch"의 입력칸
  const targetInputContainer = document.querySelector(
    `#${entryDropdown.value} .input-container`
  );

  // 새로 추가될 입력칸의 순번 정하기
  const entryNumber =
    // type=text인 input NodeList의 길이를 반환하고, 거기에 1을 더함
    targetInputContainer.querySelectorAll('input[type="text"]').length + 1;

  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />

  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input
    type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-calories"
    placeholder="Calories"
  />`;
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}

// 전체 칼로리 계산 및 결과 출력 함수
function calculateCalories(e) {
  e.preventDefault();
  isError = false;

  // 각 식사 및 운동 섹션의 입력값 가져오기
  const breakfastNumberInputs = document.querySelectorAll(
    "#breakfast input[type='number']"
  );
  const lunchNumberInputs = document.querySelectorAll(
    "#lunch input[type='number']"
  );
  const dinnerNumberInputs = document.querySelectorAll(
    "#dinner input[type='number']"
  );
  const snacksNumberInputs = document.querySelectorAll(
    "#snacks input[type='number']"
  );
  const exerciseNumberInputs = document.querySelectorAll(
    "#exercise input[type='number']"
  );

  // 각 섹션의 총 칼로리 계산
  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  if (isError) {
    return;
  }

  // 섭취한 칼로리 총합
  const consumedCalories =
    breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;

  // 잔여 칼로리 = 예산 칼로리 - 섭취 칼로리 + 운동 칼로리
  const remainingCalories =
    budgetCalories - consumedCalories + exerciseCalories;

  // 초과 또는 미달 칼로리: 잔여 칼로리가 0보다 적으면 -> 칼로리 초과
  const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";

  // 초과냐 미달이냐에 따라 CSS 변경 및 칼로리 숫자(절대값) 표시
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(
    remainingCalories
  )} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `;

  output.classList.remove("hide");
}

// 각 입력값 합산 함수
function getCaloriesFromInputs(list) {
  let calories = 0;

  for (const item of list) {
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}

// 입력값과 출력 초기화 함수
function clearForm() {
  const inputContainers = Array.from(
    document.querySelectorAll(".input-container")
  );

  for (const container of inputContainers) {
    container.innerHTML = "";
  }

  budgetNumberInput.value = "";
  output.innerText = "";
  output.classList.add("hide");
}

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);
