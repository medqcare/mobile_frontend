export default function createFormData(file, fullName){
    
    // Location of the image on the device
    let localUri = file.uri;
    let filename = localUri.split('/').pop();
    
    // The name of the uploaded image (you can search in https://cloud.digitalocean.com/spaces/pic-cis.applimetis.id?i=ab2c5e)
    fullName = fullName.replace(/\s+/g, '').toLowerCase()
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`
    
    
    console.log('Application is creating form data')
    const data = new FormData();
    data.append('avatar', { uri: localUri, name: fullName, type })
    console.log('Form data created')

    return data
}
