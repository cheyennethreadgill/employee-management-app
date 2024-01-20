{(btnValue === employeeid) & (editMode == true) ? (
<input
type="text"
name=""
onKeyUp={(e) => {
setNewFirstnameUpdated(true);
setNewLastnameUpdated(true);
setCombinedName(e.target.value);
setNewFirstname(splitName[0]);
setNewLastname(splitName[1]);
}}
placeholder={
(btnValue === employeeid) & !newFirstnameUpdated
? firstname + " " + lastname
: newFirstnameUpdated & (btnValue === employeeid)
? newFirstname + " " + newLastname
: firstname + " " + "lastname"
}
/>
)
}

<!--  -->

{(btnValue === employeeid) & (editMode == true) ? (
<input
type="text"
onKeyUp={(e) => {
setNewDepartment(e.target.value);
setNewDepartmentUpdated(true);
}}
placeholder={
(btnValue === employeeid) & !newDepartmentUpdated
? department
: newDepartmentUpdated & (btnValue === employeeid)
? newDepartment
: department
}
/>
)
}

<!--  -->

{(btnValue === employeeid) & (editMode == true) ? (
<input
type="text"
onKeyUp={(e) => {
setNewDesignation(e.target.value);
setNewDesignationUpdated(true);
}}
placeholder={
(btnValue === employeeid) & !newDesignationUpdated
? designation
: newDesignationUpdated & (btnValue === employeeid)
? newDesignation
: designation
}
/>
)
}

<!--  -->

{(btnValue === employeeid) & (editMode == true) ? (
<input
type="text"
onKeyUp={(e) => {
setNewMobile(e.target.value);
setNewMobileUpdated(true);
}}
placeholder={
(btnValue === employeeid) & !newMobileUpdated
? mobile
: newMobileUpdated & (btnValue === employeeid)
? newMobile
: mobile
}
/>
)
}

<!--  -->

{(btnValue === employeeid) & (editMode == true) ? (
<input
type="text"
onKeyUp={(e) => {
setNewEmail(e.target.value);
setNewEmailUpdated(true);
}}
placeholder={
(btnValue === employeeid) & !newEmailUpdated
? email
: newEmailUpdated & (btnValue === employeeid)
? newEmail
: email
}
/>
)
}

<!-- BTNS FUNCTIONALITY -->

{(btnValue === employeeid) & (editMode == true) ? (
<Button
className="update-btn"
onClick={(e) => {
setEditMode(!editMode);
updateEmployee(e, employeeid);
updateEmployee(e, employeeid);
}}
type="button" >
UPDATE
</Button>
) : (
<div className="form-btns">
<i
onClick={(e) => {
findEmployeeForUpdate(employeeid);
handleShow();
}}
type="button"
className="fa-regular fa-pen-to-square fs-5 edit-btn" ></i>
<i
onClick={() => {
deleteEmployee(employeeid);
}}
type="submit"
className="fa-solid fa-trash delete-btn" ></i>
</div>
)}

                <!--  -->
