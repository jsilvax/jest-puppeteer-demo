export default (page, url) => {
    return new Promise(async (resolve, reject) => {
        page.on("response", async function responseDataHandler(response) {
            if (response.url === url) {
                if (response.status !== 200) reject(`Error Status: ${response.status}`);
				let data = await response.text();
				data = JSON.parse(data);
                page.removeListener("response", responseDataHandler);
                resolve({ data });
            }
        });
    });
};
