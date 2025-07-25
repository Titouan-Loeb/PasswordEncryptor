function updateResult() {
  const param1 = document.getElementById('param1').value;
  const param2 = document.getElementById('param2').value;
  const secret = document.getElementById('secret').value;

  const result = param1 + param2 + secret;
  document.getElementById('result').textContent = result || "Result";
}

function copyResult() {
  const resultText = document.getElementById('result').textContent;
  navigator.clipboard.writeText(resultText).then(() => {
    alert("Copied: " + resultText);
  });
}

// Attach event listeners to update on input
["param1", "param2", "secret"].forEach(id => {
  document.getElementById(id).addEventListener('input', updateResult);
});
