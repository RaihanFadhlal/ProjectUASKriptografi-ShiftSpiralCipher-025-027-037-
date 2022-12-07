function orde (text) {
    let hasil = 0;
    for (let i = 1; i*i < text.length; i++) {
        hasil = i + 1;
    }
    return hasil;
}

export function cek (text) {
    let i = orde(text);
    let hasil = (i*i) - text.length;
    return hasil;
}

function encryptPadding (teks, kurang) {
    let tekspad = teks;
    for (let i = 0; i < kurang; i++) {
        tekspad += 'X';
    }
    return tekspad;
}

export function decryptPadding (arr, kurang) {
    let arrpad = arr;
    for (let i = 0; i < kurang; i++) {
        arrpad = arrpad.concat('X');
    }
    return arrpad;
}

// ------------------------------------------------------------


export function shiftEncrypt (text, s) {
    let result=""
    let text2 = encryptPadding(text, cek(text));
    for (let i = 0; i < text2.length; i++) {
        let char = text2[i];
        if (char == ' ') {
            result += '_';
        } else if (char.toUpperCase(text2[i])) {
            let ch =  String.fromCharCode((char.charCodeAt(0) + s-65) % 26 + 65);
            result += ch;
        } else {
            let ch = String.fromCharCode((char.charCodeAt(0) + s-97) % 26 + 97);
            result += ch;
        }
    }
    return result;
}


// ------------------------------------------------------------
 
function spiralEncrypt (arr, mat) {
    const O = orde(arr);
    let top = 0,
    bottom = O - 1,
    left = 0,
    right = O - 1;
 
    let index = 0;
 
    while (1) {
        if (left > right)
            break;
 
        // Print top row
        for(let i = left; i <= right; i++)
            mat[top][i] = arr[index++];
             
        top++;
 
        if (top > bottom)
            break;
 
        // Print right column
        for (let i = top; i <= bottom; i++)
            mat[i][right] = arr[index++];
        right--;
 
        if (left > right)
            break;
 
        // print bottom row
        for (let i = right; i >= left; i--)
            mat[bottom][i] = arr[index++];
             
        bottom--;
 
        if (top > bottom)
            break;
 
        // Print left column
        for(let i = bottom; i >= top; i--)
            mat[i][left] = arr[index++];
             
        left++;
    }
}
 
// Function to print the spiral matrix
function printSpiralEncrypt (arr, mat) {
    const O = orde(arr);
    let hasil = "";
    for(let i = 0; i < O; i++)
    {
        for(let j = 0; j < O; j++)
            hasil = hasil.concat(mat[i][j]);
    }
    return hasil;
}

export function encrypt (teks, key) {
    const O = orde(teks);
    let text = teks;
    let s = key;
    let text2 = shiftEncrypt(text, s);

    const usingSplit = text2.split('');
    const usingSpread = [...text2];
    const usingArrayFrom = Array.from(text2);
    const usingObjectAssign = Object.assign([], text2);


    let arr = usingObjectAssign;
                
    let mat = new Array(O);
    for(let i = 0; i < O; i++)
        mat[i] = new Array(O);
    
    spiralEncrypt(arr, mat);
    let hasil = printSpiralEncrypt(arr, mat);
    return hasil;
}


// ------------------------------------------


export function shiftDecrypt (text, s) {
    let result=""
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char == '_' || char == ' ') {
            result += '_';
        } else if (char.toUpperCase(text[i])) {
            let ch =  String.fromCharCode((char.charCodeAt(0) + (26-s)-65) % 26 + 65);
            result += ch;
        } else {
            let ch = String.fromCharCode((char.charCodeAt(0) + (26-s)-97) % 26 + 97);
            result += ch;
        }
    }
    return result;
}


// ----------------------------------------------------

export function spiralDecrypt (m, n, arr) {
    let i, k = 0, l = 0;
    let hasil = "";
    /*
        k - starting row index
        m - ending row index
        l - starting column index
        n - ending column index
        i - iterator 
    */
 
    while (k < m && l < n) {
        // print the first row from the remaining rows
        for (i = l; i < n; ++i) {
            hasil = hasil.concat(arr[k][i]);
        }
        k++;
 
        // print the last column from the remaining columns
        for (i = k; i < m; ++i) {
            hasil = hasil.concat(arr[i][n - 1]);
        }
        n--;
 
        // print the last row from the remaining rows
        if (k < m) {
            for (i = n - 1; i >= l; --i) {
                hasil = hasil.concat(arr[m - 1][i]);
            }
            m--;
        }
 
        // print the first column from the remaining columns
        if (l < n) {
            for (i = m - 1; i >= k; --i) {
                hasil = hasil.concat(arr[i][l]);
            }
            l++;
        }
    }
    return hasil;
}

// program to split array into smaller chunks

export function splitIntoChunk (arr, chunk) {
    let hasil = [];
    for (let i=0; i < arr.length; i += chunk) {

        let tempArray;
        tempArray = arr.slice(i, i + chunk);
        hasil.push(tempArray);
        //console.log(tempArray);
    }
    return hasil;

}

export function decrypt (teks, key) {
    let text3 = teks;
    let s = key;
    let text4 = decryptPadding(text3, cek(text3));

    const usingSplit2 = text4.split('');
    const usingSpread2 = [...text4];
    const usingArrayFrom2 = Array.from(text4);
    const usingObjectAssign2 = Object.assign([], text4);

    // Driver code
    let arr2 = usingObjectAssign2;
    const chunk = orde(teks);
    //console.log(splitIntoChunk(arr2, chunk));
    let arr3 = splitIntoChunk(arr2, chunk);
    //console.log(arr3);

    // function call
    let r = arr3.length;
    let c = arr3[0].length;
    
    let hasil = shiftDecrypt(spiralDecrypt(r, c, arr3), s);
    return hasil;
}