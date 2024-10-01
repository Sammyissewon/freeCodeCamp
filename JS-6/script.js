// 컴퓨터의 가위, 바위, 보 랜덤 반환
function getRandomComputerResult() {
  const options = ["Rock", "Paper", "Scissors"];
  // options 배열의 길이만큼 곱해서 1~3 중의 숫자를 랜덤으로 반환
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

// 플레이어가 이겼는지 확인하는 함수
function hasPlayerWonTheRound(player, computer) {
  return (
    (player === "Rock" && computer === "Scissors") ||
    (player === "Scissors" && computer === "Paper") ||
    (player === "Paper" && computer === "Rock")
  );
}

// 플레이어와 컴퓨터의 초기 점수
let playerScore = 0;
let computerScore = 0;

// 이긴 사람 점수 취득 함수
function getRoundResults(userOption) {
  const computerResult = getRandomComputerResult();

  // 플레이어가 이겼을때
  if (hasPlayerWonTheRound(userOption, computerResult)) {
    playerScore++;
    return `Player wins! ${userOption} beats ${computerResult}`;
    // 플레이어와 컴퓨터 비겼을때
  } else if (computerResult === userOption) {
    return `It's a tie! Both chose ${userOption}`;
    // 컴퓨터가 이겼을 때
  } else {
    computerScore++;
    return `Computer wins! ${computerResult} beats ${userOption}`;
  }
}

const playerScoreSpanElement = document.getElementById("player-score"); // 플레이어 점수
const computerScoreSpanElement = document.getElementById("computer-score"); // 컴퓨터 점수
const roundResultsMsg = document.getElementById("results-msg"); // 매판 대결 결과 메시지
const winnerMsgElement = document.getElementById("winner-msg"); // 승자 메시지
const optionsContainer = document.querySelector(".options-container");
const resetGameBtn = document.getElementById("reset-game-btn");

// 매판 대결 결과 메시지 출력 함수
function showResults(userOption) {
  roundResultsMsg.innerText = getRoundResults(userOption);
  computerScoreSpanElement.innerText = computerScore;
  playerScoreSpanElement.innerText = playerScore;

  // 어느쪽이든 3승했을 때, 승자 메시지 출력
  if (playerScore === 3 || computerScore === 3) {
    winnerMsgElement.innerText = `${
      playerScore === 3 ? "Player" : "Computer"
    } has won the game!`;

    // 리셋 버튼 띄우기
    resetGameBtn.style.display = "block";
    // 가위, 바위, 보 옵션 숨기기
    optionsContainer.style.display = "none";
  }
}

// 리셋 게임 함수
function resetGame() {
  // 점수 초기화
  playerScore = 0;
  computerScore = 0;
  playerScoreSpanElement.innerText = playerScore;
  computerScoreSpanElement.innerText = computerScore;
  // 리셋 게임 버튼 숨기기
  resetGameBtn.style.display = "none";
  // 가위, 바위, 보 옵션 띄우기
  optionsContainer.style.display = "block";
  // 승자 메시지 빈값 초기화
  winnerMsgElement.innerText = "";
  // 매판 대결 결과 메시지 빈값 초기화
  roundResultsMsg.innerText = "";
}

// 리셋버튼 실행 이벤트
resetGameBtn.addEventListener("click", resetGame);

const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scissorsBtn = document.getElementById("scissors-btn");

// 가위, 바위, 보 버튼 이벤트
rockBtn.addEventListener("click", function () {
  showResults("Rock");
});

paperBtn.addEventListener("click", function () {
  showResults("Paper");
});

scissorsBtn.addEventListener("click", function () {
  showResults("Scissors");
});
