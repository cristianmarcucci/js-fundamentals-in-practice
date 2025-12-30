export function fakeApi(response, delay=800, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(shouldFail){
                reject(new Error("Server error"));
            } else{
                resolve(response);
            }
        }, delay);
    });
}