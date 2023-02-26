<p align="center">
  <br>
  <img width="400" src="https://github.com/voluntadpear/qwik-transition/blob/main/markdown-assets/logo-color.svg" alt="qwik-transition">
  <br>
  <br>
</p>

<h1 align='center'>qwik-transition</h1>

<div align='center'>
Light-weight (<1kb gzip) custom hook for qwik to help with CSS transitions. Based on <a href="https://github.com/iamyoki/transition-hook">@iamyoki/transition-hook</a>.
<br><br>
  <a href='https://img.shields.io/npm/v/qwik-transition?label=npm%20version'>
  <img src='https://img.shields.io/npm/v/qwik-transition?label=npm%20version' alt='qwik-transition npm'>
  </a>
  <a href='https://opensource.org/licenses/MIT'>
  <img src='https://img.shields.io/badge/License-MIT-green.svg' alt='MIT'>
  </a>
</div>

<p align="center">
  <a href="https://github.com/voluntadpear/qwik-transition/blob/main/src/example/app.tsx" target="_blank">See Example</a>
</p>

## Installation

```bash
npm install qwik-transition
```

## Usage

### useCSSTransition

This hook transforms a boolean state into a transition stage, that allows you to control your CSS transitions.

```jsx
import { component$, useSignal } from "@builder.io/qwik";
import { useCSSTransition } from "qwik-transition";

export default component$(() => {
  const onOff = useSignal(true);
  const { stage, shouldMount } = useCSSTransition(onOff, { timeout: 300 });

  return (
    <div>
      <button
        onClick$={() => {
          onOff.value = !onOff.value;
        }}
      >
        toggle
      </button>
      {shouldMount.value && (
        <p
          style={{
            transition: ".3s",
            opacity: stage.value === "enterTo" ? 1 : 0,
          }}
        >
          Hey guys, I'm fading
        </p>
      )}
    </div>
  );
});
```

## API Reference

### useCSSTransition(signal, { timeout, transitionOnAppear })

```js
const { stage, shouldMount } = useCSSTransition(onOff, {
  timeout: 300,
  transitionOnAppear: true,
});
```

| Parameters | Type                                                            | Description                                                                                                                                                                                   |
| :--------- | :-------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `signal`   | `Signal<boolean>`                                               | **Required**. Your boolean signal, which controls animation in and out                                                                                                                        |
| `options`  | `{ timeout: number = 0; transitionOnAppear: boolean = false; }` | **timeout:** How long before the transition ends and the component unmounts. <br />**transitionOnAppear** Whether to set the `enterFrom` stage value on the initial mount of the page or not. |

<br>

| Returns       | Type                                                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :------------ | :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `stage`       | `Signal<"enterFrom" \| "enterTo" \| "leaveFrom" \| "leaveTo" \| "idle">` | **`idle`**: No transition. <br /> **enterFrom:** The element will appear. The transition begins. Use this value to set the starting values of your enter transition. <br /> **`enterTo`:** Added in the next tick after `enterFrom`. Use this value to set the ending values of your enter transition. <br /> **`leaveFrom`:** The element will disappear. The transition beings. Use this value to set the starting values of your exit transition. <br /> **`leaveTo`:** Added in the next tick after `leaveFrom`. Use this value to set the ending values of your exit transition. |
| `shouldMount` | `Signal<boolean>`                                                        | Whether the component should be mounted or not. The `timeout` you specify as one of the options is important here to time when `shouldMount` changes from `true` to `false`.                                                                                                                                                                                                                                                                                                                                                                                                          |

## Acknowledgment

Thanks to https://github.com/iamyoki/transition-hook that this hook is an adaptation from.

## License

[MIT](https://choosealicense.com/licenses/mit/)
