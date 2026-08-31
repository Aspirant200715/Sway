import { useState } from "react";
import { Mark } from "./Login";

function Logout({ onNavigate }) {
  const [loggedOut, setLoggedOut] = useState(false);

  if (loggedOut) {
    return (
      <div className="w-full max-w-[470px] animate-rise text-center">
        <div className="mb-8 flex justify-center lg:hidden">
          <Mark />
        </div>
        <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-[#eaf5e9] text-3xl text-[#397245]">
          &#10003;
        </div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#e4684c]">
          You are all set
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] text-[#17201c]">
          See you soon.
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-[15px] leading-7 text-[#66716a]">
          Your local demo session has been cleared. Come back whenever the
          conversation calls.
        </p>
        <button
          type="button"
          onClick={() => onNavigate("login")}
          className="primary-button mt-8 w-full"
        >
          Log in again <span aria-hidden="true">&#8594;</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[470px] animate-rise text-center">
      <div className="mb-8 flex justify-center lg:hidden">
        <Mark />
      </div>
      <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-[#fff0eb] text-3xl text-[#e4684c]">
        &#8599;
      </div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#e4684c]">
        Take a breather
      </p>
      <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] text-[#17201c] sm:text-5xl">
        Leaving already?
      </h1>
      <p className="mx-auto mt-4 max-w-sm text-[15px] leading-7 text-[#66716a]">
        You can sign out of this device now. Your conversations will be here
        when you return.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row-reverse">
        <button
          type="button"
          onClick={() => setLoggedOut(true)}
          className="primary-button flex-1"
        >
          Log out <span aria-hidden="true">&#8594;</span>
        </button>
        <button
          type="button"
          onClick={() => onNavigate("login")}
          className="secondary-button flex-1"
        >
          Stay a little longer
        </button>
      </div>
      <p className="mt-6 text-xs text-[#9aa69d]">
        This is a frontend-only preview. No session or cookie is changed.
      </p>
    </div>
  );
}

export default Logout;
