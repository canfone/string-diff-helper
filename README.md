# string-diff-helper
A simple javascript helper to get diff of String return into an array.

See live <a href="https://canfone.github.io/string-diff-helper/">demo</a> here

# How to use
Using native javascript, first you need to include the library file in your application.

```
<script type="text/javascript" src="src/string-diff-helper.js"></script>
```
After that you can now access the `StringDiffHelper` object to get the difference of two strings.

```
let string1 = "Your first string here...";
let string2 = "Your second string here...";

let diff = StringDiffHelper.lineOutputBuilder(string1, string2);

```
The returned variable `diff` will be an array of lines if your strings are multiple line strings. If your strings are just single line then it will return a single element array. Each element is an object of three keys, the `remark`, `diff1` and `diff2`.

```
{
    remark: "<>",
    diff1: "Your <mark>fir</mark>s<mark>t</mark> string here...",
    diff2: Your s<mark>econd</mark> string here...
}
```
Notice the `<mark>` tag, that portion of your string was the diff. 

You can fully customize your application based on your preferences using this helper. Just play around with it. :)

# License

Copyright (c) 2017 Cliff Richard Anfone. Released under the terms of the MIT license.
