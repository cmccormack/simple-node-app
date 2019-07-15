const primerInput = document.getElementById("primer-input");
const form = document.getElementById("primer-form");
const resultSpan = document.getElementById("result");

primerInput.addEventListener("input", e => {
  let newValue;
  if ("atcgATCG".includes(e.target.value.slice(-1))) {
    newValue = e.target.value;
  } else {
    newValue = e.target.value.slice(0, -1);
  }
  primerInput.value = newValue.toUpperCase();
});

form.addEventListener("submit", e => {
  e.preventDefault();
  const { method, action } = e.target;
  const { name, value } = document.getElementById("primer-input");

  fetch(action, {
    body: JSON.stringify({ [name]: value }),
    headers: {
      "Content-Type": "application/json",
    },
    method,
  })
    .then(response => response.json())
    .then(json => (resultSpan.textContent = json.result));
});