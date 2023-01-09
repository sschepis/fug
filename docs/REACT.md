# Svelte Generated Object Structure

## Summary 

This codument describes the structure of a React component generated from a Fug element. The Fug React component renderer generates a React component from the input Fug element and its children. Rendered Fug React components map element attributes to Fug properties - Fug element with an id will be made available as an attribute on the React component.

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

```react
import React, { useState, useEffect } from 'react';

export const Gatherinfo = ({ emailInputValue = '', personInputValue = '', submitGatherInfo = () => {} }) => {
    const [email, setEmail] = useState('');
    const [personName, setPersonName] = useState('');
    const style = {
        gatherinfo: {
            display: 'flex',
            flexDirection: 'column',
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
        },
        column: {
            display: 'flex',
            flexDirection: 'column',
        },
    }
    return (
        <div className="gatherinfo" style={style.gatherinfo}>
            <div className="row">
                <div className="column" style={{ width: '50%' }}>
                    <input type="text" id="email" placeholder="Enter your email" value={emailInputValue} onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" id="personName" placeholder="Enter your name" value={personInputValue} onChange={(e) => setPersonName(e.target.value)} />
                </div>
                <div className="column" style={{ width: '50%' }}>
                    <Title text="Header Title" />
                    <Description text="Header Description" />
                </div>
            </div>
            <div className="row">
                <div className="column" style={{ width: '100%' }}>
                    <Button text="Submit" onClick={submitGatherInfo} />
                </div>
            </div>
        </div>
    );
};
```
