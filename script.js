function updateResult() {
  const param1 = document.getElementById('param1').value;
  const param2 = document.getElementById('param2').value;
  const secret = document.getElementById('secret').value;

  const result = param1 + param2 + secret;
  document.getElementById('result').textContent = result || "Result";
}

function copyResult() {
  const resultText = document.getElementById('result').textContent;

  if (navigator.clipboard && window.isSecureContext) {
    // Modern async clipboard API
    navigator.clipboard.writeText(resultText)
      .catch(err => alert("Failed to copy: " + err));
  } else {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = resultText;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      alert("Failed to copy: " + err);
    }
    document.body.removeChild(textArea);
  }
}

// Attach input listeners
["param1", "param2", "secret"].forEach(id => {
  document.getElementById(id).addEventListener('input', updateResult);
});
