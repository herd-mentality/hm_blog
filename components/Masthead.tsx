import Link from '@/components/Link'
import Dither from '@/components/Dither'

export default function Masthead() {
  return (
    <section className="relative isolate bg-black dark:bg-black">
      <div className="relative mx-auto h-screen w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        {/* Full viewport background that scrolls with page */}
        <div className="absolute left-1/2 top-0 -z-10 h-screen w-screen -translate-x-1/2">
          <Dither
            className="h-full w-full"
            waveColor={[0.5, 0.5, 0.5]}
            colorNum={5}
            pixelSize={2}
            waveFrequency={2.5}
          />
          {/* Enhanced bottom fade for light & dark to match page bg - fixed dark mode to gray-900 */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent via-white/50 to-white dark:hidden" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-64 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900 dark:block" />
        </div>

        {/* Center content */}
        <div className="relative mx-auto flex h-full max-w-4xl flex-col items-center justify-center text-center">
          <h1 className="prevent-select font-sans text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
            Welcome to{' '}
            <span className="underline decoration-primary-500 decoration-wavy decoration-4 underline-offset-2">
              Herd Mentality
            </span>
          </h1>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#latest"
              className="rounded-full bg-white px-6 py-3 font-grotesk font-semibold text-gray-900 shadow-sm transition-colors hover:bg-gray-100"
            >
              See latest posts
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 font-grotesk font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              All posts
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
