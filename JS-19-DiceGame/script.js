const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const roundElement = document.getElementById("current-round");
const rollsElement = document.getElementById("current-round-rolls");
const totalScoreElement = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesContainer = document.querySelector(".rules-container");
const rulesBtn = document.getElementById("rules-btn");

let diceValuesArr = [];
let isModalShowing = false;
let score = 0;
let round = 1;
let rolls = 0;

// 주사위 굴리기 함수
const rollDice = () => {
  // 초기엔 빈 배열
  diceValuesArr = [];

  // 총 5번 반복
  for (let i = 0; i < 5; i++) {
    // 1~6까지 랜덤 숫자 반환
    const randomDice = Math.floor(Math.random() * 6) + 1;
    // 빈 배열에 랜덤숫자 삽입
    diceValuesArr.push(randomDice);
  }

  // 배열에 삽입된 숫자들을 DOM에 추가
  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });
};

// 스탯 업데이트 함수
const updateStats = () => {
  roundElement.textContent = round; // 현재 라운드
  rollsElement.textContent = rolls; // 현재 라운드에서 주사위 돌린 횟수
};

// 나온 주사위 넘버에 따른 Radio 옵션
const updateRadioOption = (index, score) => {
  scoreInputs[index].disabled = false; // 나온 주사위 합산에 따라서, 해당 인덱스의 radio 선택 가능
  scoreInputs[index].value = score; // 주사위 합산을 내부 로직에 저장
  scoreSpans[index].textContent = `, score = ${score}`; // DOM에 추가
};

// 점수 기록 함수
// selectedValue: 획득한 점수, achieved: 취득한 내용
const updateScore = (selectedValue, achieved) => {
  // radio 버튼으로 선택된 값은 문자열로 전달되기 때문에, Number()로 감쌀 것
  score += Number(selectedValue);
  totalScoreElement.textContent = score;

  // 매 라운드 radio를 선택할 때마다, 점수 내역이 리스트로 추가됨
  scoreHistory.innerHTML = `<li>${achieved} : ${selectedValue}</li>`;
};

// 최빈도 숫자 찾기
const getHighestDuplicates = (array) => {
  // 숫자 배열 인자
  let duplicates = {}; // 빈 객체

  // 숫자 배열의 각 요소의 출현 횟수를 기록
  array.forEach((number) => {
    // 특정 요소가 이미 있는지, 없는지 보고, 요소의 값에 +1
    duplicates[number] = (duplicates[number] || 0) + 1;
  });

  let maxCount = 0; // 배열에서 가장 많이 출현한 값
  let maxDuplicate; // 가장 많이 출현한 횟수
  let sum = array.reduce((sum, value) => sum + value, 0); // 배열의 각 요소 총합

  // 53에서 업데이트 duplicates 객체의 키-값을 쌍으로 순회
  // duplicate: 키, count: 값
  for (const [duplicate, count] of Object.entries(duplicates)) {
    if (count > maxCount) {
      // 가장 많이 출현한 횟수(값)와 해당 숫자(키)를 저장
      maxCount = count;
      maxDuplicate = duplicate;
    }
  }

  // 출현 횟수에 따라서, 관련 Radio 인덱스를 고르고, 5개 숫자 총합을 전달
  if (maxCount > 3) {
    updateRadioOption(1, sum);
  }
  if (maxCount > 2) {
    updateRadioOption(0, sum);
  }

  updateRadioOption(5, 0);
};

const detectFullHouse = (arr) => {
  const counts = {};

  for (const num of arr) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  const hasThreeOfAKind = Object.values(counts).includes(3);
  const hasPair = Object.values(counts).includes(2);

  if (hasThreeOfAKind && hasPair) {
    updateRadioOption(2, 25);
  }

  updateRadioOption(5, 0);
};

const resetRadioOptions = () => {
  scoreInputs.forEach((input) => {
    input.disabled = true;
    input.checked = false;
  });

  scoreSpans.forEach((span) => {
    span.textContent = "";
  });
};

const resetGame = () => {
  diceValuesArr = [0, 0, 0, 0, 0];
  score = 0;
  round = 1;
  rolls = 0;

  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });

  totalScoreElement.textContent = score;
  scoreHistory.innerHTML = "";

  rollsElement.textContent = rolls;
  roundElement.textContent = round;

  resetRadioOptions();
};

const checkForStraights = (arr) => {
  const counts = {};

  for (const num of arr) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  const keys = Object.keys(counts).join("");

  if (keys === "12345" || keys === "23456") {
    updateRadioOption(4, 40);
  }
  if (
    keys.slice(0, 4) === "1234" ||
    keys.slice(0, 4) === "2345" ||
    keys.slice(1, 5) === "2345" ||
    keys.slice(1, 5) === "2345"
  ) {
    updateRadioOption(3, 30);
  }
  updateRadioOption(5, 0);
};

// 주사위 돌리기 이벤트
rollDiceBtn.addEventListener("click", () => {
  // 주사위 회전 횟수가 3이라면 알림
  if (rolls === 3) {
    alert("You have made three rolls this round. Please select a score.");
    // 그게 아니면,
  } else {
    rolls++; // 주사위 횟수를 1씩 올리고
    resetRadioOptions();
    rollDice(); // 주사위를 굴리고
    updateStats(); // 스탯을 업데이트 하고
    getHighestDuplicates(diceValuesArr); // 최고 출현 숫자를 찾고
    detectFullHouse(diceValuesArr);
    checkForStraights(diceValuesArr);
  }
});

// 규칙 열기 이벤트
rulesBtn.addEventListener("click", () => {
  isModalShowing = !isModalShowing;

  if (isModalShowing) {
    rulesBtn.textContent = "Hide rules";
    rulesContainer.style.display = "block";
  } else {
    rulesBtn.textContent = "Show rules";
    rulesContainer.style.display = "none";
  }
});

keepScoreBtn.addEventListener("click", () => {
  let selectedValue;
  let achieved;

  for (const radioButton of scoreInputs) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      achieved = radioButton.id;
      break;
    }
  }

  if (selectedValue) {
    rolls = 0;
    round++;
    updateStats();
    resetRadioOptions();
    updateScore(selectedValue, achieved);
    if (round > 6) {
      setTimeout(() => {
        alert(`Game Over! Your total score is ${score}`);
        resetGame();
      }, 500);
    }
  } else {
    alert("Please select an option or roll the dice");
  }
});
