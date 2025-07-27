document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("copyBtn").addEventListener("click", copyResult);

  ["param1", "param2", "secret"].forEach(id => {
    document.getElementById(id).addEventListener("input", updateResult);
  });
});

const specialAsciiChars = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`;

function updateResult() {
  const param1 = document.getElementById('param1').value;
  const param2 = document.getElementById('param2').value;
  const secret = document.getElementById('secret').value;

  let concat = '';
  const maxLen = Math.max(param1.length, param2.length, secret.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < param1.length) concat += param1[i];
    if (i < param2.length) concat += param2[i];
    if (i < secret.length) concat += secret[i];
  }
  console.log('Concatenated string:', concat);
  const encoder = new TextEncoder();
  encoder.encode(concat);
  crypto.subtle.digest('SHA-256', encoder.encode(concat)).then(hashBuffer => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashResult = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    const hashSubstring = hashResult.substring(0, 16).toLowerCase();
    let array = hashSubstring.split('');
    let countNumbers = -1;
    for (let i = 0; i < array.length; i++) {

      if (/[0-9]/.test(array[i]))
      {
        if (countNumbers % 3 === 0)
        {
            array[i] = specialAsciiChars[parseInt(array[i], 10) + i % 3];
        }
        countNumbers++;
      }

      if (/[a-z]/.test(array[i]))
      {
        console.log('before:', array[i]);
        array[i] = String.fromCharCode(array[i].charCodeAt(0) + (6 * (i % 4) + i % 3));
        console.log('after:', array[i]);
        if (i % 2 !== 0)
          array[i] = array[i].toUpperCase();
      }
    }
    document.getElementById('result').textContent = array.join('');
  });
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
