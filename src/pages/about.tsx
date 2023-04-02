import React from 'react'
import Navbar from '~/components/layout/Navbar'

const About = () => {
  return (
    <div className='h-full w-full'>
        <Navbar />
        <div className='flex flex-col w-full h-full bg-primary items-start pt-32'>
            <div className='w-full px-10 relative'>
                <span className='text-7xl w-full text-center font-thin z-1'>Meet our team of <span className='italic'>Designers, Developers</span> and <span className='italic'>Creatives</span></span>
                <img src = "/images/maple.svg" className='absolute top-[30%] md:top-[25%] w-20 md:w-32 right-[10%] -rotate-[30deg] -z-1' />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 w-10/12 mx-auto my-10 place-items-center h-full ' >
                <div className='w-2/3 md:place-self-end rounded-lg flex-col aspect-square h-full flex items-center justify-center shadow-lg shadow-neutral-400'>
                    <div className='rounded-t-lg'>
                        <img src="/images/bekshi.png" className='h-full aspect-square rounded-t-lg object-cover'/></div>
                        <span className='bg-[#d9d9d9] italic w-full rounded-b-lg text-center text-2xl font-thin uppercase py-2'>Dhruv Bakshi</span>
                </div>
                <div className='w-2/3 md:place-self-start rounded-lg flex-col aspect-square h-full flex items-center justify-center shadow-lg shadow-neutral-400'>
                <img src="/images/tzer.png" className='h-full rounded-lg aspect-square object-cover' />
                    <span className='bg-[#d9d9d9] italic w-full rounded-b-lg text-center text-2xl font-thin uppercase py-2'>Anuj Rawat</span>
                </div>
                <div className=' w-2/3 flex-col md:place-self-end rounded-lg aspect-square h-full flex items-center justify-center shadow-lg shadow-neutral-400'>
                <img src="/images/tushaer.png" className='h-full rounded-lg aspect-square object-cover' />
                    <span className='bg-[#d9d9d9] italic w-full rounded-b-lg text-center text-2xl font-thin uppercase py-2'>Tushar Kaushik</span>
                </div>
                <div className=' w-2/3 flex-col rounded-lg md:place-self-start aspect-square h-full flex items-center justify-center shadow-lg shadow-neutral-400'>
                    <img src="/images/srgrr.png" className='h-full rounded-lg aspect-square object-cover' />
                    <span className='bg-[#d9d9d9] italic w-full rounded-b-lg text-center text-2xl font-thin uppercase py-2'>Saksham Sengar</span>
                </div>

            </div>
        </div>
    </div>
  )
}

export default About