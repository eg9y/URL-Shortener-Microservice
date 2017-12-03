var button = document.getElementById("button");

button.onclick = () => {
  var input = document.getElementById("input").value;
  document.myform.action = `/new/${input}`;
  console.log(input);
};
