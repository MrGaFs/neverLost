# neverLost Project code standards

## General

* Use tabs to indetation not spaces 

* make commit massage helpful for the merger


## naming

* Naming variables will start with a letter (uppercase if the variable is global and lower if it's local) that show the date type of the
variable as in the following table

| Datatype | letter |
| :------: | :----: |
|  number  |   n    |
| Boolean  |   b    |
|  String  |   s    |
|   void   |   v    |

* After putting the char every word in the variable name will start with Uppercase 
character for example :- ( lNumberOfLostKids )

* constant name have all letters capital like (PI, MAX_ELEMENT)

* Names should be describesive as possible and avoid using names like x and y

* Make meaningful distinction.

* Use searchable names

* If there is a magic number like pi please use constant and don't use it as a numer

## functions

* Small.
* Do one thing.
* Use descriptive names.
* Prefer fewer arguments.
* Have no side effects.
* Don't use flag arguments. Split method into several independent methods that can be called from the client without the flag.

## Commenting

* Always try to explain yourself in code.
* Don't be redundant.
* Don't add obvious noise.
* Don't use closing brace comments.
* Don't comment out code. Just remove.
* Use as explanation of intent.
* Use as clarification of code.
* Use as warning of consequences.
* If any function or class is under construction please put todo comment with the unfinished work

```c++
// TODO: 
```

* If there is a bug or an error in any snippets of code please put Bug or FIXME comment 

```c++
// BUG:
// FIXME:
```

* Before any function add comment like this to make editors able to help with auto complete 

```javascript
/**
 * Returns x raised to the n-th power.
 *
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 */
function pow(x, n) {

}
```
