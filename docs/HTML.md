# WebComponent Generated Object Structure

## Summary 

This codument describes the structure of html generated from a Fug element. The Fug html renderer renders a Fug element to static HTML.

## Example

```fug
gatherinfo(emailInputValue='sschepis@yahoo.com',personInputValue='Sebastian Schepis')[
    row[
        column(width=50%)[
            input(type=text,id=email,placeholder='Enter your email',value=emailInputValue),
            input(type=text,id=personName,placeholder='Enter your name', value=personInputValue),
        ],
        column(width=50%)[
            title(text='Header Title'),
            description(text='Header Description'),
        ],
    ],
    row[
        column(width=100%)[
            button(text='Submit',event=submitGatherInfo),
        ],
    ],
]
```
Renders to:

```html
<div class="gatherinfo">
    <div class="row">
        <div class="column" style="width: 50%;">
            <input type="text" id="email" placeholder="Enter your email" value="sschepis@yahoo.com" >
            <input type="text" id="personName" placeholder="Enter your name" value="Sebastian Schepis" >
        </div>
        <div class="column" style="width: 50%;">
            <h1>Header Title</h1>
            <p>Header Description</p>
        </div>
    </div>
    <div class="row">
        <div class="column" style="width: 100%;">
            <button>Submit</button>
        </div>
    </div>
</div>
```