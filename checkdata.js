const data = 
    ``;

const myObj = JSON.parse(data);
const jsonArray = [];

//Return JSON with corrected length
const changed = [];

for (let i = 1; i <= myObj.length; i++) {
    if (myObj[i-1].length != myObj[i-1].text.length) {
        myObj[i-1].length = myObj[i-1].text.length;
        changed.push("\n" + myObj[i-1].id + ": " + myObj[i-1].text.length);
    }
    jsonArray.push(myObj[i-1]);
};


//Check for duplicates
const seen = new Set();
const duplicates = [];

for (let i = 1; i <= myObj.length; i++) {
    if (seen.has(myObj[i-1].text)) {
        duplicates.push("\n" + myObj[i-1].id +  + ": " + myObj[i-1].text); // Add to duplicates array if already seen
    } 
    else {
        seen.add(myObj[i-1].text); // Mark as seen
    }
}

//Check if length is between x and y
const wrong = [];
const bottom = 100;
const top = 300;

for (let i = 1; i <= myObj.length; i++) {
    if (myObj[i-1].length < bottom || myObj[i-1].length > top) {
        wrong.push("\n" + myObj[i-1].id)
    }
};

console.log(JSON.stringify(jsonArray));
console.log("Length Changed:" + changed);
console.log("Duplicates: " + duplicates);
console.log("Change Length:" + wrong);