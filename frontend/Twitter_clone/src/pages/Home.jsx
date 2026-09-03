import useAuth from "../context/useAuth";

const posts = [
  {
    initials: "AM",
    name: "Avery Morgan",
    handle: "@averymorgan",
    time: "12 min",
    text: "A quiet morning, a fresh page, and one good idea to carry into the day.",
    comments: "8",
    likes: "42",
    accent: "bg-[#e4684c]",
  },
  {
    initials: "JN",
    name: "Jules Novak",
    handle: "@julesn",
    time: "34 min",
    text: "What is something small that made your week better? I am collecting answers.",
    comments: "14",
    likes: "67",
    accent: "bg-[#6c9a6e]",
  },
  {
    initials: "RK",
    name: "Riya Kapoor",
    handle: "@riyareads",
    time: "1 hr",
    text: "The best conversations do not need a grand entrance. They just need someone to begin.",
    comments: "5",
    likes: "31",
    accent: "bg-[#d39b55]",
  },
];

function Home() {
  const { user } = useAuth();

  return (
    <div className="w-full max-w-[820px] animate-rise pb-8">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#e4684c]">
            Tuesday, September 1
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-[-0.05em] text-[#17201c] sm:text-5xl">
            Good morning, {user?.name || user?.username || "friend"}.
          </h1>
          <p className="mt-3 text-[15px] text-[#66716a]">
            Here is what is happening in your little corner, {user?.name}.
          </p>
        </div>
        <button
          type="button"
          className="primary-button self-start sm:self-auto"
        >
          + Share a thought
        </button>
      </div>

      <section className="mt-6 rounded-2xl border border-[#e0e7de] bg-[#fff] p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#819087]">
              Your profile
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-[#17201c]">
              {user?.name}
            </h2>
            <p className="text-sm text-[#819087]">@{user?.username}</p>
          </div>
          <div className="text-left text-sm text-[#4f5d54] sm:text-right">
            <p>{user?.email}</p>
            {user?.phone_no && <p>{user.phone_no}</p>}
          </div>
        </div>
        {user?.bio && (
          <p className="mt-4 text-sm leading-6 text-[#4f5d54]">{user.bio}</p>
        )}
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat number={user?.following?.length ?? 0} label="following" />
        <Stat number="1.8k" label="your reach" />
        <Stat number={user?.posts?.length ?? 0} label="your posts" />
      </div>

      <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_260px]">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-[#17201c]">
              Your feed
            </h2>
            <button
              type="button"
              className="text-xs font-bold text-[#e4684c] hover:text-[#bc4e38]"
            >
              Latest &#8595;
            </button>
          </div>
          <div className="space-y-3">
            {posts.map((post) => (
              <Post key={post.handle} post={post} />
            ))}
          </div>
        </section>

        <aside className="h-fit rounded-2xl border border-[#e0e7de] bg-[#fff] p-5">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#819087]">
            People to meet
          </p>
          <Person initials="LT" name="Leo Torres" handle="@leot" />
          <Person initials="MS" name="Mina Shah" handle="@minashah" />
          <Person initials="OB" name="Owen Brooks" handle="@owenb" />
          <button
            type="button"
            className="mt-2 text-xs font-bold text-[#e4684c]"
          >
            See everyone &#8594;
          </button>
        </aside>
      </div>
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div className="rounded-2xl border border-[#e0e7de] bg-[#fff] px-4 py-4">
      <p className="font-display text-2xl font-semibold text-[#17201c]">
        {number}
      </p>
      <p className="mt-1 text-xs font-medium text-[#819087]">{label}</p>
    </div>
  );
}

function Post({ post }) {
  return (
    <article className="rounded-2xl border border-[#e0e7de] bg-[#fff] p-5 transition-shadow hover:shadow-[0_8px_24px_rgba(38,51,45,0.06)]">
      <div className="flex gap-3">
        <div
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-[13px] text-xs font-bold text-white ${post.accent}`}
        >
          {post.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <strong className="text-sm text-[#26332d]">{post.name}</strong>
            <span className="text-xs text-[#9aa69d]">
              {post.handle} · {post.time}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-[#4f5d54]">{post.text}</p>
          <div className="mt-4 flex gap-6 text-xs font-semibold text-[#819087]">
            <button type="button" className="hover:text-[#e4684c]">
              &#9825; {post.likes}
            </button>
            <button type="button" className="hover:text-[#6c9a6e]">
              &#9675; {post.comments}
            </button>
            <button type="button" className="hover:text-[#d39b55]">
              &#8599; Share
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function Person({ initials, name, handle }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="grid h-9 w-9 place-items-center rounded-full bg-[#e9eee7] text-[10px] font-bold text-[#53645a]">
        {initials}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-[#26332d]">{name}</p>
        <p className="text-xs text-[#9aa69d]">{handle}</p>
      </div>
      <button
        type="button"
        className="ml-auto text-lg text-[#e4684c]"
        aria-label={`Follow ${name}`}
      >
        +
      </button>
    </div>
  );
}

export default Home;
