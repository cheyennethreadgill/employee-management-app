export async function getEmployees(
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
    const jsonResponse = await fetchPromise.json();
    handleJsonPromiseResponseLog(jsonResponse);
    handleSetEmployees(jsonResponse);
    handleLoadingState(false);
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
    const jsonResponse = await promise.json();
    handleJsonPromiseResponseLog(jsonResponse);
    handleSetProjects( jsonResponse );
    handleLoadingState(false);
  } catch (err) {
    handleFetchError(err);
    console.log(`error in resource file, problem with fetching projects in getProjects function: ${err}`);
  }
}
