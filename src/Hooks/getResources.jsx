export async function getEmployees(
  employees,
  URL,
  PATH,
  handleLoadingState,
  handleSetEmployees,
  handleFetchPromiseError,
  handleJsonPromiseResponseLog,
  handleFetchError
) {
  // *******************************************
  try {
    const fetchPromise = await fetch("https://employee-management-app-rho.vercel.app/api/employees");
    handleFetchPromiseError(fetchPromise);
    if (!fetchPromise.ok) {
      console.log(
        await fetchPromise.text(),
        "**************something went wrong with your fetching from employee route"
      );
    } else {
      const jsonResponse = await fetchPromise.json();
      handleJsonPromiseResponseLog("getResources error:", jsonResponse);
      handleSetEmployees(jsonResponse);
      handleLoadingState(false);
      console.log(jsonResponse);
      console.log("******employees from getResources");
    }
  } catch (err) {
    handleFetchError(`error in resource file, problem with fetching projects in getEmployees function: ${err}`);
  }
}

export async function getProjects(
  URL,
  PATH,
  handleSetProjects,
  handleLoadingState,
  handleFetchPromiseError,
  handleJsonPromiseResponseLog,
  handleFetchError
) {
  try {
    const promise = await fetch(`${URL}${PATH}`);
    handleFetchPromiseError(promise);
    if (!promise.ok) {
      console.log(await promise.text());
    } else {
      const jsonResponse = await promise.json();
      handleJsonPromiseResponseLog(jsonResponse);
      handleSetProjects(jsonResponse);
      handleLoadingState(false);
    }
  } catch (err) {
    //try catch error
    handleFetchError(`error in resource file, problem with fetching projects in getProjects function: ${err}`);
  }
}
