// async function getEmployees() {
//   const URL = `http://localhost:8080/`;
//   try {
//     const fetchPromisResponse = await fetch(`${URL}/employees`);
//     if (!fetchPromisResponse.ok) {
//       console.log(
//         `Something went wrong with fetch from server ${fetchPromisResponse.status}`
//       );
//     }

//     jsonPromiseResponse = await fetchPromisResponse.json();

//     jsonPromiseResponse.then((res) => {
//       console.log(res);
//     });
//   } catch {
//     (err) => {
//       console.log(`FETCH FAILED: ${err}`);
//     };
//   }
// }

// export default getEmployees;
