//----------------------------------------------------------------------------//
// проверка скобок
function trueBracket(brackets)
{
    let bracketBuffer = new Array();
    let result = true;
    for (let i = 0; i < brackets.length && result; i++) 
    {
        let ch = brackets.charAt(i);
        let lastElem;
        switch (ch)
        {
            case '(' :     bracketBuffer.push('('); break;
            case '{' :     bracketBuffer.push('{'); break;
            case '[' :     bracketBuffer.push('['); break;
            case ')' :     
                lastElem = bracketBuffer.pop(); 
                if (lastElem != '(') 
                    result = false;
                break;
            case ']' :     
                lastElem = bracketBuffer.pop(); 
                if (lastElem != '[') 
                    result = false;
                break;
            case '}' :     
                lastElem = bracketBuffer.pop(); 
                if (lastElem != '{') 
                    result = false;
                break;
            default:
                result = false;
                break;
        }
    }
    return result && bracketBuffer.length == 0;
}

//----------------------------------------------------------------------------//
// частота слов
function getMostPopularWord(text)
{
    let mapWords = new Map();
    let words = text.split(' ');
    for (let i = 0; i < words.length; i++)
    {
        if (mapWords.has(words[i]))
            mapWords.set(words[i], mapWords.get(words[i]) + 1);
        else 
            mapWords.set(words[i], 1);
    }
    let maxvalue = 0;
    let result = "";
    let maxValueCount = 0;
    for(let amount of mapWords)
    {
        if (maxvalue < amount["1"])
        {
            maxvalue = amount["1"];
            result = amount["0"];
            maxValueCount = 1;
        }
        else if (maxvalue == amount["1"])
        {
            maxValueCount++;
        }
        //console.log('result: %d', amount["1"]);
    }
    if (maxValueCount > 1)
    {
        result = "---";
    }
    return result;
}

//var binaryText = process.argv[2];
//console.log('result: %d', trueBracket(binaryText));
//console.log('result: %s', getMostPopularWord(binaryText));
