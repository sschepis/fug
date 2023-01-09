# Fug

## Sumary

Fug is a markup language that turns a layout into a component.  Fug is terse, consistent,  descriptive, and easy-to-understand. Fug markup is compilable to multiple frameworks, including:

- Plain HTML / CSS: Fug markup can be compiled to plain HTML and CSS.  This is useful for prototyping and for generating static sites.
- WebComponent: Fug markup can be compiled to WebComponents.  This is useful for creating reusable components that can be used in any framework.
- React Component: Fug markup can be compiled to React components.  This is useful for creating react applications 
- Svelte Component: Fug markup can be compiled to Svelte components.  This is useful for creating svelte applications
- Vue Component: Fug markup can be compiled to Vue components.  This is useful for creating vue applications

```fug
header (margin-left=10px)[
  logo(width=40px,length=40px,margin=10px)[
    image(src=http://foo.bar/img.png)
  ]
]
container(name=userEmail,display=flex,flex-direction=column)[
  row[
    column(width=50%)[textbox(id=name,placeholder='Name')]
    column(width=50%)[textbox(id=email,placeholder='Email')]
  ]
  row[button(text='Submit',event=submitEmail)]
]
```

generates the following Markup:

Plain HTML / CSS

```html
<style>
  .header {
    margin-left: 10px;
  }
  .header .logo {
    width: 40px;
    length: 40px;
    margin: 10px;
  }
  .header .logo .image {
    src: http://foo.bar/img.png;
  }
  .userEmail {
    display: flex;
    flex-direction: column;
  }
  .userEmail .row {
    width: 100%;
  }
  .userEmail .row .column {
    width: 50%;
  }
</style>
<div class="header">
  <div class="logo">
    <img class="image" src="http://foo.bar/img.png" />
  </div>
</div>
<div class="userEmail">
  <div class="row">
    <div class="column">
      <input id="name" placeholder="Name" />
    </div>
    <div class="column">
      <input id="email" placeholder="Email" />
    </div>
  </div>
  <div class="row">
    <button>Submit</button>
  </div>
</div>
```

WebComponent:

```javascript
const style = `<style>
  .header {
    margin-left: 10px;
  }
  .header .logo {
    width: 40px;
    length: 40px;
    margin: 10px;
  }
  .header .logo .image {
    src: http://foo.bar/img.png;
  }
  .userEmail {
    display: flex;
    flex-direction: column;
  }
  .userEmail .row {
    width: 100%;
  }
  .userEmail .row .column {
    width: 50%;
  }
</style>`;
const markup = `<div class="header">
  <div class="logo">
    <img class="image" src="http://foo.bar/img.png" />
  </div>
</div>
<div class="userEmail">
  <div class="row">
    <div class="column">
      <input id="name" placeholder="Name" />
    </div>
    <div class="column">
      <input id="email" placeholder="Email" />
    </div>
  </div>
  <div class="row">
    <button>Submit</button>
  </div>
</div>`;
class FugComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = style + markup;
  }
}
customElements.define("fug-component", FugComponent);
```

React:

```react
import React from 'react'

const style = `<style>
  .header {
    margin-left: 10px;
  }
  .header .logo {
    width: 40px;
    length: 40px;
    margin: 10px;
  }
  .header .logo .image {
    src: http://foo.bar/img.png;
  }
  .userEmail {
    display: flex;
    flex-direction: column;
  }
  .userEmail .row {
    width: 100%;
  }
  .userEmail .row .column {
    width: 50%;
  }
</style>`;
const markup = ``;
export default function FugComponent() {
  return (
    <div>
      <style>{style}</style>
      <div class="header">
        <div class="logo">
          <img class="image" src="http://foo.bar/img.png" />
        </div>
      </div>
      <div class="userEmail">
        <div class="row">
          <div class="column">
            <input id="name" placeholder="Name" />
          </div>
          <div class="column">
            <input id="email" placeholder="Email" />
          </div>
        </div>
        <div class="row">
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
}
```

Svelte:

