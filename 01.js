const reverse = n => {
    let array = [];
    for (let i = n; i > 0; i--) {
        array.push(i);
    }
    console.log(array);
    return array;
};

reverse(5); // Call the function with an argument