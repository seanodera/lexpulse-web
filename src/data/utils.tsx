export async function createFile({url, name = 'image'}: { url: string, name?: string }) {
    let response = await fetch(url);
    let data = await response.blob();
    let metadata = {
        type: 'image/jpeg'
    };

    return new File([data], `${name}.jpg`, metadata);
}

