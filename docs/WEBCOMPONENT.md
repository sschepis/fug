# WebComponent Generated Object Structure

## Summary 

This codument describes the structure of a webcomponent generated from a Fug element. The Fug WebComponent renderer is a simple wrapper around the Fug renderer. It is a simple way to use Fug in a web environment. Rendered Fug WebComponents map element attributes to Fug properties - Fug element with an id will be made available as an attribute on the WebComponent.

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

```javascript
(function() {
  class Gatherinfo extends HTMLDivElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // the style string to be added to the shadow dom
        const style = `
        <style>
            .gatherinfo {
                display: flex;
                flex-direction: column;
            }
            .row {
                display: flex;
                flex-direction: row;
            }
            .column {
                display: flex;
                flex-direction: column;
            }
            .title {
                font-size: 24px;
                font-weight: bold;
            }
            .description {
                font-size: 16px;
            }
            .button {
                background-color: #4CAF50;
                border: none;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
            }
        </style>`;

        // the markup string to be added to the shadow dom
        const markup = `
        <div class="gatherinfo">
            <div class="row">
                <div class="column" style="width: 50%;">
                    <input type="text" id="email" placeholder="Enter your email" value="${this.getAttribute('emailInputValue')}">
                    <input type="text" id="personName" placeholder="Enter your name" value="${this.getAttribute('personInputValue')}">
                </div>
                <div class="column" style="width: 50%;">
                    <h1 class="title">Header Title</h1>
                    <p class="description">Header Description</p>
                </div>
            </div>
            <div class="row">
                <div class="column" style="width: 100%;">
                    <button class="button">Submit</button>
                </div>
            </div>
        </div>`;

        const script = `
        <script>
            const defaults = {
                emailInputValue: 'sschepis@yahoo.com',
                personInputValue: 'Sebastian Schepis',
            }
            const submitGatherInfo = () => {
                const email = this.shadowRoot.getElementById('email').value;
                const personName = this.shadowRoot.getElementById('personName').value;
                const event = new CustomEvent('submitGatherInfo', {
                    detail: {
                        email,
                        personName,
                    },
                });
                this.dispatchEvent(event);
            }
        </scr` + `ipt>`;

        // add the style and markup to the shadow dom
        shadow.innerHTML = style + markup + script;
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.button').addEventListener('click', submitGatherInfo);
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('.button').removeEventListener('click', submitGatherInfo);
    }

    static get observedAttributes() {
        return ['emailInputValue', 'personInputValue'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[name] = newValue;
        }
    }

    get emailInputValue() {
        return this.getAttribute('emailInputValue');
    }

    set emailInputValue(value) {
        this.setAttribute('emailInputValue', value || defaults.emailInputValue);
    }

    get personInputValue() {
        return this.getAttribute('personInputValue');
    }

    set personInputValue(value) {
        this.setAttribute('personInputValue', value || defaults.personInputValue);
    }
}
customElements.define('gatherinfo', Gatherinfo);

})();
```