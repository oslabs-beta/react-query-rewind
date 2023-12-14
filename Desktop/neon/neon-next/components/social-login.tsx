export default function SocialLogin() {
  return (
    <>
      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="border-t border-gray-800 grow mr-3" aria-hidden="true" />
        <div className="text-sm text-gray-400 italic">Or</div>
        <div className="border-t border-gray-800 grow ml-3" aria-hidden="true" />
      </div>
      {/* Social login */}
      <button className="btn-sm text-white bg-gradient-to-t from-pink-500 to-pink-400 hover:to-pink-500 w-full relative flex after:flex-1">
        <div className="flex-1 flex items-center">
          <svg className="w-4 h-4 fill-current text-pink-200 shrink-0" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.679 6.545H8.043v3.273h4.328c-.692 2.182-2.401 2.91-4.363 2.91a4.727 4.727 0 1 1 3.035-8.347l2.378-2.265A8 8 0 1 0 8.008 16c4.41 0 8.4-2.909 7.67-9.455Z" />
          </svg>
        </div>
        <span className="flex-auto text-pink-50 pl-3">Continue With Google</span>
      </button>    
    </>
  )
}