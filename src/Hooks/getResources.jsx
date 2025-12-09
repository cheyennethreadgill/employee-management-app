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
  try {
    const fetchPromise = await fetch(`${URL}${PATH}`);
    handleFetchPromiseError(fetchPromise);
    if (!fetchPromise.ok) {
      console.log(await fetchPromise.text());
    } else {
      const jsonResponse = await fetchPromise.json();
      handleJsonPromiseResponseLog("getResources error:", jsonResponse);
      handleSetEmployees(jsonResponse);
      handleLoadingState(false);
    }
  } catch (err) {
    handleFetchError(err);
    console.log(`error in resource file, problem with fetching projects in getEmployees function: ${err}`);
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
