import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Blocks */}
        <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12">
          {/* 1st block */}
          <div className="sm:col-span-12 lg:col-span-4 lg:max-w-xs">
            <div className="mb-2">
              {/* Logo */}
              <Link className="inline-flex" href="/" aria-label="Cruip">
                <svg className="w-8 h-8" viewBox="0 0 32 32" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <defs>
                    <radialGradient cx="50%" cy="89.845%" fx="50%" fy="89.845%" r="108.567%" gradientTransform="matrix(-.00915 -.82755 .99996 -.00757 -.394 1.319)" id="logo2-b">
                      <stop stopColor="#3B82F6" stopOpacity=".64" offset="0%" />
                      <stop stopColor="#F472B6" stopOpacity=".876" offset="100%" />
                    </radialGradient>
                    <radialGradient cx="50%" cy="89.845%" fx="50%" fy="89.845%" r="108.567%" gradientTransform="matrix(-.00915 -.82755 .99996 -.00757 -.394 1.319)" id="logo2-d">
                      <stop stopColor="#3B82F6" stopOpacity=".64" offset="0%" />
                      <stop stopColor="#D375C2" stopOpacity=".833" offset="50.358%" />
                      <stop stopColor="#FBCFE8" stopOpacity=".876" offset="100%" />
                    </radialGradient>
                    <path d="M12 32c8-6.915 12-12.582 12-17 0-6.627-5.373-12-12-12S0 8.373 0 15c0 4.418 4 10.085 12 17Z" id="logo2-a" />
                    <path d="M20 29c8-6.915 12-12.582 12-17 0-6.627-5.373-12-12-12S8 5.373 8 12c0 4.418 4 10.085 12 17Z" id="logo2-c" />
                  </defs>
                  <g fill="none" fillRule="evenodd">
                    <use fill="url(#logo2-b)" opacity=".64" transform="matrix(1 0 0 -1 0 35)" xlinkHref="#logo2-a" />
                    <use fill="url(#logo2-d)" opacity=".961" xlinkHref="#logo2-c" />
                  </g>
                </svg>
              </Link>
            </div>
            <div className="text-sm text-gray-600">
              <a className="text-gray-400 hover:text-blue-500 transition duration-150 ease-in-out" href="#0">Terms</a> · <a className="text-gray-400 hover:text-blue-500 transition duration-150 ease-in-out" href="#0">Privacy Policy</a>
            </div>
          </div>
          {/* 2nd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-xs text-gray-200 font-semibold uppercase mb-2">Products</h6>
            <ul className="text-sm space-y-2">
              <li>
                <a className="text-gray-400 hover:text-blue-500 transition duration-150 ease-in-out" href="#0">Neon Manage</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-blue-500 transition duration-150 ease-in-out" href="#0">Neon Analyse</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-blue-500 transition duration-150 ease-in-out" href="#0">Neon Launch</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-blue-500 transition duration-150 ease-in-out" href="#0">Experimentation</a>
              </li>
            </ul>
          </div>
          {/* 3rd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-xs text-gray-200 font-semibold uppercase mb-2">Resources</h6>
            <ul className="text-sm space-y-2">
              <li>
                <a className="text-gray-400 hover:text-blue-500 transition duration-150 ease-in-out" href="#0">Blog</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-blue-500 transition duration-150 ease-in-out" href="#0">Cheat Sheet</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-blue-500 transition duration-150 ease-in-out" href="#0">Channel Partners</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-blue-500 transition duration-150 ease-in-out" href="#0">Affiliate Program</a>
              </li>
            </ul>
          </div>
          {/* 4th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-xs text-gray-200 font-semibold uppercase mb-2">Compare</h6>
            <ul className="text-sm space-y-2">
              <li>
                <a className="text-gray-400 hover:text-blue-500 transition duration-150 ease-in-out" href="#0">Session Recording</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-blue-500 transition duration-150 ease-in-out" href="#0">Feature Flags</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-blue-500 transition duration-150 ease-in-out" href="#0">Heatmaps</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-blue-500 transition duration-150 ease-in-out" href="#0">Correlation Analysis</a>
              </li>
            </ul>
          </div>
          {/* 5th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-xs text-gray-200 font-semibold uppercase mb-2">Company</h6>
            <ul className="text-sm space-y-2">
              <li>
                <a className="text-gray-400 hover:text-blue-500 transition duration-150 ease-in-out" href="#0">About Us</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-blue-500 transition duration-150 ease-in-out" href="#0">Our Story</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-blue-500 transition duration-150 ease-in-out" href="#0">Work With Us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
