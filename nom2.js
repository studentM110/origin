function Node(data) 
{
    this.data = data;
    this.next = null;
}

function MyList() 
{
    this._length = 0;
    this.head = null;
}

//----------------------------------------------------------------------------//
// добавление нового элемента
MyList.prototype.push_back = function(data)
{
    let node = new Node(data);
    let currentNode = this.head;
    if (currentNode == null)
    {
        this.head = node;
        return;
    }
    while (currentNode.next != null)
        currentNode = currentNode.next;
    currentNode.next = node;
    this._length++;
    return node;
}

//----------------------------------------------------------------------------//
// вывод значений списка
MyList.prototype.print = function()
{
    let currentNode = this.head;
    if (this.head != null)
    {
        while (currentNode.next != null)
        {
            console.log('result: %d', currentNode.data);
            currentNode = currentNode.next;
        }
        console.log('result: %d', currentNode.data);
    }
}

//----------------------------------------------------------------------------//
// поиск элемента в списке
MyList.prototype.find = function(data)
{
    let currentNode = this.head;
    let count = 0;
    if (currentNode != null)
    {
        while (currentNode.next != null)
        {
            if (currentNode.data == data)
            {
                ++count;
            }
            currentNode = currentNode.next;
        }
        if (currentNode.data == data)
            ++count;
    }
    return count; 
}

//----------------------------------------------------------------------------//
// удаление из списка по значению
MyList.prototype.remove = function(data)
{
    let currentNode = this.head;
    if (currentNode != null)
    {
        if (currentNode.data == data)
        {
            if (currentNode.next != null)
                this.head = currentNode.next;
            else
                this.head = null;
            return;
        }
        while (currentNode.next != null)
        {
            if (currentNode.next.data == data)
            {
                if (currentNode.next.next != null)
                    currentNode.next = currentNode.next.next;
                else
                    currentNode.next = null;
                break;
            }
            currentNode = currentNode.next;
        }
    }
    return; 
}

//----------------------------------------------------------------------------//
// сложение списков

function add(list1, list2)
{
    var myList = new MyList();
    let first = Math.max(list1, list2);
    let second = Math.min(list1, list2);
    let decimal = 0;
    while (parseInt(first / 10) > 0)
    {
        let num = first % 10 + second % 10 + decimal;
        myList.push_back(num % 10);
        decimal = parseInt(num / 10);
        first = parseInt(first / 10);
        second = parseInt(second / 10);
    }
    let num = first % 10 + second % 10 + decimal;
    myList.push_back(num % 10);
    decimal = parseInt(num / 10); 
    if (decimal > 0)
        myList.push_back(decimal);
    return myList;
}


//----------------------------------------------------------------------------//
// тест
var myList = new MyList();
myList.print();
myList.push_back(4);
myList.print();
myList.push_back(5);
myList.print();
myList.push_back(6);
myList.remove(4);
myList = add(1, 999);
myList.print();
console.log(myList.find(0));
console.log(myList.find(6));
