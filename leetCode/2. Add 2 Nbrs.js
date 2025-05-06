

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

 
var addTwoNumbers = function(l1, l2) {
    let tempPtr = l1;
    let digit1,digit2,answer;
    let tens = 1;
    digit1 = 0;
    digit2 = 0;
    while (tempPtr) {
        digit1 = digit1 + (tens * tempPtr.val);
        tens *= 10;
        tempPtr = tempPtr.next;
    }
    tens = 1;
    tempPtr = l2;
    while (tempPtr) {
        digit2 = digit2 + (tens * tempPtr.val);
        tens *= 10;
        tempPtr = tempPtr.next;
    }

    answer = digit1 + digit2;
    tens = 1;
    while (true) {
        const whichTens = Math.floor(answer / tens);
        if (whichTens == 0) {
            if (tens != 1) {
                tens /= 10;
            }
            break;
        }
        tens *= 10;
    }
    
    const l3 = [];
    let i = 0;
    let divisor = answer;
    while (true) {

        l3[i] = Math.floor(divisor / tens);
        divisor = Math.floor(divisor % tens);
        if (tens == 1) {
            break;
        }
        tens = tens / 10;
        i ++;
    }

    for (i = l3.length - 1; i >= 0; i--) {
        l3[i] = new ListNode (l3[i],undefined);
        if (i != l3.length - 1) {
            const j = i + 1;
            l3[j].next = l3[i];
        }
    }

    tempPtr = l3[l3.length - 1];

    while (tempPtr) {
        console.log(tempPtr.val);
        tempPtr = tempPtr.next;
    }


    return l3[l3.length - 1];
};


const l1 = [1,2,8];
const l2 = [4,6,5];
let i = 0;

for (i = 0; i < l1.length; i++) {
   l1[i] = new ListNode (l1[i],undefined);
    if (i) {
        const j = i - 1;
        l1[j].next = l1[i];
    }
}

i = 0;

for (i = 0; i < l2.length; i++) {
    l2[i] = new ListNode (l2[i],undefined);
     if (i) {
        const j = i - 1;
        l2[j].next = l2[i];
     }
}


console.log(addTwoNumbers (l1[0],l2[0]));