import Image from 'next/image'
import Header from '@/components/ui/header'
import Illustration01 from '@/public/images/hero-illustration.svg'
import Illustration02 from '@/public/images/auth-illustration.svg'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <>
      <Header nav={false} />

      <main className="relative grow flex">

        {/* Content */}
        <div className="w-full bg-gray-900">
          <div className="h-full flex flex-col justify-center before:min-h-[4rem] md:before:min-h-[5rem] before:flex-1 after:flex-1">
            <div className="px-4 sm:px-6">
              <div className="w-full max-w-sm mx-auto">
                <div className="py-16 md:py-20">     
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block shrink-0 w-1/3 overflow-hidden before:bg-gray-800 before:absolute before:inset-0 before:-z-10">
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10" aria-hidden="true">
            <Image src={Illustration01} className="max-w-none" alt="Hero Illustration" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10" aria-hidden="true">
            <Image src={Illustration02} className="max-w-none" alt="Auth Illustration" />
          </div>
        </div>     

      </main>
    </>
  )
}
