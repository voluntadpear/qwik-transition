import { component$, useSignal, useStyles$ } from "@builder.io/qwik";
import { useCSSTransition } from "../usecsstransition";
import styles from "./styles.css?inline";

export default component$(() => {
  useStyles$(styles);
  const onOff = useSignal(false);
  const buttonOnOff = useSignal(true);

  const alertTrans = useCSSTransition(onOff, { timeout: 300 });
  const buttonTrans = useCSSTransition(buttonOnOff, {
    timeout: 300,
  });
  const paragraphTrans = useCSSTransition(useSignal(true), {
    transitionOnAppear: true,
  });

  return (
    <>
      <p
        class={`paragraph ${
          paragraphTrans.stage.value === "enterTo"
            ? "paragraph-entered"
            : paragraphTrans.stage.value === "enterFrom"
            ? "paragraph-animating"
            : null
        }`}
      >
        The transition for this element starts when it appears
      </p>
      {buttonTrans.shouldMount.value ? (
        <button
          class={`btn ${
            buttonTrans.stage.value === "enterTo"
              ? "btn-entered"
              : ["leaveTo", "enterFrom"].includes(buttonTrans.stage.value)
              ? "btn-animating"
              : null
          }`}
          onClick$={() => {
            onOff.value = true;
            buttonOnOff.value = false;
          }}
        >
          Show message
        </button>
      ) : null}
      {alertTrans.shouldMount.value ? (
        <dialog
          class={`dialog ${
            alertTrans.stage.value === "enterTo"
              ? "dialog-entered"
              : "dialog-animating"
          }`}
          open
        >
          <p>Alert</p>
          <form method="dialog">
            <button
              preventDefault:click
                onClick$={() => {
                onOff.value = false;
                buttonOnOff.value = true;
              }}
            >
              Close
            </button>
          </form>
        </dialog>
      ) : null}
    </>
  );
});
