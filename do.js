function addTask() {
  const taskText = document.getElementById("taskInput").value;
  const datetime = document.getElementById("datetimeInput").value;
  if (taskText.trim() === "" || datetime === "") return;

  const taskList = document.getElementById("taskList");

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.innerHTML = `<strong>${taskText}</strong><div class='datetime'>${new Date(
    datetime
  ).toLocaleString()}</div>`;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "×";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => taskList.removeChild(li);

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  document.getElementById("taskInput").value = "";
  document.getElementById("datetimeInput").value = "";
}
