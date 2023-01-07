Fug

Fug is a markup language that turns a layout into s svelte component. It's terse, consistent, and visually easy-to-understand.

```fug
style(name=header,margin-left=10px)[
  style(name=logo,width=40px,length=40px,margin=10px)[
    image(src=http://foo.bar/img.png)
  ]
]
header (margin-left=10px)[
  logo(width=40px,length=40px,margin=10px)[
    image(src=http://foo.bar/img.png)
  ]
]
container(name=userEmail,display=flex,flex-direction=column)[
  row[
    column(width=50%)[
      textbox(id=name,placeholder='Name')
    ]
    column(width=50%)[
      textbox(id=emailplaceholder='Email')
    ]
  ]
  row[
    button(text='Submit',event=submitEmail)
  ]
]
```

Generate:

```svelte
<script>
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()
    export let userEmail = {
        name: '',
        emailplaceholder: ''
    }
    let userEmailDefaults = {
        name: 'Name',
        emailplaceholder: 'Email'
    }
    onMount(() => {
        userEmail = { ...userEmailDefaults, ...userEmail }
    })
    function submitEmail() {
        dispatch('submitEmail', userEmail)
    }
</script>

<header style="margin-left: 10px;">
  <logo style="width: 40px; length: 40px; margin: 10px;">
    <image src="http://foo.bar/img.png" />
  </logo>
</header>
<container style="display: flex; flex-direction: column;">
  <row>
    <column style="width: 50%;">
      <textbox id="name" placeholder="Name" />
    </column>
    <column style="width: 50%;">
      <textbox id="emailplaceholder" placeholder="Email" />
    </column>
  </row>
  <row>
    <button on:click={() => submitEmail()}>Submit</button>
  </row>
</container>
```

Fug's standard controller code generation can be overridden:

```fug
javascript(`
    function submitEmail() {
        if(!userEmail.name === 'silly') return alert("Silly is not a name")
        dispatch('submitEmail', userEmail)
    }
`)
style(name=header,margin-left=10px)[
  style(name=logo,width=40px,length=40px,margin=10px)[
    image(src=http://foo.bar/img.png)
  ]
]
header (margin-left=10px)[
  logo(width=40px,length=40px,margin=10px)[
    image(src=http://foo.bar/img.png)
  ]
]
container(name=userEmail,display=flex,flex-direction=column)[
  row[
    column(width=50%)[
      textbox(id=name,placeholder='Name')
    ]
    column(width=50%)[
      textbox(id=emailplaceholder='Email')
    ]
  ]
  row[
    button(text='Submit',event=submitEmail)
  ]
]
```

Generate:

```svelte
<script>
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()
    export let userEmail = {
        name: '',
        emailplaceholder: ''
    }
    let userEmailDefaults = {
        name: 'Name',
        emailplaceholder: 'Email'
    }
    onMount(() => {
        userEmail = { ...userEmailDefaults, ...userEmail }
    })
    function submitEmail() {
        if(!userEmail.name === 'silly') return alert("Silly is not a name")
        dispatch('submitEmail', userEmail)
    }
</script>

<header style="margin-left: 10px;">
  <logo style="width: 40px; length: 40px; margin: 10px;">
    <image src="http://foo.bar/img.png" />
  </logo>
</header>
<container style="display: flex; flex-direction: column;">
  <row>
    <column style="width: 50%;">
      <textbox id="name" placeholder="Name" />
    </column>
    <column style="width: 50%;">
      <textbox id="emailplaceholder" placeholder="Email" />
    </column>
  </row>
  <row>
    <button on:click={() => submitEmail()}>Submit</button>
  </row>
</container>
```


```
## Installation

```bash
npm install fug
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

```js
import { compile } from 'fug'

const code = `
  javascript(\`
    function submitEmail() {
        if(!userEmail.name === 'silly') return alert("Silly is not a name")
        dispatch('submitEmail', userEmail);
    }
  \`)
`;
```

## License

MIT

//------------

index.ts
