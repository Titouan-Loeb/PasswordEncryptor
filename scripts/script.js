document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("copyBtn").addEventListener("click", copyResult);
});

const specialAsciiChars = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`;

function getAllParamValues() {
  const parametersDiv = document.getElementById("parameters");
  return Array.from(parametersDiv.querySelectorAll("input"))
              .map(input => input.value);
}

function getMaxLength(params, secretLength)
{
  let maxLength = secretLength;
  for (let i = 0; i < params.length; i++) {
    maxLength = Math.max(params[i].length, maxLength);
  }
  return maxLength;
}

async function getPassword() {
  const params = getAllParamValues();
  const secret = document.getElementById('secret').value;
  const length = document.getElementById("slider").value;

  let concat = '';
  const maxLen = getMaxLength(params, secret.length);
  for (let i = 0; i < maxLen; i++) {
    for (let j = 0; j < params.length; j++) {
      if (i < params[j].length) concat += params[j][i];
    }
    if (i < secret.length) concat += secret[i];
  }
  const encoder = new TextEncoder();
  encoder.encode(concat);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(concat));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashResult = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  const hashSubstring = hashResult.substring(0, length).toLowerCase();
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
  const secret = document.getElementById('secret').value;

  const showToast = (message) => {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2000);
  };

  if (!param1) {
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


const slider = document.getElementById("slider");
const follower = document.getElementById("follower");
const container = document.querySelector(".sliderContainer");
const sliderValue = document.getElementById("password-length");

function updateFollower() {
  sliderValue.innerHTML = slider.value
  const val = (slider.value - slider.min) / (slider.max - slider.min);
  const sliderWidth = slider.offsetWidth;
  const thumbWidth = 24;
  const pos = val * (sliderWidth - thumbWidth) + thumbWidth / 2;
  follower.style.left = pos + "px";
}

slider.addEventListener("input", updateFollower);
window.addEventListener("resize", updateFollower);


const parametersDiv = document.getElementById("parameters");
const increaseBtn = document.getElementById("increaseParam");
const decreaseBtn = document.getElementById("decreaseParam");

function getParamCount() {
  return parametersDiv.querySelectorAll("input").length;
}

increaseBtn.addEventListener("click", () => {
  const count = getParamCount() + 1;

  const input = document.createElement("input");
  input.type = "text";
  input.id = `param${count}`;
  input.placeholder = `Parameter n°${count}`;

  parametersDiv.appendChild(input);
});

decreaseBtn.addEventListener("click", () => {
  const count = getParamCount();
  if (count > 1) { // always at least one element
    parametersDiv.removeChild(parametersDiv.lastElementChild);
  }
});