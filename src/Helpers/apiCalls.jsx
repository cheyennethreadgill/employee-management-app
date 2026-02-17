// DELETE EMPLOYEE From DB
export async function deleteProjectFromDB(
  id,
  URL,
  DELETEPROJECT_PATH,
  handleFetchPromiseError,
  handleJsonPromiseResponseLog,
  handleFetchError,
) {
  // Post options
  const options = {
    method: "DELETE"
  };

  try {
    const fetchPromiseResponse = await fetch(`${URL}${DELETEPROJECT_PATH}:${id}`, options);
    handleFetchPromiseError(fetchPromiseResponse);
    const jsonPromiseResponse = await fetchPromiseResponse.json();
    handleJsonPromiseResponseLog(jsonPromiseResponse);
  } catch (err) {
    console.log("Error in delete project api call");
    handleFetchError(err);
  }
}

//   UPDATE PROJECT
export async function handleProjectUpdate(e, id) {
  e.preventDefault();

  // Post options
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      projectID: id,
      title: `${newTitleUpdated ? newTitle : title}`,
      department: `${newDepartmentUpdated ? newDepartment : department}`,
      priority: `${newPriorityUpdated ? newPriority : priority}`,
      status: `${newStatusUpdated ? newStatus : status}`,
      team: `${newTeamUpdated ? newTeam : team}`,
    }),
  };

  try {
    const fetchPromiseResponse = await fetch(`${URL}${UPDATE_PATH}`, options);
    if (!fetchPromiseResponse.ok) {
      console.log(`Something went wrong with fetch from server ${fetchPromiseResponse.status}`);
    }
    const jsonPromiseResponse = fetchPromiseResponse.json();

    jsonPromiseResponse.then((res) => {
      console.log(res);
    });
  } catch (err) {
    console.log(`Dash Single Project fetch error: ${err}`);
    console.log(`FETCH FAILED: ${err}`);
  }
}
