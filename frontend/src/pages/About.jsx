import React from 'react'

export default function About() {
    return (
        <div className='max-w-6xl mx-auto p-3 md:px-10 lg:px-20 flex flex-col-reverse gap-5'>
            <div>
                <h1 className='hidden md:block text-3xl font-bold mb-4 text-slate-500'>About Amin Estate</h1>
                <p className='mb-4 text-slate-800'>
                    <span className='font-semibold'>Amin Estate</span> is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.</p>
                <p className='mb-4 text-slate-800'>
                    <span className='font-semibold'>Our mission</span> is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.
                </p>
                <p className='mb-4 text-slate-800'>
                    <span className='font-semibold'>Our team</span> of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.</p>
            </div>
            <div>
                <h1 className='md:hidden text-3xl font-bold mb-4 text-slate-500 text-center pt-4'>About Amin Estate</h1>
                <img
                    src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    alt='Image'
                    className='w-full md:h-[500px] xl:h-[590px] mx-auto rounded-lg object-cover' />
            </div>
        </div>
    )
}
