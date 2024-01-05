"use client";

import React from "react";

const Counter = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Você clicou {count} vezes</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button
            onClick={(e) => setCount(count + 1)}
            className="btn btn-primary"
          >
            Incrementar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
