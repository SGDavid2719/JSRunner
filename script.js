document.getElementById("runButton").addEventListener("click", () => {
	const code = document
		.getElementById("code")
		.value.replace(/^\s*[\r\n]/gm, "")
		.replace(/$\s*[\r\n]/gm, "")
		.replace(/"/g, "'");

	fetch("http://localhost:3000/run-code", {
		method: "POST",
		headers: {
			"Content-Type": "text/plain",
		},
		body: code,
	})
		.then((response) => response.text())
		.then((result) => {
			document.getElementById("output").innerText = result;
		})
		.catch((error) => {
			document.getElementById("output").innerText = `Error: ${error}`;
		});
});
