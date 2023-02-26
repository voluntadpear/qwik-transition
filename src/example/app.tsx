import { component$, useBrowserVisibleTask$, useSignal, useStyles$, useTask$ } from "@builder.io/qwik";
import { useCSSTransition } from "../usecsstransition";
import styles from "./styles.css?inline";

export default component$(() => {
  useStyles$(styles);
  const alertOnOff = useSignal(false);
  const buttonOnOff = useSignal(true);
  const showBtnRef = useSignal<HTMLButtonElement>()
  const alertBtnRef = useSignal<HTMLButtonElement>()


  const alertTrans = useCSSTransition(alertOnOff, { timeout: 300 });
  const buttonTrans = useCSSTransition(buttonOnOff, {
    timeout: 300,
  });
  const paragraphTrans = useCSSTransition(useSignal(true), {
    transitionOnAppear: true,
  });

  useTask$(({track}) => {
    track(() => alertOnOff.value)

    // treat buttonOnOff as computed value of alertOnOff
    buttonOnOff.value = !alertOnOff.value
  })

  useBrowserVisibleTask$(({ track }) => {
    track(() => alertBtnRef.value)
    track(() => alertTrans.shouldMount.value)

    // force focus to alert button when it's visible
    if(alertTrans.shouldMount.value && alertBtnRef.value) {
        alertBtnRef.value.focus()
    } else if(!alertTrans.shouldMount.value && showBtnRef.value) {
        showBtnRef.value.focus()
    }
  })

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
            alertOnOff.value = true;
          }}
          ref={showBtnRef}
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
              //@ts-expect-error
              preventDefault:click
              onClick$={() => {
                alertOnOff.value = false;
              }}
              ref={alertBtnRef}
            >
              Close
            </button>
          </form>
        </dialog>
      ) : null}
    </>
  );
});
