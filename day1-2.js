let wordnumrg = /one|two|three|four|five|six|seven|eight|nine/
let wordnumrgreverse = /eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/
let nummap = {one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9}
let findFirstNumber = (w, wordrg) => {
    const indexOfFirstDigit = w.search(/[1-9]/)
    const indexOfFirstWordNumber = w.search(wordrg)
    if ((indexOfFirstDigit < indexOfFirstWordNumber && indexOfFirstDigit !== -1) || indexOfFirstWordNumber === -1){
        return Number(w[indexOfFirstDigit])
    }
    // get word number
    const wordnumber = w.match(wordrg)?.[0]

    if (nummap[wordnumber]) {console.log('wordnumber is', nummap[wordnumber]); return nummap[wordnumber]}
    const temp = wordnumber.split('').reverse().join('')
    console.log('reversed wordnumber is', nummap[temp])
    return nummap[temp]
}

let getDigis = (word2) => {
    const firstdig = findFirstNumber(word2, wordnumrg)

    const temp = word2.split('')
    temp.reverse()
    const reversedword = temp.join('')
    const lastdig = findFirstNumber(reversedword, wordnumrgreverse)
    return Number(`${firstdig}${lastdig}`)
}

let result1 = input.reduce((acc, word1) => {
    console.log('acc', acc)
    if (Number.isNaN(acc) || Number.isNaN(getDigis(word1))) console.log('why', word1)
    return acc + getDigis(word1)
}, 0)