```svelte
<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { onMount } from 'svelte'
    const dispatch = createEventDispatcher()
    export let userEmail = {
        name: '',
        email: ''
    }
    const userEmailDefaults = {
        name: 'Name',
        email: 'Email'
    }
    onMount(() => {
        userEmail = { ...userEmailDefaults, ...userEmail }
    })
    const submitEmail = () => {
        dispatch('submitEmail', userEmail)
    }
</script>

<style>
  .header {
    margin-left: 10px;
  }
  .header .logo {
    width: 40px;
    length: 40px;
    margin: 10px;
  }
  .header .logo .image {
    src: http://foo.bar/img.png;
  }
  .userEmail {
    display: flex;
    flex-direction: column;
  }
  .userEmail .row {
    width: 100%;
  }
  .userEmail .row .column {
    width: 50%;
  }
</style>

<div class="header">
  <div class="logo">
    <img class="image" src="http://foo.bar/img.png" />
  </div>
</div>
<div class="userEmail">
  <div class="row">
    <div class="column">
      <input id="name" placeholder="Name" bind:value={userEmail.name} />
    </div>
    <div class="column">
      <input id="email" placeholder="Email" bind:value={userEmail.email} />
    </div>
  </div>
  <div class="row">
    <button on:click={submitEmail}>Submit</button>
  </div>
</div>
```

Vue:

```vue
<template>
  <div>
    <style>
      .header {
        margin-left: 10px;
      }
      .header .logo {
        width: 40px;
        length: 40px;
        margin: 10px;
      }
      .header .logo .image {
        src: http://foo.bar/img.png;
      }
      .userEmail {
        display: flex;
        flex-direction: column;
      }
      .userEmail .row {
        width: 100%;
      }
      .userEmail .row .column {
        width: 50%;
      }
    </style>
    <div class="header">
      <div class="logo">
        <img class="image" src="http://foo.bar/img.png" />
      </div>
    </div>
    <div class="userEmail">
      <div class="row">
        <div class="column">
          <input id="name" placeholder="Name" v-model="userEmail.name" />
        </div>
        <div class="column">
          <input id="email" placeholder="Email" v-model="userEmail.email" />
        </div>
      </div>
      <div class="row">
        <button @click="submitEmail">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FugComponent',
    props: {
      userEmail: {
        type: Object,
        default: () => ({
          name: '',
          email: ''
        })
      }
    },
    data() {
      return {
        userEmailDefaults: {
          name: 'Name',
          email: 'Email'
        }
      }
    },
    mounted() {
      this.userEmail = {
        ...this.userEmailDefaults,
        ...this.userEmail
      }
    },
    methods: {
      submitEmail() {
        this.$emit('submitEmail', this.userEmail)
      }
    }
  }
</script>
```


```plantuml
@startuml
skinparam monochrome true
skinparam shadowing false
skinparam defaultFontName "Roboto"
skinparam defaultFontSize 12

```

## Features

- Simple syntax for describing components
- Generates a React, Vue, Svelte, or Preact component
- Generates a CSS file
- Generates a controller file (React, Vue, Svelte, or Preact)
- Supports custom attributes
- Supports custom elements
- Supports custom javascript
- Supports custom css

## Syntax

Fug parses a fug layout string, returning an object with the following properties:

- `name` - The name of the component
- `id` - The id of the component
- `type` - The type of the component
- `attributes` - The attributes of the component
- `styles` - The styles of the component
- `children` - The children of the component
- `content` - The content of the component
- `event` - The event of the component

Fug objects can then be used to generate a React, Vue, Svelte, or Preact component using the `render` function of the `renderers` object.

## Installation

```bash
npm install fug --save
```

## Usage

```js
import { compile } from 'fug'

const code = `
  header[
    logo[
      image(src=http://foo.bar/img.png)
    ]
  ]
`

const result = compile(code)
```

## API

- compile(code, options)

## Options

- `javascript` - A string of javascript code to be injected into the controller. This is useful for adding custom logic to the controller.
- `style` - A string of css code to be injected into the controller. This is useful for adding custom css to the controller.
- `{tag}` - A string of code to be injected into the controller. This is useful for adding custom logic to the controller.

```js
import { compile } from 'fug'
import svelte from 'svelte/compiler'

const code = `
  javascript(\`
    function submitEmail() {
        if(!userEmail.name === 'silly') return alert("Silly is not a name")
        dispatch('submitEmail', userEmail);
    }
  \`)
`;

const result = compile(code + `
  header (margin-left=10px)[
    logo(width=40px,length=40px,margin=10px)[
      image(src=http://foo.bar/img.png)
    ]
  ]
  container(name=userEmail,display=flex,flex-direction=column)[
    row[
      column(width=50%)[textbox(id=name,placeholder='Name')]
      column(width=50%)[textbox(id=email,placeholder='Email')]
    ]
    row[button(text='Submit',event=submitEmail)]
  ]
`)

const { js, css } = svelte.compile(result, { generate: 'ssr' })
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
