import Image from 'next/image'
import TestimonialsImage01 from '@/public/images/testimonial-01.jpg'
import TestimonialsImage02 from '@/public/images/testimonial-02.jpg'
import TestimonialsImage03 from '@/public/images/testimonial-03.jpg'
import TestimonialsImage04 from '@/public/images/testimonial-04.jpg'
import TestimonialsImage05 from '@/public/images/testimonial-05.jpg'
import TestimonialsImage06 from '@/public/images/testimonial-06.jpg'
import TestimonialsImage07 from '@/public/images/testimonial-07.jpg'
import TestimonialsImage08 from '@/public/images/testimonial-08.jpg'
import TestimonialsImage09 from '@/public/images/testimonial-09.jpg'

export default function Testimonials() {
  return (
    <section className="relative">
      {/* Bg gradient: top */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-gray-800 to-gray-900 opacity-60 h-[10rem] pointer-events-none -z-10" aria-hidden="true" />
      {/* Bg gradient: bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-[15rem] pointer-events-none z-10" aria-hidden="true" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 font-uncut-sans">Sound too good? Hear what our customers have to say</h2>
          </div>
          {/* Testimonials container */}
          <div className="max-w-sm mx-auto sm:max-w-none grid gap-12 sm:grid-cols-2 md:grid-cols-3 sm:gap-x-6 sm:gap-y-8 items-start" data-aos-id-testimonials>
            {/* 1st Testimonial */}
            <article className="h-full flex flex-col bg-gray-800 p-6" data-aos="fade" data-aos-anchor="[data-aos-id-testimonials]">
              <header className="mb-4">
                <Image className="rounded-full shrink-0" src={TestimonialsImage01} width={48} height={48} alt="Testimonial 01" />
              </header>
              <div className="grow mb-3">
                <p className="text-gray-400">Compared to other offerings, Neon always has a head start and introduces bleeding edge features first.</p>
              </div>
              <footer className="text-sm text-gray-400">
                <span className="text-gray-300">Mark Luiss</span> - <a className="font-medium text-blue-500 hover:text-blue-400 transition duration-150 ease-in-out" href="#0">Apprenda</a>
              </footer>
            </article>
            {/* 2nd Testimonial */}
            <article className="h-full flex flex-col bg-gray-800 p-6" data-aos="fade" data-aos-anchor="[data-aos-id-testimonials]" data-aos-delay="100">
              <header className="mb-4">
                <Image className="rounded-full shrink-0" src={TestimonialsImage02} width={48} height={48} alt="Testimonial 02" />
              </header>
              <div className="grow mb-3">
                <p className="text-gray-400">Neon has made a huge impact on compliance, while helping us become more transparent.</p>
              </div>
              <footer className="text-sm text-gray-400">
                <span className="text-gray-300">Patrick Mills</span> - <a className="font-medium text-blue-500 hover:text-blue-400 transition duration-150 ease-in-out" href="#0">AppDonkey</a>
              </footer>
            </article>
            {/* 3rd Testimonial */}
            <article className="h-full flex flex-col bg-gray-800 p-6" data-aos="fade" data-aos-anchor="[data-aos-id-testimonials]" data-aos-delay="200">
              <header className="mb-4">
                <Image className="rounded-full shrink-0" src={TestimonialsImage03} width={48} height={48} alt="Testimonial 03" />
              </header>
              <div className="grow mb-3">
                <p className="text-gray-400">GitHub provides tools that are, in a sense, invisible. You don't have to waste time trying to get them to work.</p>
              </div>
              <footer className="text-sm text-gray-400">
                <span className="text-gray-300">David Collison</span> - <a className="font-medium text-blue-500 hover:text-blue-400 transition duration-150 ease-in-out" href="#0">BrainTwo</a>
              </footer>
            </article>
            {/* 4th Testimonial */}
            <article className="h-full flex flex-col bg-gray-800 p-6" data-aos="fade" data-aos-anchor="[data-aos-id-testimonials]" data-aos-delay="300">
              <header className="mb-4">
                <Image className="rounded-full shrink-0" src={TestimonialsImage04} width={48} height={48} alt="Testimonial 04" />
              </header>
              <div className="grow mb-3">
                <p className="text-gray-400">Neon is the tool devs. The more you can make work feel native for a developer, the more cool their experience.</p>
              </div>
              <footer className="text-sm text-gray-400">
                <span className="text-gray-300">Licia McFarland</span> - <a className="font-medium text-blue-500 hover:text-blue-400 transition duration-150 ease-in-out" href="#0">Paytable</a>
              </footer>
            </article>
            {/* 5th Testimonial */}
            <article className="h-full flex flex-col bg-gray-800 p-6" data-aos="fade" data-aos-anchor="[data-aos-id-testimonials]" data-aos-delay="400">
              <header className="mb-4">
                <Image className="rounded-full shrink-0" src={TestimonialsImage05} width={48} height={48} alt="Testimonial 05" />
              </header>
              <div className="grow mb-3">
                <p className="text-gray-400">Neon comes into play during the entire software life cycle. It's the de facto tool for anything related to our software.</p>
              </div>
              <footer className="text-sm text-gray-400">
                <span className="text-gray-300">Rossana Alecu</span> - <a className="font-medium text-blue-500 hover:text-blue-400 transition duration-150 ease-in-out" href="#0">Bolt Money</a>
              </footer>
            </article>
            {/* 6th Testimonial */}
            <article className="h-full flex flex-col bg-gray-800 p-6" data-aos="fade" data-aos-anchor="[data-aos-id-testimonials]" data-aos-delay="500">
              <header className="mb-4">
                <Image className="rounded-full shrink-0" src={TestimonialsImage06} width={48} height={48} alt="Testimonial 06" />
              </header>
              <div className="grow mb-3">
                <p className="text-gray-400">I have no tech skills and with Neon I can actually make good looking apps with ease.</p>
              </div>
              <footer className="text-sm text-gray-400">
                <span className="text-gray-300">Max Corsano</span> - <a className="font-medium text-blue-500 hover:text-blue-400 transition duration-150 ease-in-out" href="#0">MixTech</a>
              </footer>
            </article>
            {/* 7th Testimonial */}
            <article className="h-full flex flex-col bg-gray-800 p-6" data-aos="fade" data-aos-anchor="[data-aos-id-testimonials]" data-aos-delay="600">
              <header className="mb-4">
                <Image className="rounded-full shrink-0" src={TestimonialsImage07} width={48} height={48} alt="Testimonial 07" />
              </header>
              <div className="grow mb-3">
                <p className="text-gray-400">It's not just easier to get in touch with developers, it's also easier to bring in other team members.</p>
              </div>
              <footer className="text-sm text-gray-400">
                <span className="text-gray-300">Anna Pratt</span> - <a className="font-medium text-blue-500 hover:text-blue-400 transition duration-150 ease-in-out" href="#0">Cloud Inc</a>
              </footer>
            </article>
            {/* 8th Testimonial */}
            <article className="h-full flex flex-col bg-gray-800 p-6" data-aos="fade" data-aos-anchor="[data-aos-id-testimonials]" data-aos-delay="700">
              <header className="mb-4">
                <Image className="rounded-full shrink-0" src={TestimonialsImage08} width={48} height={48} alt="Testimonial 08" />
              </header>
              <div className="grow mb-3">
                <p className="text-gray-400">Tools like Neon Advanced Security help keep our team lean. It makes us much more efficient.</p>
              </div>
              <footer className="text-sm text-gray-400">
                <span className="text-gray-300">Veerle Larson</span> - <a className="font-medium text-blue-500 hover:text-blue-400 transition duration-150 ease-in-out" href="#0">Prinso</a>
              </footer>
            </article>
            {/* 9th Testimonial */}
            <article className="h-full flex flex-col bg-gray-800 p-6" data-aos="fade" data-aos-anchor="[data-aos-id-testimonials]" data-aos-delay="800">
              <header className="mb-4">
                <Image className="rounded-full shrink-0" src={TestimonialsImage09} width={48} height={48} alt="Testimonial 09" />
              </header>
              <div className="grow mb-3">
                <p className="text-gray-400">Neon enables speed and scale. We can work on bigger projects and finish them faster.</p>
              </div>
              <footer className="text-sm text-gray-400">
                <span className="text-gray-300">Ana Kennedy</span> - <a className="font-medium text-blue-500 hover:text-blue-400 transition duration-150 ease-in-out" href="#0">Syntax Inc</a>
              </footer>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}