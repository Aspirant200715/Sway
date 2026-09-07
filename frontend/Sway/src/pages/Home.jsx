function Home() {
  return (
    <div className="w-full max-w-[820px] animate-rise pb-8">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-4xl font-semibold tracking-[-0.05em] text-[#17201c] sm:text-5xl">
            Home
          </h1>
          <p className="mt-3 text-[15px] text-[#66716a]">
            Your feed will appear here when you add your data.
          </p>
        </div>
        <button
          type="button"
          className="primary-button self-start sm:self-auto"
        >
          + Share a thought
        </button>
      </div>

      <div className="mt-8">
        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-[#17201c]">
            Feed
          </h2>
          <div className="rounded-2xl border border-dashed border-[#cbd7cc] bg-[#fff] px-5 py-10 text-center text-sm text-[#819087]">
            No content yet.
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
