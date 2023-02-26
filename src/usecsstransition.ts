import { useBrowserVisibleTask$, useSignal } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";

export type Stage = "enterFrom" | "enterTo" | "leaveFrom" | "leaveTo" | "idle";

export function useCSSTransition(
  signal: Signal<boolean>,
  { timeout = 0, transitionOnAppear = false }
) {
  // the stage of transition - 'from' | 'enter' | 'leave'
  const stage = useSignal<Stage>(transitionOnAppear ? "enterFrom" : "idle");
  const appeared = useSignal(false);

  // the timer for should mount
  const timer = useSignal<Canceller>({});
  const shouldMount = useSignal(signal.value);

  useBrowserVisibleTask$(function handleStateChange({ track }) {
    track(() => signal.value);
    clearAnimationFrameTimeout(timer.value);

    // when true - trans from to enter
    // when false - trans enter to leave, unmount after timeout
    if (signal.value) {
      if (appeared.value) {
        stage.value = "enterFrom";
      }
      shouldMount.value = true;
      appeared.value = true;
      // in the next tick change to 'enterTo'
      timer.value = setAnimationFrameTimeout(() => {
        stage.value = "enterTo";
      });
    } else if (shouldMount.value) {
      stage.value = "leaveFrom";

      // Change to 'leaveTo' in the next tick
      setAnimationFrameTimeout(() => {
        stage.value = "leaveTo";
      });

      // unmount the element after the specified timeout
      timer.value = setAnimationFrameTimeout(() => {
        shouldMount.value = false;
      }, timeout);
    }

    return () => {
      clearAnimationFrameTimeout(timer.value);
    };
  });

  return {
    stage,
    shouldMount,
  };
}

function setAnimationFrameTimeout(callback: () => void, timeout: number = 0) {
  const startTime = performance.now();
  const canceller: Canceller = {};

  function call() {
    canceller.id = requestAnimationFrame((now) => {
      if (now - startTime > timeout) {
        callback();
      } else {
        call();
      }
    });
  }

  call();
  return canceller;
}

function clearAnimationFrameTimeout(canceller: Canceller) {
  if (canceller.id) cancelAnimationFrame(canceller.id);
}

type Canceller = {
  id?: number;
};
