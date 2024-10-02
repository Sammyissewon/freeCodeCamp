const checkBtn = document.getElementById("check-btn");
const textInput = document.getElementById("text-input");
const result = document.getElementById("result");

const check = () => {
  // const inputValue = input.value.trim().toLowerCase();
  // replace: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/replace

  // character classes: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes

  const lowerReplaced = textInput.value
    .toLowerCase()
    .replace(/[^A-Za-z0-9]/g, "");

  if (textInput.value === "") {
    alert("Please input a value");
  } else if (textInput.value.length === 1) {
    result.innerText = `${textInput.value} is a palindrome`;
  } else if (lowerReplaced === [...lowerReplaced].reverse().join("")) {
    result.innerText = `${textInput.value} is a palindrome`;
  } else {
    result.innerText = `${textInput.value} is not a palindrome`;
  }
};

checkBtn.addEventListener("click", check);
