//var binaryText = process.argv[2];
//convertToDecimal(process.argv[2]);
function convertToDecimal(binaryText) 
{
    var decimal = 0;
    for (var i = binaryText.length - 1; i >= 0; i--)
    {
        if (binaryText[i] == '0')
        {

        }
        else 
        {
            if (binaryText[i] == '1')
            {
                decimal += (1 << binaryText.length - i - 1)
            }
            else
            {
                return;
            }
        }
    }
    console.log('result: %d', decimal);
    return decimal;
}
