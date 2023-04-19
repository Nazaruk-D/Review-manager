export const handleFileInputChange = (file: File) => {
    const validImageTypes = ['image/jpeg', 'image/png'];

    if (!validImageTypes.includes(file.type)) {
        console.log('Invalid file type');
        return false;
    }
    if (file.size > 2 * 1024 * 1024) {
        console.log('File is too large');
        return false;
    }
    return true;
};
