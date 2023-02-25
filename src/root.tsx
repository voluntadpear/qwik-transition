import { component$ } from "@builder.io/qwik";
import App from "./example/app";

export const Root = component$(() => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>qwik-transition demo</title>
      </head>
      <body>
        <App />
      </body>
    </>
  );
});
