const fileReader = new FileReader();
const url = "/api/";
let students = [];
let modalLoader = document.querySelector("#modal-overlay-loader").style
let mainLoader = document.querySelector("#main-loader").style

function init() {
     const path = window.location.pathname;
     if (path == "/student/") {
          showStudents();
     } else {
          console.log("nothing");
     }

     let cart = JSON.parse(localStorage.getItem("cart")) || [];
     localStorage.setItem("studentId", "");
}
window.onload = init;

//////////////////////////////////////////////////////////////////
//        Student CRUD
//////////////////////////////////////////////////////////////////

async function getStudents() {
     let students = await fetch(url + "students").then(data => data.json());
     return students;
}

async function getStudent(id) {
     let student = await fetch(url + "students/" + id).then(data => data.json());
     return student;
}

async function deleteStudent() {
     modalLoader.display = "flex"
     const id = localStorage.getItem("studentId");
     await fetch(url + "students/" + id, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
     });
     closeModal()
     showStudents()
     modalLoader.display = "none"
}

async function editStudent() {
     modalLoader.display = "flex"
     const id = localStorage.getItem("studentId");
     let student = getFields();
     await fetch(url + "students/" + id, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(student)
     });
     populateFields(student)
     showStudents()
     modalLoader.display = "none"
}

async function addStudent() {
     modalLoader.display = "flex"
     let student = getFields();
     student = await fetch(url + "students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(student)
     });
     closeModal()
     showStudents()
     modalLoader.display = "none"
}

async function getCount() {
     let student = await fetch(url + "students/count").then(data => data.json());
     let admin = await fetch(url + "admins/count").then(data => data.json());
     
     document.querySelector("#noOfAdmins").innerHTML = admin.data
     document.querySelector("#noOfStudents").innerHTML = student.data
}

//////////////////////////////////////////////////////////////////
//        Helpers
//////////////////////////////////////////////////////////////////

function getFields() {
     let record = {};

     record.name = document.querySelector("#name").value;
     record.regNo = document.querySelector("#regNo").value;
     record.email = document.querySelector("#email").value;
     record.faculty = document.querySelector("#faculty").value;
     record.department = document.querySelector("#department").value;
     record.yearOfEntry = document.querySelector("#yearOfEntry").value;
     record.yearOfGrad = document.querySelector("#yearOfGrad").value;

     return record;
}

function populateFields(record) {
     document.querySelector("#name").value = record.name;
     document.querySelector("#regNo").value = record.regNo;
     document.querySelector("#email").value = record.email;
     document.querySelector("#faculty").value = record.faculty;
     document.querySelector("#department").value = record.department;
     document.querySelector("#yearOfEntry").value = record.yearOfEntry;
     document.querySelector("#yearOfGrad").value = record.yearOfGrad;
}

//////////////////////////////////////////////////////////////////
//        implement CRUD
//////////////////////////////////////////////////////////////////

async function showStudents() {
     mainLoader.display = "block";
     let studentDivs = "";
     const students = await getStudents()

     students.data.forEach((student, index) => {
          studentDivs +=
               `<tr onclick="showStudentModal('${student._id}')">
          <td>${student.name}</td>
          <td>${student.regNo}</td>
          <td>${student.department}</td>
          <td>${student.faculty}</td>
          <td>${student.yearOfEntry}</td>
          <td>${student.yearOfGrad}</td>
          <td>${(parseInt(student.yearOfGrad) - parseInt(student.yearOfEntry)) * 100}</td>
          </tr>`;
     });

     document.querySelector("#students-table").innerHTML = studentDivs;
     getCount()
     mainLoader.display = "none"
}

async function showStudentModal(id) {
     document.querySelector("#modal-bg").style.display = "flex";

     if (id) {
          modalLoader.display = "flex";
          document.querySelector("#addStudent-but").style.display = "none";
          localStorage.setItem("studentId", id);
          const student = await getStudent(id);
          populateFields(student.data);
          modalLoader.display = "none";
     } else {
          document.querySelector("#editStudent-but").style.display = "none";
          document.querySelector("#deleteStudent-but").style.display = "none";
          localStorage.setItem("studentId", "");
          document.querySelector("#name").value = "";
          document.querySelector("#regNo").value = "";
          document.querySelector("#email").value = "";
          document.querySelector("#faculty").value = "";
          document.querySelector("#department").value = "";
          document.querySelector("#yearOfEntry").value = "";
          document.querySelector("#yearOfGrad").value = "";
     }
}

function closeModal() {
     document.querySelector("#modal-bg").style.display = "none";
     localStorage.setItem("studentId", "");
     document.querySelector("#addStudent-but").style.display = "inline-block";
     document.querySelector("#editStudent-but").style.display = "inline-block";
     document.querySelector("#deleteStudent-but").style.display = "inline-block";
}

//////////////////////////////////////////////////////////////////
//        Login
//////////////////////////////////////////////////////////////////

async function login() {
     document.querySelector("button").classList.add("loading")

     const email = document.querySelector("#admin-email").value
     const password = document.querySelector("#admin-password").value

     let result = await fetch(url + "admins/" + "signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
     });

     console.log(result)

     if (result.status == 200) window.location.replace("/student/");
}

