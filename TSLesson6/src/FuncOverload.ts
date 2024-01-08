type Combinable1 = string | number;
type Numeric1 = number | boolean;

type Universal1 = Combinable & Numeric;

//typescript merges this declaration (function overload) with below declaration
//therefore it defines the potential types of a or b
//function overloads are used to making what type of result will be returned
function add1(a: string, b: number): string;
function add1(a: number, b: number): number;
function add1(a: string, b: string): string;
function add1(a: number, b: string): string;
function add1(a: Combinable1, b: Combinable1) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

const result = add1(1, 's');