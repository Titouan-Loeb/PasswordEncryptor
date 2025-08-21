document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("copyBtn").addEventListener("click", copyResult);
});

const specialAsciiChars = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`;

async function getPassword() {
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
  const encoder = new TextEncoder();
  encoder.encode(concat);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(concat));
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
      array[i] = String.fromCharCode(array[i].charCodeAt(0) + (6 * (i % 4) + i % 3));
      if (i % 2 !== 0)
        array[i] = array[i].toUpperCase();
    }
  }
  return array.join('');
}

async function copyResult() {
  const param1 = document.getElementById('param1').value;
  const param2 = document.getElementById('param2').value;
  const secret = document.getElementById('secret').value;

  const showToast = (message) => {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2000);
  };

  if (!param1 && !param2) {
    showToast("Missing at least one parameter");
  } else if (!secret) {
    showToast("Missing secret key");
  } else if (navigator.clipboard && window.isSecureContext) {
    // Modern async clipboard API
    navigator.clipboard.writeText(await getPassword())
      .then(showToast("Copied to clipboard!"))
      .catch(err => alert("Failed to copy: " + err));
  } else {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = getPassword();
    document.body.appendChild(textArea);
    textArea.select();
    try {
      const success = document.execCommand("copy");
      if (success) showToast();
      else throw new Error("execCommand returned false");
    } catch (err) {
      alert("Failed to copy: " + err);
    }
    document.body.removeChild(textArea);
  }
}
