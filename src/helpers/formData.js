

export default function createFormData(file){
    console.log('Application is creating form data')
    
    const encode = file.base64
    let localUri = file.uri;
    let filename = localUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`
    const data = new FormData();
    data.append('avatar', { uri: localUri, name: filename, type })
    // data.append('avatar', encode);
    
    console.log('Form data created')

    return data
}
