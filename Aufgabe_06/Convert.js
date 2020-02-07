"use strict";
console.log(process.argv);
let baseFrom = parseInt(process.argv[3]);
let baseTo = parseInt(process.argv[4]);
console.log(baseFrom, baseTo);
let num = process.argv[2];
switch (num) {
    case A:
        num;
        break;
    case y:
        // code block
        break;
    default:
    // code block
}
let decimal = parseInt(process.argv[2], baseTo);
console.log(num);
// function baseConversion(String: number, sBase: number, dBase: number) 
//     { 
//         // Parse the number with source radix  
//         // and return in specified radix(base) 
//         return String.toString( 
//             String.parseInt(number, sBase), 
//             dBase); 
//     } 
//     public static void main(String[] args) 
//     { 
//         String number = "555"; // Number 
//         int sBase = 8; // Source Base Octal 
//         int dBase = 10; // Destination Base Decimal 
//         System.out.println("Octal to Decimal: "
//             + baseConversion(number, sBase, dBase)); 
//         dBase = 16; // Destination Base Hexadecimal 
//         System.out.println("Octal to Hex: "
//             + baseConversion(number, sBase, dBase)); 
//     } 
//# sourceMappingURL=Convert.js.map