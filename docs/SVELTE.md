# Svelte Generated Object Structure

## Summary 

This codument describes the structure of a svelte component generated from a Fug element. The Fug svelte component renderer generates a svelte component from the input Fug element and its children. Rendered Fug svelte components map element attributes to Fug properties - Fug element with an id will be made available as an attribute on the svelte component.

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

```svelte
<script lang="ts">
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    
    export let emailInputValue = '';
    export let personInputValue = '';

    let email = '';
    let personName = '';

    // create an event dispatcher
    const dispatch = createEventDispatcher();

    // generate an event handler for the submitGatherInfo event
    export let submitGatherInfo = () => {
        dispatch('submitGatherInfo', { email, personName });
    };
</script>
<style>
    .gatherinfo {
        display: flex;
        flex-direction: column;
    }
    .gatherinfo .row {
        display: flex;
        flex-direction: row;
    }
    .gatherinfo .column {
        display: flex;
        flex-direction: column;
    }
    .gatherinfo .title {
        font-size: 24px;
        font-weight: bold;
    }
    .gatherinfo .description {
        font-size: 16px;
    }
    .gatherinfo .button {
        background-color: #4CAF50;
    }
</style>
<div class="gatherinfo">
    <div class="row">
        <div class="column" style="width: 50%;">
            <input type="text" id="email" placeholder="Enter your email" bind:value={email} />
            <input type="text" id="personName" placeholder="Enter your name" bind:value={personName} />
        </div>
        <div class="column" style="width: 50%;">
            <div class="title">Header Title</div>
            <div class="description">Header Description</div>
        </div>
    </div>
    <div class="row">
        <div class="column" style="width: 100%;">
            <button class="button" on:click={submitGatherInfo}>Submit</button>
        </div>
    </div>
</div>
```

