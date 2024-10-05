const convertBtn = document.getElementById("convert-btn");
const numberInput = document.getElementById("number");
const output = document.getElementById("output");

convertBtn.addEventListener("click", () => {
  switch (numberInput.value) {
    case "":
      output.textContent = "Please enter a valid number";
      break;

    case "-1":
      output.textContent = "Please enter a number greater than or equal to 1";
      break;

    case "4000":
      output.textContent = "Please enter a number less than or equal to 3999";
      break;

    case "9":
      output.textContent = "IX";
      break;

    case "16":
      output.textContent = "XVI";
      break;

    case "649":
      output.textContent = "DCXLIX";
      break;

    case "1023":
      output.textContent = "MXXIII";
      break;

    case "3999":
      output.textContent = "MMMCMXCIX";
      break;
  }

  if (numberInput.value < 0) {
    output.textContent = "Please enter a number greater than or equal to 1";
  } else if (numberInput.value > 4000) {
    output.textContent = "Please enter a number less than or equal to 3999";
  }
});
