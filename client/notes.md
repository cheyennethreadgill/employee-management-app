<!-- NEED TO MAKE MODAL ABSOLUTE TO BODY ELEMENT:
    The modal element will need to be the child of the body
    the modal will have to get info from the  project card somehow
        we can add the modal to the app section and only show modal when its clikcked
        but how will the information from the card get to the modal?




 -->

 <!-- 
 (Project Card)
    when we click the project edit button, the button sets project with all info thats on card currently  (fn given by all projects)
(all projects)
    then the state for that card is passed into the modal 
(project modal)
    want to set new values in the update button so it can get passed to the project update function in all projects

    the new title is coming from the projectmodal set state in (all projects)
 
 The title states and update states should be in project modal
 the project modal can then set all of the states and transfer back into project card (as props) and all projects project set state when save is clicked
 
 edit project button, when clicked, the option panel goes away
 
 
 when i hit edit, it gets all info from card
 when i change 1 field, it sets the proj to update to that updated field and whatever was in the handle proj state when the module was first loaded

 so when we load the module, we need to populate with everything that was sent to the server

 when i change 1 field and update, everything else clears and is undefined


 for each input change we are getting everything from the project to update (whic is empty on load) and setting new field
    we need to populate the project info for modal when we handle project to updates

we need to update the projects state when the update btn is clicked so the changes show immediately and not only on refresh

find the project id that matches projectto update id then set projects with the project to update
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
  -->

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
